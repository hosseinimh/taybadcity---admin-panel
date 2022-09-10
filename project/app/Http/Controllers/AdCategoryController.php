<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdCategory\IndexAdCategoriesRequest as IndexRequest;
use App\Http\Requests\AdCategory\StoreAdCategoryRequest as StoreRequest;
use App\Http\Requests\AdCategory\UpdateAdCategoryRequest as UpdateRequest;
use App\Interfaces\AdCategoryRepositoryInterface;
use App\Models\AdCategory as Model;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class AdCategoryController extends Controller
{
    public function __construct(JsonResponse $response, private AdCategoryRepositoryInterface $repository)
    {
        parent::__construct($response);
    }

    public function index(?Model $parent, IndexRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->repository->paginate($parent, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($model);
    }

    public function store(?Model $parent, StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->repository->store($parent, $request->title, $request->description));
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->repository->update($model, $request->title, $request->description));
    }
}
