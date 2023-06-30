<?php

namespace App\Http\Requests;
use Illuminate\Support\Facades\Route; 
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Password;

class UserStoreRequest extends FormRequest
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
        $rutaa = Route::currentRouteAction(); 
        if("App\Http\Controllers\API\UserController@registerUser" == $rutaa){
            return [
                'name'                  => 'required',
                'email'                 => 'required|email|unique:users,email',
                'password'              => 'min:6|required_with:password_confirmation|same:password_confirmation',
                'password_confirmation' => 'required|min:6',
                'phone'                 => 'required|digits_between:10,15',
                'image_user'            => 'nullable|mimes:jpeg,png,jpg',
    
            ];
        }else{
            return [
                'name'                  => 'required',
                'email'                 => 'required|email',
                'password'              => 'nullable|min:6',
                'password_confirmation' => 'nullable|min:6',
                'phone'                 => 'required|digits_between:10,15',
                'image_user'            => 'nullable|mimes:jpeg,png,jpg',
    
            ];
        }
         
        
    }

    public function messages()
    {
        return [
            'name.required'          => 'El nombre es required',
            'email.required'         => 'El email es required',
            'email.email'            => 'Ingrese un email valido',
            'image_user.mimes'       => 'Archivo no permitido, solo se permiten PNG,JPEG',
            'email.unique'           => 'Ya existe un usuario con el email que intenta registrar',
            'phone.required'         => 'El campo telefono es requerido',
            'phone.numeric'          => 'El campo telefono debe ser solo numeros',
            'phone.digits_between'   => 'El campo telefono debe estar entre 10 y 15 digitos',
            'password.required'      => 'La contraseña es requireda', 
            'password.required_with' => 'Ambos campos de contraseña son requeridos', 
            'password.same'          => 'Ambos campos de contraseña deben coincidir', 
            'password.min'           => 'La contraseña debe tener minimo 6 caracteres', 
            'password_confirmation.required' => 'El campo confirmacion de contraseña es requerido',
            'password_confirmation.min' => 'El campo confirmacion de contraseña debe tener minimo 6 caracteres',
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
