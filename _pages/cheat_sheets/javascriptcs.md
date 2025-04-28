---
layout: default
title: JavaScript Cheat Sheet
description: Hoja de trucos para JavaScript, desde fundamentos hasta ejemplos prácticos.
permalink: /cheat_sheets/javascriptcs/
category: cheatsheets
subcategory: javascript
icon: 📋
article: true
---

## 1. Fundamentos Básicos

### Incluir JavaScript en HTML

```html
<!-- En el head (carga antes que el contenido) -->
<script src="miarchivo.js"></script>

<!-- Al final del body (recomendado, carga después del contenido) -->
<body>
  <!-- Contenido HTML -->
  <script src="miarchivo.js"></script>
</body>

<!-- JavaScript inline -->
<script>
  // Tu código JavaScript aquí
</script>
```

### Comentarios

```javascript
// Comentario de una línea

/*
  Comentario
  de múltiples
  líneas
*/
```

### Declaración de Variables

```javascript
// Variables modernas (recomendadas)
let edad = 25;        // Variable que puede cambiar
const PI = 3.1416;    // Constante (no puede cambiar)

// Variable antigua (evitar)
var nombre = "Juan";  // Tiene problemas de ámbito
```

### Tipos de Datos

```javascript
// Primitivos
let texto = "Hola mundo";            // String (cadena de texto)
let numero = 42;                     // Number (número)
let decimal = 3.14;                  // Number (decimal)
let esVerdad = true;                 // Boolean (booleano)
let nada = null;                     // Null (valor nulo)
let indefinido = undefined;          // Undefined (valor no definido)
let simbolo = Symbol("descripción"); // Symbol (identificador único)
let bigInt = 9007199254740991n;      // BigInt (números muy grandes)

// Objetos
let objeto = { nombre: "Ana", edad: 30 };  // Object (objeto)
let lista = [1, 2, 3, 4];                  // Array (arreglo)
let fecha = new Date();                    // Object (objeto fecha)
```

### Verificar Tipos

```javascript
typeof "Hola";      // "string"
typeof 42;          // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" (esto es un error histórico de JS)
typeof {};          // "object"
typeof [];          // "object" (los arrays son objetos en JS)
typeof function(){};// "function"
```

## 2. Operadores

### Aritméticos

```javascript
let a = 10;
let b = 3;

let suma = a + b;        // 13
let resta = a - b;       // 7
let multiplicacion = a * b;  // 30
let division = a / b;    // 3.333...
let modulo = a % b;      // 1 (resto de división)
let exponente = a ** b;  // 1000 (10 elevado a 3)

// Incremento y decremento
let c = 5;
c++;                     // Incrementa c en 1 (ahora c = 6)
c--;                     // Decrementa c en 1 (ahora c = 5)

// Operadores de asignación
let x = 10;
x += 5;                  // x = x + 5 (ahora x = 15)
x -= 3;                  // x = x - 3 (ahora x = 12)
x *= 2;                  // x = x * 2 (ahora x = 24)
x /= 4;                  // x = x / 4 (ahora x = 6)
x %= 4;                  // x = x % 4 (ahora x = 2)
```

### Comparación

```javascript
let a = 5;
let b = "5";

a == b;      // true (compara valor, ignora tipo)
a === b;     // false (compara valor Y tipo)
a != b;      // false (distinto valor, ignora tipo)
a !== b;     // true (distinto valor O tipo)
a > 3;       // true
a >= 5;      // true
a < 10;      // true
a <= 4;      // false
```

### Lógicos

```javascript
let x = 5;
let y = 10;

// AND lógico (&&): verdadero solo si ambas condiciones son verdaderas
(x > 0 && y > 0);  // true

// OR lógico (||): verdadero si al menos una condición es verdadera
(x > 10 || y > 5); // true

// NOT lógico (!): invierte el valor
!(x > y);         // true (porque x > y es falso)
```

## 3. Estructuras de Control

### Condicionales

```javascript
// if-else simple
if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}

// if-else if-else
if (nota >= 90) {
  console.log("Sobresaliente");
} else if (nota >= 70) {
  console.log("Notable");
} else if (nota >= 60) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}

// Operador ternario (condición ? valor_si_verdadero : valor_si_falso)
let mensaje = (edad >= 18) ? "Mayor de edad" : "Menor de edad";

// switch
let dia = 2;
switch(dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  // ... otros casos
  default:
    console.log("Día no válido");
}
```

### Bucles (Loops)

```javascript
// for
for (let i = 0; i < 5; i++) {
  console.log(i);  // Imprime 0, 1, 2, 3, 4
}

// for...of (para arrays y otros iterables)
let frutas = ["manzana", "naranja", "plátano"];
for (let fruta of frutas) {
  console.log(fruta);  // Imprime cada fruta
}

// for...in (para propiedades de objetos)
let persona = {nombre: "Juan", edad: 30};
for (let propiedad in persona) {
  console.log(propiedad + ": " + persona[propiedad]);
}

// while
let contador = 0;
while (contador < 5) {
  console.log(contador);  // Imprime 0, 1, 2, 3, 4
  contador++;
}

// do...while (se ejecuta al menos una vez)
let num = 0;
do {
  console.log(num);  // Imprime 0
  num++;
} while (num < 1);

// break y continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;  // Salta esta iteración
  if (i === 7) break;     // Sale del bucle
  console.log(i);  // Imprime 0, 1, 2, 4, 5, 6
}
```

## 4. Funciones

### Declaración de Funciones

