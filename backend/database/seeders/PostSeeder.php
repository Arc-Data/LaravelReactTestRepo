<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        for ( $i = 0; $i < 10; $i++ ) {
            $user = $users->random();

            $post = new Post([
                'title' => 'Writing something ' . ($i + 1),
                'description' => 'Seeded Post.'
            ]);

            $user->posts()->save($post);
        }
    }
}
