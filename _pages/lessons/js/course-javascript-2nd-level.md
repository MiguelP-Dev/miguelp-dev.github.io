---
layout: default
title: "JavaScript Moderno: Curso de nivel Intermedio"
description: "En el nivel intermedio de este curso de JavaScript moderno, profundizarás en conceptos clave como la manipulación avanzada de arrays y objetos, el uso eficiente del DOM, la gestión de eventos y la programación asíncrona con Promesas y async/await. Aprenderás a aplicar patrones modernos de desarrollo, consumir APIs y crear interfaces dinámicas e interactivas, preparándote para afrontar proyectos web de mayor complejidad."
permalink: /lessons/js/course-javascript-2nd-level/
category: lessons
subcategory: "web development"
icon: 🚀
article: true
---

## Módulo 5: Objetos y Arrays Avanzados

*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites

- Completar Nivel Principiante
- Entender funciones y scope
- Conocer métodos básicos de arrays
- Familiaridad con objetos literales

### 🎯 Objetivos del Módulo

- Dominar manipulación avanzada de arrays
- Implementar patrones de diseño con objetos
- Usar métodos modernos de ES6+
- Aplicar destructuring y spread operator

---

### 📖 Arrays Avanzados

#### Métodos Funcionales

```javascript
const numeros = [1, 2, 3, 4, 5];

// map: transformar elementos
const duplicados = numeros.map(n => n * 2);
console.log(duplicados); // [2, 4, 6, 8, 10]

// filter: filtrar elementos
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4]

// reduce: acumular valores
const suma = numeros.reduce((acc, n) => acc + n, 0);
console.log(suma); // 15

// find: encontrar primer elemento que cumpla condición
const mayor3 = numeros.find(n => n > 3);
console.log(mayor3); // 4

// every: verificar si todos cumplen condición
const todosMenores10 = numeros.every(n => n < 10);
console.log(todosMenores10); // true

// some: verificar si alguno cumple condición
const algunMayor4 = numeros.some(n => n > 4);
console.log(algunMayor4); // true
```

#### Destructuring

```javascript
const persona = {
    nombre: "Ana",
    edad: 25,
    direccion: {
        calle: "Main St",
        numero: 123
    }
};

// Desestructuración simple
const { nombre, edad } = persona;
console.log(nombre, edad); // "Ana", 25

// Desestructuración anidada
const { direccion: { calle, numero } } = persona;
console.log(calle, numero); // "Main St", 123

// Asignación con destructuring
let a, b;
[a, b] = [1, 2];
console.log(a, b); // 1, 2

// Parámetros de función con destructuring
function mostrarDatos({ nombre, edad }) {
    console.log(`Nombre: ${nombre}, Edad: ${edad}`);
}
mostrarDatos(persona);
```

#### Spread y Rest Operator

```javascript
// Spread operator (...)
const numeros = [1, 2, 3];
const masNumeros = [4, 5, ...numeros, 6];
console.log(masNumeros); // [4, 5, 1, 2, 3, 6]

// Clonar un objeto
const persona = { nombre: "Ana", edad: 25 };
const copiaPersona = { ...persona };
console.log(copiaPersona); // { nombre: "Ana", edad: 25 }

// Rest operator (...) en funciones
function sumarTodo(...numeros) {
    return numeros.reduce((acum, n) => acum + n, 0);
}
console.log(sumarTodo(1, 2, 3, 4)); // 10
```

---

### 📖 Objetos Avanzados

#### Métodos y `this`

```javascript
const persona = {
    nombre: "Ana",
    edad: 25,
    saludar() {
        return `Hola, soy ${this.nombre}`;
    }
};

console.log(persona.saludar()); // "Hola, soy Ana"

// Problema común con setTimeout
setTimeout(function() {
    console.log(this); // undefined (en modo estricto) o window (en navegador)
}, 1000);

// Solución con arrow function
setTimeout(() => {
    console.log(this); // correcto, mantiene el contexto léxico
}, 1000);
```

#### Object.create y herencia

```javascript
const prototipo = {
    saludar() {
        return `Hola, soy ${this.nombre}`;
    }
};

const ana = Object.create(prototipo);
ana.nombre = "Ana";
ana.edad = 25;

console.log(ana.saludar()); // "Hola, soy Ana"

// Verificar herencia
console.log(ana.__proto__ === prototipo); // true
```

---

## Módulo 6: DOM y Manipulación de Eventos

