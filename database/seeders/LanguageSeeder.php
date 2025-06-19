<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            ['name' => 'English'],
            ['name' => 'Spanish'],
            ['name' => 'French'],
            ['name' => 'German'],
            ['name' => 'Chinese'],
            ['name' => 'Japanese'],
            ['name' => 'Korean'],
            ['name' => 'Hindi'],
            ['name' => 'Arabic'],
            ['name' => 'Russian'],
        ];

        DB::table('languages')->insert($languages);
    }
}
