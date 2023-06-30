<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email'    => 'required|email',
            'password' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'email.required'    => 'El email es required',
            'email.email'       => 'Ingrese un email valido',
            'password.required' => 'La contraseña es requireda', 
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException(
            response()->json(['errors' => $errors], JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
        );
    }
}
