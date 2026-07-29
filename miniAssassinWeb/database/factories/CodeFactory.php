<?php

namespace Database\Factories;

use App\Models\Code;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Code>
 */
class CodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codice' => $this->faker->unique()->lexify('????????'),
            'name' => $this->faker->name(),
            'points' => $this->faker->numberBetween(10, 100),
            'incrementValue' => 10,
            'active' => $this->faker->boolean(),
        ];
    }
}
