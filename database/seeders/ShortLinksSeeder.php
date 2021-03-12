<?php

namespace Database\Seeders;

use App\Models\ShortLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ShortLinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ShortLink::factory(20)->create();
    }
}
