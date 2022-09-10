<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdCategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => $this->title ?? '',
            'description' => $this->description ?? '',
            'parent_id' => intval($this->parent_id),
            'parent_title' => $this->parent_title ?? '---',
        ];
    }
}
