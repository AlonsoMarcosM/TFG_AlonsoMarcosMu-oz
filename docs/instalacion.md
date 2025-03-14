# 📌 Guía de Instalación y Despliegue con Docker

## 📌 **Requisitos Previos**
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

1. **Docker** → Descárgalo e instálalo desde [Docker Official Site](https://www.docker.com/get-started).
2. **Docker Compose** → Viene incluido en Docker Desktop.
3. **Git** (Opcional, para clonar el repositorio) → Descárgalo desde [Git Official Site](https://git-scm.com/downloads).

---

## 🚀 **1. Clonar el Repositorio**
Si aún no tienes el código en tu máquina, clónalo usando Git:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Si ya tienes el código descargado, simplemente accede a la carpeta del proyecto:


cd /ruta/al/proyecto
🔧 2. Construcción de Imágenes Docker
El sistema usa Docker Compose para gestionar el frontend y el backend. Para construir las imágenes, usa:


docker-compose build
Este comando:

Creará la imagen del frontend (Angular).
Creará la imagen del backend (Plumber con RStudio Server).
▶ 3. Levantar el Sistema
Una vez construidas las imágenes, inicia los contenedores con:


docker-compose up -d
📌 Explicación:

-d hace que los contenedores se ejecuten en segundo plano.
Esto ejecutará frontend y backend en los puertos configurados.
Si quieres ver los logs en tiempo real:


docker-compose logs -f
Para detener los contenedores:


docker-compose down
✅ 4. Verificar el Despliegue
Después de ejecutar docker-compose up -d, verifica que los servicios están funcionando:

Servicio	URL para acceder
Frontend (Angular)	http://localhost:4200

Si todo está bien, deberías ver la interfaz web en el navegador.

🛠 5. Opcionales: Volver a Construir las Imágenes
Si realizas cambios en el código y quieres reconstruir las imágenes, usa:


docker-compose up --build -d
Esto reconstruirá los contenedores y aplicará los cambios.

🏁 Conclusión
Ahora el sistema está ejecutándose con Docker. Puedes empezar a usarlo accediendo al frontend en http://localhost:4200 y al backend en http://localhost:8000.

Si tienes problemas:

Usa docker ps para ver si los contenedores están corriendo.
Usa docker logs <nombre-del-contenedor> para ver los logs.
📌 Subir los Cambios a GitHub
Una vez creado el archivo, agrégalo al repositorio y súbelo a GitHub:


git add docs/instalacion.md
git commit -m "Añadida guía de instalación con Docker"
git push origin main  # O la rama en la que estés trabajando