*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites

- Completar módulos anteriores
- Entender objetos y arrays
- Conocimientos básicos de HTML/CSS
- Familiaridad con funciones callback

### 🎯 Objetivos del Módulo

- Dominar la manipulación del DOM
- Implementar manejo eficiente de eventos
- Crear interfaces dinámicas e interactivas
- Optimizar operaciones del DOM

### 📖 El Document Object Model (DOM)

#### Selección de Elementos

```javascript
// Métodos modernos de selección
const elemento = document.querySelector('.mi-clase');
const elementos = document.querySelectorAll('.mi-clase');
const porId = document.getElementById('mi-id');
const porClase = document.getElementsByClassName('mi-clase');

// Navegación por el DOM
const padre = elemento.parentElement;
const hijos = elemento.children;
const siguiente = elemento.nextElementSibling;
const anterior = elemento.previousElementSibling;

// Validación de elementos
console.log(elemento?.classList.contains('activo'));
```

#### Manipulación del DOM

```javascript
// Crear elementos
const div = document.createElement('div');
div.className = 'contenedor';
div.innerHTML = `
    <h2>Título Nuevo</h2>
    <p>Contenido del párrafo</p>
`;

// Modificar elementos
div.classList.add('destacado');
div.classList.remove('oculto');
div.classList.toggle('visible');
div.setAttribute('data-id', '123');
div.style.backgroundColor = '#f0f0f0';

// Insertar elementos
document.body.appendChild(div);
elemento.insertAdjacentHTML('beforeend', '<span>Nuevo texto</span>');

// Eliminar elementos
elemento.remove();
padre.removeChild(hijo);
```

#### Eventos y Event Delegation

```javascript
// Manejadores de eventos modernos
elemento.addEventListener('click', (e) => {
    console.log('Click detectado', e.target);
});

// Event delegation eficiente
document.querySelector('.lista').addEventListener('click', (e) => {
    if (e.target.matches('.item')) {
        console.log('Click en item:', e.target.textContent);
    }
});

// Prevenir comportamiento por defecto
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // Manejar envío del formulario
});
```

---

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Manipulación del DOM

```javascript
// 1. Crear un elemento <div> con clase "contenedor"
// 2. Dentro del div, agregar un <h2> y un <p> con texto
// 3. Agregar el div al final del <body>

// Tu código aquí:
const contenedor = document.createElement('div');
contenedor.className = 'contenedor';
contenedor.innerHTML = `
    <h2>Título del Contenedor</h2>
    <p>Este es un párrafo dentro del contenedor.</p>
`;

document.body.appendChild(contenedor);
```

#### Ejercicio 2: Eventos

```javascript
// HTML:
// <button id="mi-boton">Click me</button>
// <div id="resultado"></div>

// JavaScript:
// 1. Seleccionar el botón y el div de resultado
// 2. Agregar un evento 'click' al botón
// 3. En el manejador, cambiar el texto del div a "¡Hola, mundo!"

// Tu código aquí:
const boton = document.getElementById('mi-boton');
const resultado = document.getElementById('resultado');

boton.addEventListener('click', () => {
    resultado.textContent = "¡Hola, mundo!";
});
```

#### Ejercicio 3: Event Delegation

```javascript
// HTML:
// <ul class="lista">
//     <li class="item">Item 1</li>
//     <li class="item">Item 2</li>
//     <li class="item">Item 3</li>
// </ul>

// JavaScript:
// 1. Agregar un evento 'click' a la lista
// 2. En el manejador, verificar si el elemento clickeado es un item
// 3. Si es un item, mostrar su texto en la consola

// Tu código aquí:
document.querySelector('.lista').addEventListener('click', (e) => {
    if (e.target.matches('.item')) {
        console.log('Click en item:', e.target.textContent);
    }
});
```

---

### 💡 Mini Proyecto: Galería de Imágenes

Crea una galería de imágenes que permita:

- Ver imágenes en miniatura
- Ampliar imagen al hacer clic
- Navegar entre imágenes ampliadas

```html
<div class="galeria">
    <img src="img1_thumb.jpg" data-full="img1.jpg" alt="Imagen 1">
    <img src="img2_thumb.jpg" data-full="img2.jpg" alt="Imagen 2">
    <img src="img3_thumb.jpg" data-full="img3.jpg" alt="Imagen 3">
</div>

<div id="modal" class="modal">
    <span class="cerrar">&times;</span>
    <img class="modal-contenido" id="img-ampliada">
    <div id="caption"></div>
</div>
```

