<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class genres extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            ['name' => 'Action'],
            ['name' => 'Adventure'],
            ['name' => 'Animation'],
            ['name' => 'Biography'],
            ['name' => 'Comedy'],
            ['name' => 'Crime'],
            ['name' => 'Documentary'],
            ['name' => 'Drama'],
            ['name' => 'Family'],
            ['name' => 'Fantasy'],
            ['name' => 'History'],
            ['name' => 'Horror'],
            ['name' => 'Musical'],
            ['name' => 'Mystery'],
            ['name' => 'Romance'],
            ['name' => 'Science Fiction (Sci-Fi)'],
            ['name' => 'Sports'],
            ['name' => 'Thriller'],
            ['name' => 'War'],
            ['name' => 'Western'],
        ];

        DB::table('genres')->insert($genres);
    }
}
