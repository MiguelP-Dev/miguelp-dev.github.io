---
layout: default
title: Jenkins
description: "Herramienta de automatización de integración y entrega continua (CI/CD) de software de código abierto"
permalink: /cheat_sheets/jenkinscs/
category: cheatsheets
subcategory: "Cloud and DevOps"
icon: 🤖
article: true
---

## **Nivel Básico**

### 1. Introducción a Jenkins

- ¿Qué es CI/CD?
- Arquitectura de Jenkins (Master/Agente)
- Ventajas vs otras herramientas
- Casos de uso comunes

### 2. Instalación y Configuración Inicial

**Requisitos:**

- Java JDK 8+
- 4 GB RAM mínimo
- 50 GB espacio en disco

**Instalación en Archlinux:**

```bash
sudo pacman -S jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

**Instalación en Windows:**

- Descargar Jenkins desde [https://www.jenkins.io/download/](https://www.jenkins.io/download/)
- Ejecutar el archivo .exe en modo "Silencioso"
- Desbloquear Jenkins con contraseña inicial

**Instalación en macOS:**

- Descargar Jenkins desde [https://www.jenkins.io/download/](https://www.jenkins.io/download/)
- Ejecutar el archivo .pkg
- Desbloquear Jenkins con contraseña inicial

**Primer acceso:**

1. Abrir `http://localhost:8080`
2. Desbloquear Jenkins con contraseña inicial:

   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

3. Instalar plugins recomendados
4. Crear usuario admin

### 3. Primer Job Básico

1. Click en "Nuevo Item"
2. Nombre: "Mi-Primer-Job"
3. Tipo: Freestyle project
4. En configuración:
   - Añadir paso de build: Ejecutar shell

   ```bash
   echo "Hola Mundo desde Jenkins!"
   date
   ```

5. Guardar y hacer clic en "Build Now"

### 4. Configuración de Plugins Esenciales

Instalar desde "Manage Jenkins > Plugins":

- Git
- Pipeline
- Blue Ocean
- Docker
- Credentials Binding
- SSH Agent

### 5. Integración con Git

1. Crear nuevo job tipo Freestyle
2. En "Source Code Management":
   - Seleccionar Git
   - Repo URL: `https://github.com/tu-usuario/tu-repo.git`
3. Añadir trigger de build por cambios en Git

---

## **Nivel Intermedio**

### 6. Pipelines con Jenkinsfile

**Conceptos clave:**

- Declarative vs Scripted Pipeline
- Stages y Steps
- Agent types