```javascript
// Función declarativa
function saludar(nombre) {
  return "Hola " + nombre;
}

// Función expresiva (asignada a variable)
const despedir = function(nombre) {
  return "Adiós " + nombre;
};

// Función flecha (arrow function)
const multiplicar = (a, b) => a * b;

// Función con múltiples líneas
const calcularArea = (base, altura) => {
  let resultado = base * altura / 2;
  return resultado;
};

// Función con parámetros por defecto
function configurar(color = "azul", tamaño = "mediano") {
  console.log(`Color: ${color}, Tamaño: ${tamaño}`);
}
```

### Llamar Funciones

```javascript
// Llamar a las funciones anteriores
saludar("María");               // "Hola María"
despedir("Juan");               // "Adiós Juan"
multiplicar(5, 3);              // 15
calcularArea(10, 5);            // 25
configurar();                   // "Color: azul, Tamaño: mediano"
configurar("rojo");             // "Color: rojo, Tamaño: mediano"
configurar("verde", "grande");  // "Color: verde, Tamaño: grande"
```

### Funciones Anónimas y Callbacks

```javascript
// Función anónima (sin nombre)
setTimeout(function() {
  console.log("Han pasado 3 segundos");
}, 3000);

// Callback (función que se pasa como argumento)
function procesar(numero, callback) {
  let resultado = numero * 2;
  callback(resultado);
}

procesar(5, function(resultado) {
  console.log("El resultado es: " + resultado);  // "El resultado es: 10"
});
```

## 5. Arrays (Arreglos)

### Crear Arrays

```javascript
// Declaración de arrays
let frutas = ["manzana", "pera", "plátano"];
let numeros = [1, 2, 3, 4, 5];
let mixto = [1, "dos", true, [4, 5]];
let nuevoArray = new Array(3);  // [empty × 3]

// Acceder a elementos
let primerElemento = frutas[0];  // "manzana"
let ultimoElemento = frutas[frutas.length - 1];  // "plátano"
```

### Métodos de Arrays

```javascript
let animales = ["perro", "gato"];

// Modificar arrays
animales.push("conejo");           // Añade al final: ["perro", "gato", "conejo"]
animales.unshift("pájaro");        // Añade al inicio: ["pájaro", "perro", "gato", "conejo"]
let ultimo = animales.pop();       // Elimina y devuelve el último: "conejo"
let primero = animales.shift();    // Elimina y devuelve el primero: "pájaro"

// Arrays avanzados
let numeros = [1, 2, 3, 4, 5];

// map: transforma cada elemento
let dobles = numeros.map(num => num * 2);  // [2, 4, 6, 8, 10]

// filter: filtra elementos que cumplen condición
let mayoresQue2 = numeros.filter(num => num > 2);  // [3, 4, 5]

// reduce: reduce el array a un solo valor
let suma = numeros.reduce((total, num) => total + num, 0);  // 15

// find: encuentra el primer elemento que cumple condición
let primeroMayor3 = numeros.find(num => num > 3);  // 4

// some/every: comprueba si alguno/todos cumplen condición
let algunoMayor4 = numeros.some(num => num > 4);   // true
let todosMenores10 = numeros.every(num => num < 10);  // true

// sort: ordena el array (modifica el original)
numeros.sort((a, b) => b - a);  // [5, 4, 3, 2, 1] (orden descendente)
```

### Operaciones Comunes con Arrays

```javascript
let datos = [3, 1, 4, 1, 5];

// Longitud del array
let longitud = datos.length;  // 5

// Buscar un elemento
let indice = datos.indexOf(4);  // 2
let ultimoIndice = datos.lastIndexOf(1);  // 3
let incluye = datos.includes(5);  // true

// Unir arrays
let array1 = [1, 2];
let array2 = [3, 4];
let unidos = array1.concat(array2);  // [1, 2, 3, 4]

// Cortar un array (no modifica el original)
let subArray = datos.slice(1, 4);  // [1, 4, 1]

// Eliminar/reemplazar elementos (modifica el original)
datos.splice(2, 1);  // Elimina 1 elemento desde posición 2: [3, 1, 1, 5]
datos.splice(1, 0, 2);  // Inserta 2 en posición 1: [3, 2, 1, 1, 5]

// Convertir array a string
let texto = datos.join(", ");  // "3, 2, 1, 1, 5"

// Invertir array (modifica el original)
datos.reverse();  // [5, 1, 1, 2, 3]
```

## 6. Objetos

### Crear y Acceder a Objetos

```javascript
// Objeto literal
let persona = {
  nombre: "Ana",
  edad: 28,
  ciudad: "Madrid",
  hobbies: ["leer", "correr"],
  direccion: {
    calle: "Gran Vía",
    numero: 42
  }
};

// Acceder a propiedades
console.log(persona.nombre);           // "Ana"
console.log(persona["edad"]);          // 28
console.log(persona.hobbies[0]);       // "leer"
console.log(persona.direccion.calle);  // "Gran Vía"

// Añadir/modificar propiedades
persona.email = "ana@ejemplo.com";     // Añade nueva propiedad
persona.edad = 29;                     // Modifica propiedad existente

// Eliminar propiedad
delete persona.ciudad;
```

### Métodos en Objetos

```javascript
let calculadora = {
  resultado: 0,
  sumar: function(a, b) {
    this.resultado = a + b;
    return this.resultado;
  },
  // Sintaxis abreviada para métodos
  restar(a, b) {
    this.resultado = a - b;
    return this.resultado;
  }
};

calculadora.sumar(5, 3);  // 8
calculadora.restar(10, 4);  // 6
```

### Constructores y Clases

