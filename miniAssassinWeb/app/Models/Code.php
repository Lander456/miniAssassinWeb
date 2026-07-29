<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    /** @use HasFactory<\Database\Factories\CodeFactory> */
    use HasFactory;

    protected $fillable = [
        'points',
        'name',
        'codice',
        'active',
        'image_data',
        'image_mime',
    ];

    protected $appends = [
        'image_data_uri',
    ];

    protected $attributes = [
        'incrementValue' => 10,
    ];

    public function getImageDataUriAttribute()
    {
        if ($this->image_data && $this->image_mime) {
            return "data:{$this->image_mime};base64,{$this->image_data}";
        }

        return null;
    }
}
