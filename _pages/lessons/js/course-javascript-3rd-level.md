---
layout: default
title: "JavaScript Moderno: Curso de nivel Avanzado"
description: "En el nivel avanzado de este curso de JavaScript moderno, dominarás conceptos avanzados como arquitecturas escalables, patrones de diseño, optimización de rendimiento, seguridad avanzada, testing E2E, integración continua y despliegue. Aprenderás a trabajar con frameworks modernos, APIs avanzadas, WebSockets, GraphQL y a implementar soluciones robustas y seguras para aplicaciones web de alta complejidad."
permalink: /lessons/js/course-javascript-3rd-level/
category: lessons
subcategory: "web development"
icon: 🚀
article: true
---

## Módulo 9: Testing y Debugging
*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites
- Completar módulos 1-8
- Conocer Node.js básico
- Familiaridad con npm
- Entender manejo de errores

### 🎯 Objetivos del Módulo
- Implementar pruebas unitarias con Jest
- Dominar técnicas de debugging
- Usar herramientas de testing modernas
- Aplicar TDD en desarrollo

---

### 📖 Testing con Jest

#### Configuración Básica
```javascript
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}

// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

#### Pruebas Unitarias Básicas
```javascript
// calculadora.js
export function sumar(a, b) {
    return a + b;
}

export function restar(a, b) {
    return a - b;
}

// calculadora.test.js
import { sumar, restar } from './calculadora';

describe('Calculadora', () => {
    test('suma dos números correctamente', () => {
        expect(sumar(2, 3)).toBe(5);
        expect(sumar(-1, 1)).toBe(0);
        expect(sumar(0, 0)).toBe(0);
    });

    test('resta dos números correctamente', () => {
        expect(restar(5, 3)).toBe(2);
        expect(restar(1, 1)).toBe(0);
        expect(restar(0, 5)).toBe(-5);
    });
});
```

#### Testing Asíncrono
```javascript
// api.js
export async function obtenerUsuario(id) {
    const response = await fetch(`/api/usuarios/${id}`);
    if (!response.ok) throw new Error('Usuario no encontrado');
    return response.json();
}

// api.test.js
import { obtenerUsuario } from './api';

describe('API', () => {
    test('obtiene usuario correctamente', async () => {
        const usuario = await obtenerUsuario(1);
        expect(usuario).toHaveProperty('id');
        expect(usuario).toHaveProperty('nombre');
    });

    test('maneja error cuando usuario no existe', async () => {
        await expect(obtenerUsuario(999))
            .rejects
            .toThrow('Usuario no encontrado');
    });
});
```

### 📖 Debugging Avanzado

#### Chrome DevTools
```javascript
// Debugging en el navegador
function encontrarError() {
    debugger; // Punto de interrupción
    let suma = 0;
    for (let i = 0; i < 10; i++) {
        suma += i;
        console.log('Iteración:', i, 'Suma:', suma);
    }
    return suma;
}

// Console API avanzada
console.table([{a: 1, b: 2}, {a: 3, b: 4}]);
console.time('bucle');
for(let i = 0; i < 1000000; i++) {}
console.timeEnd('bucle');
console.trace('traza de la pila');
```

#### Performance Testing
```javascript
// Medición de rendimiento
function medirTiempo(fn) {
    const inicio = performance.now();
    fn();
    const fin = performance.now();
    console.log(`Tiempo de ejecución: ${fin - inicio}ms`);
}

// Ejemplo de uso
medirTiempo(() => {
    // Código a medir
    const arr = new Array(1000000).fill(0);
    arr.map(x => x + 1);
});
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: TDD para Validador
```javascript
// validador.test.js
describe('Validador', () => {
    test('valida email correctamente', () => {
        expect(validarEmail('test@example.com')).toBe(true);
        expect(validarEmail('invalid.email')).toBe(false);
    });

    test('valida contraseña correctamente', () => {
        expect(validarPassword('Abc123!')).toBe(true);
        expect(validarPassword('weak')).toBe(false);
    });
});

// validador.js
export function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarPassword(password) {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
}
```

#### Ejercicio 2: Mocking de API
```javascript
// usuarios.test.js
import { obtenerUsuarios } from './usuarios';

jest.mock('./api');

describe('Usuarios Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('obtiene y procesa usuarios correctamente', async () => {
        const mockUsuarios = [
            { id: 1, nombre: 'Ana' },
            { id: 2, nombre: 'Luis' }
        ];

        api.obtenerUsuarios.mockResolvedValue(mockUsuarios);

        const resultado = await obtenerUsuarios();
        expect(resultado).toHaveLength(2);
        expect(api.obtenerUsuarios).toHaveBeenCalledTimes(1);
    });
});
```

### 💡 Mini Proyecto: Sistema de Testing E2E

```javascript
// test-utils.js
export class TestHelper {
    static async esperarElemento(selector, timeout = 5000) {
        const inicio = Date.now();
        
        while (Date.now() - inicio < timeout) {
            const elemento = document.querySelector(selector);
            if (elemento) return elemento;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        throw new Error(`Elemento ${selector} no encontrado después de ${timeout}ms`);
    }

    static async simularClick(selector) {
        const elemento = await this.esperarElemento(selector);
        elemento.click();
        return new Promise(resolve => setTimeout(resolve, 100));
    }

    static async simularInput(selector, valor) {
        const elemento = await this.esperarElemento(selector);
        elemento.value = valor;
        elemento.dispatchEvent(new Event('input'));
        elemento.dispatchEvent(new Event('change'));
        return new Promise(resolve => setTimeout(resolve, 100));
    }
}

// formulario.test.js
describe('Formulario de Registro', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="registro">
                <input type="email" id="email">
                <input type="password" id="password">
                <button type="submit">Registrar</button>
            </form>
        `;
    });

    test('envía formulario correctamente', async () => {
        await TestHelper.simularInput('#email', 'test@example.com');
        await TestHelper.simularInput('#password', 'Abc123!');
        await TestHelper.simularClick('button[type="submit"]');

        // Verificar resultado
        const mensaje = await TestHelper.esperarElemento('.mensaje-exito');
        expect(mensaje.textContent).toContain('Registro exitoso');
    });
});
```

## Módulo 10: Optimización y Rendimiento
*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites
- Completar módulos 1-9
- Conocimiento de herramientas de desarrollo del navegador
- Entender el ciclo de vida de una aplicación web
- Familiaridad con bundlers (webpack, vite, etc.)

### 🎯 Objetivos del Módulo
- Optimizar el rendimiento de aplicaciones JavaScript
- Implementar técnicas de lazy loading
- Minimizar el impacto en memoria
- Mejorar tiempos de carga y ejecución

---

### 📖 Optimización de Código

#### Memory Management
```javascript
// Identificar memory leaks
let datosGrandes = null;

function cargarDatos() {
    datosGrandes = new Array(1000000);
    // Usar WeakMap para referencias débiles
    const cache = new WeakMap();
    
    // Limpiar cuando no se necesite
    function limpiar() {
        datosGrandes = null;
    }
}

// Evitar closures innecesarios
function crearFunciones() {
    const funciones = [];
    
    // ❌ Mal: Cada función mantiene su propio 'i'
    for(var i = 0; i < 10; i++) {
        funciones.push(function() { return i; });
    }
    
    // ✅ Bien: Usar let o const
    for(let i = 0; i < 10; i++) {
        funciones.push(function() { return i; });
    }
    
    return funciones;
}
```

#### Lazy Loading
```javascript
// Lazy loading de módulos
async function cargarComponente() {
    const { Componente } = await import('./Componente.js');
    return new Componente();
}

