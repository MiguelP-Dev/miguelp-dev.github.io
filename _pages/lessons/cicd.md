---
layout: default
title: "CI/CD"
description: "Introducción al Ciclo de Vida de un Proyecto de Software y herramientas de GitHub para CI/CD"
permalink: /lessons/cicd/
category: lessons
subcategory: ci-cd
icon: 🚀
article: true
---

## 1. Introducción a CI/CD

## 1.1 El Ciclo de Vida de un Proyecto de Software

Un proyecto de software tiene un ciclo de vida que comienza con la planificación y diseño del proyecto, sigue con la implementación o desarrollo del software, luego se realizan pruebas y se corrigen bugs, se lanza en producción, se monitorea y se mantiene. El objetivo de la integración y entrega continua es automatizar y mejorar este proceso.

**CI (Integración Continua):**

- Práctica de fusionar cambios al repositorio principal frecuentemente
- Automatización de builds y pruebas
- Detección temprana de errores

**CD (Despliegue Continuo/Entrega Continua):**

- Entrega Automatizada de cambios a producción/entornos
- Releases frecuentes y confiables
- Dos variantes: Continuous Delivery vs Continuous Deployment

**Beneficios:**

- Reducción de errores en producción
- Feedback rápido
- Procesos estandarizados
- Menos trabajo manual

## 2. Herramientas de GitHub para CI/CD

- **GitHub Actions:** Automatización de workflows
- **GitHub Packages:** Registro de paquetes
- **GitHub Environments:** Gestión de entornos
- **GitHub Pages:** Hosting estático
- **Third-party integrations:** Actions Marketplace

## 3. GitHub Actions - Conceptos Clave

### 3.1 Componentes principales

- **Workflows:** Flujos de trabajo automatizados (archivos YAML en `.github/workflows/`)
- **Events:** Disparadores de workflows (push, pull_request, schedule, etc.)
- **Jobs:** Conjunto de pasos que se ejecutan en el mismo runner
- **Steps:** Tareas individuales dentro de un job
- **Actions:** Unidades reutilizables de código (propias o del marketplace)
- **Runners:** Máquinas que ejecutan los workflows (GitHub-hosted o self-hosted)

### 3.2 Sintaxis básica de un workflow

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
```

## 4. Pipeline Avanzado con Environments

### 4.1 Configuración de entornos

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: 
      name: production
      url: https://tu-app.com
    steps:
    - name: Deployment
      run: ./deploy.sh
```

### 4.2 Protección de entornos

1. Requerir aprobación manual
2. Secrets específicos por entorno
3. Restricción de branches
4. Registro de auditoría

## 5. Estrategias de Deployment

### 5.1 Blue-Green Deployment

```yaml
- name: Deploy to Blue
  run: ./deploy-blue.sh
  env:
    ENVIRONMENT: blue

- name: Smoke Test
  run: ./smoke-test.sh

- name: Switch Traffic
  if: success()
  run: ./switch-traffic.sh
```

### 5.2 Canary Releases

```yaml
- name: Deploy Canary
  run: ./deploy-canary.sh --percentage 5%

- name: Monitor Canary
  uses: actions/monitoring@v2
  with:
    duration: 15m

- name: Full Deployment
  if: success()
  run: ./deploy-full.sh
```

## 6. Monitoreo y Rollback

```yaml
- name: Post-Deployment Checks
  uses: actions/health-check@v2
  continue-on-error: true

- name: Rollback if Failed
  if: failure()
  run: ./rollback.sh
  needs: [deploy]
```

## 7. Mejores Prácticas

### 7.1 Seguridad

- Usar Secrets para datos sensibles
- Limitar permisos con `permissions` key
- Escanear dependencias (Dependabot)
- Firmar commits y workflows

### 7.2 Optimización

- Cache de dependencias

{% raw %}

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

{% endraw %}

- Jobs paralelos
- Matrices de builds

```yaml
strategy:
  matrix:
    node-version: [14.x, 16.x, 18.x]
    os: [ubuntu-latest, windows-latest]
```

### 7.3 Colaboración

- Pull Request Checks

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

- Status Badges

```plaintext
![CI Status](https://github.com/<user>/<repo>/workflows/CI/badge.svg)
```

## 8. Integración con otros servicios

```yaml
- name: Notify Slack
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
  
- name: Upload Artifact
  uses: actions/upload-artifact@v3
  with:
    name: build-report
    path: dist/

- name: Deploy to AWS
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

## 9. Ejemplo Completo: Pipeline para Node.js

```yaml
name: Node.js CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: 18.x
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        
    - name: Cache dependencies
      uses: actions/cache@v3
      with:
        path: ~/.npm
        {% raw %}key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}{% endraw %}
        
    - run: npm ci
    - run: npm test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    environment: production
    permissions:
      contents: read
      packages: write
      
    steps:
    - uses: actions/checkout@v4
    
    - name: Login to GitHub Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
    - name: Deploy to Kubernetes
      uses: azure/k8s-deploy@v3
      with:
        namespace: production
        manifests: |
          deployment.yaml
        images: |
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

## 10. Troubleshooting Común

1. Errores de permisos
2. Fallos en jobs paralelos
3. Problemas con cache
4. Errores en ambientes específicos
5. Manejo de secrets

## 11. Alternativas y Complementos

- Jenkins
- GitLab CI/CD
- CircleCI
- Azure DevOps
- AWS CodePipeline

## 12. Glosario

- Artifact: Archivo generado por un job
- Runner: Servidor que ejecuta los workflows
- Action: Unidad reutilizable de código
- Workflow: Pipeline completo de CI/CD
- Matrix: Ejecución paralela con múltiples configuraciones

## 13. Recursos Adicionales

- GitHub Actions Documentation
- GitHub Marketplace de Actions
- GitHub Skills: CI/CD courses
- GitHub Community Forum

Esta clase cubre desde los conceptos básicos hasta implementaciones avanzadas. Para ponerlo en práctica:

1. Crea un repositorio nuevo en GitHub
2. Crea el directorio `.github/workflows/`
3. Empieza con pipelines simples y ve añadiendo complejidad
4. Explora el GitHub Marketplace para actions útiles
5. Implementa monitoreo y reporting
