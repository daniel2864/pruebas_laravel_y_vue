const ID_TOKEN_KEY = "id_token_prueba" as string;

/**
 * @description get headers form localStorage
 */
export const getToken = (): string | null => {
  try {
    let final = window.localStorage.getItem(ID_TOKEN_KEY)
    return final || '';
  } catch (error) {
   return null 
  }
};

/**
 * @description save token into localStorage
 * @param headers: object
 */
export const saveToken = (headers: any): void => {
 
  window.localStorage.setItem(ID_TOKEN_KEY, headers.access_token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