```javascript
// Constructor (forma antigua)
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.saludar = function() {
    return `Hola, soy ${this.nombre}`;
  };
}

// Instanciar objetos
let persona1 = new Persona("Carlos", 35);
console.log(persona1.saludar());  // "Hola, soy Carlos"

// Clases (ES6+, forma moderna)
class Animal {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }
  
  // Métodos
  describir() {
    return `${this.nombre} es un ${this.tipo}`;
  }
  
  // Getters y setters
  get nombreEnMayusculas() {
    return this.nombre.toUpperCase();
  }
  
  set cambiarNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }
}

// Herencia
class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre, "perro");
    this.raza = raza;
  }
  
  ladrar() {
    return "¡Guau guau!";
  }
}

let miPerro = new Perro("Max", "Labrador");
console.log(miPerro.describir());  // "Max es un perro"
console.log(miPerro.ladrar());     // "¡Guau guau!"
```

## 7. Manejo de Strings

### Propiedades y Métodos Básicos

```javascript
let texto = "JavaScript es genial";

// Longitud
console.log(texto.length);  // 20

// Acceder a caracteres
console.log(texto[0]);              // "J"
console.log(texto.charAt(4));       // "S"

// Buscar texto
console.log(texto.indexOf("Script"));  // 4
console.log(texto.lastIndexOf("a"));   // 15
console.log(texto.includes("genial"));  // true
console.log(texto.startsWith("Java"));  // true
console.log(texto.endsWith("genial"));  // true

// Extraer partes
console.log(texto.slice(0, 10));     // "JavaScript"
console.log(texto.substring(11, 13));  // "es"
console.log(texto.substr(11, 2));      // "es" (obsoleto)

// Reemplazar
console.log(texto.replace("genial", "increíble"));  // "JavaScript es increíble"
```

### Transformación de Strings

```javascript
let mensaje = "Hola Mundo";

// Mayúsculas y minúsculas
console.log(mensaje.toUpperCase());  // "HOLA MUNDO"
console.log(mensaje.toLowerCase());  // "hola mundo"

// Quitar espacios
let textoConEspacios = "  texto con espacios  ";
console.log(textoConEspacios.trim());  // "texto con espacios"
console.log(textoConEspacios.trimStart());  // "texto con espacios  "
console.log(textoConEspacios.trimEnd());  // "  texto con espacios"

// Dividir en array
console.log(mensaje.split(" "));  // ["Hola", "Mundo"]

// Repetir
console.log("Na".repeat(8) + " Batman!");  // "NaNaNaNaNaNaNaNa Batman!"

// Rellenar
console.log("5".padStart(3, "0"));  // "005"
console.log("5".padEnd(3, "0"));    // "500"
```

### Plantillas Literales (Template Strings)

```javascript
let nombre = "Laura";
let edad = 27;

// Concatenación tradicional
let mensaje1 = "Hola, soy " + nombre + " y tengo " + edad + " años.";

// Plantillas literales (con backticks `)
let mensaje2 = `Hola, soy ${nombre} y tengo ${edad} años.`;

// Plantillas multilínea
let plantilla = `
  <div>
    <h1>${nombre}</h1>
    <p>Edad: ${edad}</p>
  </div>~`;
```

## 8. Manejo de Errores

### try...catch...finally

```javascript
try {
  // Código que puede generar un error
  let resultado = funcionInexistente();
  console.log(resultado);
} catch (error) {
  // Manejo del error
  console.error("Ocurrió un error:", error.message);
} finally {
  // Se ejecuta siempre, haya error o no
  console.log("Proceso finalizado");
}
```

### Lanzar Errores Personalizados

```javascript
function dividir(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");
  }
  return a / b;
}

try {
  let resultado = dividir(10, 0);
} catch (error) {
  console.error(error.message);  // "No se puede dividir por cero"
}
```

## 9. Asincronía

### setTimeout y setInterval

```javascript
// Ejecutar una vez después de 2 segundos
setTimeout(() => {
  console.log("Han pasado 2 segundos");
}, 2000);

// Ejecutar cada 1 segundo
let contador = 0;
let intervalo = setInterval(() => {
  contador++;
  console.log(`Han pasado ${contador} segundos`);
  if (contador >= 5) {
    clearInterval(intervalo);  // Detener después de 5 segundos
  }
}, 1000);
```

### Callbacks

```javascript
// Función con callback
function obtenerDatos(id, callback) {
  setTimeout(() => {
    let datos = { id: id, nombre: "Producto " + id };
    callback(datos);
  }, 1000);
}

obtenerDatos(123, (datos) => {
  console.log("Datos recibidos:", datos);
});
```

### Promesas

```javascript
// Crear una promesa
function fetchDatos(url) {
  return new Promise((resolve, reject) => {
    // Simulación de petición
    setTimeout(() => {
      if (url.includes("datos")) {
        resolve({ data: "Información obtenida" });
      } else {
        reject(new Error("URL no válida"));
      }
    }, 1000);
  });
}

// Usar promesas
fetchDatos("api/datos")
  .then(respuesta => {
    console.log(respuesta.data);  // "Información obtenida"
    return "Proceso completado";
  })
  .then(mensaje => {
    console.log(mensaje);  // "Proceso completado"
  })
  .catch(error => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Proceso finalizado");
  });

// Métodos Promise
Promise.all([
  fetchDatos("api/datos1"),
  fetchDatos("api/datos2")
]).then(resultados => {
  // Se ejecuta cuando todas las promesas se resuelven
  console.log(resultados);  // [resultado1, resultado2]
});

