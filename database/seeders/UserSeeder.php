<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
           'name' => 'Test User',
           'email' => 'user@email.com',
           'password' => Hash::make('user'),
            'role' => 'user',
        ]);
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@email.com',
            'password' => Hash::make('admin'),
            'role' => 'admin',
        ]);
    }
}