**Ejemplo básico:**

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Compilando proyecto...'
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                echo 'Ejecutando tests...'
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Desplegando...'
                sh 'scp target/*.jar user@server:/app'
            }
        }
    }
}
```

### 7. Manejo de Variables y Credenciales

**Variables de entorno:**

```groovy
environment {
    VERSION = '1.0.0'
    DEPLOY_ENV = 'production'
}
```

**Uso de credenciales:**

```groovy
withCredentials([usernamePassword(
    credentialsId: 'aws-creds',
    usernameVariable: 'AWS_USER',
    passwordVariable: 'AWS_PASSWORD'
)]) {
    sh 'aws configure --profile myprofile'
}
```

### 8. Integración con Docker

**Pipeline con Docker:**

```groovy
pipeline {
    agent none
    
    stages {
        stage('Build') {
            agent {
                docker 'maven:3.8.6-jdk-11'
            }
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('Test') {
            agent {
                docker 'openjdk:11-jre'
            }
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

### 9. Blue Ocean Interface

- Visualización gráfica de pipelines
- Depuración de errores
- Creación visual de pipelines

---

## **Nivel Avanzado**

### 10. Pipeline Avanzado con CI/CD Completo

```groovy
pipeline {
    agent any
    
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'qa', 'prod'],
            description: 'Selecciona entorno de despliegue'
        )
    }
    
    environment {
        REGISTRY = "my-docker-registry.com"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("${REGISTRY}/myapp:${IMAGE_TAG}")
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn verify -Pintegration'
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        
        stage('Deploy') {
            when {
                expression { params.ENVIRONMENT != 'prod' }
            }
            steps {
                sshagent(['deploy-key']) {
                    sh "scp target/*.jar ${params.ENVIRONMENT}-server:/app"
                }
            }
        }
        
        stage('Prod Approval') {
            when {
                expression { params.ENVIRONMENT == 'prod' }
            }
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    input message: 'Aprobar despliegue en Prod?', ok: 'Desplegar'
                }
                sshagent(['prod-key']) {
                    sh 'ansible-playbook deploy-prod.yml'
                }
            }
        }
    }
    
    post {
        always {
            junit '**/target/surefire-reports/*.xml'
            archiveArtifacts 'target/*.jar'
        }
        success {
            slackSend channel: '#ci-cd', message: "✅ Build ${env.BUILD_NUMBER} exitoso!"
        }
        failure {
            slackSend channel: '#ci-cd', message: "❌ Build ${env.BUILD_NUMBER} falló!"
        }
    }
}
```

### 11. Escalado con Jenkins Agents

**Configurar nodos:**

1. Ir a "Manage Jenkins > Manage Nodes and Clouds"
2. Click en "New Node"
3. Configurar:
   - Nombre: "linux-agent-01"
   - Ejecutores: 2
   - Directorio remoto: /home/jenkins/agent
   - Labels: linux, docker

**Conectar via SSH:**

```bash
ssh -i /path/to/key jenkins@master -p 22 -o StrictHostKeyChecking=no -J java -jar agent.jar
```

### 12. Optimización de Pipelines

**Técnicas avanzadas:**

- Uso de `parallel` para ejecución concurrente
- Caching de dependencias

```groovy
stage('Cache') {
    steps {
        cache(
            includes: '**/target/**',
            excludes: '',
            key: "maven-${env.JOB_NAME}-${env.GIT_COMMIT}"
        ) {
            sh 'mvn clean package'
        }
    }
}
```

- Reintentos inteligentes

```groovy
retry(3) {
    sh './deploy.sh'
}
```

### 13. Seguridad Avanzada

- Configurar RBAC (Role-Based Access Control)
- Encriptación de credenciales
- Auditoría de logs
- Hardening del servidor Jenkins

---

## **Herramientas Complementarias**

1. **Jenkins Configuration as Code (JCasC):**

```yaml
   jenkins:
     securityRealm:
       local:
         allowsSignup: false
     authorizationStrategy:
       globalMatrix:
         permissions:
           - "Overall/Administer:admin"
   ```

2. **Integración con:**
   - Kubernetes (Jenkins Operator)
   - Terraform
   - Ansible
   - Prometheus (monitoreo)

---

## **Práctica Final**

**Escenario:**

1. Crear pipeline que:
   - Clone repositorio de aplicación Node.js
   - Ejecute tests
   - Construya imagen Docker
   - Haga scan de seguridad con Trivy
   - Despliegue en Kubernetes (usando Helm)
   - Envíe notificación a Slack

**Solución guiada:**

1. Crear nuevo Pipeline
2. Usar este Jenkinsfile:

```groovy
pipeline {
    agent any
    
    environment {
        REGISTRY = "my-registry.io"
        KUBE_CONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/tu-usuario/node-app.git'
            }
        }
        
        stage('Test') {
            agent {
                docker 'node:18'
            }
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.build("${REGISTRY}/node-app:${env.BUILD_ID}")
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh 'trivy image ${REGISTRY}/node-app:${env.BUILD_ID}'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'helm upgrade --install my-app ./chart'
                }
            }
        }
    }
    
    post {
        always {
            slackSend(color: '#36a64f', message: "Pipeline completado: ${currentBuild.currentResult}")
        }
    }
}
```

---

## **Troubleshooting Común**

1. **Problemas de conectividad:**

   - Verificar agentes online
   - Revisar logs en `/var/log/jenkins/jenkins.log`

2. **Fallos en builds:**

   - Usar `sh 'command || true'` para ignorar errores temporales
   - Implementar `timeout` en pasos críticos

3. **Problemas de memoria:**

   ```bash
   # Modificar /etc/default/jenkins
   JAVA_OPTS="-Xmx4g -XX:MaxPermSize=512m"
   ```

---

## **Recursos para Continuar Aprendiendo**

1. Libro: "Jenkins: The Definitive Guide"
2. Curso: "Mastering Jenkins" en Udemy
3. Jenkins Documentation oficial
4. Jenkins Community en GitHub
5. Jenkins YouTube Channel
