
# Proyecto Daniel Garcia

Proyecto realizado en Laravel 10


## Repositorio

[Ir a la Documentacion de la API](https://github.com/daniel2864/pruebas_laravel_y_vue)


## Environment Variables

Para ejecutar el proyecto laravel es importante colocar esta variable de entontorno con la url donde se encuenta alojada la api

`APP_URL_DIR_IMAGES=http://127.0.0.1:8000`

 

En el proyecto Vuejs, hay que editar la url pero directamente en el servivio de la api que hace uso de axion, src/core/services/ApiService.ts y cambiar la variable:

`const  URL_BASE = `"http://127.0.0.1:8000";
## Ejecutar el proyecto

Clonar el Proyecto Laravel

```bash
  git clone https://github.com/daniel2864/pruebas_laravel_y_vue
```

Ir al directorio 

```bash
  cd API_LARAVEL/test
```

Ejecute las migraciones

```bash
  php artisan migrate
```

Necesita tambien generar los enlace simbolicos:

```bash
  php artisan storage:link
```

y ya con eso no deberia tener inconvenientes, en mi caso yo use 

```bash
  php artisan serve
```


Clonar el Proyecto Vue

```bash
  git clone https://github.com/daniel2864/pruebas_laravel_y_vue
```

Ir al directorio 

```bash
  cd FRONT_VUE/prueba
```

instalar las dependendicias

```bash
  npm install
```
y luego

```bash
  npm run dev
```