<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    public function index(): Response
    {
        $movies = Movies::with(['genre', 'language'])->get();

        return Inertia::render('movie/index', [
            'movies' => $movies, // returns data, links, meta, etc.
        ]);
    }
    public function show(string $id): Response
    {
        $movie = Movies::with(['language', 'genre'])->findOrFail($id);
        $hlsPath = "videos/hls/{$movie->id}/playlist.m3u8";

        // Generate full public URL for video

        $video_path = asset("storage/{$hlsPath}");
        return Inertia::render('movie/show',[
            'movie' => $movie,
            'video_path' => $video_path,
        ]);
    }
}