// Lazy loading de imágenes
function observarImagenes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]')
        .forEach(img => observer.observe(img));
}
```

#### Event Debouncing y Throttling
```javascript
// Debouncing
function debounce(fn, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Throttling
function throttle(fn, limit) {
    let inThrottle;
    
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Ejemplo de uso
const buscarDebounced = debounce((texto) => {
    console.log('Buscando:', texto);
}, 300);

const scrollThrottled = throttle(() => {
    console.log('Scroll event');
}, 100);

window.addEventListener('scroll', scrollThrottled);
```

### 📖 Optimización del DOM

#### Virtual DOM Simple
```javascript
class VirtualDOM {
    static createElement(type, props, ...children) {
        return { type, props, children };
    }

    static render(vnode, container) {
        if (typeof vnode === 'string' || typeof vnode === 'number') {
            container.appendChild(document.createTextNode(vnode));
            return;
        }

        const element = document.createElement(vnode.type);

        if (vnode.props) {
            Object.entries(vnode.props).forEach(([name, value]) => {
                if (name.startsWith('on')) {
                    element.addEventListener(
                        name.toLowerCase().slice(2),
                        value
                    );
                } else {
                    element.setAttribute(name, value);
                }
            });
        }

        vnode.children.forEach(child => 
            this.render(child, element)
        );

        container.appendChild(element);
    }
}

// Ejemplo de uso
const vdom = VirtualDOM.createElement('div', { class: 'container' },
    VirtualDOM.createElement('h1', null, 'Título'),
    VirtualDOM.createElement('p', null, 'Contenido')
);

VirtualDOM.render(vdom, document.body);
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Optimización de Lista
```javascript
class ListaVirtual {
    constructor(container, items, itemHeight = 30) {
        this.container = container;
        this.items = items;
        this.itemHeight = itemHeight;
        this.visibleItems = Math.ceil(container.clientHeight / itemHeight);
        this.startIndex = 0;
        this.setup();
    }

    setup() {
        this.container.style.overflow = 'auto';
        this.container.style.position = 'relative';
        
        const totalHeight = this.items.length * this.itemHeight;
        this.container.innerHTML = `
            <div style="height: ${totalHeight}px;">
                <div class="items-container"></div>
            </div>
        `;
        
        this.itemsContainer = this.container
            .querySelector('.items-container');
        
        this.container.addEventListener('scroll', 
            this.handleScroll.bind(this));
        
        this.renderVisibleItems();
    }

    handleScroll() {
        const scrollTop = this.container.scrollTop;
        this.startIndex = Math.floor(scrollTop / this.itemHeight);
        this.renderVisibleItems();
    }

    renderVisibleItems() {
        const start = this.startIndex;
        const end = start + this.visibleItems + 2;
        
        this.itemsContainer.style.transform = 
            `translateY(${start * this.itemHeight}px)`;
        
        this.itemsContainer.innerHTML = this.items
            .slice(start, end)
            .map((item, index) => `
                <div style="height: ${this.itemHeight}px;">
                    ${item}
                </div>
            `)
            .join('');
    }
}

// Uso
const items = Array.from({ length: 10000 }, 
    (_, i) => `Item ${i + 1}`);

new ListaVirtual(
    document.querySelector('.lista-container'),
    items
);
```

### 💡 Mini Proyecto: Image Gallery con Lazy Loading

```javascript
class GaleriaOptimizada {
    constructor(container, imagenes) {
        this.container = container;
        this.imagenes = imagenes;
        this.imagenesCache = new Map();
        this.setup();
    }

    setup() {
        this.container.innerHTML = this.imagenes
            .map((img, index) => `
                <div class="imagen-container">
                    <img 
                        data-src="${img.url}"
                        alt="${img.alt}"
                        loading="lazy"
                        class="imagen"
                    >
                </div>
            `)
            .join('');

        this.observarImagenes();
        this.setupLightbox();
    }

    observarImagenes() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.cargarImagen(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '50px'
            }
        );

        this.container
            .querySelectorAll('img[data-src]')
            .forEach(img => observer.observe(img));
    }

    async cargarImagen(img) {
        const src = img.dataset.src;
        
        if (!this.imagenesCache.has(src)) {
            this.imagenesCache.set(src, new Promise((resolve) => {
                const image = new Image();
                image.onload = () => resolve(src);
                image.src = src;
            }));
        }

        try {
            await this.imagenesCache.get(src);
            img.src = src;
            img.classList.add('cargada');
        } catch (error) {
            console.error('Error cargando imagen:', error);
            img.src = 'placeholder.jpg';
        }
    }

    setupLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);

        this.container.addEventListener('click', (e) => {
            if (e.target.matches('.imagen')) {
                this.mostrarEnLightbox(e.target.src);
            }
        });

        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('activo');
        });
    }

    mostrarEnLightbox(src) {
        const lightbox = document.querySelector('.lightbox');
        lightbox.innerHTML = `<img src="${src}">`;
        lightbox.classList.add('activo');
    }
}

// Estilos CSS necesarios
const styles = `
.imagen-container {
    margin: 10px;
    overflow: hidden;
}

.imagen {
    width: 100%;
    height: 200px;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s;
}

.imagen.cargada {
    opacity: 1;
}

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
}

.lightbox.activo {
    display: flex;
}

.lightbox img {
    max-width: 90%;
    max-height: 90%;
}
`;

// Uso
const imagenes = [
    { url: 'img1.jpg', alt: 'Imagen 1' },
    { url: 'img2.jpg', alt: 'Imagen 2' },
    // ... más imágenes
];

new GaleriaOptimizada(
    document.querySelector('.galeria'),
    imagenes
);
```

## Módulo 11: Seguridad y Buenas Prácticas
*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites
- Completar módulos 1-10
- Conocimiento básico de HTTP/HTTPS
- Entender conceptos de seguridad web
- Familiaridad con tokens y autenticación

### 🎯 Objetivos del Módulo
- Implementar prácticas de seguridad web
- Prevenir vulnerabilidades comunes
- Proteger datos sensibles
- Aplicar principios de código seguro

---

### 📖 Seguridad Básica

#### Sanitización de Datos
```javascript
class Sanitizador {
    static limpiarHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    static limpiarURL(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.toString();
        } catch {
            return '';
        }
    }

    static limpiarJSON(str) {
        try {
            const obj = JSON.parse(str);
            return JSON.stringify(obj);
        } catch {
            return '{}';
        }
    }
}

// Uso
const textoUsuario = '<script>alert("XSS")</script>';
console.log(Sanitizador.limpiarHTML(textoUsuario));
```

#### Prevención de XSS
```javascript
class VistaSegura {
    static renderizar(contenedor, datos) {
        // Usar textContent en lugar de innerHTML
        contenedor.textContent = datos;
    }

    static crearElemento(tag, contenido, atributos = {}) {
        const elemento = document.createElement(tag);
        elemento.textContent = contenido;

        // Validar atributos permitidos
        const permitidos = ['class', 'id', 'href', 'src'];
        Object.entries(atributos).forEach(([key, value]) => {
            if (permitidos.includes(key)) {
                elemento.setAttribute(key, value);
            }
        });

        return elemento;
    }
}

// Ejemplo de uso
const contenido = VistaSegura.crearElemento('p', 
    'Contenido seguro', 
    { class: 'texto', onclick: 'alert(1)' } // onclick será ignorado
);
```

#### CSRF Protection
```javascript
class CSRFProtection {
    static generarToken() {
        return crypto.randomUUID();
    }

    static configurarHeaders() {
        return {
            'X-CSRF-Token': this.obtenerToken(),
            'Content-Type': 'application/json'
        };
    }

    static verificarToken(token) {
        return token === this.obtenerToken();
    }

    static obtenerToken() {
        return document.querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');
    }
}

// Uso en peticiones
async function enviarDatosSeguro(url, datos) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: CSRFProtection.configurarHeaders(),
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) throw new Error('Error en la petición');
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 📖 Buenas Prácticas de Seguridad

#### Validación de Entrada
```javascript
class ValidadorEntrada {
    static email(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static contraseña(password) {
        // Mínimo 8 caracteres, una mayúscula, un número y un carácter especial
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return regex.test(password);
    }

    static numeroTelefono(telefono) {
        const regex = /^\+?[\d\s-]{10,}$/;
        return regex.test(telefono);
    }

    static url(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}

// Uso
const formulario = {
    email: 'usuario@ejemplo.com',
    contraseña: 'Segura123!',
    telefono: '+1234567890'
};

Object.entries(formulario).forEach(([campo, valor]) => {
    if (ValidadorEntrada[campo]?.(valor)) {
        console.log(`${campo} válido`);
    } else {
        console.log(`${campo} inválido`);
    }
});
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Formulario Seguro
```javascript
class FormularioSeguro {
    constructor(formularioId) {
        this.form = document.getElementById(formularioId);
        this.configurar();
    }

    configurar() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validar()) {
                this.enviar();
            }
        });
    }

    validar() {
        const datos = new FormData(this.form);
        let valido = true;

        // Validar cada campo
        for (let [campo, valor] of datos.entries()) {
            if (!this.validarCampo(campo, valor)) {
                this.mostrarError(campo);
                valido = false;
            }
        }

        return valido;
    }

    validarCampo(campo, valor) {
        switch (campo) {
            case 'email':
                return ValidadorEntrada.email(valor);
            case 'password':
                return ValidadorEntrada.contraseña(valor);
            case 'telefono':
                return ValidadorEntrada.numeroTelefono(valor);
            default:
                return valor.length > 0;
        }
    }

    mostrarError(campo) {
        const elemento = this.form.querySelector(`[name="${campo}"]`);
        elemento.classList.add('error');
        
        const mensaje = document.createElement('span');
        mensaje.className = 'error-mensaje';
        mensaje.textContent = `${campo} inválido`;
        
        elemento.parentNode.appendChild(mensaje);
    }

    async enviar() {
        const datos = new FormData(this.form);
        try {
            const response = await enviarDatosSeguro(
                this.form.action,
                Object.fromEntries(datos)
            );
            this.mostrarExito(response);
        } catch (error) {
            this.mostrarError('form', 'Error al enviar el formulario');
        }
    }
}

// Uso
new FormularioSeguro('registro-form');
```

### 💡 Mini Proyecto: Sistema de Autenticación Seguro

```javascript
class SistemaAutenticacion {
    constructor() {
        this.token = null;
        this.usuario = null;
    }

    async iniciarSesion(email, password) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error('Credenciales inválidas');

            const data = await response.json();
            this.establecerSesion(data);
            return true;
        } catch (error) {
            console.error('Error de autenticación:', error);
            throw error;
        }
    }

    establecerSesion(data) {
        this.token = data.token;
        this.usuario = data.usuario;
        
        // Guardar token de forma segura
        sessionStorage.setItem('auth_token', this.token);
        
        // Configurar interceptor para requests
        this.configurarInterceptor();
    }

    configurarInterceptor() {
        // Agregar token a todas las peticiones
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            if (typeof args[1] === 'object') {
                if (!args[1].headers) {
                    args[1].headers = {};
                }
                args[1].headers['Authorization'] = `Bearer ${this.token}`;
            }
            try {
                const response = await originalFetch(...args);
                if (response.status === 401) {
                    // Token expirado o inválido
                    this.cerrarSesion();
                    throw new Error('Sesión expirada');
                }
                return response;
            } catch (error) {
                console.error('Error en petición:', error);
                throw error;
            }
        };
    }

    cerrarSesion() {
        this.token = null;
        this.usuario = null;
        sessionStorage.removeItem('auth_token');
        window.location.href = '/login';
    }

    verificarAutenticacion() {
        const token = sessionStorage.getItem('auth_token');
        if (!token) {
            throw new Error('No autenticado');
        }
        return true;
    }

    obtenerUsuario() {
        if (!this.verificarAutenticacion()) {
            return null;
        }
        return this.usuario;
    }
}

// Uso del sistema de autenticación
const auth = new SistemaAutenticacion();

document.getElementById('login-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await auth.iniciarSesion(email, password);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error de login:', error);
        }
    });
```

## Módulo 12: Frameworks y Herramientas Modernas
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-11
- Conocimiento de npm y node
- Familiaridad con bundlers
- Entender módulos ES6

### 🎯 Objetivos del Módulo
- Comprender los principales frameworks modernos
- Configurar entornos de desarrollo profesionales
- Implementar herramientas de build y bundling
- Optimizar el flujo de desarrollo

---

### 📖 Herramientas de Desarrollo

#### Package Managers y Scripts
```json
// package.json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src --fix",
    "format": "prettier --write src",
    "test": "vitest"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "vite": "^4.5.0",
    "eslint": "^8.53.0",
    "prettier": "^3.0.3",
    "vitest": "^0.34.6"
  }
}
```

#### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'prefer-const': 'error'
    }
};
```

#### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        minify: 'terser',
        sourcemap: true
    },
    server: {
        port: 3000,
        open: true
    }
});
```

### 📖 Frameworks Modernos

#### React Básico
```jsx
// App.jsx
import { useState, useEffect } from 'react';

function App() {
    const [contador, setContador] = useState(0);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('/api/usuarios')
            .then(res => res.json())
            .then(data => setUsuarios(data));
    }, []);

    return (
        <div>
            <h1>Contador: {contador}</h1>
            <button onClick={() => setContador(c => c + 1)}>
                Incrementar
            </button>
            
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>{usuario.nombre}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
```

#### Vue Básico
```vue
<!-- App.vue -->
<template>
    <div>
        <h1>Contador: {{ contador }}</h1>
        <button @click="incrementar">
            Incrementar
        </button>
        
        <ul>
            <li v-for="usuario in usuarios" :key="usuario.id">
                {{ usuario.nombre }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contador: 0,
            usuarios: []
        }
    },
    methods: {
        incrementar() {
            this.contador++
        }
    },
    async mounted() {
        const res = await fetch('/api/usuarios')
        this.usuarios = await res.json()
    }
}
</script>
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Configuración de Proyecto
```bash
# 1. Inicializar proyecto
mkdir mi-proyecto
cd mi-proyecto
npm init -y

# 2. Instalar dependencias
npm install vite @vitejs/plugin-react react react-dom
npm install -D eslint prettier

# 3. Crear estructura de archivos
mkdir src
touch src/index.html src/main.jsx src/App.jsx
touch .eslintrc.js .prettierrc
```

#### Ejercicio 2: Componente Reutilizable
```jsx
// Button.jsx
function Button({ variant = 'primary', children, onClick }) {
    const styles = {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        outline: 'border-2 border-blue-500'
    };

    return (
        <button 
            className={`px-4 py-2 rounded ${styles[variant]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

// Uso
function App() {
    return (
        <div>
            <Button onClick={() => alert('Primario')}>
                Botón Primario
            </Button>
            <Button variant="secondary">
                Botón Secundario
            </Button>
        </div>
    );
}
```

### 💡 Mini Proyecto: Panel de Admin con React

```jsx
// AdminPanel.jsx
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from './components';

function AdminPanel() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        try {
            const res = await fetch('/api/usuarios');
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    }

    async function guardarUsuario(datos) {
        try {
            const url = usuarioEditando 
                ? `/api/usuarios/${usuarioEditando.id}`
                : '/api/usuarios';
                
            const method = usuarioEditando ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            if (!res.ok) throw new Error('Error guardando usuario');

            await cargarUsuarios();
            setModalAbierto(false);
            setUsuarioEditando(null);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function eliminarUsuario(id) {
        if (!confirm('¿Estás seguro?')) return;

        try {
            const res = await fetch(`/api/usuarios/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Error eliminando usuario');

            await cargarUsuarios();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl">Panel de Administración</h1>
                <Button 
                    onClick={() => setModalAbierto(true)}
                >
                    Nuevo Usuario
                </Button>
            </div>

            <Table
                data={usuarios}
                columns={[
                    { key: 'nombre', label: 'Nombre' },
                    { key: 'email', label: 'Email' },
                    { key: 'rol', label: 'Rol' }
                ]}
                actions={[
                    {
                        label: 'Editar',
                        onClick: (usuario) => {
                            setUsuarioEditando(usuario);
                            setModalAbierto(true);
                        }
                    },
                    {
                        label: 'Eliminar',
                        onClick: (usuario) => eliminarUsuario(usuario.id)
                    }
                ]}
            />

            <Modal
                isOpen={modalAbierto}
                onClose={() => {
                    setModalAbierto(false);
                    setUsuarioEditando(null);
                }}
            >
                <Form
                    initialValues={usuarioEditando || {}}
                    onSubmit={guardarUsuario}
                    fields={[
                        {
                            name: 'nombre',
                            label: 'Nombre',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'email',
                            label: 'Email',
                            type: 'email',
                            required: true
                        },
                        {
                            name: 'rol',
                            label: 'Rol',
                            type: 'select',
                            options: [
                                { value: 'admin', label: 'Administrador' },
                                { value: 'user', label: 'Usuario' }
                            ]
                        }
                    ]}
                />
            </Modal>
        </div>
    );
}

export default AdminPanel;
```

## Módulo 13: APIs y Servicios Web Modernos
*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites
- Completar módulos 1-12
- Conocimiento de HTTP/HTTPS
- Familiaridad con REST y JSON
- Entender autenticación y autorización

### 🎯 Objetivos del Módulo
- Crear y consumir APIs RESTful
- Implementar GraphQL
- Trabajar con WebSockets
- Manejar autenticación JWT

---

### 📖 REST APIs Avanzado

#### Cliente API Moderno
```javascript
class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            timeout: options.timeout || 5000
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);

        try {
            const response = await fetch(url, {
                ...this.options,
                ...options,
                headers: {
                    ...this.options.headers,
                    ...options.headers
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new APIError('Request failed', response.status, await response.json());
            }

            return response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

// Uso
const api = new APIClient('https://api.ejemplo.com', {
    headers: {
        'Authorization': 'Bearer token123'
    }
});

try {
    const usuarios = await api.get('/usuarios');
    console.log(usuarios);
} catch (error) {
    console.error('Error:', error.message);
}
```

### 📖 GraphQL Básico

```javascript
class GraphQLClient {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async query(query, variables = {}) {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        const { data, errors } = await response.json();

        if (errors) {
            throw new Error(errors[0].message);
        }

        return data;
    }
}

// Ejemplo de uso
const client = new GraphQLClient('https://api.ejemplo.com/graphql');

const GET_USUARIO = `
    query GetUsuario($id: ID!) {
        usuario(id: $id) {
            id
            nombre
            email
            posts {
                id
                titulo
            }
        }
    }
`;

try {
    const { usuario } = await client.query(GET_USUARIO, { id: "123" });
    console.log(usuario);
} catch (error) {
    console.error('Error:', error.message);
}
```

### 📖 WebSockets

```javascript
class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.handlers = new Map();
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
            console.log('Conectado');
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);
            const handlers = this.handlers.get(type) || [];
            handlers.forEach(handler => handler(data));
        };

        this.ws.onclose = () => {
            console.log('Desconectado');
            this.reconnect();
        };

        this.ws.onerror = (error) => {
            console.error('Error:', error);
        };
    }

    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reintentando conexión... (${this.reconnectAttempts})`);
            setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
        }
    }

    on(type, handler) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, []);
        }
        this.handlers.get(type).push(handler);
    }

    off(type, handler) {
        if (this.handlers.has(type)) {
            const handlers = this.handlers.get(type);
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(type, data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, data }));
        }
    }
}

// Uso
const ws = new WebSocketClient('wss://api.ejemplo.com/ws');

ws.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
});

ws.on('notificacion', (data) => {
    console.log('Nueva notificación:', data);
});

// Enviar mensaje
ws.emit('mensaje', { texto: 'Hola mundo' });
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: API RESTful
```javascript
// Implementar un CRUD completo para recursos
class RecursoAPI {
    constructor(baseURL, recurso) {
        this.api = new APIClient(baseURL);
        this.recurso = recurso;
    }

    obtenerTodos(params = {}) {
        return this.api.get(`/${this.recurso}`, { params });
    }

    obtenerPorId(id) {
        return this.api.get(`/${this.recurso}/${id}`);
    }

    crear(datos) {
        return this.api.post(`/${this.recurso}`, datos);
    }

    actualizar(id, datos) {
        return this.api.put(`/${this.recurso}/${id}`, datos);
    }

    eliminar(id) {
        return this.api.delete(`/${this.recurso}/${id}`);
    }
}

// Uso
const usuariosAPI = new RecursoAPI('https://api.ejemplo.com', 'usuarios');

// CRUD operations
async function ejemploCRUD() {
    try {
        // Crear
        const nuevoUsuario = await usuariosAPI.crear({
            nombre: 'Ana',
            email: 'ana@email.com'
        });

        // Leer
        const usuarios = await usuariosAPI.obtenerTodos();
        const usuario = await usuariosAPI.obtenerPorId(nuevoUsuario.id);

        // Actualizar
        await usuariosAPI.actualizar(usuario.id, {
            nombre: 'Ana García'
        });

        // Eliminar
        await usuariosAPI.eliminar(usuario.id);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 💡 Mini Proyecto: Chat en Tiempo Real

```javascript
class ChatApp {
    constructor(wsURL, apiURL) {
        this.ws = new WebSocketClient(wsURL);
        this.api = new APIClient(apiURL);
        this.usuarios = new Map();
        this.mensajes = [];
        this.setup();
    }

    async setup() {
        await this.cargarUsuarios();
        this.configurarWebSocket();
        this.renderizarUI();
    }

    async cargarUsuarios() {
        try {
            const usuarios = await this.api.get('/usuarios');
            usuarios.forEach(usuario => {
                this.usuarios.set(usuario.id, usuario);
            });
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    }

    configurarWebSocket() {
        this.ws.on('mensaje', (mensaje) => {
            this.mensajes.push(mensaje);
            this.renderizarMensaje(mensaje);
        });

        this.ws.on('usuario_conectado', (usuario) => {
            this.usuarios.set(usuario.id, usuario);
            this.mostrarNotificacion(`${usuario.nombre} se ha conectado`);
        });

        this.ws.on('usuario_desconectado', (usuarioId) => {
            const usuario = this.usuarios.get(usuarioId);
            if (usuario) {
                this.usuarios.delete(usuarioId);
                this.mostrarNotificacion(`${usuario.nombre} se ha desconectado`);
            }
        });
    }

    renderizarUI() {
        const container = document.createElement('div');
        container.className = 'chat-container';

        container.innerHTML = `
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Escribe un mensaje...">
                <button>Enviar</button>
            </div>
        `;

        const input = container.querySelector('input');
        const button = container.querySelector('button');

        button.addEventListener('click', () => {
            const mensaje = input.value.trim();
            if (mensaje) {
                this.enviarMensaje(mensaje);
                input.value = '';
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });

        document.body.appendChild(container);
    }

    renderizarMensaje(mensaje) {
        const container = document.querySelector('.chat-messages');
        const usuario = this.usuarios.get(mensaje.usuarioId);
        
        const elementoMensaje = document.createElement('div');
        elementoMensaje.className = 'mensaje';
        elementoMensaje.innerHTML = `
            <strong>${usuario?.nombre || 'Anónimo'}:</strong>
            <span>${mensaje.texto}</span>
            <small>${new Date(mensaje.timestamp).toLocaleTimeString()}</small>
        `;

        container.appendChild(elementoMensaje);
        container.scrollTop = container.scrollHeight;
    }

    mostrarNotificacion(mensaje) {
        const container = document.querySelector('.chat-messages');
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        container.appendChild(notificacion);
        container.scrollTop = container.scrollHeight;
    }

    enviarMensaje(texto) {
        this.ws.emit('mensaje', {
            texto,
            timestamp: Date.now()
        });
    }
}

// Estilos CSS
const styles = `
.chat-container {
    width: 400px;
    height: 600px;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}

.mensaje {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 4px;
}

.notificacion {
    text-align: center;
    color: #666;
    margin: 0.5rem 0;
    font-style: italic;
}

.chat-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid #eee;
}

.chat-input input {
    flex: 1;
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.chat-input button {
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.chat-input button:hover {
    background: #0056b3;
}
`;

// Uso
const chat = new ChatApp(
    'wss://api.ejemplo.com/chat',
    'https://api.ejemplo.com'
);
```

## Módulo 14: Arquitectura y Patrones Avanzados
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-13
- Conocimiento sólido de patrones de diseño
- Experiencia con arquitecturas de software
- Familiaridad con sistemas distribuidos

### 🎯 Objetivos del Módulo
- Implementar arquitecturas escalables
- Aplicar patrones arquitectónicos modernos
- Diseñar sistemas modulares y mantenibles
- Gestionar estado complejo en aplicaciones

---

### 📖 Arquitecturas Modernas

#### Clean Architecture
```javascript
// Estructura de carpetas recomendada
/*
src/
├── domain/           // Reglas de negocio y entidades
│   ├── entities/
│   ├── useCases/
│   └── repositories/
├── infrastructure/   // Implementaciones concretas
│   ├── database/
│   ├── api/
│   └── services/
├── interfaces/       // Adaptadores
│   ├── controllers/
│   ├── presenters/
│   └── gateways/
└── application/     // Casos de uso específicos
    ├── dto/
    └── services/
*/

// Ejemplo de Entity
class Usuario {
    constructor(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }

    validar() {
        if (!this.email.includes('@')) {
            throw new Error('Email inválido');
        }
    }
}

// Ejemplo de UseCase
class CrearUsuarioUseCase {
    constructor(usuarioRepository, emailService) {
        this.usuarioRepository = usuarioRepository;
        this.emailService = emailService;
    }

    async execute(userData) {
        const usuario = new Usuario(
            crypto.randomUUID(),
            userData.nombre,
            userData.email
        );

        usuario.validar();

        await this.usuarioRepository.save(usuario);
        await this.emailService.enviarBienvenida(usuario.email);

        return usuario;
    }
}
```

#### Arquitectura Hexagonal (Ports & Adapters)
```javascript
// Puertos (Interfaces)
class UsuarioRepository {
    save(usuario) { throw new Error('Not implemented'); }
    findById(id) { throw new Error('Not implemented'); }
}

class EmailService {
    enviar(to, subject, body) { throw new Error('Not implemented'); }
}

// Adaptadores
class MongoUsuarioRepository extends UsuarioRepository {
    constructor(mongoClient) {
        super();
        this.mongoClient = mongoClient;
    }

    async save(usuario) {
        const collection = this.mongoClient.db().collection('usuarios');
        await collection.insertOne(usuario);
    }

    async findById(id) {
        const collection = this.mongoClient.db().collection('usuarios');
        return collection.findOne({ id });
    }
}

class SendgridEmailService extends EmailService {
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
    }

    async enviar(to, subject, body) {
        // Implementación con Sendgrid
    }
}

// Aplicación
class AplicacionUsuarios {
    constructor(usuarioRepository, emailService) {
        this.usuarioRepository = usuarioRepository;
        this.emailService = emailService;
    }

    async registrarUsuario(datos) {
        const usuario = new Usuario(datos);
        await this.usuarioRepository.save(usuario);
        await this.emailService.enviar(
            usuario.email,
            'Bienvenido',
            'Gracias por registrarte'
        );
    }
}
```

### 📖 Patrones Arquitectónicos

#### Event-Driven Architecture
```javascript
class EventBus {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set());
        }
        this.subscribers.get(event).add(callback);
    }

    publish(event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(callback => {
                callback(data);
            });
        }
    }
}

// Uso en la aplicación
class OrdenService {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    crearOrden(orden) {
        // Lógica para crear orden
        this.eventBus.publish('orden.creada', orden);
    }
}

class NotificacionService {
    constructor(eventBus) {
        eventBus.subscribe('orden.creada', this.manejarOrdenCreada.bind(this));
    }

    manejarOrdenCreada(orden) {
        // Enviar notificación
        console.log(`Orden ${orden.id} creada`);
    }
}
```

#### CQRS (Command Query Responsibility Segregation)
```javascript
// Commands
class CrearUsuarioCommand {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

// Queries
class ObtenerUsuarioQuery {
    constructor(id) {
        this.id = id;
    }
}

// Command Handler
class CrearUsuarioHandler {
    constructor(writeDb) {
        this.writeDb = writeDb;
    }

    async handle(command) {
        const usuario = {
            id: crypto.randomUUID(),
            nombre: command.nombre,
            email: command.email
        };

        await this.writeDb.usuarios.insert(usuario);
        return usuario.id;
    }
}

// Query Handler
class ObtenerUsuarioHandler {
    constructor(readDb) {
        this.readDb = readDb;
    }

    async handle(query) {
        return this.readDb.usuarios.findById(query.id);
    }
}

// Bus de comandos
class CommandBus {
    constructor() {
        this.handlers = new Map();
    }

    register(commandType, handler) {
        this.handlers.set(commandType.name, handler);
    }

    async dispatch(command) {
        const handler = this.handlers.get(command.constructor.name);
        if (!handler) {
            throw new Error(`No handler for ${command.constructor.name}`);
        }
        return handler.handle(command);
    }
}
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Implementar Repository Pattern
```javascript
// Definir interface
class Repository {
    create(entity) { throw new Error('Not implemented'); }
    update(id, entity) { throw new Error('Not implemented'); }
    delete(id) { throw new Error('Not implemented'); }
    findById(id) { throw new Error('Not implemented'); }
    findAll() { throw new Error('Not implemented'); }
}

// Implementar para diferentes bases de datos
class MongoRepository extends Repository {
    constructor(collection) {
        super();
        this.collection = collection;
    }

    async create(entity) {
        return this.collection.insertOne(entity);
    }

    // Implementar otros métodos...
}

class PostgresRepository extends Repository {
    constructor(pool, table) {
        super();
        this.pool = pool;
        this.table = table;
    }

    async create(entity) {
        const query = `INSERT INTO ${this.table} SET ?`;
        return this.pool.query(query, entity);
    }

    // Implementar otros métodos...
}
```

### 💡 Mini Proyecto: Sistema de E-commerce

```javascript
// Implementación completa en el repositorio del curso
class Ecommerce {
    constructor(
        productRepository,
        orderRepository,
        userRepository,
        eventBus
    ) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }

    async createOrder(userId, items) {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('Usuario no encontrado');

        const order = {
            id: crypto.randomUUID(),
            userId,
            items,
            status: 'pending',
            createdAt: new Date()
        };

        await this.orderRepository.create(order);
        this.eventBus.publish('order.created', order);

        return order;
    }

    // Implementar otros métodos...
}
```

## Módulo 15: PWA y Características Web Modernas
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-14
- Conocimiento de HTTP/HTTPS
- Entender el ciclo de vida de aplicaciones web
- Familiaridad con caché y almacenamiento web

### 🎯 Objetivos del Módulo
- Implementar Progressive Web Apps (PWAs)
- Utilizar Service Workers efectivamente
- Manejar estados offline
- Implementar notificaciones push

---

### 📖 Service Workers

#### Registro e Instalación
```javascript
// sw.js
const CACHE_NAME = 'mi-app-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/images/logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

// Registro en la aplicación
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration.scope);
            })
            .catch(error => {
                console.error('Error al registrar SW:', error);
            });
    });
}
```

#### Estrategias de Caché
```javascript
// Cache First Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});

