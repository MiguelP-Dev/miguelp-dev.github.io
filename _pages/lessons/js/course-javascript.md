---
layout: default
title: "JavaScript Moderno: Curso Completo"
description: "Domina JavaScript desde los fundamentos hasta temas avanzados"
permalink: /lessons/js/course-javascript/
category: lessons
subcategory: "web development"
icon: 📜
article: true
---

## ✨ Introducción al curso

Bienvenido a este curso de JavaScript. Aquí aprenderás desde los fundamentos hasta técnicas modernas para crear sitios y aplicaciones web interactivas y dinámicas.  
No necesitas conocimientos previos, solo curiosidad y un navegador.

**¿Qué encontrarás en este curso?**

- Explicaciones claras y ejemplos modernos.
- Ejercicios prácticos con soluciones explicadas.
- Proyectos finales para consolidar tus conocimientos.
- Buenas prácticas, accesibilidad y seguridad.
- Glosario y recursos recomendados.

---

## 📝 Glosario de términos clave

| Término         | Definición breve |
|-----------------|-----------------|
| Variable        | Espacio para almacenar datos. |
| Array           | Lista ordenada de valores. |
| Objeto          | Colección de pares clave-valor. |
| Función         | Bloque de código reutilizable. |
| Callback        | Función pasada como argumento. |
| Promesa         | Objeto para operaciones asíncronas. |
| DOM             | Modelo de objetos del documento HTML. |
| BOM             | Modelo de objetos del navegador. |
| Hoisting        | Elevación de declaraciones en JS. |
| Closure         | Función que recuerda su contexto. |

---

## 🦾 Buenas prácticas y patrones modernos

