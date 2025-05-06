---
layout: default
title: "YAML"
description: "Domina la cración de archívos '.yml' y '.yaml' para configurar contenedores, servicios, etc."
permalink: /cloudevops/yaml/
category: cloudevops
subcategory: devops-cloud
icon: 🔧
article: true
---


## **Introducción a YAML (YAML Ain’t Markup Language)**

### **1. Introducción a YAML**
  
**Objetivo:** Entender qué es YAML, su propósito y ventajas.

**¿Qué es YAML?**

- Lenguaje de serialización de datos legible para humanos.  
- Usado para archivos de configuración, intercambio de datos y definición de estructuras.  

**Extensiones comunes:** `.yml`, `.yaml`.

**Características Clave:**

- Sintaxis limpia y minimalista.  
- Soporta tipos de datos complejos (listas, diccionarios, anidación).  
- Independiente del lenguaje de programación.  

**Comparación con otros formatos:**

- **JSON:** Más verboso, usa llaves y comillas.  
- **XML:** Más complejo con etiquetas.  
- **INI:** Limitado para estructuras simples.  

---

### **2. Sintaxis Básica**

**Objetivo:** Aprender la estructura básica de YAML.

**Ejemplo de un archivo YAML:**

```yaml
# Comentario
nombre: "Juan Pérez"
edad: 30
activo: true
hobbies:
  - programar
  - leer
  - correr
direccion:
  calle: "Calle Falsa 123"
  ciudad: "Madrid"
```  

**Reglas:**

- **Indentación:** Usa espacios (no tabs).
- **Clave-Valor:** `clave: valor` (el espacio después de `:` es obligatorio).
- **Listas:** Usan guiones (`-`) para elementos.
- **Diccionarios:** Pares anidados con indentación.  

---

### **3. Tipos de Datos**

**Objetivo:** Reconocer los tipos de datos soportados.

**Escalares:**

- **String:** `nombre: "Texto"` (comillas opcionales si no hay caracteres especiales).  
- **Números:** `edad: 25`, `precio: 19.99`.  
- **Booleanos:** `activo: true`, `habilitado: false`.  
- **Null:** `valor: null`.  

**Colecciones:**

**Listas:**

```yaml
frutas:
  - manzana
  - plátano
```

**Diccionarios:**

```yaml
persona:
  nombre: "Ana"
  edad: 28
```

---

### **4. Sintaxis Avanzada**

**Objetivo:** Dominar características avanzadas de YAML.

**Anclas y Alias (reutilización):**

```yaml
base: &base_config
  puerto: 8080
  entorno: "producción"

servidor:
  <<: *base_config
  nombre: "servidor_principal"
```  

**Multilínea:**

```yaml
descripcion: |
  Esto es un texto
  que ocupa múltiples
  líneas (preserva saltos).  
resumen: >
  Esto es un texto
  que se pliega en una
  sola línea.
```  

**Comentarios:** Usar `#` para comentarios.  

---

### **5. Reglas y Errores Comunes**

**Indentación incorrecta:**

```yaml
# Error
direccion:
calle: "Calle Falsa"  # Falta indentación.
```

**Claves duplicadas:**

```yaml
usuario:
  nombre: "A"
  nombre: "B"  # Error: clave duplicada.
```

**Uso de tabs en vez de espacios.**

### **6. Casos de Uso**

**Archivos de configuración:**

- Docker Compose (`docker-compose.yml`).  
- GitHub Actions (`.github/workflows/ci.yml`).

**Kubernetes:** Definición de pods, servicios, etc.  

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mi-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

**Intercambio de datos:** APIs, bases de datos.

### **7. Recursos y Herramientas**

**Validadores Online:**

- [YAML Lint](https://www.yamllint.com/).  
- [JSON to YAML Converter](https://www.json2yaml.com/).

**Editores Recomendados:**

- VS Code (con extensión *YAML* de Red Hat).  
- Sublime Text + plugins.

**Documentación Oficial:** [yaml.org](https://yaml.org/).  

### **8. Ejercicio Práctico**

**Crear un archivo `docker-compose.yml` para una app web:**

```yaml
version: "3.9"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: ejemplo
```  

### **9. Mejores Prácticas**

- **Indentación consistente:** Usar 2 espacios (estándar común). 
- **Evitar estructuras demasiado anidadas.**  
- **Usar comentarios para claridad.**  
- **Validar con herramientas como `yamllint`.**  

### **10. Preguntas Frecuentes**

**¿YAML vs JSON?**

YAML es más legible para humanos, JSON es mejor para máquinas.

**¿Cómo manejar variables de entorno?**

```yaml
entorno:
  db_url: ${DB_URL}  # Usado en Docker Compose.
```

**¿Se pueden usar tabs en YAML?**  

No, solo espacios.  

**Evaluación Final:**

Crear un archivo YAML para definir una configuración de CI/CD en GitHub Actions que:

1. Ejecute tests en Node.js.  
2. Se active en cada push a `main`.  

**Solución:**

```yaml
name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```