// Network First Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
```

### 📖 Web Workers

```javascript
// worker.js
self.addEventListener('message', (e) => {
    const { data } = e;
    
    switch (data.type) {
        case 'PROCESAR_DATOS':
            const resultado = procesarDatosIntensivos(data.payload);
            self.postMessage({ type: 'RESULTADO', payload: resultado });
            break;
    }
});

function procesarDatosIntensivos(datos) {
    // Simulación de procesamiento pesado
    return datos.map(item => item * 2);
}

// Uso en la aplicación
class WorkerManager {
    constructor() {
        this.worker = new Worker('worker.js');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.worker.onmessage = (e) => {
            const { type, payload } = e.data;
            switch (type) {
                case 'RESULTADO':
                    this.manejarResultado(payload);
                    break;
            }
        };

        this.worker.onerror = (error) => {
            console.error('Error en worker:', error);
        };
    }

    procesarDatos(datos) {
        this.worker.postMessage({
            type: 'PROCESAR_DATOS',
            payload: datos
        });
    }

    manejarResultado(resultado) {
        console.log('Resultado procesado:', resultado);
    }

    terminar() {
        this.worker.terminate();
    }
}
```

### 📖 Notificaciones Push

```javascript
class NotificacionManager {
    constructor() {
        this.publicKey = 'TU_CLAVE_PUBLICA_VAPID';
    }

