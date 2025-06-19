<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminGenreController;
use App\Http\Controllers\AdminLanguageController;
use App\Http\Controllers\AdminMovieController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieDc;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('movie',[MovieController::class,'index'])->name('movie');
    Route::get('movie/{movie}',[MovieController::class,'show'])->name('movie.show');
    Route::get('/discovery', [MovieDc::class, 'index'])->name('discovery.index');
});

Route::middleware(['auth', 'verified',AdminMiddleware::class])->group(function () {
    Route::get('admin/dashboard',[AdminDashboardController::class,'index'])->name('admin.dashboard');
    Route::resource("admin/movie", AdminMovieController::class);
    Route::resource("admin/genre", AdminGenreController::class);
    Route::resource("admin/language", AdminLanguageController::class);
});

