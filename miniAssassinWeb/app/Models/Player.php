<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = [
        'points',
        'codice',
        'deadUntil',
        'user_id',
        'image_data',
        'image_mime',
    ];

    protected $appends = [
        'image_data_uri',
    ];

    protected $casts = [
        'deadUntil' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getImageDataUriAttribute()
    {
        if ($this->image_data && $this->image_mime) {
            return "data:{$this->image_mime};base64,{$this->image_data}";
        }

        return null;
    }
}