    async solicitarPermiso() {
        const permiso = await Notification.requestPermission();
        if (permiso !== 'granted') {
            throw new Error('Permiso de notificaciones denegado');
        }
        return this.suscribirse();
    }

    async suscribirse() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.publicKey)
        });

        return this.enviarSuscripcionAlServidor(subscription);
    }

    async enviarSuscripcionAlServidor(subscription) {
        const response = await fetch('/api/suscripciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
        });

        if (!response.ok) {
            throw new Error('Error al guardar suscripción');
        }

        return subscription;
    }

    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

// Service Worker: Manejo de notificaciones push
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
            fechaCreacion: Date.now(),
            url: 'https://ejemplo.com'
        },
        actions: [
            {
                action: 'explorar',
                title: 'Ver más'
            },
            {
                action: 'cerrar',
                title: 'Cerrar'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Mi App', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explorar') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Implementar Modo Offline
```javascript
class OfflineManager {
    constructor() {
        this.db = null;
        this.initDB();
    }

    async initDB() {
        const request = indexedDB.open('OfflineDB', 1);

        request.onerror = () => {
            console.error('Error al abrir DB');
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const store = db.createObjectStore('pendientes', {
                keyPath: 'id',
                autoIncrement: true
            });
            store.createIndex('tipo', 'tipo');
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
        };
    }

    async guardarOperacionPendiente(operacion) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['pendientes'], 'readwrite');
            const store = transaction.objectStore('pendientes');
            const request = store.add(operacion);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async sincronizar() {
        const pendientes = await this.obtenerPendientes();
        for (const operacion of pendientes) {
            try {
                await this.ejecutarOperacion(operacion);
                await this.eliminarOperacion(operacion.id);
            } catch (error) {
                console.error('Error al sincronizar:', error);
            }
        }
    }

    async ejecutarOperacion(operacion) {
        const response = await fetch('/api/sincronizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(operacion)
        });

        if (!response.ok) {
            throw new Error('Error al sincronizar operación');
        }
    }
}
```

### 💡 Mini Proyecto: PWA para Blog

```javascript
// app.js
class BlogPWA {
    constructor() {
        this.offlineManager = new OfflineManager();
        this.notificacionManager = new NotificacionManager();
        this.setupUI();
        this.cargarPosts();
    }

    async setupUI() {
        const container = document.querySelector('#blog-container');
        
        // Botón de instalación
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            const installBtn = document.createElement('button');
            installBtn.textContent = 'Instalar App';
            installBtn.onclick = () => e.prompt();
            container.prepend(installBtn);
        });

        // Botón de notificaciones
        const notifyBtn = document.createElement('button');
        notifyBtn.textContent = 'Activar Notificaciones';
        notifyBtn.onclick = () => this.notificacionManager.solicitarPermiso();
        container.prepend(notifyBtn);
    }

    async cargarPosts() {
        try {
            const posts = await this.obtenerPosts();
            this.renderizarPosts(posts);
        } catch (error) {
            console.error('Error cargando posts:', error);
            this.mostrarError('Error al cargar posts');
        }
    }

    async obtenerPosts() {
        try {
            const response = await fetch('/api/posts');
            return response.json();
        } catch (error) {
            // Si estamos offline, usar caché
            const cache = await caches.open(CACHE_NAME);
            const response = await cache.match('/api/posts');
            if (response) return response.json();
            throw error;
        }
    }

    renderizarPosts(posts) {
        const container = document.querySelector('#posts');
        container.innerHTML = posts
            .map(post => `
                <article class="post">
                    <h2>${post.titulo}</h2>
                    <p>${post.extracto}</p>
                    <button onclick="blog.guardarParaLeerDespues(${post.id})">
                        Guardar
                    </button>
                </article>
            `)
            .join('');
    }

    async guardarParaLeerDespues(postId) {
        await this.offlineManager.guardarOperacionPendiente({
            tipo: 'GUARDAR_POST',
            postId
        });
        this.mostrarMensaje('Post guardado para leer después');
    }

    mostrarMensaje(mensaje) {
        const div = document.createElement('div');
        div.className = 'mensaje';
        div.textContent = mensaje;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }

    mostrarError(mensaje) {
        const div = document.createElement('div');
        div.className = 'error';
        div.textContent = mensaje;
        document.body.appendChild(div);
    }
}

// Estilos CSS
const styles = `
.post {
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.mensaje {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    background: #4CAF50;
    color: white;
    border-radius: 4px;
    animation: slideIn 0.3s ease-out;
}

.error {
    background: #f44336;
}

@keyframes slideIn {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
`;

// Inicializar
const blog = new BlogPWA();
```

## Módulo 16: CI/CD y DevOps para JavaScript
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-15
- Conocimiento básico de Git
- Familiaridad con línea de comandos
- Entender conceptos de integración continua

### 🎯 Objetivos del Módulo
- Implementar pipelines de CI/CD
- Configurar entornos automatizados
- Gestionar despliegues seguros
- Monitorear aplicaciones en producción

---

### 📖 Configuración de CI/CD

#### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Aquí irían los comandos de despliegue
```

#### Docker Configuration

```yaml
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
      - API_URL=https://api.example.com
```

### 📖 Automatización de Pruebas

#### Jest Configuration

```yaml
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/index.js'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
```

#### E2E Testing con Cypress

```javascript
// cypress/e2e/login.cy.js
describe('Login Flow', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should login successfully', () => {
        cy.get('[data-test="email-input"]')
            .type('user@example.com');
        
        cy.get('[data-test="password-input"]')
            .type('password123');
        
        cy.get('[data-test="login-button"]')
            .click();
        
        cy.url().should('include', '/dashboard');
        cy.get('[data-test="welcome-message"]')
            .should('contain', 'Welcome');
    });

    it('should show error on invalid credentials', () => {
        cy.get('[data-test="email-input"]')
            .type('invalid@example.com');
        
        cy.get('[data-test="password-input"]')
            .type('wrongpassword');
        
        cy.get('[data-test="login-button"]')
            .click();
        
        cy.get('[data-test="error-message"]')
            .should('be.visible')
            .and('contain', 'Invalid credentials');
    });
});
```

### 📖 Monitoreo y Logging

#### Winston Logger Setup

```javascript
// logger.js
import winston from 'winston';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error' 
        }),
        new winston.transports.File({ 
            filename: 'combined.log' 
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

```

#### Performance Monitoring

```javascript
// monitoring.js
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }

    startTimer(label) {
        this.metrics.set(label, performance.now());
    }

    endTimer(label) {
        const startTime = this.metrics.get(label);
        if (!startTime) return;

        const duration = performance.now() - startTime;
        logger.info(`Performance: ${label}`, { 
            duration,
            timestamp: new Date(),
            label
        });

        this.metrics.delete(label);
        return duration;
    }

    trackMemory() {
        const used = process.memoryUsage();
        logger.info('Memory Usage', {
            heapTotal: used.heapTotal / 1024 / 1024,
            heapUsed: used.heapUsed / 1024 / 1024,
            external: used.external / 1024 / 1024,
            timestamp: new Date()
        });
    }
}

