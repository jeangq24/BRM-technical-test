# BRM-technical-test
Online store

# Instrucciones para la API y Cliente

## API

### Requisitos Previos
- Node.js
- npm
- PostgreSQL

### Pasos para Configuración y Ejecución

1. **Abrir Terminal en la Carpeta API**
   - Navegue a la carpeta `API` y abra una terminal.

2. **Instalación de Dependencias**
   - Ejecute el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install --save
     ```

3. **Configuración de Variables de Entorno**
   - Cree un archivo llamado `.env` en la raíz de la carpeta `API` y agregue las siguientes variables de entorno:
     ```
     DB_USER=postgres
     DB_PASSWORD=postgres
     DB_HOST=localhost
     DB_NAME=shopdev
     ```
   - Estos son los valores por defecto; puede modificarlos si desea usar otros valores.
   - **Nota:** PostgreSQL se ejecuta por defecto en el puerto 5432.

4. **Ejecución del Servidor**
   - Una vez configurado el entorno, ejecute el siguiente comando para iniciar el servidor:
     ```bash
     npm start
     ```
   - El servidor se ejecutará en el puerto 3001.
   - Verifique la consola para confirmar que el servidor se ha iniciado correctamente:
     ```json
     {"level":"info","message":"Server is listening at port 3001","timestamp":"2024-06-20T06:11:05.695Z"}
     ```
   - Los logs se registrarán en un archivo llamado `combined.log` en la carpeta `API`.

### Rutas de la API

- **/users: POST** - Crear un usuario.
  ```json
  {
    "name": "Ejemplo",
    "last_name": "Ejemplo",
    "birthdate": "24/03/1999",
    "email": "ejemplo24@gmail.com",
    "username": "ejemplo24",
    "password": "12345678",
    "rol": "Admin"
  }
  ```
- **/auth: POST** - Autenticar un usuario (retorna token bearer).  
  ```json
  {
    "email": "ejemplo24@gmail.com",
    "password": "12345678"
  }
  ```

- **/products: POST** - Crear un producto (requiere rol Admin).
  ```json
  {
    "name": "panela",
    "lot_number": "123",
    "price": 5000,
    "stock": 100,
    "entry_date": "19/06/2024"
  }
  ```

- **/products: GET** - Obtener todos los productos registrados (requiere autenticación bearer).
- **/products/{id}: PUT** - Editar un producto (requiere autenticación bearer).

  ```json
  {
    "price": 2000,
    "stock": 5000
  }

  ```

- **/products/{id}: DELETE** - Eliminar un producto (requiere autenticación bearer).
- **/sale: POST** - Generar una venta (requiere autenticación bearer).

  ```json
  {
    "productsList": [
    {"id": 1, "amount": 10}
    ]
  }

  ```
- **/sale: GET** - Obtener la lista de ventas asociadas al usuario autenticado (requiere autenticación bearer)

# Cliente

## Pasos para Configuración y Ejecución

1. **Abrir Terminal en la Carpeta Cliente**
   - Navegue a la carpeta `cliente` y abra una terminal.

2. **Instalación de Dependencias**
   - Ejecute el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install --save
     ```

3. **Ejecución del Cliente**
   - Para ejecutar el cliente, ejecute el siguiente comando:
     ```bash
     npm run dev
     ```
   - El cliente se ejecutará en el puerto 3000.
   - Este cliente está desarrollado con el framework Next.js junto a Tailwind CSS.

## Notas Adicionales

- **Módulos Pendientes:** Por falta de tiempo, no se completaron los módulos necesarios para la gestión de compra y registro de inventario desde el cliente. Sin embargo, el API cuenta con los endpoints necesarios para estas funciones.
- **Registro y Login:** El registro y login de usuario están completamente funcionales.