```javascript
// Obtener elementos
const galeria = document.querySelector('.galeria');
const modal = document.getElementById('modal');
const imgAmpliada = document.getElementById('img-ampliada');
const caption = document.getElementById('caption');

// Manejar clic en imágenes de la galería
galeria.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const src = e.target.dataset.full;
        const alt = e.target.alt;
        
        imgAmpliada.src = src;
        caption.textContent = alt;
        modal.style.display = "block";
    }
});

// Cerrar modal
modal.querySelector('.cerrar').addEventListener('click', () => {
    modal.style.display = "none";
});
```

## Módulo 7: Asincronía y APIs

*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites

- Completar módulos 1-6
- Entender callbacks y eventos
- Conocer JSON y estructuras de datos
- Familiaridad con peticiones HTTP

### 🎯 Objetivos del Módulo

- Dominar programación asíncrona
- Trabajar con Promesas y async/await
- Consumir APIs REST
- Manejar errores en operaciones asíncronas

---

### 📖 Fundamentos de Asincronía

#### Callbacks

```javascript
// Callback básico
function obtenerDatos(callback) {
    setTimeout(() => {
        const datos = { id: 1, nombre: "Ana" };
        callback(null, datos);
    }, 1000);
}

obtenerDatos((error, datos) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('Datos:', datos);
});

// Callback Hell (problema común)
obtenerUsuario(id, (error, usuario) => {
    if (error) return console.error(error);
    
    obtenerPosts(usuario.id, (error, posts) => {
        if (error) return console.error(error);
        
        obtenerComentarios(posts[0].id, (error, comentarios) => {
            if (error) return console.error(error);
            
            console.log(comentarios);
        });
    });
});
```

#### Promesas

```javascript
// Crear una promesa
const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = true;
        if (exito) {
            resolve({ id: 1, nombre: "Ana" });
        } else {
            reject(new Error("Algo salió mal"));
        }
    }, 1000);
});

// Usar promesas
promesa
    .then(datos => console.log('Éxito:', datos))
    .catch(error => console.error('Error:', error));

// Encadenar promesas
obtenerUsuario(id)
    .then(usuario => obtenerPosts(usuario.id))
    .then(posts => obtenerComentarios(posts[0].id))
    .then(comentarios => console.log(comentarios))
    .catch(error => console.error(error));
```

#### Async/Await

```javascript
// Función asíncrona
async function obtenerDatos() {
    try {
        const usuario = await obtenerUsuario(1);
        const posts = await obtenerPosts(usuario.id);
        const comentarios = await obtenerComentarios(posts[0].id);
        return comentarios;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Usar async/await
async function iniciar() {
    try {
        const resultado = await obtenerDatos();
        console.log(resultado);
    } catch (error) {
        console.error(error);
    }
}

// Ejecutar función asíncrona
iniciar();
```

### 📖 Trabajando con APIs

#### Fetch API

```javascript
// GET request
fetch('https://api.ejemplo.com/usuarios')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error de red');
        }
        return response.json();
    })
    .then(datos => console.log(datos))
    .catch(error => console.error('Error:', error));

// POST request
const nuevoUsuario = {
    nombre: "Ana",
    email: "ana@email.com"
};

fetch('https://api.ejemplo.com/usuarios', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoUsuario)
})
    .then(response => response.json())
    .then(usuario => console.log('Usuario creado:', usuario))
    .catch(error => console.error('Error:', error));
```

##### Async/Await con Fetch

