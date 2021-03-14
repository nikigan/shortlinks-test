<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ShortLink extends Model
{
    use HasFactory;

    protected $fillable = ['short_link', 'redirect_link', 'commercial', 'end_time'];

    public function link_visits()
    {
        return $this->hasMany(LinkVisit::class);
    }

    public function scopeStatisticLink($query, $statistic_link)
    {
        return $query->where('statistic_link', $statistic_link);

    }

    public function scopeShortLink($query, $request_link)
    {
        return $query->where('short_link', $request_link);
    }

    public function scopeVisitsCount($query, $weeks = 2)
    {
        return $query->select(DB::raw('short_links.*, COUNT(DISTINCT lv.client_ip) as unique_visitors'))
            ->leftJoin('link_visits as lv', 'short_links.id', '=', 'lv.short_link_id')
            ->whereDate('lv.created_at', ">=", now()->subWeeks($weeks))
            ->orderBy('short_links.created_at', 'desc')
            ->groupBy('short_links.short_link');
    }
}
