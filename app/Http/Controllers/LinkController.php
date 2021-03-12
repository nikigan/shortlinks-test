<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShortLinkRequest;
use App\Http\Resources\LinksStatResource;
use App\Http\Resources\ShortLinkResource;
use App\Http\Resources\ShortLinkViewsResource;
use App\Models\LinkVisit;
use App\Models\ShortLink;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LinkController extends Controller
{

    public function index()
    {
        return LinksStatResource::collection(
            ShortLink::query()
            ->select(DB::raw('short_links.*, COUNT(DISTINCT lv.client_ip) as unique_visitors'))
            ->leftJoin('link_visits as lv', 'short_links.id', '=', 'lv.short_link_id')
            ->whereDate('lv.created_at', ">=", now()->subWeeks(2))
            ->groupBy('short_links.short_link')
            ->get());
    }

    public function redirect(Request $request, string $request_link)
    {
        $link = ShortLink::query()->where('short_link', $request_link)
            ->firstOrFail();

        if ($link->end_time < now()) {
            return response([
                'error' => "Ссылка устарела"
            ], 410);
        }

        $link_visit = new LinkVisit;
        $link_visit->client_ip = $request->ip();
        $link_visit->short_link_id = $link->id;

        if ($link->commercial) {
            $files = Storage::disk('public')->allFiles('ads');
            $ad_url = url('storage/' . $files[rand(0, count($files) - 1)]);
            $link->ad_url = $ad_url;
            $link_visit->ad_image = $ad_url;
        }

        $link_visit->save();

        return new ShortLinkResource($link);
    }

    public function store(ShortLinkRequest $request)
    {
        $validated = $request->validated();

        $link_text = $validated['custom_shortlink'];

        if ($validated) {
            $link = new ShortLink;
            $link->fill([
                'short_link' => $link_text ?? $this->uniqueShortLink(10, 'short_link'),
                'redirect_link' => $validated['redirect_url'],
                'commercial' => $validated['commercial'] ?? false,
                'end_time' => Carbon::parse($validated['end_date']) ?? now()->addDay()
            ]);

            $link->statistic_link = $this->uniqueShortLink(20, 'statistic_link');

            $link->save();

            return new ShortLinkResource($link);
        }

        abort(500, "Unknown error");
        return response();
    }

    private function uniqueShortLink($length = 10, $field)
    {
        do {
            $stat_link_text = Str::random($length);
            $existing_link = !!ShortLink::query()->where($field, $stat_link_text)->count();
        } while ($existing_link);

        return $stat_link_text;
    }

    public function show($statistic_link)
    {
        $link = ShortLink::query()
            ->where('statistic_link', $statistic_link)
            ->with('link_visits')->firstOrFail();

        return new ShortLinkViewsResource($link);
    }
}
