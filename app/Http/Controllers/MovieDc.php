<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Language;
use App\Models\Movies;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class MovieDc extends Controller
{
    public function index(Request $request): Response
    {
        // Get all genres and languages for filter dropdowns
        $genres = Genre::all();
        $languages = Language::all();

        // Start with base query
        $query = Movies::with(['genre', 'language']);

        // Apply search filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Apply genre filter
        if ($request->filled('genre')) {
            $query->where('genre_id', $request->genre);
        }

        // Apply language filter
        if ($request->filled('language')) {
            $query->where('language_id', $request->language);
        }

        // Get paginated results
        $movies = $query->paginate(12); // Adjust pagination as needed

        return Inertia::render('MovieDc/index', [
            'movies' => $movies,
            'genres' => $genres,
            'languages' => $languages,
            'filters' => $request->only(['search', 'genre', 'language']),
        ]);
    }
}
