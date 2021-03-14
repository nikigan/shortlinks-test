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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LinkController extends Controller
{

    public function index()
    {
        return LinksStatResource::collection(
            ShortLink::query()
                ->visitsCount()
                ->get());
    }

    public function redirect(Request $request, string $request_link)
    {
        $link = ShortLink::query()
            ->shortLink($request_link)
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
                'short_link' => $link_text ?? $this->uniqueShortLink('short_link'),
                'redirect_link' => $validated['redirect_url'],
                'commercial' => $validated['commercial'] ?? false,
                'end_time' => Carbon::parse($validated['end_date']) ?? now()->addDay()
            ]);

            $link->statistic_link = $this->uniqueShortLink('statistic_link', 20);

            $link->save();

            return new ShortLinkResource($link);
        }

        abort(500, "Unknown error");
        return response();
    }

    private function uniqueShortLink($field, $length = 10)
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
            ->statisticLink($statistic_link)
            ->with('link_visits')->firstOrFail();

        return new ShortLinkViewsResource($link);
    }
}
