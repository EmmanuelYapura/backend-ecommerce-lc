# E-commerce Backend API

API REST para una plataforma de comercio electrónico desarrollada como proyecto universitario de la carrera de Técnico Universitario en Programación.

El backend permite gestionar usuarios, productos, categorías, carritos de compra, pedidos y pagos mediante la integración con Mercado Pago.

Actualmente se encuentra desplegado en **Render** y utiliza **Supabase PostgreSQL** como base de datos.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express:** framework para construir la API REST.
- **Prisma ORM:** acceso y comunicación con la base de datos.
- **PostgreSQL:** sistema de gestión de base de datos.
- **Supabase:** alojamiento de la base de datos y almacenamiento de imágenes.
- **JWT:** autenticación y protección de rutas.
- **Mercado Pago SDK:** creación de preferencias de pago y procesamiento de notificaciones.
- **Render:** despliegue del backend.

## Arquitectura del proyecto

El proyecto utiliza una organización por responsabilidades, separando rutas, controladores, servicios y middlewares.

```text
backend-ecommerce-lc/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidades

- **Routes:** definen los endpoints y los middlewares asociados.
- **Controllers:** reciben las solicitudes HTTP y gestionan las respuestas.
- **Services:** contienen la lógica de negocio.
- **Middlewares:** implementan funcionalidades transversales, como la autenticación.
- **Prisma:** permite interactuar con PostgreSQL mediante modelos y consultas.

## Despliegue

La API se encuentra desplegada en Render.

**URL base:**

https://backend-ecommerce-lc.onrender.com

**Ejemplo de solicitud:**

```http
GET https://backend-ecommerce-lc.onrender.com/api/productos
```

> El servicio utiliza el plan gratuito de Render, por lo que puede entrar en reposo después de un período de inactividad. La primera solicitud posterior puede demorar mientras se reactiva.

## Instalación y ejecución local

### Requisitos

- Node.js.
- npm.
- Acceso a una base de datos PostgreSQL configurada.
- Credenciales de Supabase.
- Credenciales de Mercado Pago para las funcionalidades de pago.

### 1. Clonar el repositorio

```bash
git clone https://github.com/EmmanuelYapura/backend-ecommerce-lc.git
```

### 2. Ingresar al proyecto

```bash
cd backend-ecommerce-lc
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
MERCADOPAGO_ACCESS_TOKEN=
MERCADOPAGO_WEBHOOK_SECRET=
MERCADOPAGO_NOTIFICATION_URL=
```

Completar las variables con las credenciales correspondientes.

**Importante:** nunca subir el archivo `.env` ni publicar credenciales privadas en el repositorio.

### 5. Generar Prisma Client

```bash
npx prisma generate
```

### 6. Iniciar el servidor

```bash
node src/server.js
```

El servidor utilizará el puerto definido en `PORT` o, si no está configurado, el puerto 3000.

## Endpoints disponibles

Todos los endpoints utilizan como prefijo:

```text
/api
```

### Usuarios y autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/usuarios` | Registrar un usuario. |
| POST | `/api/usuarios/login` | Iniciar sesión y obtener un JWT. |

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Obtener los productos. |
| GET | `/api/productos/:id` | Obtener un producto por su identificador. |

### Categorías

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/categorias` | Obtener las categorías. |
| GET | `/api/categorias/:id` | Obtener una categoría por su identificador. |

### Carrito

Estos endpoints requieren autenticación mediante JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/carrito` | Consultar el carrito del usuario autenticado. |
| POST | `/api/carrito/items` | Agregar un producto al carrito. |
| PUT | `/api/carrito/items/:itemId` | Modificar la cantidad de un producto. |
| DELETE | `/api/carrito/items/:itemId` | Eliminar un producto del carrito. |

### Pedidos

Estos endpoints requieren autenticación mediante JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/pedidos` | Crear un pedido a partir del carrito. |
| GET | `/api/pedidos` | Consultar los pedidos del usuario autenticado. |
| GET | `/api/pedidos/:id` | Consultar un pedido específico. |

Al crear un pedido, el backend registra sus detalles, calcula el total, descuenta el stock correspondiente y vacía el carrito.

El pedido se genera inicialmente con estado `PENDIENTE`.

### Pagos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/pagos/crear-preferencia` | Crear una preferencia de pago de Mercado Pago. |
| POST | `/api/pagos/webhook` | Recibir y procesar notificaciones de Mercado Pago. |

La creación de preferencias requiere autenticación mediante JWT.

El endpoint de webhook es utilizado por Mercado Pago y no debe ser invocado directamente desde el frontend.

## Autenticación

La API utiliza JSON Web Tokens (JWT) para proteger las operaciones que requieren un usuario autenticado.

Después de iniciar sesión mediante:

```http
POST /api/usuarios/login
```

El servidor devuelve un token que debe enviarse en las solicitudes protegidas mediante el encabezado:

```http
Authorization: Bearer TOKEN
```

El backend utiliza este token para identificar al usuario y restringir el acceso a sus recursos.

## Flujo de compra

El proceso de compra implementado sigue esta secuencia:

```text
Usuario
   |
   v
Iniciar sesión
   |
   v
Agregar productos al carrito
   |
   v
Crear pedido
   |
   v
Registrar detalles y descontar stock
   |
   v
Vaciar carrito
   |
   v
Crear preferencia de Mercado Pago
   |
   v
Realizar el pago
   |
   v
Mercado Pago envía notificación
   |
   v
Backend procesa el webhook
   |
   v
Actualizar estado del pago y del pedido
```

Los pagos se encuentran configurados para pruebas mediante las credenciales de prueba de Mercado Pago.

## Base de datos

La aplicación utiliza PostgreSQL alojado en Supabase.

Entre las entidades principales se encuentran:

- Usuarios.
- Productos.
- Categorías.
- Carritos.
- Ítems del carrito.
- Pedidos.
- Detalles de pedidos.
- Pagos.

Las relaciones entre estas entidades permiten gestionar el proceso de compra y mantener la información asociada a cada usuario.

## Pruebas realizadas

Se verificaron los principales endpoints mediante Postman, tanto durante el desarrollo local como desde la URL pública de Render.

Las pruebas realizadas incluyen:

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Acceso a rutas protegidas.
- Consulta, agregado, modificación y eliminación de productos del carrito.
- Creación y consulta de pedidos.
- Descuento de stock y vaciado del carrito.
- Creación de preferencias de pago.
- Recepción y procesamiento de notificaciones de Mercado Pago.
- Actualización del estado del pago y del pedido en Supabase.

## Estado del proyecto

El backend cuenta con las funcionalidades principales del proceso de compra y se encuentra preparado para su integración con el frontend.

Algunas funcionalidades adicionales, como la modificación de perfiles y la administración de productos y categorías, forman parte de las tareas pendientes del desarrollo general del proyecto.
