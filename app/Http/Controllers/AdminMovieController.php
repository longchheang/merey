<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Language;
use App\Models\Movies;
use App\Services\VideoService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;


class AdminMovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected VideoService $videoService;
    public function __construct(VideoService $videoService){
        $this->videoService = $videoService;
    }
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'id'); // Default sort field
        $direction = $request->input('direction', 'asc'); // Default sort direction

        $movies = Movies::query()
            ->with(['language', 'genre'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->when(in_array($sort, ['id', 'name']), function ($query) use ($sort, $direction) {
                $query->orderBy($sort, $direction);
            })
            ->when($sort === 'language', function ($query) use ($direction) {
                $query->join('languages', 'languages.id', '=', 'movies.language_id')
                    ->orderBy('languages.name', $direction)
                    ->select('movies.*'); // Ensure correct columns are selected
            })
            ->when($sort === 'genre', function ($query) use ($direction) {
                $query->join('genres', 'genres.id', '=', 'movies.genre_id')
                    ->orderBy('genres.name', $direction)
                    ->select('movies.*');
            })
            ->get();

        return Inertia::render('admin/movie/index', [
            'movies' => $movies,
            'filters' => $request->only('search', 'sort', 'direction'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $genres = Genre::select('id', 'name')->get();
        $languages = Language::select('id', 'name')->get();
        return Inertia::render('admin/movie/create',['genres'=>$genres,'languages'=>$languages]);
    }

    /**
     * Store a newly created resource in storage.
     * @throws Exception
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'video' => 'required|file|mimes:mp4,avi,mov,wmv|max:51200', // Max 50MB
            'thumbnail' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
            'genre_id' => 'required|integer|exists:genres,id',
            'language_id' => 'required|integer|exists:languages,id',
        ]);

        // Upload original video to local disk (storage/app/private)
        $uploadedFile = $request->file('video');
        $originalPath = $uploadedFile->store('videos/original', 'private'); // Use private disk, not local

        // Upload thumbnail to public disk (storage/app/public)
        $thumbnailFile = $request->file('thumbnail');
        $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');

        // Prepare output directory for HLS
        $outputDirectory = storage_path('app/public/videos/hls/' . uniqid());

        // Full path of original video file
        $fullVideoPath = storage_path('app/private/' . $originalPath);

        // Normalize slashes for Windows compatibility
        $fullVideoPath = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $fullVideoPath);

        try {
            if (!VideoService::checkFFmpeg()) {
                throw new Exception('FFmpeg is not installed or not available in PATH');
            }

            if (!file_exists($fullVideoPath)) {
                throw new Exception('Uploaded video file not found: ' . $fullVideoPath);
            }

            // Generate HLS videos and get output playlist path (e.g., .../playlist.m3u8)
            $hlsPath = VideoService::generateHLS($fullVideoPath, $outputDirectory);

        } catch (Exception $e) {
            Log::error('HLS generation failed: ' . $e->getMessage());

            try {
                $hlsPath = VideoService::generateSimpleHLS($fullVideoPath, $outputDirectory);
            } catch (Exception $fallbackError) {
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['video' => 'Failed to process video file: ' . $fallbackError->getMessage()]);
            }
        }

        // Normalize paths (important on Windows)
        $storagePublic = str_replace('\\', '/', storage_path('app/public') . '/');
        $hlsPathNormalized = str_replace('\\', '/', $hlsPath);

        // Get relative path starting after storage/app/public/
        $relative = Str::after($hlsPathNormalized, $storagePublic);

        // Prefix with 'storage/' for public URL path
        $relativePath = '/storage/' . $relative;

        // Thumbnail path already relative to storage/app/public, so prefix 'storage/' for URL
        $thumbnailUrl = '/storage/' . str_replace('\\', '/', $thumbnailPath);

        // Save movie record with paths relative to public storage
        Movies::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'video_path' => $relativePath,  // No extra '/storage/' prefix here
            'thumbnail' => $thumbnailUrl,
            'genre_id' => $request->input('genre_id'),
            'language_id' => $request->input('language_id'),
        ]);

        return redirect()->route('movie.index')->with('success', 'Movie created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $movie = Movies::with(['language', 'genre'])->findOrFail($id);

        $hlsPath = "videos/hls/{$movie->id}/playlist.m3u8";

        // Generate full public URL for video

        $video_path = asset("storage/{$hlsPath}");

        return Inertia::render('admin/movie/show', [
            'movie' => $movie,
            'video_path' => $video_path,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $movie = Movies::findOrFail($id); // Better to use findOrFail to handle missing movie
        return Inertia::render('admin/movie/edit', [
            'movie' => $movie->load(['language', 'genre']),
            'languages' => Language::all(),
            'genres' => Genre::all(),
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $movie = Movies::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'language_id' => 'required|integer|exists:languages,id',
            'genre_id' => 'required|integer|exists:genres,id',
        ]);

        $movie->update($validated);

        // 👇 This is the redirect after update
        return redirect()->route('movie.index')->with('success', 'Movie updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movies $movie): RedirectResponse
    {
        Movies::destroy($movie->id); // Pass the ID, not the model
        return redirect()->route('movie.index')->with('success', 'Movie deleted successfully');
    }
}
