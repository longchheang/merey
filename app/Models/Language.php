<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

/**
 * @method static select(string $string, string $string1)
 */
class Language extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'name'
    ];
    public function movies(): HasMany
    {
        return $this->hasMany(Movies::class);
    }

}
