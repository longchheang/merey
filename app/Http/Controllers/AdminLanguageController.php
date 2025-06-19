<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminLanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $languages = Language::get();
        return Inertia::render('admin/language/index', ['languages'=>$languages]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/language/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Language::create([
            'name' => $request->name,
        ]);

        return redirect()->route('language.index')->with('success', 'language created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $languages = Language::findOrFail($id);
        return Inertia::render('admin/language/edit',['languages'=>$languages]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $languages = Language::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $languages->update($validated);

        return redirect()->route('language.index')->with('success', 'Genre updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(language $language)
    {
        Language::destroy($language->id); // Pass the ID, not the model
        return redirect()->route('language.index')->with('success', 'Movie deleted successfully');
    }
}
