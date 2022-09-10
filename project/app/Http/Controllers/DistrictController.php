<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCode;
use App\Http\Requests\District\IndexDistrictsRequest as IndexRequest;
use App\Http\Requests\District\StoreDistrictRequest as StoreRequest;
use App\Http\Requests\District\UpdateDistrictRequest as UpdateRequest;
use App\Interfaces\DistrictRepositoryInterface;
use App\Models\District as Model;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DistrictController extends Controller
{
    public function __construct(JsonResponse $response, private DistrictRepositoryInterface $repository)
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
        if (($model = $this->repository->store($parent, $request->name, $request->description, $request->lat, $request->lng))) {
            // upload images

            return $this->onStore($model);
        }

        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        if ($this->repository->update($model, $request->name, $request->description, $request->lat, $request->lng)) {
            // upload images

            return $this->onUpdate();
        }

        return $this->onError(['_error' => __('general.update_error'), '_errorCode' => ErrorCode::UPDATE_ERROR]);
    }
}