export const monitor = new PerformanceMonitor();
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Pipeline Automatizado

```javascript
// scripts/deploy.js
const { exec } = require('child_process');
const fs = require('fs').promises;

async function deploy() {
    try {
        // Verificar tests
        await executeCommand('npm test');
        
        // Build
        await executeCommand('npm run build');
        
        // Verificar archivos necesarios
        await validateBuild();
        
        // Desplegar
        await executeCommand('firebase deploy');
        
        console.log('Despliegue exitoso!');
    } catch (error) {
        console.error('Error en el despliegue:', error);
        process.exit(1);
    }
}

async function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando ${command}:`, stderr);
                reject(error);
                return;
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
}

async function validateBuild() {
    const files = await fs.readdir('./dist');
    const required = ['index.html', 'main.js', 'style.css'];
    
    for (const file of required) {
        if (!files.includes(file)) {
            throw new Error(`Archivo requerido ${file} no encontrado`);
        }
    }
}

deploy();
```

### 💡 Mini Proyecto: Sistema de Despliegue Automatizado

```javascript
// deploymentSystem.js
class DeploymentSystem {
    constructor(config) {
        this.config = config;
        this.steps = [];
        this.hooks = new Map();
    }

    addStep(name, fn) {
        this.steps.push({ name, fn });
    }

