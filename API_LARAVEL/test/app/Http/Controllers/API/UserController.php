<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use \Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Storage;  

class UserController extends BaseController
{
    protected $keyToken = 'api_prueba';
    protected $disk = 'public';

    public function loginUser(LoginRequest $request)
    { 
        $input = $request->all();

        Auth::attempt($input);
        if(!Auth::check()){
            return $this->sendError('Usuario y/o contraseña son invalidos');
        }
       
        $user = Auth::user();
        $user->session_date = date('Y-m-d H:i:s');
        $user->save();
        $token            = $user->createToken($this->keyToken)->accessToken;
        $success['token'] = $token;
        $success['user']  = $user;
        return $this->sendResponse($success, 'Autenticado');
    }


    public function registerUser(UserStoreRequest $request)
    {
        $input                 = $request->all();
        $input['password']     = bcrypt($input['password']);
        $input['session_date'] = date('Y-m-d H:i:s');
        $input['image_user']   = $this->uploadImage($request);
        $user                  = User::create($input);
        $success['token']      = $user->createToken($this->keyToken)->accessToken;
        $success['user']       = $user; 
        return $this->sendResponse($success, 'Usuario registrado correctamente');
    }
 
    public function getUserDetail(Request $request, $id)
    {
        if(Auth::guard('api')->check()){

            $record                = User::findOrFail($id);
            $success['urlapi_img'] =  env('APP_URL_DIR_IMAGES');
            $success['user']       =  $record;
            return $this->sendResponse($success, 'Success'); 
        }
        return $this->sendError('Unauthorized',[], 401); 
    }

    public function update(UserStoreRequest $request, $id){
        $input  = $request->all(); 
        $record = User::findOrFail($id);
        $record->update($input);
        return $this->sendResponse($record, 'Registro actualizado correctamente'); 

    }
    public function delete(Request $request, $id){
        $record = User::findOrFail($id);
        $record->delete();
        $success['deleete'] = true; 
        return $this->sendResponse($success, 'Registro eliminado correctamente'); 
    }

    
    public function getAllUser()
    {
        if(Auth::guard('api')->check()){
            $user = User::all();
            return $this->sendResponse($user, 'Success'); 
        }
        return $this->sendError('Unauthorized',[], 401); 
    }
 
    public function userLogout()
    {
        if(Auth::guard('api')->check()){
            $accessToken = Auth::guard('api')->user()->token();

            DB::table('oauth_refresh_tokens')
                    ->where('access_token_id', $accessToken->id)
                    ->update(['revoked' => true]);
            $accessToken->revoke();
            $success['logout'] = true; 
            return $this->sendResponse($success, 'Sesion cerrada con exito'); 
        }
        return $this->sendError('Unauthorized',[], 401); 
    }

    

    protected function uploadImage($request){
        
        if ($request->file('image_user') == null || empty($request->file('image_user'))){

            return 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvxKpiX298n7ZsTq_GGgxhEZjoJUbNJ7vk4zibmzFJZ7N0uUAY9t42eTmjQvAJ42aZHHB66nQ3szk36xLF_l9u6LS4HDJIrix_rm0rJw5a2Kh6WCHR8bIJliHtD7mH8oHKqVFf1_idT2KL6Njc8eYRw8dFPT1R_zguQ3xSxgefogVAwkOe0N0WeH8HPFw/s200/perfil.png';
        }

        $imagen = $request->file('image_user');
        
        $nombreImagen = 'profile-'. uniqid().'.'.strtolower($imagen->getClientOriginalExtension());
        $imagen->storeAs('', $nombreImagen, $this->disk); 
        $url = Storage::url($nombreImagen);
        return  $url; 
    }

   
}
