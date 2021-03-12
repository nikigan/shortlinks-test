<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShortLinkViewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'short_link' => $this->short_link,
            "full_link" => url($this->short_link),
            "redirect_link" => $this->redirect_link,
            "end_time" => $this->end_time,
            "created_at" => $this->created_at,
            "link_visits" => $this->link_visits
        ];
    }
}