Promise.race([
  fetchDatos("api/datos1"),
  fetchDatos("api/datos2")
]).then(primerResultado => {
  // Se ejecuta cuando la primera promesa se resuelve
  console.log(primerResultado);
});
```

### Async/Await

```javascript
// Función asíncrona
async function obtenerUsuario(id) {
  try {
    // await pausa la ejecución hasta que la promesa se resuelva
    let respuesta = await fetch(`api/usuarios/${id}`);
    
    if (!respuesta.ok) {
      throw new Error("Error en la petición");
    }
    
    let datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;  // Re-lanzar para manejo externo
  }
}

// Llamar a función async
async function main() {
  try {
    let usuario = await obtenerUsuario(1);
    console.log(usuario);
  } catch (error) {
    console.error("Error en main:", error.message);
  }
}

main();
```

## 10. DOM (Document Object Model)

### Seleccionar Elementos

```javascript
// Por ID
let elemento = document.getElementById("miId");

// Por clase
let elementos = document.getElementsByClassName("miClase");

// Por etiqueta
let parrafos = document.getElementsByTagName("p");

// Selectores CSS (devuelve el primero)
let selector = document.querySelector(".clase #id");

// Selectores CSS (devuelve todos)
let selectores = document.querySelectorAll("div > p");
```

### Modificar Elementos

```javascript
let elemento = document.getElementById("miElemento");

// Cambiar contenido
elemento.textContent = "Nuevo texto";  // Solo texto
elemento.innerHTML = "<strong>Texto con HTML</strong>";  // Incluyendo HTML

// Cambiar atributos
elemento.setAttribute("class", "destacado");
elemento.getAttribute("id");  // Obtiene valor de atributo
elemento.removeAttribute("title");  // Elimina atributo

// Cambiar estilos
elemento.style.color = "blue";
elemento.style.fontSize = "20px";
elemento.style.display = "none";  // Ocultar

// Clases CSS
elemento.classList.add("active");
elemento.classList.remove("disabled");
elemento.classList.toggle("visible");  // Alterna (añade/elimina)
elemento.classList.contains("active");  // true/false
```

### Crear y Eliminar Elementos

```javascript
// Crear elemento
let nuevoDiv = document.createElement("div");
nuevoDiv.textContent = "Nuevo elemento";
nuevoDiv.className = "contenedor";

// Añadir al DOM
document.body.appendChild(nuevoDiv);  // Al final
document.body.prepend(nuevoDiv);      // Al principio

let referencia = document.getElementById("elementoReferencia");
document.body.insertBefore(nuevoDiv, referencia);  // Antes de referencia

// Reemplazar
let reemplazo = document.createElement("p");
reemplazo.textContent = "Elemento de reemplazo";
referencia.parentNode.replaceChild(reemplazo, referencia);

// Eliminar
let elementoAEliminar = document.getElementById("obsoleto");
elementoAEliminar.remove();  // Método moderno
// O de forma antigua
elementoAEliminar.parentNode.removeChild(elementoAEliminar);
```

### Eventos

```javascript
let boton = document.getElementById("miBoton");

// Método simple
boton.onclick = function() {
  alert("Botón clickeado");
};

// Método recomendado (permite múltiples manejadores)
boton.addEventListener("click", function(evento) {
  alert("Clickeado mediante listener");
  console.log(evento);  // Objeto de evento
});

// Eliminar manejador (debe ser la misma función)
function manejador() {
  console.log("Manejador");
}
boton.addEventListener("click", manejador);
boton.removeEventListener("click", manejador);

// Prevenir comportamiento predeterminado
let enlace = document.querySelector("a");
enlace.addEventListener("click", function(e) {
  e.preventDefault();  // Evita navegación
  console.log("Enlace clickeado");
});

// Propagación de eventos
let padre = document.getElementById("padre");
let hijo = document.getElementById("hijo");

// Fase de captura (del documento hacia el elemento)
padre.addEventListener("click", e => console.log("Captura padre"), true);

// Fase de burbujeo (del elemento hacia el documento, por defecto)
hijo.addEventListener("click", e => {
  e.stopPropagation();  // Detiene la propagación
  console.log("Click hijo");
});
```

## 11. Almacenamiento Local

### localStorage y sessionStorage

```javascript
// localStorage (permanece hasta que se borre)
localStorage.setItem("usuario", "Juan");
let usuario = localStorage.getItem("usuario");  // "Juan"
localStorage.removeItem("usuario");
localStorage.clear();  // Borra todo

// sessionStorage (dura hasta cerrar pestaña/navegador)
sessionStorage.setItem("token", "abc123");
let token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");
sessionStorage.clear();

// Almacenar objetos (convertir a JSON)
let configuracion = { tema: "oscuro", notificaciones: true };
localStorage.setItem("config", JSON.stringify(configuracion));

// Recuperar objetos
let configGuardada = JSON.parse(localStorage.getItem("config"));
```

## 12. Módulos JavaScript (ES6+)

### Exportar

```javascript
// archivo: matematicas.js

// Exportación con nombre
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

// Exportación por defecto (solo una por archivo)
export default function multiplicar(a, b) {
  return a * b;
}

// Exportar constantes
export const PI = 3.1416;
```

### 

```javascript
// archivo: app.js

// Importar lo exportado por defecto
import multiplicar from './matematicas.js';

// Importar exportaciones con nombre
import { sumar, restar, PI } from './matematicas.js';

// Importar con alias
import { sumar as suma, restar as resta } from './matematicas.js';

// Importar todo en un objeto
import * as matematicas from './matematicas.js';
console.log(matematicas.sumar(5, 3));
console.log(matematicas.PI);