- Usa siempre `let` y `const` en vez de `var`.
- Prefiere funciones flecha para callbacks y funciones cortas.
- Nombra variables y funciones de forma descriptiva.
- Separa la lógica de negocio del manejo del DOM.
- Utiliza módulos ES6 para organizar el código.
- Aplica el principio DRY (Don't Repeat Yourself).
- Usa linters como ESLint para mantener el código limpio.
- Escribe pruebas unitarias para funciones importantes.

---

## ♿ Accesibilidad y seguridad

- Usa atributos `aria-*` y roles en HTML para mejorar la accesibilidad.
- Valida siempre los datos de entrada del usuario.
- Evita el uso de `innerHTML` con datos externos para prevenir XSS.
- Usa etiquetas semánticas (`<button>`, `<nav>`, `<main>`, etc.).
- Añade mensajes alternativos (`alt`) en imágenes.

---

## 🏋️‍♂️ Ejercicios prácticos

Al final de cada sección encontrarás ejercicios para practicar lo aprendido. ¡Intenta resolverlos antes de ver la solución!

---

## 1️⃣ Fundamentos de JavaScript

### Descripción

En esta sección aprenderás los conceptos básicos de JavaScript: qué es, cómo se usa, su sintaxis y las reglas fundamentales para escribir código limpio y funcional.

---

## 📖 ¿Qué es Javascript?

JavaScript (JS) es un lenguaje de programación interpretado, orientado a objetos y basado en prototipos. Se ejecuta principalmente en el navegador para dar interactividad a las páginas web, aunque también se usa en el servidor con Node.js.

### Ventajas

- Fácil de aprender.
- Se ejecuta directamente en el navegador.
- Gran comunidad y muchas herramientas.
- Compatible con todos los navegadores modernos.

---

## 📖 Formas de usar JavaScript

Puedes incluir JavaScript en una página web de varias formas:

```html
<!-- En línea -->
<button onclick="alert('Hola!')">Clic</button>

<!-- Dentro de etiquetas <script> -->
<script>
  console.log("Hola desde un script interno");
</script>

<!-- En un archivo externo -->
<script src="script.js"></script>
```

**Reglas:**

- Usa archivos externos para proyectos reales.
- Evita el código en línea salvo para ejemplos rápidos.
- Mantén el JS separado del HTML para mejor mantenimiento y seguridad.

---

### Recomendaciones para incluir JavaScript

- **En línea:** Úsalo solo para ejemplos simples o pruebas rápidas. No recomendado para proyectos reales, ya que dificulta el mantenimiento y la seguridad.
- **Script interno:** Útil para scripts pequeños o cuando el código es específico de una sola página. Mantén el código separado del HTML cuando sea posible.
- **Archivo externo:** Es la mejor práctica para proyectos reales. Permite reutilizar código, facilita el mantenimiento y mejora la organización. Usa siempre archivos externos para scripts grandes o reutilizables.

---

## 📖 Cómo mostrar resultados en JavaScript

```js
// En la consola del navegador
console.log("Hola, consola!");

// En una alerta
alert("Hola, usuario!");

// En el documento
document.write("Hola, página!");

// En un elemento HTML
document.getElementById("demo").innerText = "Hola desde JS!";
```

**Reglas y recomendaciones:**

- Usa `console.log()` para depurar y ver valores en la consola del navegador.
- Utiliza `alert()` solo para mensajes simples o pruebas rápidas, ya que interrumpe la experiencia del usuario.
- Evita `document.write()` en proyectos reales; puede sobrescribir el contenido de la página.
- Para mostrar resultados en la página, modifica el contenido de elementos HTML usando métodos como `innerText` o `innerHTML`.
- Prefiere seleccionar elementos por ID o clase para actualizar el DOM de forma segura y organizada.

---

## 📖 Sintaxis básica de JavaScript

**Reglas básicas:**

- Las sentencias terminan con `;` (opcional pero recomendado).
- JavaScript es case-sensitive (`nombre` ≠ `Nombre`).
- Los bloques se delimitan con `{ }`.
- Los comentarios se hacen así:

```js
// Comentario de una línea

/*
  Comentario
  de varias
  líneas
*/
```

---

## 📖 Variables en JavaScript

Las variables almacenan datos.

```js
var nombre = "Ana";      // Antiguo (evitar en nuevos proyectos)
let edad = 25;           // Moderna, con alcance de bloque
const PI = 3.14;         // Constante, no cambia
```

**Reglas:**

- Usa `let` para variables que cambian y `const` para constantes.
- Evita `var` en código moderno.

---

## 📖 Tipos de datos en JavaScript

JavaScript tiene tipos de datos básicos:

```js
let texto = "Hola";        // String
let numero = 42;           // Number
let decimal = 3.14;        // Number
let booleano = true;       // Boolean
let indefinido;            // undefined
let nulo = null;           // null
let objeto = {nombre: "Ana", edad: 25};  // Object
let array = [1, 2, 3];     // Array (tipo de objeto)
```

---

## 📖 Operadores en JavaScript

### Aritméticos

```js
let suma = 5 + 3;
let resta = 5 - 3;
let multi = 5 * 3;
let div = 5 / 2;
let resto = 5 % 2;
```

### Comparación

```js
5 == "5"      // true (compara solo valor)
5 === "5"     // false (compara valor y tipo)
5 != 3        // true
5 < 10        // true
```

### Lógicos

```js
true && false   // false
true || false   // true
!true           // false
```

---

## 📖 Estructuras condicionales en JavaScript

Las estructuras condicionales permiten ejecutar diferentes bloques de código según condiciones.

### IF / ELSE

```js
let edad = 20;
if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor");
}
```

### SWITCH

```js
let color = "rojo";
switch(color) {
  case "rojo":
    console.log("Color rojo");
    break;
  case "azul":
    console.log("Color azul");
    break;
  default:
    console.log("Otro color");
}
```

**Reglas:**

- Usa `if/else` para condiciones simples o múltiples caminos claros.
- Usa `switch` cuando compares una misma variable contra varios valores posibles.
- Recuerda siempre usar `break` en cada caso de `switch`.

---

## 📖 Bucles y ciclos en JavaScript

Los bucles permiten repetir bloques de código.

### FOR

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### WHILE

```js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

### DO...WHILE

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```

### Diferencias y reglas

| Ciclo       | Cuándo usarlo | Características principales |
| --- | --- | --- |
| **for** | Cuando conoces el número exacto de iteraciones | Inicialización, condición y actualización en una sola línea. Ideal para recorrer arrays por índice. |
| **while** | Cuando no sabes cuántas veces se repetirá | Se ejecuta mientras la condición sea verdadera. Útil para bucles dependientes de condiciones externas. |
| **do...while** | Cuando necesitas ejecutar el bloque al menos una vez | La condición se evalúa después de ejecutar el bloque. Garantiza al menos una iteración. |

---

## 📖 Funciones en JavaScript

Las funciones permiten encapsular lógica reutilizable.

```js
// Declaración de función
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

console.log(saludar("Ana"));

// Función anónima
const despedir = function(nombre) {
  return `Adiós, ${nombre}`;
}

// Arrow function
const sumar = (a, b) => a + b;
```

**Reglas:**

- Usa funciones declaradas para utilidades generales.
- Usa funciones expresión o arrow para callbacks y funciones internas.
- Usa arrow functions cuando no necesites un `this` propio.

---

## 📖 Objetos en JavaScript

Los objetos agrupan datos y funcionalidades.

```js
let persona = {
  nombre: "Ana",
  edad: 25,
  saludar: function() {
    console.log("Hola, soy " + this.nombre);
  }
};

console.log(persona.nombre);
persona.saludar();
```

---

## 📖 Arrays (Arreglos) en JavaScript

Los arrays almacenan colecciones ordenadas de datos.

```js
let frutas = ["manzana", "banana", "uva"];
console.log(frutas[0]);      // "manzana"

// Métodos útiles
frutas.push("pera");         // Agrega
frutas.pop();                // Elimina el último
frutas.shift();              // Elimina el primero
frutas.unshift("naranja");   // Agrega al inicio
```

---

## 📖 Manejo de eventos en JavaScript

Los eventos permiten que tu página web responda a acciones del usuario o del navegador.

```html
<button onclick="alert('¡Clic!')">Haz clic</button>

<script>
document.getElementById("miBoton").addEventListener("click", () => {
  console.log("Botón presionado");
});
</script>
```

---

## 📖 Conceptos clave sobre eventos en JavaScript

Los eventos permiten que tu página web responda a acciones del usuario (clics, teclas, movimientos, etc.) o del navegador (carga, errores, etc.).

### Tipos de eventos comunes

- `click`: Cuando el usuario hace clic en un elemento.
- `mouseover` / `mouseout`: Cuando el mouse entra o sale de un elemento.
- `keydown` / `keyup`: Cuando se presiona o suelta una tecla.
- `submit`: Cuando se envía un formulario.
- `load`: Cuando la página o un recurso termina de cargarse.

### Casos de uso típicos

- Mostrar u ocultar menús al hacer clic.
- Validar formularios antes de enviarlos.
- Cambiar estilos al pasar el mouse sobre elementos.
- Capturar atajos de teclado.
- Cargar datos dinámicamente tras una acción del usuario.

---

## 📝 Recomendaciones para manejar eventos

- **Separa el HTML del JavaScript:** Usa `addEventListener` en lugar de atributos HTML como `onclick` para mantener el código organizado y reutilizable.
- **Nombra funciones de manera descriptiva:** Por ejemplo, `handleClick` o `onFormSubmit`.
- **Elimina listeners cuando ya no sean necesarios:** Para evitar fugas de memoria en aplicaciones grandes.
- **Evita el uso excesivo de eventos globales:** Prefiere delegar eventos en elementos específicos o usar event delegation para listas dinámicas.
- **Aprovecha el objeto `event`:** Permite acceder a información útil como el elemento que disparó el evento, teclas presionadas, etc.

---

## 💡 Ejemplo de delegación de eventos

La delegación de eventos es útil cuando tienes muchos elementos similares (por ejemplo, una lista de botones generados dinámicamente):

```js
document.getElementById("lista").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        alert("Botón: " + event.target.textContent);
    }
});
```

---

## 2️⃣ 📄 **Strings, Números y Fechas en JavaScript**

Ahora que sabes lo básico, vamos a trabajar con textos (strings), números, fechas, matemáticas y aleatoriedad.

---

## 📖 Strings (Cadenas de texto)

Los *strings* son secuencias de caracteres encerradas entre comillas simples, dobles o backticks.

```js
let saludo = "Hola mundo";
let despedida = 'Adiós';
let nombre = `Ana`;
```

---

### Métodos de String

```js
let texto = "JavaScript es genial";

// Longitud
console.log(texto.length);  // 20

// Mayúsculas / minúsculas
console.log(texto.toUpperCase());  // JAVASCRIPT ES GENIAL
console.log(texto.toLowerCase());  // javascript es genial

// Extraer partes
console.log(texto.substring(0, 10));   // JavaScript

// Buscar
console.log(texto.indexOf("genial"));  // 15
console.log(texto.includes("genial")); // true

// Reemplazar
console.log(texto.replace("genial", "increíble")); 
```

---

### Template Strings

Puedes interpolar variables fácilmente con backticks:

#### ¿Qué son los backticks?

Los *backticks* (acento grave: `` ` ``) son un tipo de comillas que permiten crear *template strings* en JavaScript. A diferencia de las comillas simples (`'`) o dobles (`"`), los backticks permiten:

- Escribir cadenas multilínea sin caracteres especiales.
- Interpolar variables y expresiones usando `${...}` dentro del string.

Por ejemplo:

```js
let nombre = "Ana";
let edad = 25;

let mensaje = `Hola, soy ${nombre} y tengo ${edad} años`;
console.log(mensaje);
```

---

## 📖 Números y operaciones numéricas

En Javascript, todos los números (enteros o decimales) son del tipo `number`.

```js
let entero = 42;
let decimal = 3.14;
let negativo = -7;

// Notación científica
let grande = 1e6;  // 1000000
```

---

### Métodos de números

```js
let x = 9.567;

console.log(x.toFixed(2));    // "9.57" — 2 decimales
console.log(Number.isInteger(x)); // false
```

---

### BigInt: Números muy grandes

Para números muy grandes:

```js
let big = 1234567890123456789012345678901234567890n;
console.log(big);
```

---

## 📖 Objeto MATH y operaciones matemáticas

El objeto `Math` ofrece utilidades matemáticas.

```js
console.log(Math.PI);             // 3.1415...
console.log(Math.sqrt(16));      // 4
console.log(Math.pow(2, 8));     // 256
console.log(Math.random());      // entre 0 y 1
console.log(Math.floor(3.7));    // 3
console.log(Math.ceil(3.2));     // 4
console.log(Math.round(3.5));    // 4
```

---

## 📖 Números aleatorios

Para obtener un número aleatorio en un rango:

```js
// Aleatorio entre 0 y 10
let aleatorio = Math.floor(Math.random() * 11);
console.log(aleatorio);
```

---

## 📖 Fecha y hora

JavaScript usa el objeto `Date`.

```js
let ahora = new Date();
console.log(ahora);

// Crear una fecha específica
let cumple = new Date("1999-12-31");
console.log(cumple);
```

---

### Métodos del objeto Date

```js
let fecha = new Date();

console.log(fecha.getFullYear()); // año
console.log(fecha.getMonth());    // mes (0-11)
console.log(fecha.getDate());     // día
console.log(fecha.getDay());      // día semana (0-domingo)
console.log(fecha.getHours());    // hora
console.log(fecha.getMinutes());
console.log(fecha.getSeconds());

// Establecer valores
fecha.setFullYear(2025);
fecha.setMonth(0); // Enero
```

---

## 3️⃣ 🔄 **Arrays y Métodos Avanzados**

> **Nota:** Ya se explicó qué es un array y cómo se usa. Aquí solo mantén los métodos avanzados y elimina explicaciones básicas repetidas.

### Métodos de Array

```js
let numeros = [1, 2, 3, 4, 5];

// Agregar y quitar
numeros.push(6);
numeros.pop();
numeros.shift();
numeros.unshift(0);

// Buscar
console.log(numeros.indexOf(3));
console.log(numeros.includes(4));

// Ordenar
numeros.sort();

// Iterar
numeros.forEach(num => console.log(num));

// Map
let cuadrados = numeros.map(num => num * num);

// Filter
let pares = numeros.filter(num => num % 2 === 0);
```

---

### Iterar Arrays

```js
let frutas = ["manzana", "banana", "uva"];

for (let fruta of frutas) {
  console.log(fruta);
}

frutas.forEach((fruta, indice) => {
  console.log(`${indice}: ${fruta}`);
});
```

---

### Arrays Constantes

Aunque definas un array con `const`, puedes modificar sus elementos:

```js
const miArray = [1, 2, 3];
miArray.push(4);
```

---

## 4️⃣ 📜 **Objetos Avanzados**

> **Nota:** Ya se explicó cómo crear un objeto básico. Aquí solo mantén métodos, propiedades y constructores.

### Propiedades y Métodos

```js
let coche = {
  marca: "Toyota",
  modelo: "Corolla",
  arrancar: function() {
    console.log(`${this.marca} ${this.modelo} ha arrancado`);
  }
};

console.log(coche.marca);
coche.arrancar();
```

---

### Constructores

```js
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

let ana = new Persona("Ana", 25);
console.log(ana.nombre);
```

---

### Prototipos

Puedes añadir métodos a un constructor con su prototipo.

```js
Persona.prototype.saludar = function() {
  console.log(`Hola, soy ${this.nombre}`);
}

ana.saludar();
```

---

## 5️⃣ 🔧 **Funciones Avanzadas**

### Call, Apply, Bind

```js
function saluda(saludo) {
  console.log(`${saludo}, soy ${this.nombre}`);
}

let persona = {nombre: "Ana"};

saluda.call(persona, "Hola");
saluda.apply(persona, ["Hola"]);

let saludaAna = saluda.bind(persona);
saludaAna("Hola");
```

---

### Closures

```js
function contador() {
  let cuenta = 0;
  return function() {
    cuenta++;
    return cuenta;
  }
}

let miContador = contador();
console.log(miContador());  // 1
console.log(miContador());  // 2
```

---

## 6️⃣ 🔷 **Clases y Herencia**

```js
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  hablar() {
    console.log(`${this.nombre} hace un ruido`);
  }
}

class Perro extends Animal {
  hablar() {
    console.log(`${this.nombre} ladra`);
  }
}

let perro = new Perro("Rex");
perro.hablar();
```

---

## 7️⃣ 🌟 **Asincronía**

**¿Qué es la asincronía?**  
La asincronía permite que el código ejecute tareas que toman tiempo (como leer archivos, hacer peticiones a internet o consultar bases de datos) sin detener el resto del programa. Así, tu aplicación sigue siendo rápida y no se "congela" esperando respuestas.

**Callbacks**  
Un callback es una función que se pasa como argumento a otra función y se ejecuta después de que termina una tarea. Ejemplo:

```js
function tareaAsincrona(callback) {
  setTimeout(() => {
    callback('Listo!');
  }, 1000);
}
tareaAsincrona((mensaje) => {
  console.log(mensaje);
});
```

*Problema:* Si tienes muchas tareas anidadas, el código se vuelve difícil de leer ("callback hell").

**Promesas**  
Una promesa es un objeto que representa un valor que estará disponible en el futuro. Permite manejar el éxito o error de una tarea asincrónica de forma más ordenada.

```js
let promesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Hecho!'), 1000);
});
promesa.then(resultado => console.log(resultado));
```

**Async/Await**  
`async` y `await` son una forma moderna y sencilla de trabajar con promesas. `await` pausa la función hasta que la promesa se resuelve, haciendo el código más fácil de leer.

```js
async function ejemplo() {
  let resultado = await promesa;
  console.log(resultado);
}

ejemplo();
```

---

## 8️⃣ 🖋️ **DOM y Eventos**

```html
<p id="demo">Hola</p>
<button onclick="cambiarTexto()">Cambia</button>

<script>
function cambiarTexto() {
  document.getElementById("demo").innerText = "Texto cambiado";
}
</script>
```

---

### Event Listener

```js
document.getElementById("demo").addEventListener("click", () => {
  alert("Clic en demo");
});
```

---

## 9️⃣ 🌐 **AJAX y Fetch**

### Fetch

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🔟 📦 **JSON**

```js
let persona = {nombre: "Ana", edad: 25};

let json = JSON.stringify(persona); // objeto → JSON
console.log(json);

let obj = JSON.parse(json);         // JSON → objeto
console.log(obj);
```

---

## 🔷 1️⃣1️⃣ **BOM (Browser Object Model)**

El *BOM* permite interactuar con el navegador más allá del documento HTML.

---

### Window

```js
console.log(window.innerWidth);  // ancho de la ventana
console.log(window.location.href); // URL actual
```

---

### Screen

```js
console.log(screen.width);
console.log(screen.height);
```

---

### Location

```js
console.log(location.href);   // URL
// location.reload();        // recarga la página
```

---

### History

```js
history.back();   // ir atrás
history.forward(); // ir adelante
```

---

### Navigator

```js
console.log(navigator.userAgent);
console.log(navigator.language);
```

---

### Popups y Alertas

```js
alert("Hola!");
confirm("¿Estás seguro?");
prompt("Escribe tu nombre:");
```

---

### Temporizadores

```js
setTimeout(() => {
  console.log("2 segundos después");
}, 2000);

let intervalo = setInterval(() => {
  console.log("Cada segundo");
}, 1000);

clearInterval(intervalo);  // detenerlo
```

---

### Cookies

```js
document.cookie = "usuario=Ana";
console.log(document.cookie);
```

---

## 🔷 1️⃣2️⃣ **Web APIs**

---

### Web Storage

**¿Qué es?**  
Permite guardar datos en el navegador del usuario, ya sea de forma permanente (`localStorage`) o solo durante la sesión (`sessionStorage`).

**Ejemplo explicado:**

```js
localStorage.setItem("nombre", "Ana"); // 1. Guarda el valor "Ana" bajo la clave "nombre" en el almacenamiento local.
console.log(localStorage.getItem("nombre")); // 2. Recupera y muestra el valor guardado ("Ana").
localStorage.removeItem("nombre"); // 3. Elimina el dato asociado a la clave "nombre".

sessionStorage.setItem("sesion", "activa"); // 4. Guarda el valor "activa" bajo la clave "sesion" solo durante la sesión actual.
```

---

### Web Workers

**¿Qué es?**  
Permite ejecutar scripts en segundo plano, sin bloquear la interfaz del usuario.

**Ejemplo explicado:**

```js
let worker = new Worker("worker.js"); // 1. Crea un nuevo trabajador que ejecuta el archivo "worker.js".
worker.postMessage("Hola"); // 2. Envía el mensaje "Hola" al trabajador.

worker.onmessage = (e) => { // 3. Define una función que se ejecuta cuando el trabajador responde.
  console.log(e.data); // 4. Muestra la respuesta recibida del trabajador.
}
```

---

### Fetch API (visto antes)

**¿Qué es?**  
Permite hacer solicitudes HTTP para obtener o enviar datos a servidores.

**Ejemplo explicado:**

```js
fetch("https://jsonplaceholder.typicode.com/posts") // 1. Realiza una solicitud GET a la URL indicada.
  .then(res => res.json()) // 2. Convierte la respuesta a formato JSON.
  .then(data => console.log(data)); // 3. Muestra los datos obtenidos en la consola.
```

---

### Geolocation API

**¿Qué es?**  
Permite obtener la ubicación geográfica del usuario (con su permiso).

**Ejemplo explicado:**

```js
navigator.geolocation.getCurrentPosition(pos => { // 1. Solicita la ubicación actual del usuario.
  console.log(pos.coords.latitude, pos.coords.longitude); // 2. Muestra la latitud y longitud en consola.
});
```

---

### Validation API

**¿Qué es?**  
Permite validar formularios HTML automáticamente usando atributos como `required` o `type`.

**Ejemplo explicado:**

```html
<form>
  <input type="email" required> <!-- 1. Campo de entrada que solo acepta emails y es obligatorio. -->
  <button type="submit">Enviar</button> <!-- 2. Botón para enviar el formulario. Si el email no es válido, no se envía. -->
</form>
```

---

## 🔷 1️⃣3️⃣ **AJAX**

Antes de `fetch`, AJAX usaba `XMLHttpRequest`.

```js
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.send();
```

---

## 🔷 1️⃣4️⃣ **jQuery vs JavaScript**

Aunque hoy en día se usa menos, jQuery facilita la sintaxis:

```js
// Vanilla JS
document.getElementById("demo").innerText = "Hola";

// jQuery
$("#demo").text("Hola");
```

---

## 🔷 1️⃣5️⃣ **Gráficos y Canvas**

---

### Canvas

```html
<canvas id="miCanvas" width="200" height="100"></canvas>
<script>
let c = document.getElementById("miCanvas").getContext("2d");
c.fillStyle = "blue";
c.fillRect(10, 10, 100, 50);
</script>
```

---

### Chart.js (requiere incluir la librería)

```js
new Chart(ctx, {
  type: 'bar',
  data: { ... }
});
```

---

### D3.js, Plotly y Google Charts son otras bibliotecas para visualización

---

## 🔷 1️⃣6️⃣ **Errores y Debugging**

```js
try {
  noExiste();
} catch (err) {
  console.log("Error: ", err.message);
} finally {
  console.log("Esto siempre se ejecuta");
}
```

Usa `console.log`, `console.error` y las herramientas de desarrollador del navegador para depurar.

---

## 🔷 1️⃣7️⃣ **Moderno y Avanzado**

> **Nota:** Aquí solo mantén ejemplos modernos y evita repetir explicaciones de arrow functions, destructuring, etc., si ya se vieron antes.

### Strict Mode

```js
"use strict";
x = 3.14; // Error, variable no declarada
```

---

### Módulos

```js
// archivo.js
export const PI = 3.14;

// otro.js
import { PI } from './archivo.js';
console.log(PI);
```

---

### Arrow Functions

> Ya se explicó en la sección de funciones. Si quieres, solo deja un ejemplo breve aquí como recordatorio.

```js
const sumar = (a, b) => a + b;
```

### Destructuring

```js
let persona = { nombre: "Ana", edad: 25 };
let { nombre, edad } = persona;

let [a, b] = [1, 2];
```

---

### RegExp (Expresiones regulares)

```js
let texto = "Hola123";
let regex = /\d+/;
console.log(regex.test(texto));   // true
```

---

### Iterables e Iteradores

```js
let arr = [10, 20, 30];
for (let valor of arr) {
  console.log(valor);
}
```

---

## 🔷 1️⃣8️⃣ **DOM Avanzado**

- `document.querySelector()`
- `document.querySelectorAll()`
- `.classList.add() / remove() / toggle()`
- `.style` para modificar CSS.
- Animaciones con `.animate()`.
- DOM Traversal (padres, hijos, hermanos).

---

## 🔷 1️⃣9️⃣ **JSON Profundo**

```js
let datos = `{"nombre":"Ana","edad":25}`;
let obj = JSON.parse(datos);
console.log(obj.nombre);

let json = JSON.stringify(obj);
```
