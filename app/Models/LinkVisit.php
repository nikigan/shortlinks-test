<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkVisit extends Model
{
    use HasFactory;


    public function short_link()
    {
        return $this->belongsTo(ShortLink::class);
    }
}