    addHook(event, fn) {
        if (!this.hooks.has(event)) {
            this.hooks.set(event, []);
        }
        this.hooks.get(event).push(fn);
    }

    async executeHooks(event, data) {
        const hooks = this.hooks.get(event) || [];
        for (const hook of hooks) {
            await hook(data);
        }
    }

    async deploy() {
        try {
            await this.executeHooks('beforeDeploy', {
                timestamp: new Date(),
                config: this.config
            });

            for (const step of this.steps) {
                console.log(`Ejecutando paso: ${step.name}`);
                await step.fn(this.config);
                
                await this.executeHooks('afterStep', {
                    step: step.name,
                    timestamp: new Date()
                });
            }

            await this.executeHooks('afterDeploy', {
                success: true,
                timestamp: new Date()
            });

            console.log('Despliegue completado exitosamente');
        } catch (error) {
            console.error('Error en el despliegue:', error);
            
            await this.executeHooks('onError', {
                error,
                timestamp: new Date()
            });
            
            throw error;
        }
    }
}

// Uso del sistema
const deploymentSystem = new DeploymentSystem({
    environment: 'production',
    region: 'us-east-1',
    version: '1.0.0'
});

// Configurar pasos
deploymentSystem.addStep('validate', async (config) => {
    // Validar configuración
});

deploymentSystem.addStep('build', async (config) => {
    // Construir aplicación
});

deploymentSystem.addStep('test', async (config) => {
    // Ejecutar pruebas
});

deploymentSystem.addStep('deploy', async (config) => {
    // Desplegar a producción
});

// Configurar hooks
deploymentSystem.addHook('beforeDeploy', async (data) => {
    logger.info('Iniciando despliegue', data);
});

deploymentSystem.addHook('afterDeploy', async (data) => {
    logger.info('Despliegue completado', data);
    // Notificar al equipo
});

deploymentSystem.addHook('onError', async (data) => {
    logger.error('Error en el despliegue', data);
    // Notificar al equipo de errores
});

// Ejecutar despliegue
deploymentSystem.deploy()
    .then(() => console.log('Proceso completado'))
    .catch(error => console.error('Proceso fallido:', error));
```

## Módulo 17: Rendimiento y Optimización Avanzada
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-16
- Conocimiento de DevTools y profiling
- Familiaridad con métricas de rendimiento
- Entender el ciclo de vida del navegador

### 🎯 Objetivos del Módulo
- Optimizar Core Web Vitals
- Implementar técnicas de renderizado eficiente
- Reducir tiempo de carga inicial
- Mejorar la experiencia del usuario

---

### 📖 Core Web Vitals

#### Performance Metrics Monitor
```javascript
class PerformanceMetrics {
    constructor() {
        this.metrics = {};
        this.observers = new Set();
    }

    observe() {
        // Largest Contentful Paint
        new PerformanceObserver((entries) => {
            const lcp = entries.getEntries().at(-1);
            this.updateMetric('LCP', lcp.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((entries) => {
            const fid = entries.getEntries()[0];
            this.updateMetric('FID', fid.processingStart - fid.startTime);
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((entries) => {
            let cls = 0;
            entries.getEntries().forEach(entry => {
                cls += entry.value;
            });
            this.updateMetric('CLS', cls);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    updateMetric(name, value) {
        this.metrics[name] = value;
        this.notifyObservers();
    }

    addObserver(callback) {
        this.observers.add(callback);
    }

    notifyObservers() {
        this.observers.forEach(callback => callback(this.metrics));
    }
}

// Uso
const metrics = new PerformanceMetrics();
metrics.observe();

metrics.addObserver((metrics) => {
    console.log('Core Web Vitals:', metrics);
});
````

### 📚 Virtual List Rendering

```javascript
class VirtualList {
    constructor(container, items, options = {}) {
        this.container = container;
        this.items = items;
        this.options = {
            itemHeight: options.itemHeight || 50,
            overscan: options.overscan || 5,
            ...options
        };
        
        this.visibleItems = Math.ceil(container.clientHeight / this.options.itemHeight);
        this.totalHeight = items.length * this.options.itemHeight;
        this.startIndex = 0;
        
        this.setupContainer();
        this.render();
        this.attachEvents();
    }

    setupContainer() {
        this.container.style.position = 'relative';
        this.container.style.overflow = 'auto';
        
        this.content = document.createElement('div');
        this.content.style.height = `${this.totalHeight}px`;
        this.content.style.position = 'relative';
        
        this.container.appendChild(this.content);
    }

    render() {
        const start = Math.max(0, this.startIndex - this.options.overscan);
        const end = Math.min(
            this.items.length,
            this.startIndex + this.visibleItems + this.options.overscan
        );

        const fragment = document.createDocumentFragment();
        
        for (let i = start; i < end; i++) {
            const item = this.renderItem(this.items[i], i);
            item.style.position = 'absolute';
            item.style.top = `${i * this.options.itemHeight}px`;
            item.style.width = '100%';
            fragment.appendChild(item);
        }

        this.content.innerHTML = '';
        this.content.appendChild(fragment);
    }

    renderItem(data, index) {
        const div = document.createElement('div');
        div.style.height = `${this.options.itemHeight}px`;
        div.textContent = data.toString();
        return div;
    }

    attachEvents() {
        this.container.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const newIndex = Math.floor(
                    this.container.scrollTop / this.options.itemHeight
                );
                
                if (newIndex !== this.startIndex) {
                    this.startIndex = newIndex;
                    this.render();
                }
            });
        });
    }
}
```

### 🌐 Router

```javascript
// router.js
const routes = {
    '/': () => import('./pages/Home'),
    '/about': () => import('./pages/About'),
    '/dashboard': () => import('./pages/Dashboard')
};

class Router {
    constructor(container) {
        this.container = container;
        this.currentComponent = null;
        
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const route = routes[path];

        if (route) {
            try {
                const module = await route();
                const Component = module.default;
                
                if (this.currentComponent) {
                    this.currentComponent.destroy?.();
                }
                
                this.currentComponent = new Component(this.container);
                this.currentComponent.render();
            } catch (error) {
                console.error('Error loading route:', error);
            }
        }
    }
}
```

### 📦 Bundle Analyzer

```javascript
// utils.js
export function analyzeBundle() {
    const usedExports = new Set();
    const unusedExports = new Set();

    // Analizar imports en el código
    function scanImports(sourceCode) {
        const importRegex = /import\s+{([^}]+)}\s+from/g;
        let match;

        while ((match = importRegex.exec(sourceCode)) !== null) {
            const imports = match[1].split(',')
                .map(s => s.trim())
                .filter(Boolean);
            
            imports.forEach(name => usedExports.add(name));
        }
    }

    // Analizar exports
    function scanExports(sourceCode) {
        const exportRegex = /export\s+(?:const|let|function|class)\s+(\w+)/g;
        let match;

        while ((match = exportRegex.exec(sourceCode)) !== null) {
            const exportName = match[1];
            if (!usedExports.has(exportName)) {
                unusedExports.add(exportName);
            }
        }
    }

    return {
        getUnusedExports() {
            return Array.from(unusedExports);
        },
        
        analyzeFile(sourceCode) {
            scanImports(sourceCode);
            scanExports(sourceCode);
        }
    };
}
```

### 🖼️ Image Optimizer

```javascript
class ImageOptimizer {
    constructor(options = {}) {
        this.options = {
            quality: options.quality || 0.8,
            maxWidth: options.maxWidth || 1200,
            format: options.format || 'webp',
            ...options
        };
    }

    async optimize(file) {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Redimensionar si es necesario
        let { width, height } = bitmap;
        if (width > this.options.maxWidth) {
            const ratio = this.options.maxWidth / width;
            width = this.options.maxWidth;
            height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(bitmap, 0, 0, width, height);

        // Convertir a formato optimizado
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => resolve(blob),
                `image/${this.options.format}`,
                this.options.quality
            );
        });
    }

    async processMultiple(files) {
        const results = [];
        
        for (const file of files) {
            try {
                const optimized = await this.optimize(file);
                results.push({
                    original: file,
                    optimized,
                    success: true
                });
            } catch (error) {
                results.push({
                    original: file,
                    error,
                    success: false
                });
            }
        }

        return results;
    }
}
```

### 📊 Performance Dashboard

```javascript
class PerformanceDashboard {
    constructor(container) {
        this.container = container;
        this.metrics = new PerformanceMetrics();
        this.charts = new Map();
        this.setup();
    }

    setup() {
        this.createLayout();
        this.initializeCharts();
        this.startMonitoring();
    }

    createLayout() {
        this.container.innerHTML = `
            <div class="dashboard-grid">
                <div class="metric-card" id="lcp-chart">
                    <h3>Largest Contentful Paint</h3>
                    <div class="chart"></div>
                </div>
                <div class="metric-card" id="fid-chart">
                    <h3>First Input Delay</h3>
                    <div class="chart"></div>
                </div>
                <div class="metric-card" id="cls-chart">
                    <h3>Cumulative Layout Shift</h3>
                    <div class="chart"></div>
                </div>
                <div class="metric-card" id="memory-chart">
                    <h3>Memory Usage</h3>
                    <div class="chart"></div>
                </div>
            </div>
        `;
    }

    initializeCharts() {
        ['LCP', 'FID', 'CLS', 'Memory'].forEach(metric => {
            const chartContainer = this.container
                .querySelector(`#${metric.toLowerCase()}-chart .chart`);
            
            this.charts.set(metric, this.createChart(chartContainer, {
                title: metric,
                yAxis: {
                    title: this.getMetricUnit(metric)
                }
            }));
        });
    }

    getMetricUnit(metric) {
        switch (metric) {
            case 'LCP':
            case 'FID':
                return 'milliseconds';
            case 'CLS':
                return 'score';
            case 'Memory':
                return 'MB';
            default:
                return '';
        }
    }

    startMonitoring() {
        this.metrics.observe();
        this.metrics.addObserver((metrics) => {
            this.updateCharts(metrics);
        });

        // Monitorear memoria
        setInterval(() => {
            const memory = performance.memory;
            this.updateMemoryChart(memory);
        }, 1000);
    }

    updateCharts(metrics) {
        Object.entries(metrics).forEach(([metric, value]) => {
            const chart = this.charts.get(metric);
            if (chart) {
                this.updateChartData(chart, value);
            }
        });
    }

    updateMemoryChart(memory) {
        const usedHeap = memory.usedJSHeapSize / 1024 / 1024;
        const chart = this.charts.get('Memory');
        this.updateChartData(chart, usedHeap);
    }

    updateChartData(chart, value) {
        const now = new Date();
        chart.data.push({
            timestamp: now,
            value: value
        });

        // Mantener solo los últimos 60 segundos
        const sixtySecondsAgo = now - 60000;
        chart.data = chart.data.filter(point => 
            point.timestamp > sixtySecondsAgo
        );

        this.renderChart(chart);
    }

    createChart(container, options) {
        return {
            container,
            options,
            data: []
        };
    }

    renderChart(chart) {
        // Implementar visualización del gráfico
        // (usando librería de gráficos como Chart.js)
    }
}

// Estilos
const styles = `
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.metric-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1rem;
}

.metric-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: #333;
}

.chart {
    height: 200px;
    width: 100%;
}
`;

// Uso
const dashboard = new PerformanceDashboard(
```

## Módulo 18: Seguridad Avanzada
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-17
- Conocimiento de criptografía básica
- Entender protocolos de seguridad web
- Familiaridad con tokens y autenticación

### 🎯 Objetivos del Módulo
- Implementar autenticación avanzada
- Proteger contra ataques comunes
- Manejar datos sensibles de forma segura
- Aplicar mejores prácticas de seguridad

---

### 📖 Autenticación Avanzada

#### JWT Manager
```javascript
class JWTManager {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.algorithm = 'HS256';
    }

    async sign(payload, expiresIn = '1h') {
        const header = {
            alg: this.algorithm,
            typ: 'JWT'
        };

        const now = Math.floor(Date.now() / 1000);
        const exp = now + this.parseExpiration(expiresIn);

        const finalPayload = {
            ...payload,
            iat: now,
            exp
        };

        const base64Header = this.base64URLEncode(JSON.stringify(header));
        const base64Payload = this.base64URLEncode(JSON.stringify(finalPayload));

        const signature = await this.createSignature(
            `${base64Header}.${base64Payload}`
        );

        return `${base64Header}.${base64Payload}.${signature}`;
    }

    async verify(token) {
        try {
            const [headerB64, payloadB64, signatureB64] = token.split('.');

            const header = JSON.parse(this.base64URLDecode(headerB64));
            const payload = JSON.parse(this.base64URLDecode(payloadB64));

            // Verificar firma
            const expectedSignature = await this.createSignature(
                `${headerB64}.${payloadB64}`
            );

            if (signatureB64 !== expectedSignature) {
                throw new Error('Invalid signature');
            }

            // Verificar expiración
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                throw new Error('Token expired');
            }

            return payload;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async createSignature(data) {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(this.secretKey),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign(
            'HMAC',
            key,
            encoder.encode(data)
        );

        return this.arrayBufferToBase64URL(signature);
    }

    parseExpiration(expiresIn) {
        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) throw new Error('Invalid expiration format');

        const [, value, unit] = match;
        const multipliers = {
            s: 1,
            m: 60,
            h: 3600,
            d: 86400
        };

        return parseInt(value) * multipliers[unit];
    }

    base64URLEncode(str) {
        return btoa(str)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    base64URLDecode(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) str += '=';
        return atob(str);
    }

    arrayBufferToBase64URL(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
}
```

### 📖 Encriptación de Datos

#### Crypto Helper
```javascript
class CryptoHelper {
    static async generateKey(password, salt) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const saltBuffer = encoder.encode(salt);

        const key = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: 100000,
                hash: 'SHA-256'
            },
            key,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    static async encrypt(data, key) {
        const encoder = new TextEncoder();
        const iv = crypto.getRandomValues(new Uint8Array(12));

        const encrypted = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv
            },
            key,
            encoder.encode(JSON.stringify(data))
        );

        return {
            iv: Array.from(iv),
            data: Array.from(new Uint8Array(encrypted))
        };
    }

    static async decrypt(encryptedData, key) {
        const { iv, data } = encryptedData;
        
        const decrypted = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: new Uint8Array(iv)
            },
            key,
            new Uint8Array(data)
        );

        const decoder = new TextDecoder();
        return JSON.parse(decoder.decode(decrypted));
    }
}
```

### 📖 Protección contra Ataques

#### Security Headers Manager
```javascript
class SecurityHeaders {
    static getHeaders() {
        return {
            'Content-Security-Policy': this.getCSP(),
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': this.getPermissionsPolicy()
        };
    }

