<?php

namespace App\Repositories;

use App\Interfaces\DistrictRepositoryInterface;
use App\Models\District as Model;

class DistrictRepository extends Repository implements DistrictRepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(?Model $parent, int $page, int $pageItems): mixed
    {
        $parentId = $parent?->id ?? 0;

        if ($parentId === 0) {
            return Model::where('parent_id', $parentId)->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        } else {
            return Model::select('tbl_districts.*', 'parent_district.name AS parent_name')->join('tbl_districts AS parent_district', 'tbl_districts.parent_id', '=', 'parent_district.id')->where('tbl_districts.parent_id', $parentId)->orderBy('tbl_districts.created_at', 'DESC')->orderBy('tbl_districts.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }
    }

    public function store(?Model $parent, string $name, string|null $description, float $lat, float $lng): mixed
    {
        $parentId = $parent?->id ?? 0;
        $data = [
            'parent_id' => $parentId,
            'name' => $name,
            'description' => $description ?? '',
            'lat' => $lat ?? 0,
            'lng' => $lng ?? 0,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, string|null $description, float $lat, float $lng): bool
    {
        $data = [
            'name' => $name,
            'description' => $description ?? '',
            'lat' => $lat,
            'lng' => $lng,
        ];

        return $model->update($data);
    }
}
