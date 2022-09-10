<?php

namespace App\Interfaces;

use App\Models\District as Model;

interface DistrictRepositoryInterface
{
    public function get(int $districtId): mixed;
    public function paginate(?Model $parent, int $page, int $pageItems): mixed;
    public function store(?Model $parent, string $name, string|null $description, float $lat, float $lng): mixed;
    public function update(Model $model, string $name, string|null $description, float $lat, float $lng): bool;
}
