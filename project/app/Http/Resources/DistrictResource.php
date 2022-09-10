<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DistrictResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name ?? '',
            'description' => $this->description ?? '',
            'parent_id' => intval($this->parent_id),
            'parent_name' => $this->parent_name ?? '---',
            'lat' => $this->lat,
            'lng' => $this->lng,
        ];
    }
}