    static getCSP() {
        return [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self' https:",
            "media-src 'self'",
            "object-src 'none'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ].join('; ');
    }

    static getPermissionsPolicy() {
        return [
            'camera=()',
            'microphone=()',
            'geolocation=()',
            'payment=()',
            'usb=()',
            'fullscreen=(self)'
        ].join(', ');
    }
}
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Sistema de Autenticación 2FA
```javascript
class TwoFactorAuth {
    constructor() {
        this.secretLength = 20;
        this.codeLength = 6;
        this.timestep = 30;
    }

    generateSecret() {
        const bytes = crypto.getRandomValues(new Uint8Array(this.secretLength));
        return this.base32Encode(bytes);
    }

    generateTOTP(secret, time = Date.now()) {
        const counter = Math.floor(time / 1000 / this.timestep);
        return this.generateHOTP(secret, counter);
    }

    async generateHOTP(secret, counter) {
        const key = await this.importKey(this.base32Decode(secret));
        const counterBytes = new Uint8Array(8);
        for (let i = 7; i >= 0; i--) {
            counterBytes[i] = counter & 0xff;
            counter >>= 8;
        }

        const signature = await crypto.subtle.sign(
            'HMAC',
            key,
            counterBytes
        );

        const offset = new Uint8Array(signature)[19] & 0xf;
        const code = (
            ((signature[offset] & 0x7f) << 24) |
            ((signature[offset + 1] & 0xff) << 16) |
            ((signature[offset + 2] & 0xff) << 8) |
            (signature[offset + 3] & 0xff)
        ) % Math.pow(10, this.codeLength);

        return code.toString().padStart(this.codeLength, '0');
    }

    async verifyToken(token, secret) {
        const now = Date.now();
        // Verificar token actual y tokens adyacentes
        for (let i = -1; i <= 1; i++) {
            const generatedToken = await this.generateTOTP(
                secret,
                now + i * this.timestep * 1000
            );
            if (token === generatedToken) return true;
        }
        return false;
    }

    // Utilidades de codificación
    base32Encode(bytes) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let bits = 0;
        let value = 0;
        let output = '';

        for (let i = 0; i < bytes.length; i++) {
            value = (value << 8) | bytes[i];
            bits += 8;

            while (bits >= 5) {
                output += alphabet[(value >>> (bits - 5)) & 31];
                bits -= 5;
            }
        }

        if (bits > 0) {
            output += alphabet[(value << (5 - bits)) & 31];
        }

        return output;
    }

    base32Decode(str) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        str = str.toUpperCase();
        let bits = 0;
        let value = 0;
        const output = new Uint8Array(str.length * 5 / 8 | 0);
        let index = 0;

        for (let i = 0; i < str.length; i++) {
            value = (value << 5) | alphabet.indexOf(str[i]);
            bits += 5;

            if (bits >= 8) {
                output[index++] = (value >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }

        return output;
    }

    async importKey(secret) {
        return crypto.subtle.importKey(
            'raw',
            secret,
            { name: 'HMAC', hash: 'SHA-1' },
            false,
            ['sign']
        );
    }
}
```

### 💡 Mini Proyecto: Sistema de Autenticación Seguro

```javascript
class SecureAuthSystem {
    constructor() {
        this.jwtManager = new JWTManager(process.env.JWT_SECRET);
        this.twoFactorAuth = new TwoFactorAuth();
        this.cryptoHelper = CryptoHelper;
    }

    async register(username, password) {
        // Generar salt único
        const salt = crypto.getRandomValues(new Uint8Array(16));
        
        // Derivar clave de encriptación
        const key = await this.cryptoHelper.generateKey(password, salt);
        
        // Generar secreto 2FA
        const twoFactorSecret = this.twoFactorAuth.generateSecret();
        
        // Encriptar datos sensibles
        const encryptedData = await this.cryptoHelper.encrypt({
            twoFactorSecret,
            createdAt: Date.now()
        }, key);

        // Guardar usuario en base de datos
        const user = {
            username,
            salt: Array.from(salt),
            encryptedData,
            enabled2FA: false
        };

        // Retornar secreto 2FA para configuración
        return {
            user,
            twoFactorSecret
        };
    }

    async login(username, password, twoFactorToken = null) {
        // Obtener usuario de la base de datos
        const user = await this.getUser(username);
        if (!user) throw new Error('Usuario no encontrado');

        // Verificar contraseña y obtener datos
        const key = await this.cryptoHelper.generateKey(password, new Uint8Array(user.salt));
        const userData = await this.cryptoHelper.decrypt(user.encryptedData, key);

        // Verificar 2FA si está habilitado
        if (user.enabled2FA) {
            if (!twoFactorToken) {
                throw new Error('Se requiere token 2FA');
            }

            const isValidToken = await this.twoFactorAuth.verifyToken(
                twoFactorToken,
                userData.twoFactorSecret
            );

            if (!isValidToken) {
                throw new Error('Token 2FA inválido');
            }
        }

        // Generar token de sesión
        const token = await this.jwtManager.sign({
            sub: username,
            type: 'access'
        });

        // Generar token de refresco
        const refreshToken = await this.jwtManager.sign({
            sub: username,
            type: 'refresh'
        }, '7d');

        return {
            accessToken: token,
            refreshToken,
            user: {
                username,
                enabled2FA: user.enabled2FA
            }
        };
    }

    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtManager.verify(refreshToken);
            
            if (payload.type !== 'refresh') {
                throw new Error('Token inválido');
            }

            const newToken = await this.jwtManager.sign({
                sub: payload.sub,
                type: 'access'
            });

            return { accessToken: newToken };
        } catch (error) {
            throw new Error('Token de refresco inválido');
        }
    }

    async enable2FA(username, token) {
        const user = await this.getUser(username);
        if (!user) throw new Error('Usuario no encontrado');

        // Verificar token 2FA
        const isValidToken = await this.twoFactorAuth.verifyToken(
            token,
            user.twoFactorSecret
        );

        if (!isValidToken) {
            throw new Error('Token 2FA inválido');
        }

        // Actualizar usuario
        user.enabled2FA = true;
        // Guardar en base de datos

        return { success: true };
    }
}

// Estilos CSS para la interfaz
const styles = `
.auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    background: white;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.auth-input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.auth-button {
    padding: 0.75rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.auth-button:hover {
    background: #0056b3;
}

.auth-error {
    color: #dc3545;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 4px;
    background: #f8d7da;
}

.qr-container {
    text-align: center;
    margin: 1rem 0;
}

.qr-code {
    padding: 1rem;
    background: white;
    border-radius: 4px;
    display: inline-block;
}
`;

// Uso del sistema
const authSystem = new SecureAuthSystem();
```

## Módulo 19: Microservicios y Arquitecturas Distribuidas
*⏱️ Tiempo estimado: 10-12 horas*

### 📋 Prerequisites
- Completar módulos 1-18
- Conocimiento de arquitecturas distribuidas
- Familiaridad con Docker y contenedores
- Entender comunicación entre servicios

### 🎯 Objetivos del Módulo
- Implementar arquitecturas de microservicios
- Gestionar comunicación entre servicios
- Manejar fallos distribuidos
- Aplicar patrones de resiliencia

---

### 📖 Arquitectura de Microservicios

#### Service Registry
```javascript
class ServiceRegistry {
    constructor() {
        this.services = new Map();
        this.healthChecks = new Map();
    }

    register(serviceName, instance) {
        if (!this.services.has(serviceName)) {
            this.services.set(serviceName, new Set());
        }
        this.services.get(serviceName).add(instance);
        this.setupHealthCheck(serviceName, instance);
    }

    deregister(serviceName, instance) {
        const instances = this.services.get(serviceName);
        if (instances) {
            instances.delete(instance);
            this.cleanupHealthCheck(serviceName, instance);
        }
    }

    getInstance(serviceName) {
        const instances = Array.from(this.services.get(serviceName) || []);
        if (!instances.length) {
            throw new Error(`No instances available for ${serviceName}`);
        }
        // Round-robin simple
        return instances[Math.floor(Math.random() * instances.length)];
    }

    setupHealthCheck(serviceName, instance) {
        const check = setInterval(async () => {
            try {
                const response = await fetch(`${instance}/health`);
                if (!response.ok) {
                    this.deregister(serviceName, instance);
                }
            } catch {
                this.deregister(serviceName, instance);
            }
        }, 30000);

        this.healthChecks.set(`${serviceName}-${instance}`, check);
    }

    cleanupHealthCheck(serviceName, instance) {
        const key = `${serviceName}-${instance}`;
        clearInterval(this.healthChecks.get(key));
        this.healthChecks.delete(key);
    }
}
```

#### Circuit Breaker

```javascript
class CircuitBreaker {
    constructor(fn, options = {}) {
        this.fn = fn;
        this.options = {
            failureThreshold: options.failureThreshold || 5,
            resetTimeout: options.resetTimeout || 60000,
            ...options
        };

        this.state = 'CLOSED';
        this.failures = 0;
        this.lastFailureTime = null;
    }

    async execute(...args) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime >= this.options.resetTimeout) {
                this.state = 'HALF-OPEN';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }

        try {
            const result = await this.fn(...args);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    onSuccess() {
        this.failures = 0;
        this.state = 'CLOSED';
    }

    onFailure() {
        this.failures++;
        this.lastFailureTime = Date.now();

        if (this.failures >= this.options.failureThreshold) {
            this.state = 'OPEN';
        }
    }
}
```

### 📖 Patrones de Comunicación

#### Event Bus Distribuido

```javascript
class DistributedEventBus {
    constructor(options = {}) {
        this.subscribers = new Map();
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 1000;
    }

    async publish(topic, message) {
        const subscribers = this.subscribers.get(topic) || [];
        const promises = subscribers.map(subscriber =>
            this.deliverWithRetry(subscriber, message)
        );

        return Promise.allSettled(promises);
    }

    subscribe(topic, handler) {
        if (!this.subscribers.has(topic)) {
            this.subscribers.set(topic, []);
        }
        this.subscribers.get(topic).push(handler);

        return () => {
            const subs = this.subscribers.get(topic);
            const index = subs.indexOf(handler);
            if (index > -1) {
                subs.splice(index, 1);
            }
        };
    }

    async deliverWithRetry(handler, message, attempt = 1) {
        try {
            await handler(message);
        } catch (error) {
            if (attempt < this.retryAttempts) {
                await new Promise(resolve => 
                    setTimeout(resolve, this.retryDelay * attempt)
                );
                return this.deliverWithRetry(handler, message, attempt + 1);
            }
            throw error;
        }
    }
}
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: API Gateway

```javascript
class APIGateway {
    constructor(serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
        this.routeHandlers = new Map();
        this.circuitBreakers = new Map();
    }

    registerRoute(path, serviceName, options = {}) {
        const handler = async (req) => {
            const instance = this.serviceRegistry.getInstance(serviceName);
            const breaker = this.getCircuitBreaker(serviceName);

            return breaker.execute(() =>
                fetch(`${instance}${path}`, {
                    method: req.method,
                    headers: req.headers,
                    body: req.body
                })
            );
        };

        this.routeHandlers.set(path, handler);
    }

    getCircuitBreaker(serviceName) {
        if (!this.circuitBreakers.has(serviceName)) {
            this.circuitBreakers.set(
                serviceName,
                new CircuitBreaker(
                    (fn) => fn(),
                    { failureThreshold: 3, resetTimeout: 30000 }
                )
            );
        }
        return this.circuitBreakers.get(serviceName);
    }

    async handleRequest(req) {
        const handler = this.findHandler(req.path);
        if (!handler) {
            return {
                status: 404,
                body: { error: 'Not Found' }
            };
        }

        try {
            const response = await handler(req);
            return {
                status: response.status,
                headers: response.headers,
                body: await response.json()
            };
        } catch (error) {
            return {
                status: 500,
                body: { error: 'Service Unavailable' }
            };
        }
    }

    findHandler(path) {
        // Implementar búsqueda de rutas con patrones
        return this.routeHandlers.get(path);
    }
}
```

### 💡 Mini Proyecto: Sistema de Microservicios

```javascript
// Implementación de un sistema de microservicios básico
class MicroserviceSystem {
    constructor() {
        this.serviceRegistry = new ServiceRegistry();
        this.eventBus = new DistributedEventBus();
        this.gateway = new APIGateway(this.serviceRegistry);
        this.setupServices();
    }

    setupServices() {
        // Configurar rutas en el gateway
        this.gateway.registerRoute(
            '/users',
            'user-service',
            { timeout: 5000 }
        );

        this.gateway.registerRoute(
            '/orders',
            'order-service',
            { timeout: 10000 }
        );

        // Suscribirse a eventos
        this.eventBus.subscribe('order.created', async (order) => {
            await this.notifyUser(order);
            await this.updateInventory(order);
        });
    }

    async notifyUser(order) {
        const userService = this.serviceRegistry
            .getInstance('user-service');

        await fetch(`${userService}/notifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: order.userId,
                message: `Order ${order.id} created`
            })
        });
    }

    async updateInventory(order) {
        const inventoryService = this.serviceRegistry
            .getInstance('inventory-service');

        await fetch(`${inventoryService}/update-stock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order.items)
        });
    }

    async createOrder(orderData) {
        try {
            // Crear orden
            const response = await this.gateway
                .handleRequest({
                    path: '/orders',
                    method: 'POST',
                    body: orderData
                });

            if (response.status === 201) {
                // Publicar evento
                await this.eventBus.publish(
                    'order.created',
                    response.body
                );
                return response.body;
            }

            throw new Error('Failed to create order');
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}

// Ejemplo de uso
const system = new MicroserviceSystem();

// Registrar servicios
system.serviceRegistry.register(
    'user-service',
    'http://user-service:3001'
);
system.serviceRegistry.register(
    'order-service',
    'http://order-service:3002'
);
system.serviceRegistry.register(
    'inventory-service',
    'http://inventory-service:3003'
);

// Crear orden
system.createOrder({
    userId: 1,
    items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
    ]
}).then(order => {
    console.log('Order created:', order);
}).catch(error => {
    console.error('Error creating order:', error);
});
```
