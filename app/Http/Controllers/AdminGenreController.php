<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Movies;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminGenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genres = Genre::all();
        return Inertia::render('admin/genre/index',['genres'=>$genres]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/genre/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Genre::create([
            'name' => $request->name,
        ]);

        return redirect()->route('genre.index')->with('success', 'Genre created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(genre $genre)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $genres = Genre::findOrFail($id);
        return Inertia::render('admin/genre/edit',['genres'=>$genres]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $genre = Genre::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $genre->update($validated);

        return redirect()->route('genre.index')->with('success', 'Genre updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(genre $genre)
    {
        Genre::destroy($genre->id); // Pass the ID, not the model
        return redirect()->route('genre.index')->with('success', 'Movie deleted successfully');
    }
}
