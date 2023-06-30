import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  id: number;
  name: string; 
  email: string;
  phone: string;
  image_user?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors          = ref({});
  const user            = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());
  const isAdmin         = ref(false);

  function setAuth(authUser: User, headers) {
    
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(headers);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  function getAuthHeaders(data) {
    return {
      'access_token': data.token
    }
  }

  function login(credentials: User) {
    return ApiService.post("api/login", credentials)
      .then(({ data, headers }) => { 
        let finalHeaders = getAuthHeaders(data.data)
        setAuth(data.data, finalHeaders);
        return true;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(formData: any) {

   
    return ApiService.post('/api/users/register', formData)
      .then(({ data, headers }) => {
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

 
 

  return {
    errors,
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    register,  
  };
});
