<?php

namespace App\Repositories;

use App\Interfaces\AdCategoryRepositoryInterface;
use App\Models\AdCategory as Model;

class AdCategoryRepository extends Repository implements AdCategoryRepositoryInterface
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
            return Model::select('tbl_ad_categories.*', 'parent_ad_category.title AS parent_title')->join('tbl_ad_categories AS parent_ad_category', 'tbl_ad_categories.parent_id', '=', 'parent_ad_category.id')->where('tbl_ad_categories.parent_id', $parentId)->orderBy('tbl_ad_categories.created_at', 'DESC')->orderBy('tbl_ad_categories.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }
    }

    public function store(?Model $parent, string $title, string|null $description): mixed
    {
        $parentId = $parent?->id ?? 0;
        $data = [
            'parent_id' => $parentId,
            'title' => $title,
            'description' => $description ?? '',
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $title, string|null $description): bool
    {
        $data = [
            'title' => $title,
            'description' => $description ?? '',
        ];

        return $model->update($data);
    }
}
