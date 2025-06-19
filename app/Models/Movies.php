<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

/**
 * @method static create(array $array)
 * @method static findOrFail(string $id)
 * @method static count()
 * @method static whereDate(string $string, \Illuminate\Support\Carbon $today)
 * @method static orderBy(string $string, string $string1)
 * @property mixed $hls_path
 */
class Movies extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'description',
        'thumbnail',
        'video_path',
        'genre_id',
        'language_id',
    ];

    // Define relationships

    // A movie belongs to a genre
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }

    // A movie belongs to a language
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
