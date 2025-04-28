---
layout: default
title: "Guía Completa de Contenedores: Podman vs Docker"
description: "Guía detallada de contenedores, incluyendo diferencia entre Docker y Podman"
permalink: /technologies/contenedores/
category: technologies
subcategory: contenedores
icon: 🐳
article: true
---

# **Guía Completa de Contenedores: Podman/Docker**

## **Introducción a los contenedores**

Los contenedores son tecnologías que permiten empaquetar aplicaciones junto con todas sus dependencias en un entorno aislado. Son muy útiles para garantizar que las aplicaciones funcionen correctamente en cualquier sistema operativo o infraestructura.

## **Diferencias entre Podman y Docker**

- **Docker:** Es la herramienta más conocida para la gestión de contenedores, basada en un demonio central.
- **Podman:** Es una alternativa sin demonios a Docker. Su principal ventaja es que no requiere un daemon en ejecución y permite ejecutar contenedores como usuario sin privilegios.

## **1. Instalación y Configuración Inicial**

### **Podman**

**Linux (Archlinux/archlinux-based):**

```bash
# Actualizamos la base de datos de paquetes y el sistema operativo.
sudo pacman -Syu

# Instalamos el paquete podman
sudo pacman -S podman

# Verificamos la versión de podman
podman --version
```

**Configuración rootless:**

```bash
# Habilitar usuario no root
echo "tu_usuario:100000:65536" | sudo tee -a /etc/subuid
echo "tu_usuario:100000:65536" | sudo tee -a /etc/subgid

# Verificar

podman info --debug
```

### **Docker**

**Linux (Archlinux/archlinux-based):**

```bash
sudo pacman -Syu
sudo pacman -S docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
newgrp docker
docker --version
```

**Windows/macOS:**

- Descargar Docker Desktop desde docker.com

---

## **2. Comandos Básicos (Equivalencias)**

| Acción                  | Docker                           | Podman                          |
|-------------------------|----------------------------------|---------------------------------|
| Ejecutar contenedor     | `docker run -d nginx`           | `podman run -d nginx`           |
| Listar contenedores     | `docker ps -a`                  | `podman ps -a`                  |
| Inspeccionar contenedor | `docker inspect <ID>`           | `podman inspect <ID>`           |
| Eliminar contenedor     | `docker rm <ID>`                | `podman rm <ID>`                |
| Ver logs                | `docker logs <ID>`              | `podman logs <ID>`              |
| Listar imágenes         | `docker images`                 | `podman images`                 |
| Eliminar imagen         | `docker rmi <ID>`               | `podman rmi <ID>`               |

---

## **3. Trabajo con Imágenes**

### **Construir imagen**

**Dockerfile (Ambos):**

```dockerfile
FROM alpine:latest
RUN apk add --no-cache python3
COPY app.py /app/
CMD ["python3", "/app/app.py"]
```

**Docker:**

```bash
docker build -t mi-app:1.0 .
```

**Podman:**

```bash
podman build -t mi-app:1.0 .
```

### **Push/Pull de imágenes**

**Docker:**

```bash
docker pull ubuntu:22.04
docker tag mi-app:1.0 mi-registry.com/mi-app:1.0
docker push mi-registry.com/mi-app:1.0
```

**Podman:**

```bash
podman pull ubuntu:22.04
podman tag mi-app:1.0 mi-registry.com/mi-app:1.0
podman push mi-registry.com/mi-app:1.0
```

---

## **4. Redes y Volúmenes**

### **Redes personalizadas**

**Docker:**

```bash
docker network create mi-red
docker run --network mi-red nginx
```

**Podman:**

```bash
podman network create mi-red
podman run --network mi-red nginx
```

### **Volúmenes persistentes**

**Docker:**

```bash
docker volume create mi-volumen
docker run -v mi-volumen:/data alpine
```

**Podman:**

```bash
podman volume create mi-volumen
podman run -v mi-volumen:/data alpine
```

---

## **5. Ejemplo Avanzado: Aplicación Multi-Contenedor**

### **Docker Compose (docker-compose.yml)**

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secreto
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**Ejecución:**

```bash
docker-compose up -d
```

### **Podman Compose (podman-compose.yml)**

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secreto
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**Ejecución:**

```bash
podman-compose up -d
```

---

## **6. Configuración Avanzada**

