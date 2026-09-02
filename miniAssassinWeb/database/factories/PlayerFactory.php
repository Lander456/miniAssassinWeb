<?php

namespace Database\Factories;

use App\Models\Player;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Player>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'points' => $this->faker->numberBetween(100, 1000),
            'codice' => $this->faker->unique()->lexify('????????'),
            'deadUntil' => null,
            'image_path' => $this->generateNoiseImage(
                directory: storage_path('app/public/players'),
                width: 500,
                height: 500,
            ),
        ];
    }

    private function generateNoiseImage($directory, $width = 100, $height = 100) {
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $filename = Str::random(10) . '.jpg';
        $fullPath = $directory . '/' . $filename;

        $img = imagecreatetruecolor($width, $height);

        for ($x = 0; $x < $width; $x++) {
            for ($y = 0; $y < $height; $y++) {
                $color = rand(0, 255);
                imagesetpixel($img, $x, $y, imagecolorallocate($img, $color, $color, $color));
            }
        }

        imagejpeg($img, $fullPath, 75);
        imagedestroy($img);

        return 'players/' . $filename;
    }
}
