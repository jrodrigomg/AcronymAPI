# ACRONYM API

## Requerimientos

Debes tener actualmente instalado:
* nodejs
* mongodb
* npm
* pm2


## Instalación

1. Instala las dependencias locales del proyecto de node:

```
    npm install 
```
2. Debes configurar las variables de ecosystem.config.js en un ambiente como lo siguiente:

```
    //General
    NODE_ENV: 'development',
    "TZ": "America/Guatemala",

    PORT:               3002, //Puerto del node
    //Mongo
    URLMONGO:           'mongodb://127.0.0.1:27017/',
    USER_MONGO:         'USERMONGO',
    PASS_MONGO:         'PASSWORDMONGO',
    BD_MONGO:           'DBMONGO',

    //JWT
    secret_jwt_key:     'MISECRETTOKEN',
    expiredTime:        50000 
```

3. Crear una base de datos, usuario donde éste usuario tenga los permisos necesarios

4. Iniciar el servidor con:

```
    pm2 start

```


## Nota

Para probar los métodos PUT y DELETE se creó un endpoint para crear los JSON Web Token. 
En la carpeta de testing se tiene automatizado el envío del header Authorization para 
no tener que hacerlo manual, sólo se tendría que ver la url correcta.