```javascript
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://api.ejemplo.com/usuarios');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Promesas

```javascript
// Implementar una función que simule una operación asíncrona
function esperarTiempo(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Esperé ${ms}ms`);
        }, ms);
    });
}

// Usar Promise.all para operaciones paralelas
Promise.all([
    esperarTiempo(1000),
    esperarTiempo(2000),
    esperarTiempo(3000)
])
    .then(resultados => console.log(resultados))
    .catch(error => console.error(error));
```

#### Ejercicio 2: API REST

```javascript
// Crear un cliente para una API REST
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) throw new Error('Error en GET');
        return response.json();
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error en POST');
        return response.json();
    }
}

// Usar el cliente
const api = new APIClient('https://api.ejemplo.com');
api.get('/usuarios')
    .then(usuarios => console.log(usuarios))
    .catch(error => console.error(error));
```

### 💡 Mini Proyecto: Dashboard de Clima

```javascript
class WeatherDashboard {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.weatherapi.com/v1';
    }

    async obtenerClima(ciudad) {
        try {
            const response = await fetch(
                `${this.baseURL}/current.json?key=${this.apiKey}&q=${ciudad}`
            );
            
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            
            const data = await response.json();
            return this.formatearDatos(data);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    formatearDatos(data) {
        return {
            ciudad: data.location.name,
            pais: data.location.country,
            temperatura: data.current.temp_c,
            condicion: data.current.condition.text,
            icono: data.current.condition.icon
        };
    }

    async mostrarClima(ciudad) {
        try {
            const clima = await this.obtenerClima(ciudad);
            this.actualizarUI(clima);
        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    actualizarUI(clima) {
        const html = `
            <div class="clima-card">
                <h2>${clima.ciudad}, ${clima.pais}</h2>
                <img src="${clima.icono}" alt="${clima.condicion}">
                <p class="temperatura">${clima.temperatura}°C</p>
                <p class="condicion">${clima.condicion}</p>
            </div>
        `;

        document.getElementById('resultado').innerHTML = html;
    }

    mostrarError(mensaje) {
        document.getElementById('resultado').innerHTML = `
            <div class="error">
                <p>❌ ${mensaje}</p>
            </div>
        `;
    }
}

// Uso del dashboard
const dashboard = new WeatherDashboard('TU_API_KEY');

document.getElementById('buscar').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudad').value;
    if (ciudad) {
        dashboard.mostrarClima(ciudad);
    }
});
```
## Módulo 8: Patrones de Diseño y Buenas Prácticas
*⏱️ Tiempo estimado: 8-9 horas*

### 📋 Prerequisites
- Completar módulos 1-7
- Dominio de objetos y clases
- Experiencia con ES6+
- Conocimientos de programación orientada a objetos

### 🎯 Objetivos del Módulo
- Implementar patrones de diseño comunes
- Aplicar principios SOLID
- Optimizar rendimiento y mantenibilidad
- Escribir código modular y reutilizable

---

### 📖 Patrones de Diseño Fundamentales

#### Singleton Pattern
```javascript
class ConfiguracionApp {
    constructor() {
        if (ConfiguracionApp.instancia) {
            return ConfiguracionApp.instancia;
        }
        
        this.config = {
            tema: 'claro',
            idioma: 'es',
            notificaciones: true
        };
        
        ConfiguracionApp.instancia = this;
    }

    getConfig() {
        return this.config;
    }

    setConfig(key, value) {
        this.config[key] = value;
    }
}

// Uso
const config1 = new ConfiguracionApp();
const config2 = new ConfiguracionApp();
console.log(config1 === config2); // true
```

#### Factory Pattern
```javascript
class Usuario {
    constructor(tipo) {
        this.tipo = tipo;
        this.permisos = [];
    }
}

class UsuarioFactory {
    crearUsuario(tipo) {
        const usuario = new Usuario(tipo);
        
        switch(tipo) {
            case 'admin':
                usuario.permisos = ['crear', 'editar', 'eliminar', 'ver'];
                break;
            case 'editor':
                usuario.permisos = ['editar', 'ver'];
                break;
            case 'visitante':
                usuario.permisos = ['ver'];
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }
        
        return usuario;
    }
}

// Uso
const factory = new UsuarioFactory();
const admin = factory.crearUsuario('admin');
console.log(admin.permisos); // ['crear', 'editar', 'eliminar', 'ver']
```

#### Observer Pattern
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event]
                .filter(cb => cb !== callback);
        }
    }
}

// Uso
const notificador = new EventEmitter();

function mostrarNotificacion(mensaje) {
    console.log(`Notificación: ${mensaje}`);
}

notificador.on('mensaje', mostrarNotificacion);
notificador.emit('mensaje', '¡Hola mundo!');
```

### 📖 Principios SOLID

#### Single Responsibility Principle
```javascript
// ❌ Mal: Clase con múltiples responsabilidades
class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
    }
    
    guardarEnDB() { /* ... */ }
    generarReporte() { /* ... */ }
    enviarEmail() { /* ... */ }
}

// ✅ Bien: Separar responsabilidades
class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class UsuarioRepository {
    guardarUsuario(usuario) { /* ... */ }
}

