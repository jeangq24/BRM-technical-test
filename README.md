# BRM-technical-test
Online store

## API:

### Instrucciones:

En la carpeta API abra una terminal (programas necesarios para correr el API rest Nodejs, npm, postgresql) y luego ejecute como primera instancia "npm install --save" para descargar las dependencia necesarias y asi poder ejecutar el servidor de forma local. 
Genere un archivo llamado ".env" a la altura de la carpeta API y alli genere las seguientes variables de entorno:
- DB_USER=postgres  (usuario postgres)
- DB_PASSWORD=postgres (contraseña de usuario postgres)
- DB_HOST=localhost (dominio)
- DB_NAME=shopdev (nombre de la base de datos)

Esto son los valores que trabajaran por defecto, puede modificarlos en caso de que quiere remplazar por otros valores. **RECUERDA QUE POR DEFECTO POSTGRESQL SE EJECUTA EN EL PUERTO 5432.**

Una vez se realize la configuracion mencionada anterioremente bastara con ejecutar en la colsa el comando "npm start" estar levatara el servidor el cual correra en puerto 3001.

Puede visualizar la consola para ver el log que indicar que se ha inicado conrrectamente el servidor: 
* {"level":"info","message":"Server is listening at port 3001","timestamp":"2024-06-20T06:11:05.695Z"}

**Asi mismo se genera un archivo llamado "combined.log" donde se podran  ver resgistrados todos los log desde la ejecucion del servidor (el archivo se encuentra a la altura de la carpeta api)**


### Rutas:

- /users:
POST - creara un usuario.

- /auth:
POST - autentica un usuario.

- /products:
POST - Crea un producto, GET - Obtiene todos los poductos registrados.

- /products/{id}:
PUT - Edita un producto, DELETE - Elimina un producto

- /sale: POST - Genera una venta (modifica stock de productos)


## CLIENTE

En la carpeta cliente abra una terminal y luego ejecute como primera instacia "npm install --save" para descargar las dependencia necesarias y asi poder ejecutar el cliente de forma local.

+ Para ejecutar el cliente lo puede hacer escrbiendo en la consola "npm run dev", el cliente se ejecutara en el puerto 3000
Este cliente esta trabajando con el framework de Nextjs junto a tailwindcss

**Por falta de tiempo no pude completar los modulos necesarios para la gestios de compra y registro de inventario (desde el cliente, el API cuenta con los edpoints para hacerlo), EL REGISTRO Y LOGIN DE USUARIO SE ENCUENTRA FUNCIONAL**