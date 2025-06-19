<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $totalMovies = Movies::count();

        $totalUsers = User::where('role', '!=', 'admin')->count();

        $newUsersToday = User::where('role', '!=', 'admin')
            ->whereDate('created_at', Carbon::today())
            ->count();

        $newMoviesToday = Movies::whereDate('created_at', Carbon::today())->count();

        return Inertia::render('admin/dashboard', [
            'totalMovies' => $totalMovies,
            'totalUsers' => $totalUsers,
            'newUsersToday' => $newUsersToday,
            'newMoviesToday' => $newMoviesToday,
        ]);
    }
}