class ReporteUsuario {
    generarReporte(usuario) { /* ... */ }
}

class EmailService {
    enviarEmail(destinatario, mensaje) { /* ... */ }
}
```

#### Open/Closed Principle
```javascript
// ❌ Mal: Modificar clase existente para nuevas funcionalidades
class Calculadora {
    calcular(num1, num2, operacion) {
        switch(operacion) {
            case 'suma': return num1 + num2;
            case 'resta': return num1 - num2;
            // Necesitamos modificar para agregar nuevas operaciones
        }
    }
}

// ✅ Bien: Extender sin modificar
class Operacion {
    ejecutar(num1, num2) {
        throw new Error('Método abstracto');
    }
}

class Suma extends Operacion {
    ejecutar(num1, num2) {
        return num1 + num2;
    }
}

class Resta extends Operacion {
    ejecutar(num1, num2) {
        return num1 - num2;
    }
}
```

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Implementar un Sistema de Plugins
```javascript
class PluginManager {
    constructor() {
        this.plugins = new Map();
    }

    registrar(nombre, plugin) {
        if (this.plugins.has(nombre)) {
            throw new Error(`Plugin ${nombre} ya existe`);
        }
        this.plugins.set(nombre, plugin);
    }

    ejecutar(nombre, ...args) {
        const plugin = this.plugins.get(nombre);
        if (!plugin) {
            throw new Error(`Plugin ${nombre} no encontrado`);
        }
        return plugin.ejecutar(...args);
    }
}

// Ejemplo de uso
class ValidadorPlugin {
    ejecutar(datos) {
        // Lógica de validación
        return datos.length > 0;
    }
}

class FormateadorPlugin {
    ejecutar(texto) {
        return texto.toLowerCase().trim();
    }
}

const manager = new PluginManager();
manager.registrar('validador', new ValidadorPlugin());
manager.registrar('formateador', new FormateadorPlugin());

console.log(manager.ejecutar('formateador', '  HOLA MUNDO  '));
```

### 💡 Mini Proyecto: Sistema de Carrito de Compras

```javascript
// Interfaces
class PrecioStrategy {
    calcular(productos) {
        throw new Error('Método abstracto');
    }
}

class PrecioRegular extends PrecioStrategy {
    calcular(productos) {
        return productos.reduce((total, p) => total + p.precio, 0);
    }
}

class PrecioDescuento extends PrecioStrategy {
    constructor(descuento) {
        super();
        this.descuento = descuento;
    }

    calcular(productos) {
        const subtotal = productos.reduce((total, p) => total + p.precio, 0);
        return subtotal * (1 - this.descuento);
    }
}

// Implementación del carrito
class CarritoCompras {
    constructor(precioStrategy) {
        this.productos = [];
        this.precioStrategy = precioStrategy;
        this.observers = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.notificarObservers('productoAgregado', producto);
    }

    eliminarProducto(id) {
        const index = this.productos.findIndex(p => p.id === id);
        if (index > -1) {
            const producto = this.productos.splice(index, 1)[0];
            this.notificarObservers('productoEliminado', producto);
        }
    }

    calcularTotal() {
        return this.precioStrategy.calcular(this.productos);
    }

    setPrecioStrategy(strategy) {
        this.precioStrategy = strategy;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notificarObservers(evento, data) {
        this.observers.forEach(observer => observer.actualizar(evento, data));
    }
}

// Observer para UI
class CarritoUI {
    actualizar(evento, data) {
        switch(evento) {
            case 'productoAgregado':
                console.log(`Agregado: ${data.nombre} - $${data.precio}`);
                break;
            case 'productoEliminado':
                console.log(`Eliminado: ${data.nombre}`);
                break;
        }
    }
}

// Ejemplo de uso
const carrito = new CarritoCompras(new PrecioRegular());
carrito.addObserver(new CarritoUI());

carrito.agregarProducto({ id: 1, nombre: 'Producto 1', precio: 100 });
carrito.agregarProducto({ id: 2, nombre: 'Producto 2', precio: 200 });

console.log('Total Regular:', carrito.calcularTotal());

carrito.setPrecioStrategy(new PrecioDescuento(0.1)); // 10% descuento
console.log('Total con Descuento:', carrito.calcularTotal());
```

#### Has terminado el curso? 🎉

Para profundizar en javascript puedes seguir el siguiente nivel de curso: [nivel avanzado del curso](/lessons/js/course-javascript-3rd-level/)