// Importar en HTML
<script type="module" src="app.js"></script>
```

## 13. APIs Web Comunes

### Fetch API (para peticiones HTTP)

```javascript
// GET request básico
fetch('https://api.ejemplo.com/datos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta');
    }
    return response.json();  // Parsea JSON
  })
  .then(datos => {
    console.log(datos);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// POST request
fetch('https://api.ejemplo.com/crear', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Producto nuevo',
    precio: 29.99
  })
})
.then(response => response.json())
.then(resultado => console.log(resultado));

// Con async/await
async function obtenerDatos() {
  try {
    let respuesta = await fetch('https://api.ejemplo.com/datos');
    if (!respuesta.ok) throw new Error('Error en la respuesta');
    let datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### JSON

```javascript
// Convertir objeto a string JSON
let objeto = { nombre: "Juan", edad: 30 };
let jsonString = JSON.stringify(objeto);
console.log(jsonString);  // '{"nombre":"Juan","edad":30}'

// Convertir string JSON a objeto
let jsonRecibido = '{"producto":"Laptop","precio":999.99}';
let objetoJS = JSON.parse(jsonRecibido);
console.log(objetoJS.producto);  // "Laptop"
```

## 14. Conceptos Avanzados

### Closures (Cierres)

```javascript
function crearContador() {
  let contador = 0;
  
  // Esta función interna tiene acceso a 'contador'
  return function() {
    contador++;
    return contador;
  };
}

let incrementar = crearContador();
console.log(incrementar());  // 1
console.log(incrementar());  // 2
console.log(incrementar());  // 3
```

### Destructuring (Desestructuración)

```javascript
// Arrays
let colores = ["rojo", "verde", "azul"];
let [primario, secundario, terciario] = colores;
console.log(primario);  // "rojo"

// Con valores por defecto
let [a, b, c, d = "negro"] = colores;
console.log(d);  // "negro"

// Objetos
let persona = { nombre: "Ana", edad: 28, ciudad: "Madrid" };
let { nombre, edad } = persona;
console.log(nombre);  // "Ana"

// Renombrar propiedades
let { nombre: nombreCompleto, ciudad: ubicacion = "Desconocida" } = persona;
console.log(nombreCompleto);  // "Ana"
console.log(ubicacion);       // "Madrid"

// Destructuring en parámetros de función
function mostrarInfo({ nombre, edad }) {
  console.log(`${nombre} tiene ${edad} años`);
}
mostrarInfo(persona);  // "Ana tiene 28 años"
```

### Spread Operator y Rest Parameters

```javascript
// Spread en arrays (...)
let numeros = [1, 2, 3];
let masNumeros = [...numeros, 4, 5];  // [1, 2, 3, 4, 5]

// Copiar array
let copiaNums = [...numeros];  // Crea una copia independiente

// Spread en objetos
let datosBase = { id: 1, nombre: "Producto" };
let producto = {
  ...datosBase,
  precio: 99.99,
  disponible: true
};

// Rest parameters (resto de parámetros)
function sumar(primero, ...resto) {
  return resto.reduce((total, num) => total + num, primero);
}
console.log(sumar(1, 2, 3, 4));  // 10
```

### this y Contexto

```javascript
// 'this' en métodos de objeto
let usuario = {
  nombre: "Luis",
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};
usuario.saludar();  // "Hola, soy Luis"

// Problema con 'this' en callbacks
let usuario2 = {
  nombre: "Ana",
  saludarDespues() {
    setTimeout(function() {
      console.log(`Hola, soy ${this.nombre}`);  // 'this' no refiere a usuario2
    }, 1000);
  }
};

// Soluciones:
// 1. Usar arrow function
let usuario3 = {
  nombre: "Carlos",
  saludarDespues() {
    setTimeout(() => {
      console.log(`Hola, soy ${this.nombre}`);  // 'this' se mantiene
    }, 1000);
  }
};

// 2. Usar bind
let usuario4 = {
  nombre: "Elena",
  saludarDespues() {
    setTimeout(function() {
      console.log(`Hola, soy ${this.nombre}`);
    }.bind(this), 1000);
  }
};

// 3. Guardar referencia
let usuario5 = {
  nombre: "Pablo",
  saludarDespues() {
    let self = this;
    setTimeout(function() {
      console.log(`Hola, soy ${self.nombre}`);
    }, 1000);
  }
};
```

### Map, Set, WeakMap, WeakSet

```javascript
// Map: colección de pares clave-valor
let mapa = new Map();
mapa.set("nombre", "Ana");
mapa.set(1, "número uno");
mapa.set(true, "booleano");

console.log(mapa.get("nombre"));  // "Ana"
console.log(mapa.has(1));         // true
console.log(mapa.size);           // 3
mapa.delete(true);
mapa.clear();  // Vacía el mapa

// Set: colección de valores únicos
let conjunto = new Set([1, 2, 3, 3, 4]);  // {1, 2, 3, 4}
conjunto.add(5);
conjunto.add(1);  // No se duplica
console.log(conjunto.has(3));  // true
console.log(conjunto.size);    // 5
conjunto.delete(4);

// WeakMap: claves deben ser objetos, no previene garbage collection
let weakMap = new WeakMap();
let obj1 = {};
let obj2 = {};
weakMap.set(obj1, "valor1");
weakMap.set(obj2, "valor2");

// WeakSet: solo almacena referencias débiles a objetos
let weakSet = new WeakSet();
weakSet.add(obj1);
console.log(weakSet.has(obj1));  // true
```

## 15. JavaScript Moderno (ES6+)

### let y const

```javascript
// var (evitar usar)
var x = 10;
if (true) {
  var x = 20;  // Modifica la x externa
}
console.log(x);  // 20

// let (ámbito de bloque)
let y = 10;
if (true) {
  let y = 20;  // Nueva variable solo en este bloque
}
console.log(y);  // 10

// const (constante, no reasignable)
const PI = 3.14;
// PI = 3.1416;  // Error: no se puede reasignar

// Pero los objetos/arrays const sí pueden modificar su contenido
const persona = { nombre: "Juan" };
persona.nombre = "Luis";  // OK
persona.edad = 30;        // OK
// persona = {};          // Error: no se puede reasignar
```

### Arrow Functions

```javascript
// Función tradicional
function sumar(a, b) {
  return a + b;
}

// Arrow function equivalente
const sumarArrow = (a, b) => a + b;

// Con un parámetro (paréntesis opcionales)
const duplicar = x => x * 2;

// Sin parámetros
const saludar = () => "Hola mundo";

// Con cuerpo de función
const calcular = (a, b) => {
  let resultado = a * b;
  return resultado + 10;
};

// Diferencias con this
function FuncionTradicional() {
  this.valor = 42;
  setTimeout(function() {
    // 'this' aquí se refiere a window o undefined
    console.log(this.valor);  // undefined
  }, 1000);
}

function FuncionArrow() {
  this.valor = 42;
  setTimeout(() => {
    // 'this' aquí se mantiene como el de FuncionArrow
    console.log(this.valor);  // 42
  }, 1000);
}
```

### Classes

```javascript
// Definición de clase
class Persona {
  // Constructor
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this._privado = "valor";  // Convención para indicar "privado"
  }
  
  // Métodos
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
  
  // Getters y setters
  get info() {
    return `${this.nombre}, ${this.edad} años`;
  }
  
  set nuevoNombre(valor) {
    if (valor.length > 2) {
      this.nombre = valor;
    }
  }
  
  // Métodos estáticos (de la clase, no de instancias)
  static crear(datos) {
    return new Persona(datos.nombre, datos.edad);
  }
}

// Instanciar
let persona1 = new Persona("Ana", 28);
console.log(persona1.saludar());  // "Hola, soy Ana"
console.log(persona1.info);       // "Ana, 28 años"
persona1.nuevoNombre = "María";
console.log(persona1.nombre);     // "María"

// Usar método estático
let datos = { nombre: "Juan", edad: 30 };
let persona2 = Persona.crear(datos);

// Herencia
class Empleado extends Persona {
  constructor(nombre, edad, puesto) {
    super(nombre, edad);  // Llama al constructor de la clase padre
    this.puesto = puesto;
  }
  
  // Sobrescribir método
  saludar() {
    return `${super.saludar()} y trabajo como ${this.puesto}`;
  }
}

let empleado1 = new Empleado("Carlos", 35, "Desarrollador");
console.log(empleado1.saludar());  // "Hola, soy Carlos y trabajo como Desarrollador"
```

### Plantillas Literales (Template Literals)

```javascript
let nombre = "María";
let edad = 25;

// Concatenación tradicional
let mensaje1 = "Hola, me llamo " + nombre + " y tengo " + edad + " años.";

// Plantilla literal
let mensaje2 = `Hola, me llamo ${nombre} y tengo ${edad} años.`;

// Expresiones en plantillas
let a = 5;
let b = 10;
console.log(`La suma es: ${a + b} y la multiplicación es: ${a * b}`);

// Plantillas multilínea
let html = `
<div>
  <h1>${nombre}</h1>
  <p>Edad: ${edad}</p>
</div>`;
```

### Valores por Defecto en Parámetros

```javascript
// Forma antigua
function saludar(nombre) {
  nombre = nombre || "Invitado";
  return "Hola " + nombre;
}

// Con valores por defecto
function saludarES6(nombre = "Invitado", mensaje = "Bienvenido") {
  return `${mensaje}, ${nombre}`;
}

saludarES6();                    // "Bienvenido, Invitado"
saludarES6("Juan");              // "Bienvenido, Juan"
saludarES6("María", "Hola");     // "Hola, María"
```

### Opcional Chaining y Nullish Coalescing

```javascript
// Encadenamiento opcional (?.)
let usuario = {
  detalles: {
    // dirección no está definida
  }
};

// Sin encadenamiento opcional
// let calle = usuario.detalles.direccion.calle;  // Error

// Con encadenamiento opcional
let calle = usuario.detalles?.direccion?.calle;  // undefined (sin error)

// En funciones
let fn = null;
fn?.();  // No hace nada, sin error

// Operador de fusión nula (??)
// Devuelve el valor a la derecha solo si el izquierdo es null o undefined
let nombre = null;
let nombreMostrar = nombre ?? "Sin nombre";  // "Sin nombre"

// Diferencia con OR lógico
let conteo = 0;  // falsy pero válido
let resultado1 = conteo || 10;   // 10 (porque 0 es falsy)
let resultado2 = conteo ?? 10;   // 0 (porque 0 no es null/undefined)
```

### Iteradores y Generadores

```javascript
// Iteradores personalizados
let contador = {
  [Symbol.iterator]() {
    let valor = 0;
    return {
      next() {
        if (valor < 3) {
          return { value: valor++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (let num of contador) {
  console.log(num);  // 0, 1, 2
}

// Generadores (funciones que pueden pausar/reanudar)
function* generadorSimple() {
  yield 1;
  yield 2;
  yield 3;
}

let generador = generadorSimple();
console.log(generador.next());  // { value: 1, done: false }
console.log(generador.next());  // { value: 2, done: false }
console.log(generador.next());  // { value: 3, done: false }
console.log(generador.next());  // { value: undefined, done: true }

// Generador con bucle
function* generadorRango(inicio, fin) {
  for (let i = inicio; i <= fin; i++) {
    yield i;
  }
}

for (let num of generadorRango(5, 10)) {
  console.log(num);  // 5, 6, 7, 8, 9, 10
}
```

## 16. Web APIs

### localStorage y sessionStorage

```javascript
// localStorage (permanece incluso al cerrar navegador)
localStorage.setItem("tema", "oscuro");
let tema = localStorage.getItem("tema");  // "oscuro"
localStorage.removeItem("tema");
localStorage.clear();  // Borra todo

// sessionStorage (dura la sesión actual)
sessionStorage.setItem("token", "abc123");
let token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");

// Guardar objetos (convertir a JSON)
let configuracion = { idioma: "es", notificaciones: true };
localStorage.setItem("config", JSON.stringify(configuracion));

// Recuperar objetos
let configGuardada = JSON.parse(localStorage.getItem("config"));
```

### Geolocalización

```javascript
// Obtener ubicación actual
navigator.geolocation.getCurrentPosition(
  // Éxito
  (posicion) => {
    console.log(`Latitud: ${posicion.coords.latitude}`);
    console.log(`Longitud: ${posicion.coords.longitude}`);
    console.log(`Precisión: ${posicion.coords.accuracy} metros`);
  },
  // Error
  (error) => {
    console.error(`Error (${error.code}): ${error.message}`);
  },
  // Opciones
  {
    enableHighAccuracy: true,  // Mayor precisión (consume más batería)
    timeout: 5000,             // Tiempo máximo (ms)
    maximumAge: 0              // No usar caché
  }
);

// Seguimiento continuo
let watchId = navigator.geolocation.watchPosition(
  (posicion) => console.log(posicion.coords.latitude),
  (error) => console.error(error)
);

// Detener seguimiento
navigator.geolocation.clearWatch(watchId);
```

### Notificaciones

```javascript
// Pedir permiso
Notification.requestPermission().then(permiso => {
  if (permiso === 'granted') {
    console.log("Permiso concedido");
  }
});

// Mostrar notificación
function mostrarNotificacion() {
  if (Notification.permission === 'granted') {
    let notificacion = new Notification('Nuevo mensaje', {
      body: 'Has recibido un mensaje nuevo',
      icon: '/icono.png'
    });
    
    // Eventos
    notificacion.onclick = () => {
      window.focus();
      notificacion.close();
    };
    
    // Cerrar automáticamente
    setTimeout(() => notificacion.close(), 5000);
  }
}
```

### Canvas

```javascript
// Obtener contexto
let canvas = document.getElementById('miCanvas');
let ctx = canvas.getContext('2d');

// Dibujar rectángulo
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 50);  // x, y, ancho, alto

// Dibujar línea
ctx.beginPath();
ctx.moveTo(10, 100);  // Punto inicial
ctx.lineTo(110, 100); // Punto final
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.stroke();

// Dibujar círculo
ctx.beginPath();
ctx.arc(60, 200, 50, 0, 2 * Math.PI);  // x, y, radio, ángulo inicio, ángulo fin
ctx.fillStyle = 'green';
ctx.fill();
ctx.strokeStyle = 'black';
ctx.stroke();

// Texto
ctx.font = '24px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hola Canvas', 20, 300);
```

### Drag and Drop

```javascript
// Elemento arrastrable
let elemento = document.getElementById('arrastrable');

elemento.draggable = true;  // Hacer elemento arrastrable

elemento.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('arrastrando');
});

elemento.addEventListener('dragend', (e) => {
  e.target.classList.remove('arrastrando');
});

// Zona de destino
let destino = document.getElementById('destino');

destino.addEventListener('dragover', (e) => {
  e.preventDefault();  // Necesario para permitir soltar
  destino.classList.add('hover');
});

destino.addEventListener('dragleave', () => {
  destino.classList.remove('hover');
});

destino.addEventListener('drop', (e) => {
  e.preventDefault();
  destino.classList.remove('hover');
  
  let id = e.dataTransfer.getData('text/plain');
  let elementoArrastrado = document.getElementById(id);
  
  destino.appendChild(elementoArrastrado);
});
```

## 17. Testing en JavaScript

### Jest (Framework de Testing)

```javascript
// Archivo a testear: math.js
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

// Archivo de test: math.test.js
import { sumar, restar } from './math';

// Tests simples
test('sumar 1 + 2 es igual a 3', () => {
  expect(sumar(1, 2)).toBe(3);
});

test('restar 5 - 2 es igual a 3', () => {
  expect(restar(5, 2)).toBe(3);
});

// Con describe para agrupar
describe('Funciones matemáticas', () => {
  test('sumar funciona con números negativos', () => {
    expect(sumar(-1, -2)).toBe(-3);
  });
  
  test('restar funciona con decimales', () => {
    expect(restar(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

// Matchers comunes
test('Ejemplos de matchers', () => {
  expect(2 + 2).toBe(4);               // Igualdad exacta
  expect({a: 1}).toEqual({a: 1});      // Igualdad de estructura
  expect(null).toBeNull();             // Es null
  expect(undefined).toBeUndefined();   // Es undefined
  expect(true).toBeTruthy();           // Es truthy
  expect(false).toBeFalsy();           // Es falsy
  expect([1, 2, 3]).toContain(2);      // Contiene elemento
  expect(5).toBeGreaterThan(3);        // Mayor que
  expect(() => { throw new Error() }).toThrow(); // Lanza error
});
```

### Mocks y Spies

```javascript
// Función a testear
function llamarCallback(callback) {
  callback('datos');
}

// Test con mock
test('callback es llamado con datos', () => {
  const mockCallback = jest.fn();
  llamarCallback(mockCallback);
  
  expect(mockCallback).toHaveBeenCalled();
  expect(mockCallback).toHaveBeenCalledWith('datos');
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

// Mocks más complejos
test('mock personalizado', () => {
  const mockFn = jest.fn()
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('hello')
    .mockReturnValue(true);
  
  console.log(mockFn(), mockFn(), mockFn(), mockFn());
  // 10, 'hello', true, true
});

// Spies (espías)
import { objeto } from './module';

test('espiar un método', () => {
  const spy = jest.spyOn(objeto, 'metodo');
  objeto.metodo('test');
  
  expect(spy).toHaveBeenCalledWith('test');
  
  // Restaurar la implementación original
  spy.mockRestore();
});
```

## 18. Depuración (Debugging)

### Console

```javascript
// Métodos básicos
console.log("Mensaje informativo");
console.info("Información");
console.warn("Advertencia");
console.error("Error");

// Agrupación
console.group("Grupo 1");
console.log("Mensaje dentro del grupo");
console.log("Otro mensaje");
console.groupEnd();

// Tabla
console.table([
  { nombre: "Juan", edad: 30 },
  { nombre: "Ana", edad: 25 }
]);

// Tiempo
console.time("Operación");
// ... código a medir
console.timeEnd("Operación");  // "Operación: 25.123ms"

// Seguimiento de pila
console.trace("Seguimiento");

// Estilizar consola
console.log("%cTexto estilizado", "color: blue; font-size: 20px");
```

### Debugger

```javascript
function calcular() {
  let a = 10;
  let b = 5;
  
  debugger;  // El navegador pausa aquí cuando las herramientas de desarrollo están abiertas
  
  let resultado = a * b;
  return resultado;
}
```

## 19. Rendimiento y Optimización

### Performance API

```javascript
// Medir tiempo de ejecución
performance.mark("inicio");

// Código a medir
for (let i = 0; i < 1000000; i++) {
  // Operación costosa
}

performance.mark("fin");
performance.measure("Duración", "inicio", "fin");

const medidas = performance.getEntriesByName("Duración");
console.log(`Duración: ${medidas[0].duration}ms`);

// Limpiar marcas
performance.clearMarks();
performance.clearMeasures();
```

### Web Workers

```javascript
// En el archivo principal.js
if (window.Worker) {
  // Crear worker
  const worker = new Worker('worker.js');
  
  // Enviar mensaje al worker
  worker.postMessage({
    comando: 'calcular',
    datos: [1, 2, 3, 4, 5]
  });
  
  // Recibir resultados
  worker.onmessage = function(e) {
    console.log('Resultado recibido del worker:', e.data);
  };
  
  // Manejar errores
  worker.onerror = function(error) {
    console.error('Error en el worker', error);
  };
  
  // Terminar worker cuando ya no se necesite
  // worker.terminate();
}

// En el archivo worker.js
self.onmessage = function(e) {
  const { comando, datos } = e.data;
  
  if (comando === 'calcular') {
    // Hacer cálculos intensivos sin bloquear el hilo principal
    const resultado = datos.map(x => x * x).reduce((a, b) => a + b, 0);
    
    // Devolver resultado
    self.postMessage(resultado);
  }
};
```

## 20. JavaScript de Servidor (Node.js)

### Módulos en Node.js

```javascript
// Exportar (archivo: utils.js)
const PI = 3.14159;

function sumar(a, b) {
  return a + b;
}

module.exports = {
  PI,
  sumar,
  restar: function(a, b) {
    return a - b;
  }
};

// Importar (archivo: app.js)
const utils = require('./utils');
console.log(utils.PI);        // 3.14159
console.log(utils.sumar(2, 3)); // 5

// Desestructuración al importar
const { PI, restar } = require('./utils');
console.log(PI);              // 3.14159
console.log(restar(10, 5));   // 5
```

### npm y package.json

```javascript
// Iniciar proyecto
// npm init

// Instalar paquete
// npm install express

// package.json ejemplo
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Descripción del proyecto",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15",
    "jest": "^27.5.1"
  }
}

// Usar paquetes
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
```

### Sistema de archivos (fs)

```javascript
const fs = require('fs');

// Operaciones síncronas (bloqueantes)
try {
  // Leer archivo
  const datos = fs.readFileSync('archivo.txt', 'utf8');
  console.log(datos);
  
  // Escribir archivo
  fs.writeFileSync('nuevo.txt', 'Contenido nuevo');
  
  // Comprobar si existe
  const existe = fs.existsSync('archivo.txt');
} catch (error) {
  console.error('Error:', error);
}

// Operaciones asíncronas (no bloqueantes)
fs.readFile('archivo.txt', 'utf8', (error, datos) => {
  if (error) {
    console.error('Error al leer:', error);
    return;
  }
  console.log(datos);
});

fs.writeFile('nuevo.txt', 'Contenido nuevo', (error) => {
  if (error) {
    console.error('Error al escribir:', error);
  }
});

// Con promesas
const fsPromises = require('fs').promises;

async function manejarArchivos() {
  try {
    const datos = await fsPromises.readFile('archivo.txt', 'utf8');
    console.log(datos);
    
    await fsPromises.writeFile('nuevo.txt', 'Contenido con promesas');
    console.log('Archivo escrito');
  } catch (error) {
    console.error('Error:', error);
  }
}
```
