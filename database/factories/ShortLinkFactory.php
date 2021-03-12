<?php

namespace Database\Factories;

use App\Models\ShortLink;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShortLinkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ShortLink::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'short_link' => Str::random(10),
            'redirect_link' => "https://google.com",
            "commercial" => $this->faker->boolean(),
            "end_time" => $this->faker->dateTime(),
            'statistic_link' => Str::random(20)
        ];
    }
}
