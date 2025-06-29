# Proyecto Final - Backend Avanzado

Este es el proyecto final para el curso de Backend Avanzado. Se trata de una API RESTful construida con Node.js, Express y MongoDB, diseñada para gestionar usuarios, mascotas y adopciones. El proyecto está completamente dockerizado y documentado con Swagger.

## Características

- **Gestión de Usuarios:** Registro, inicio de sesión (con JWT) y CRUD de usuarios.
- **Gestión de Mascotas:** Creación, visualización, actualización y eliminación de mascotas.
- **Sistema de Adopción:** Lógica para que los usuarios puedan adoptar mascotas.
- **Documentación de API:** Endpoints documentados con Swagger UI.
- **Contenerización:** Aplicación completamente funcional dentro de un contenedor Docker.
- **Logging:** Sistema de logs con Winston, diferenciado por entorno (desarrollo/producción).

## Empezando

Para poner en marcha este proyecto, necesitarás tener instalado Node.js y Docker en tu máquina.

### Instalación Local

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd entregaFinalB3-main
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`.

4.  Ejecuta la aplicación en modo de desarrollo:
    ```bash
    npm run dev
    ```

### Uso con Docker

La forma más sencilla de ejecutar este proyecto es a través de Docker. La imagen está disponible públicamente en Docker Hub.

1.  **Descarga la imagen desde Docker Hub:**
    ```bash
    docker pull marratx/entregafinal-b3-marra:latest
    ```

2.  **Link a la imagen en Docker Hub:**
    [https://hub.docker.com/r/marratx/entregafinal-b3-marra](https://hub.docker.com/r/marratx/entregafinal-b3-marra)

3.  **Ejecuta el contenedor:**
    Asegúrate de proporcionar las variables de entorno necesarias. Para la conexión a la base de datos desde un contenedor, recuerda usar `host.docker.internal` en lugar de `localhost`.

    ```bash
    docker run -p 8080:8080 \
      -e PORT=8080 \
      -e MONGO_URL='mongodb://host.docker.internal:27017/entregaFinalB3' \
      -e COOKIE_SIGN='coderhouseb3' \
      -e JWT_PRIVATE_KEY='coderhouseb3' \
      -e JWT_EXPIRES_IN='100d' \
      -e FRONTEND_DEV_URL='http://localhost:3000' \
      marratx/entregafinal-b3-marra:latest
    ```

## Variables de Entorno

Para que la aplicación funcione correctamente, necesitas configurar las siguientes variables en un archivo `.env`:

```
PORT=8080
MONGO_URL=mongodb://localhost:27017/entregaFinalB3
COOKIE_SIGN=coderhouseb3
JWT_PRIVATE_KEY=coderhouseb3
JWT_EXPIRES_IN=100d
FRONTEND_DEV_URL=http://localhost:3000
```

## Documentación de la API

Una vez que la aplicación esté en funcionamiento, puedes acceder a la documentación completa de la API generada con Swagger en la siguiente ruta:

[http://localhost:8080/api-docs](http://localhost:8080/api-docs)
