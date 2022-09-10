<?php

namespace App\Http\Requests\District;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreDistrictRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:50',
            'description' => 'max:2000',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('district.name_required'),
            'name.min' => __('district.name_min'),
            'name.max' => __('district.name_max'),
            'description.max' => __('district.description_max'),
        ];
    }
}
