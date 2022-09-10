<?php

namespace App\Interfaces;

use App\Models\AdCategory as Model;

interface AdCategoryRepositoryInterface
{
    public function get(int $adCategoryId): mixed;
    public function paginate(?Model $parent, int $page, int $pageItems): mixed;
    public function store(?Model $parent, string $title, string|null $description): mixed;
    public function update(Model $model, string $title, string|null $description): bool;
}