### **Rootless Containers (Podman)**

```bash
# Crear usuario para contenedores
useradd -m container-user
su - container-user

# Ejecutar contenedor como usuario normal
podman run -d --name mi-contenedor nginx
```

### **SELinux Context (Podman)**

```bash
podman run -v /host/path:/container/path:Z nginx
```

### **Docker Daemon Config**

```bash
# /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

---

## **7. Seguridad**

### **Podman (Rootless por defecto)**

```bash
# Verificar modo rootless
podman info | grep rootless

# Namespaces de usuario
podman unshare cat /proc/self/uid_map
```

### **Docker (Hardening)**

```bash
# Ejecutar contenedor en modo read-only
docker run --read-only alpine

# Limitar recursos
docker run --memory="512m" --cpus="1.5" nginx
```

---

## **8. Integración con Kubernetes**

### **Docker (Kind)**

```bash
kind create cluster
kubectl get nodes
```

### **Podman (Podman Play)**

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
```

**Ejecución:**

```bash
podman play kube k8s-deployment.yaml
```

---

## **9. Monitoreo y Depuración**

### **Inspección de procesos**

**Docker:**

```bash
docker stats
docker top <ID>
```

**Podman:**
```bash
podman stats
podman top <ID>
```

### **Análisis de imágenes**

**Docker:**

```bash
docker scan nginx:alpine
```

**Podman:**

```bash
podman inspect nginx:alpine
```

---

## **10. Migración Docker → Podman**

### **Alias para compatibilidad**

```bash
alias docker=podman
alias docker-compose=podman-compose
```

### **Convertir Docker Compose**

```bash
podman-compose -f docker-compose.yml up
```

### **Importar imágenes Docker**

```bash
docker save mi-imagen > imagen.tar
podman load -i imagen.tar
```

---

## **Comparativa Final: Docker vs Podman**

| Característica          | Docker                          | Podman                         |
|-------------------------|---------------------------------|--------------------------------|
| Arquitectura            | Cliente-Servidor (daemon)       | Sin daemon (rootless)          |
| Permisos                | Requiere root/sudo              | Rootless por defecto           |
| Compatibilidad Kubernetes | Docker Desktop + Kind         | Podman Play + Kind             |
| Seguridad               | Namespaces de kernel            | Namespaces + user namespaces   |
| CLI                     | Comandos propios                | Compatible con Docker CLI      |
| Imágenes                | Docker Hub                      | Compatible con OCI             |

---

## **Consejos Profesionales**

1. **Entornos de producción:**

   - Usar Podman para cargas de trabajo rootless
   - Docker para sistemas legacy con soporte enterprise

2. **CI/CD:**

   ```yaml
   # Ejemplo GitHub Actions
   - name: Build with Docker
     uses: docker/build-push-action@v3
     
   - name: Build with Podman
     run: |
       podman build -t mi-imagen .
       podman push mi-imagen
   ```

3. **Optimización:**

   ```dockerfile
   # Multi-stage build (funciona en ambos)
   FROM golang:1.19 as builder
   WORKDIR /app
   COPY . .
   RUN go build -o mi-app

# Stage final

```dockerfile
FROM alpine:latest  
COPY --from=builder /app/mi-app /usr/local/bin/
CMD ["mi-app"]
```

4. **Almacenamiento eficiente:**  

```bash
# Minimizar capas (ambas herramientas)
pacman -Syu --noconfirm \
    paquete1 \
    paquete2 \
 && pacman -Sc --noconfirm
```

5. **Actualización segura:**

```bash
# Usar tags específicos en producción
podman pull nginx:1.25.3-alpine
docker pull nginx:1.25.3-alpine
```

**6. Limpieza automatizada:**

```bash
# Podman
podman system prune --all --force

# Docker
docker system prune --all --force
```

---

## **Conclusión Final**

**Elección según uso:**

- **Desarrolladores principiantes → Docker** (mayor documentación)

- **Entornos empresariales → Podman** (integración con systemd y SELinux)

- **Kubernetes local → Kind** (Docker) **vs Minikube** (Podman)

**Tendencia actual:**

```bash
# Alternativa moderna para ambos
nerdctl run --rm -it nginx  # Compatible con containerd
```

¡Actualiza tus entornos regularmente y siempre verifica la procedencia de las imágenes! 🐳🔒