# Galileo_Prueba

Aplicación web para gestionar incidencias, consultar su estado y mantener una conversación asociada a cada ticket.

## Requisitos

- Node.js 20 o superior.
- `pnpm` instalado.
- Una base de datos PostgreSQL accesible desde el equipo local.

Puedes instalar `pnpm` con:

```bash
npm install --global pnpm
```

## Levantar el proyecto desde cero

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Galileo_Prueba
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
POSTGRES_URL="postgresql://USUARIO:CONTRASENA@HOST:5432/NOMBRE_BASE_DE_DATOS"
AUTH_SECRET="genera-un-secreto-largo-y-aleatorio"
```

`POSTGRES_URL` es la cadena de conexión de PostgreSQL. `AUTH_SECRET` se utiliza para firmar las sesiones de autenticación.

No subas el archivo `.env` al repositorio.

Se recomienda usar [https://vercel.com]vercel para crear la base datos y conectarla al proyecto

### 4. Crear las tablas y cargar datos de prueba

Con el servidor de desarrollo en ejecución, abre otra terminal y ejecuta:

```bash
pnpm dev
```

Despues visita:

```text
http://localhost:3000/seed
```

El endpoint crea las tablas necesarias y carga empresas, usuarios, tickets, mensajes e historial de prueba. Cada ejecución elimina y recrea esas tablas, por lo que solo debe utilizarse con una base de datos de desarrollo.

### 5. Abrir la aplicacion

Visita [http://localhost:3000](http://localhost:3000) en el navegador.

## Credenciales de prueba

Todas las cuentas de prueba utilizan la contrasena `123456`:

| Rol | Correo |
| --- | --- |
| Administrador | `julio@acme.com` |
| Usuario | `ana@acme.com` |
| Administrador | `carlos@techsolutions.com` |

## Comandos disponibles

```bash
pnpm dev       # inicia el servidor de desarrollo
pnpm lint      # ejecuta ESLint
pnpm build     # genera la compilacion de produccion
pnpm start     # inicia la aplicacion compilada
```

Para ejecutar la aplicacion en modo produccion:

```bash
pnpm build
pnpm start
```

## Rutas principales

- `/login`: inicio de sesión.
- `/tickets`: listado de incidencias de la empresa.
- `/tickets/create`: formulario para crear una incidencia.
- `/tickets/<id>/chat`: chat de una incidencia y envío de mensajes.
- `/dashboard`: panel de administración.
- `/seed`: crea y carga la base de datos de prueba.

## Tecnologias

- Next.js 16 con App Router.
- React 19 y TypeScript.
- NextAuth para autenticación.
- PostgreSQL mediante `postgres`.
- Tailwind CSS.
- Zod para validación de formularios.
- Bcrypt para la encriptación.

# Decisiones

## Interpretacion
¿Cuál crees que era el problema real del cliente?
- El problema del cliente era no poder gestionar todos las incidencias juntas y con trazabilidad.
¿Qué funcionalidades has decidido implementar primero, y por qué?
- Lo primero en implementar fue el dashboard que enseña a los admins las incidencias y la página principal de los usuarios. Luego el Login para diferenciar entre un rol y otro. Estas funcionalidades son las más importantes ya que son las que se encargan de enseñar al cliente cómo todo está en una sola página.
¿Qué funcionalidades has decidido dejar fuera, y por qué?
-He decidido dejar fuera la capacidad de marcar como resueltas, editar o eliminar incidencias ya que no son funcionalidades tan urgentes y pueden realizarse una vez dado el visto bueno. Tampoco he creado una página que mostrara el historial de una incidencia, ya que no se pueden modificar una vez creadas.
¿Qué preguntas le harías al cliente antes de desarrollar una V2?
- Le preguntaría principalmente por su opinión en cuanto a la estética y si le parece entendible y completa la pantalla del administrador, ya que es esa la que más va a usar. Si pudiera le pediría que realizara una prueba de uso mientras me explica su proceso a la hora de usarlo, para poder entender que es lo que busca lo mejor.

## Arquitectura

¿Por qué has elegido esta arquitectura?
- He elegido una arquitectura basada en Next.js ya que es una manera rápida, fácil y con muchos recursos y ayudas para crear el entorno

¿Cómo has modelado los datos?
- El modelo se centra en las entidades Company, User, Ticket y Message. Cada usuario pertenece a una empresa y cada incidencia queda asociada a ella, permitiendo trazabilidad y aislamiento de datos.

¿Qué decisiones has tomado pensando en la escalabilidad?
- He separado la lógica mediante carpetas para separar las funciones de cada archivo y se pueden crear nuevas pantallas con nueva lógica sin modificar las otras.

¿Qué aspectos de seguridad has considerado?
- He implementado autenticación y encriptación con NextAuth y Bcrypt, control de acceso por roles y aislamiento de información mediante company_id para evitar que un cliente acceda a la pantalla de administrador.

## Estado

¿Qué está terminado, qué está a medias y qué no has llegado a tocar?
- Está terminado el chat, el login y la creación de incidencias. Falta por implementar la edición, borrado y finalización de incidencias. También hay una tabla en la base de datos para mostrar el historial, pero no tiene pantalla. También habría que comprobar el funcionamiento del proyecto a la hora de diferenciar entre empresas.No he implementado el páginado de elementos en ninguna de las dos pantallas principales.

¿Cómo organizarías el trabajo para continuar a partir de aquí?
Lo más importante sería terminar las funcionalidades de las incidencias, luego la seguridad, después el historial y por último funciones de accesibilidad como el idioma, el modo claro o la guía para ciegos, a parte de posibles peticiones por parte del cliente.