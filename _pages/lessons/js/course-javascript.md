---
layout: default
title: "JavaScript Moderno: Curso de nivel Principiantes"
description: "Aprende desde cero los conceptos esenciales de JavaScript y adquiere una base sólida para crear aplicaciones web interactivas, comprendiendo buenas prácticas y herramientas modernas desde el inicio."
permalink: /lessons/js/course-javascript/
category: lessons
subcategory: "web development"
icon: 🚀
article: true
---

## 🎯 Objetivos del Curso (Nivel Principiante)

Al finalizar este curso serás capaz de:

- ✅ Comprender qué es JavaScript y cómo se integra en la web
- ✅ Configurar un entorno de desarrollo profesional desde cero
- ✅ Escribir, ejecutar y depurar tu primer código JavaScript
- ✅ Utilizar variables, tipos de datos y operadores fundamentales
- ✅ Manipular la consola del navegador para pruebas y debugging
- ✅ Aplicar buenas prácticas básicas en la organización de tu código
- ✅ Sentar las bases para avanzar hacia proyectos y conceptos más avanzados en el [nivel intermedio del curso](/lessons/js/course-javascript-2nd-level/)

---

## 📖 Glosario de Términos

| Término | Definición | Ejemplo |
|---------|------------|---------|
| **Variable** | Contenedor para almacenar datos | `let nombre = "Ana"` |
| **Función** | Bloque de código reutilizable | `function saludar() {...}` |
| **Callback** | Función pasada como argumento | `array.map(callback)` |
| **Promesa** | Objeto para operaciones asíncronas | `fetch().then()` |
| **DOM** | Representación del documento HTML | `document.querySelector()` |
| **API** | Interfaz para comunicación entre sistemas | REST API, Fetch API |
| **Closure** | Función que mantiene acceso a su scope padre | Variables privadas |
| **Hoisting** | Elevación de declaraciones | `var` vs `let`/`const` |
| **Event Loop** | Mecanismo de asincronía de JS | Callbacks, Promesas |
| **Module** | Archivo con código exportable/importable | ES6 modules |

---

## Módulo 1: Fundamentos y Configuración

*⏱️ Tiempo estimado: 4-5 horas*

### 📋 Prerequisites

- Conocimientos básicos de HTML y CSS
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)

### 🎯 Objetivos del Módulo

- Configurar entorno de desarrollo profesional
- Entender qué es JavaScript y cómo funciona
- Dominar las herramientas de desarrollo del navegador
- Escribir y ejecutar tu primer código JavaScript

---

### 📖 ¿Qué es JavaScript?

JavaScript es un lenguaje de programación interpretado, dinámico y de alto nivel que:

- **Se ejecuta en el navegador** para crear interactividad en páginas web
- **Se ejecuta en el servidor** con Node.js para backend
- **Es orientado a objetos** basado en prototipos
- **Es débilmente tipado** (tipos se determinan en tiempo de ejecución)
- **Tiene un event loop** para manejar asincronía

#### Historia y Evolución

- **1995:** Creado por Brendan Eich en 10 días
- **2009:** Node.js permite JavaScript en servidor
- **2015:** ES6/ES2015 moderniza el lenguaje
- **2025:** JavaScript es el lenguaje más usado del mundo

#### ¿Por qué Aprender JavaScript?

✅ **Versatilidad:** Frontend, backend, mobile, desktop  
✅ **Demanda laboral:** Millones de trabajos disponibles  
✅ **Comunidad:** Ecosistema gigante de librerías  
✅ **Evolución constante:** Nuevas features cada año  

---

### 🛠️ Configuración del Entorno de Desarrollo

#### 1. Editor de Código: VS Code

```bash
# Descargar VS Code desde: https://code.visualstudio.com/

# Extensiones esenciales:
- JavaScript (ES6) code snippets
- Prettier - Code formatter
- ESLint
- Live Server
- Bracket Pair Colorizer
```

#### 2. Navegador y DevTools

```javascript
// Abrir DevTools en cualquier navegador:
// Windows/Linux: F12 o Ctrl+Shift+I
// Mac: Cmd+Option+I

// Pestañas importantes:
// - Console: Para ejecutar código y ver logs
// - Sources: Para debugging con breakpoints
// - Network: Para ver peticiones HTTP
// - Application: Para localStorage, cookies, etc.
```

#### 3. Configuración de Proyecto

```html
<!-- estructura-proyecto/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── images/ -->

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Primer Proyecto JavaScript</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Hola JavaScript</h1>
    <div id="app"></div>
    
    <!-- Siempre al final del body -->
    <script src="js/main.js"></script>
</body>
</html>
```

---

### 📖 Formas de Incluir JavaScript

#### 1. Código Inline (No recomendado para producción)

```html
<button onclick="alert('¡Hola!')">Click aquí</button>
```

#### 2. Script Interno

```html
<script>
    // Bueno para código específico de una página
    console.log("Código interno");
    
    function miFuncion() {
        return "Función interna";
    }
</script>
```

#### 3. Archivo Externo (Recomendado)

```html
<!-- En el <head> con defer -->
<script defer src="js/main.js"></script>

<!-- Al final del <body> -->
<script src="js/main.js"></script>
```

```javascript
// js/main.js
console.log("Código desde archivo externo");

// Mejor organización y reutilización
function inicializarApp() {
    console.log("App inicializada");
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);
```

#### ⚡ Mejores Prácticas

```html
<!-- ✅ BUENO: Con defer para cargar sin bloquear -->
<script defer src="js/main.js"></script>

<!-- ✅ BUENO: Al final del body -->
<script src="js/main.js"></script>

<!-- ❌ MALO: En head sin defer -->
<script src="js/main.js"></script>

<!-- ❌ MALO: Código inline -->
<button onclick="hacerAlgo()">Click</button>
```

---

### 📖 Herramientas de Desarrollo

#### Console: Tu Mejor Amigo

```javascript
// Tipos de logs
console.log("Información general");
console.info("Información importante");
console.warn("Advertencia");
console.error("Error crítico");

// Logs con estilo
console.log("%cTexto grande y rojo", "color: red; font-size: 20px;");

// Agrupar logs
console.group("Mi Grupo");
console.log("Log dentro del grupo");
console.groupEnd();

// Medir tiempo
console.time("operacion");
// ... código ...
console.timeEnd("operacion"); // operacion: 1.234ms

// Mostrar objetos en tabla
console.table([{nombre: "Ana", edad: 25}, {nombre: "Luis", edad: 30}]);
```

#### Debugging con Breakpoints

```javascript
// Usando debugger statement
function calculadora(a, b, operacion) {
    debugger; // Pausa ejecución aquí
    
    switch(operacion) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        default:
            console.error("Operación no válida");
    }
}

// El navegador pausará aquí cuando llegue a esta línea
```

---

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Configuración Básica

```javascript
// 1. Crear estructura de proyecto
// 2. Configurar VS Code con extensiones
// 3. Escribir este código en main.js:

console.log("¡Hola Mundo!");
console.log("Mi nombre es [TU_NOMBRE]");
console.log("Fecha actual:", new Date().toLocaleDateString());

// Verificar que aparezca en la consola del navegador
```

#### Ejercicio 2: Explorando la Console

```javascript
// Experimenta con diferentes tipos de console:
console.log("Log normal");
console.warn("Este es un warning");
console.error("Este es un error");

// Crea un objeto y muéstralo en tabla:
const estudiante = {
    nombre: "Ana",
    edad: 22,
    curso: "JavaScript"
};

console.table(estudiante);

// Mide cuánto tarda este código:
console.time("bucle");
for(let i = 0; i < 1000; i++) {
    // bucle vacío
}
console.timeEnd("bucle"); // bucle: 1.234ms
```

#### Ejercicio 3: Debugging Básico

```javascript
// Copia este código y usa breakpoints para entender el flujo:
function saludar(nombre, apellido) {
    debugger; // Coloca breakpoint aquí
    
    const nombreCompleto = nombre + " " + apellido;
    const saludo = "Hola " + nombreCompleto;
    
    console.log(saludo);
    return saludo;
}

saludar("Ana", "García");
saludar("Luis", "Martínez");
```

---

## Módulo 2: Variables, Tipos de Datos y Operadores

*⏱️ Tiempo estimado: 6-7 horas*

### 📋 Prerequisites

- Módulo 1 completado
- Entorno de desarrollo configurado
- Conocimiento básico de la console del navegador

### 🎯 Objetivos del Módulo

- Dominar la declaración y uso de variables modernas
- Entender todos los tipos de datos de JavaScript
- Aplicar operadores en contextos reales
- Manejar coerción y comparación de tipos

---

### 📖 Variables en JavaScript Moderno

#### Evolución de Variables

```javascript
// ❌ ANTIGUO: var (evitar en código nuevo)
var nombre = "Ana";
var nombre = "Luis"; // Redeclaración permitida (problemático)
console.log(nombre); // "Luis"

// ✅ MODERNO: let y const (ES6+)
let edad = 25;           // Variable que puede cambiar
const PI = 3.14159;      // Constante, no puede cambiar

// edad = 26;            // ✅ Permitido
// PI = 3.14;            // ❌ Error: Assignment to constant variable
```

#### Scope (Alcance) de Variables

```javascript
// Global scope
const globalVar = "Soy global";

function ejemploScope() {
    // Function scope
    const funcionVar = "Soy de función";
    
    if (true) {
        // Block scope
        let blockVar = "Soy de bloque";
        const blockConst = "También de bloque";
        
        console.log(globalVar);    // ✅ Accesible
        console.log(funcionVar);   // ✅ Accesible
        console.log(blockVar);     // ✅ Accesible
    }
    
    // console.log(blockVar);      // ❌ Error: not defined
    console.log(funcionVar);       // ✅ Accesible
}

// console.log(funcionVar);        // ❌ Error: not defined
```

#### Hoisting Explicado

```javascript
// Lo que escribes:
console.log(miVar);    // undefined (no error)
var miVar = "Hola";

// Lo que JavaScript interpreta:
var miVar;             // Declaración se eleva
console.log(miVar);    // undefined
miVar = "Hola";        // Asignación permanece aquí

// Con let y const:
// console.log(miLet);    // ❌ ReferenceError: Cannot access before initialization
let miLet = "Hola";
```

#### Reglas para Naming

```javascript
// ✅ VÁLIDO
let nombre = "Ana";
let _privado = "secreto";
let $elemento = document.querySelector('div');
let camelCase = "recomendado";
let numero1 = 1;

// ❌ INVÁLIDO
// let 1numero = 1;        // No puede empezar con número
// let mi-variable = 1;    // No guiones
// let function = 1;       // Palabra reservada
// let let = 1;            // Palabra reservada
```

---

### 📖 Tipos de Datos Primitivos

#### 1. String (Cadenas de Texto)

```javascript
// Formas de declarar strings
let nombre = "Ana";           // Comillas dobles
let apellido = 'García';      // Comillas simples
let mensaje = `Hola ${nombre}`; // Template literals (backticks)

// Template literals: el poder de ES6+
const edad = 25;
const presentacion = `
    Hola, mi nombre es ${nombre} ${apellido}.
    Tengo ${edad} años.
    El año que viene tendré ${edad + 1} años.
`;

console.log(presentacion);
```

##### Métodos Esenciales de String

```javascript
const texto = "  JavaScript es genial  ";

// Información básica
console.log(texto.length);                    // 22
console.log(texto[0]);                        // " "
console.log(texto.charAt(2));                 // "J"

// Búsqueda
console.log(texto.indexOf("Script"));         // 4
console.log(texto.includes("genial"));        // true
console.log(texto.startsWith("  Java"));      // true
console.log(texto.endsWith("genial  "));      // true

// Transformación
console.log(texto.toLowerCase());             // "  javascript es genial  "
console.log(texto.toUpperCase());             // "  JAVASCRIPT ES GENIAL  "
console.log(texto.trim());                    // "JavaScript es genial"
console.log(texto.replace("genial", "awesome")); // "  JavaScript es awesome  "

// División y unión
const palabras = texto.trim().split(" ");     // ["JavaScript", "es", "genial"]
console.log(palabras.join("-"));              // "JavaScript-es-genial"

// Subcadenas
console.log(texto.slice(2, 12));              // "JavaScript"
console.log(texto.substring(2, 12));          // "JavaScript"
console.log(texto.substr(2, 10));             // "JavaScript"
```

#### 2. Number (Números)

```javascript
// Tipos de números
let entero = 42;
let decimal = 3.14159;
let negativo = -17;
let cientifico = 1.2e6;        // 1,200,000
let hexadecimal = 0xFF;        // 255
let binario = 0b1010;          // 10
let octal = 0o755;             // 493

// Valores especiales
console.log(1 / 0);            // Infinity
console.log(-1 / 0);           // -Infinity
console.log("texto" * 2);      // NaN (Not a Number)

// Verificaciones
console.log(Number.isInteger(42));      // true
console.log(Number.isInteger(42.0));    // true
console.log(Number.isInteger(42.1));    // false
console.log(Number.isNaN(NaN));         // true
console.log(Number.isFinite(42));       // true
console.log(Number.isFinite(Infinity)); // false
```

##### Métodos de Number

```javascript
const numero = 123.456789;

// Formateo
console.log(numero.toFixed(2));           // "123.46"
console.log(numero.toPrecision(5));       // "123.46"
console.log(numero.toExponential(2));     // "1.23e+2"

// Conversiones
console.log(parseInt("123.456"));         // 123
console.log(parseFloat("123.456"));       // 123.456
console.log(Number("123.456"));           // 123.456
console.log(+"123.456");                  // 123.456 (conversión implícita)

// Rangos seguros
console.log(Number.MAX_SAFE_INTEGER);     // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);     // -9007199254740991
```

#### 3. BigInt (Números Grandes)

```javascript
// Para números mayores que Number.MAX_SAFE_INTEGER
const numeroGrande = 1234567890123456789012345678901234567890n;
const otroBigInt = BigInt("1234567890123456789012345678901234567890");

console.log(numeroGrande);
console.log(typeof numeroGrande);         // "bigint"

// Operaciones con BigInt
const suma = numeroGrande + 100n;         // Solo con otros BigInt
// const error = numeroGrande + 100;      // ❌ Error: Cannot mix BigInt and other types
```

#### 4. Boolean (Booleanos)

```javascript
let esVerdadero = true;
let esFalso = false;

// Valores que se evalúan como false (falsy)
console.log(Boolean(false));      // false
console.log(Boolean(0));          // false
console.log(Boolean(-0));         // false
console.log(Boolean(0n));         // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false

// Todo lo demás es truthy
console.log(Boolean("0"));        // true (string no vacío)
console.log(Boolean(" "));        // true (string con espacio)
console.log(Boolean([]));         // true (array vacío)
console.log(Boolean({}));         // true (objeto vacío)
console.log(Boolean(function(){})); // true (función)
```

#### 5. Undefined y Null

```javascript
// undefined: variable declarada pero no asignada
let sinAsignar;
console.log(sinAsignar);          // undefined
console.log(typeof sinAsignar);   // "undefined"

// null: ausencia intencional de valor
let vacio = null;
console.log(vacio);               // null
console.log(typeof vacio);        // "object" (bug histórico de JS)

// Comparaciones
console.log(undefined == null);   // true (coerción)
console.log(undefined === null);  // false (strict equality)
```

#### 6. Symbol (Único en ES6+)

```javascript
// Símbolos: valores únicos e inmutables
const sym1 = Symbol('descripcion');
const sym2 = Symbol('descripcion');
console.log(sym1 === sym2);       // false (cada símbolo es único)

// Uso común: propiedades privadas de objetos
const PRIVATE_PROP = Symbol('private');
const objeto = {
    nombre: "público",
    [PRIVATE_PROP]: "privado"
};

console.log(objeto.nombre);       // "público"
console.log(objeto[PRIVATE_PROP]); // "privado"
```

---

### 📖 Tipos de Datos No Primitivos

#### Objects (Objetos)

```javascript
// Objeto literal
const persona = {
    nombre: "Ana",
    edad: 25,
    activo: true,
    hobbies: ["leer", "programar"],
    direccion: {
        calle: "Main St",
        numero: 123
    },
    saludar() {
        return `Hola, soy ${this.nombre}`;
    }
};

// Acceso a propiedades
console.log(persona.nombre);           // "Ana"
console.log(persona["edad"]);          // 25
console.log(persona.direccion.calle);  // "Main St"
console.log(persona.saludar());        // "Hola, soy Ana"

// Propiedades dinámicas
const propiedad = "nombre";
console.log(persona[propiedad]);       // "Ana"
```

#### Arrays (Arreglos)

```javascript
// Diferentes formas de crear arrays
const frutas = ["manzana", "banana", "uva"];
const numeros = new Array(1, 2, 3, 4, 5);
const mixto = ["texto", 42, true, null, {nombre: "Ana"}];

// Array con métodos modernos
const tareas = [
    {id: 1, texto: "Aprender JS", completada: false},
    {id: 2, texto: "Hacer ejercicio", completada: true},
    {id: 3, texto: "Leer libro", completada: false}
];

// Operaciones comunes
tareas.push({id: 4, texto: "Nueva tarea", completada: false});
const tareasCompletadas = tareas.filter(tarea => tarea.completada);
const textosTareas = tareas.map(tarea => tarea.texto);

console.log(tareasCompletadas);
console.log(textosTareas);
```

---

### 📖 Operadores en Profundidad

#### Operadores Aritméticos

```javascript
const a = 10;
const b = 3;

console.log(a + b);    // 13 - Suma
console.log(a - b);    // 7  - Resta
console.log(a * b);    // 30 - Multiplicación
console.log(a / b);    // 3.3333... - División
console.log(a % b);    // 1  - Módulo (resto)
console.log(a ** b);   // 1000 - Exponenciación (ES2016)

// Operadores de asignación
let x = 5;
x += 3;    // x = x + 3;  -> 8
x -= 2;    // x = x - 2;  -> 6
x *= 2;    // x = x * 2;  -> 12
x /= 3;    // x = x / 3;  -> 4
x %= 3;    // x = x % 3;  -> 1
x **= 2;   // x = x ** 2; -> 1

// Incremento y decremento
let i = 5;
console.log(i++);   // 5 (post-incremento: devuelve valor actual)
console.log(i);     // 6
console.log(++i);   // 7 (pre-incremento: incrementa y devuelve)
console.log(i--);   // 7 (post-decremento)
console.log(--i);   // 5 (pre-decremento)
```

#### Operadores de Comparación

```javascript
// Igualdad (==) vs Identidad (===)
console.log(5 == "5");     // true  (coerción de tipos)
console.log(5 === "5");    // false (sin coerción)
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// Desigualdad
console.log(5 != "5");     // false
console.log(5 !== "5");    // true

// Comparaciones relacionales
console.log(10 > 5);       // true
console.log(10 >= 10);     // true
console.log(5 < 3);        // false
console.log(5 <= 5);       // true

// Comparaciones con strings
console.log("a" < "b");    // true (orden alfabético)
console.log("Ana" < "Luis"); // true
```

#### Operadores Lógicos

```javascript
const esAdulto = edad => edad >= 18;
const tieneLicencia = true;
const edad = 20;

// AND lógico (&&)
const puedeConducir = esAdulto(edad) && tieneLicencia;
console.log(puedeConducir); // true

// OR lógico (||)
const esEstudiante = false;
const esMenor = edad < 18;
const tieneDescuento = esEstudiante || esMenor;
console.log(tieneDescuento); // false

// NOT lógico (!)
console.log(!true);         // false
console.log(!false);        // true
console.log(!!edad);        // true (conversión a boolean)

// Short-circuit evaluation
const usuario = null;
const nombre = usuario && usuario.nombre;        // null (evita error)
const nombreDefault = usuario?.nombre || "Invitado"; // "Invitado"
```

#### Operadores Modernos (ES2020+)

```javascript
// Nullish coalescing (??)
const configuracion = {
    tema: null,
    idioma: undefined,
    notifications: false
};

const tema = configuracion.tema ?? "claro";           // "claro"
const idioma = configuracion.idioma ?? "español";    // "español"
const notifs = configuracion.notifications ?? true;  // false (no es null/undefined)

// Optional chaining (?.)
const usuario = {
    perfil: {
        nombre: "Ana"
        // direccion no existe
    }
};

console.log(usuario?.perfil?.nombre);           // "Ana"
console.log(usuario?.perfil?.direccion?.calle); // undefined (no error)
console.log(usuario?.metodoInexistente?.());    // undefined (no error)

// Logical assignment (ES2021)
let valor = null;
valor ??= "valor por defecto";  // valor = valor ?? "valor por defecto"
console.log(valor); // "valor por defecto"
```

---

### 📖 Type Coercion (Coerción de Tipos)

#### Coerción Implícita

```javascript
// Suma: número + string = string
console.log(5 + "3");      // "53"
console.log("5" + 3);      // "53"
console.log(5 + 3 + "2");  // "82" (5+3=8, luego 8+"2"="82")
console.log("2" + 5 + 3);  // "253" ("2"+5="25", luego "25"+3="253")

// Otros operadores: string a número
console.log("5" - 3);      // 2
console.log("5" * 3);      // 15
console.log("5" / 2);      // 2.5
console.log("5" % 2);      // 1

// Booleanos en operaciones
console.log(true + 1);     // 2 (true = 1)
console.log(false + 1);    // 1 (false = 0)
```

#### Coerción Explícita

```javascript
// A número
console.log(Number("42"));      // 42
console.log(Number("42.5"));    // 42.5
console.log(Number("42px"));    // NaN
console.log(parseInt("42px"));  // 42
console.log(parseFloat("42.5px")); // 42.5
console.log(+"42");            // 42

// A string
console.log(String(42));        // "42"
console.log(String(true));      // "true"
console.log((42).toString());   // "42"

// A boolean
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(!!"hello");         // true (doble negación)
```

---

### 🏋️‍♂️ Ejercicios Prácticos

#### Ejercicio 1: Variables y Scope

```javascript
// Completa este código identificando los errores:
function ejemploScope() {
    const mensaje = "Hola desde función";
    
    if (true) {
        let contador = 0;
        const PI = 3.14159;
        
        // ¿Qué imprime cada console.log?
        console.log(mensaje);    // ?
        console.log(contador);   // ?
        console.log(PI);         // ?
    }
    
    // console.log(contador);   // ¿Error o no?
    // PI = 3.14;               // ¿Error o no?
}

ejemploScope();
```

#### Ejercicio 2: Manipulación de Strings

```javascript
// Crea una función que limpie y formatee nombres
function formatearNombre(nombreCompleto) {
    // Eliminar espacios extras, convertir a formato: "Apellido, Nombre"
    // Ejemplo: "  ana   garcia lopez  " → "Garcia Lopez, Ana"
    
    // Tu código aquí:
    const limpio = nombreCompleto.trim().toLowerCase();
    const partes = limpio.split(' ').filter(parte => parte.length > 0);
    const nombre = partes[0];
    const apellidos = partes.slice(1).join(' ');
    
    // Capitalizar primera letra de cada palabra
    const capitalizar = str => str.charAt(0).toUpperCase() + str.slice(1);
    
    return `${apellidos.split(' ').map(capitalizar).join(' ')}, ${capitalizar(nombre)}`;
}

// Probar:
console.log(formatearNombre("  ana   garcia lopez  "));
// Resultado esperado: "Garcia Lopez, Ana"
```

#### Ejercicio 3: Coerción y Comparaciones

```javascript
// Predice el resultado de cada expresión:
console.log(5 + "3" - 2);           // ?
console.log(true + false);          // ?
console.log("5" - - - 2);          // ?
console.log([] + []);               // ?
console.log([] + {});               // ?
console.log({} + []);               // ?
console.log(0 == false);            // ?
console.log(0 === false);           // ?
console.log("" == false);           // ?
console.log(null == undefined);     // ?
console.log(null === undefined);    // ?

// Respuestas:
// "53" - 2 = 51, 1, 7, "", "[object Object]", 0, true, false, true, true, false
```

#### Ejercicio 4: Operadores Modernos

```javascript
// Implementa una función segura para acceder a propiedades anidadas
function obtenerDireccionCompleta(usuario) {
    // Usar optional chaining y nullish coalescing
    const calle = usuario?.direccion?.calle ?? "No especificada";
    const numero = usuario?.direccion?.numero ?? "S/N";
    const ciudad = usuario?.direccion?.ciudad ?? "Ciudad no especificada";
    
    return `${calle} ${numero}, ${ciudad}`;
}

// Probar con diferentes objetos:
const usuario1 = {
    nombre: "Ana",
    direccion: {
        calle: "Main St",
        numero: 123,
        ciudad: "Madrid"
    }
};

const usuario2 = {
    nombre: "Luis"
    // Sin dirección
};

const usuario3 = {
    nombre: "María",
    direccion: {
        calle: "Broadway"
        // Sin número ni ciudad
    }
};

console.log(obtenerDireccionCompleta(usuario1));
console.log(obtenerDireccionCompleta(usuario2));
console.log(obtenerDireccionCompleta(usuario3));
```

---

### 💡 Mini Proyecto: Validador de Datos Personal

```javascript
// Crea un sistema de validación completo
class ValidadorPersona {
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    static validarEdad(edad) {
        const num = Number(edad);
        return !isNaN(num) && num >= 0 && num <= 120;
    }
    
    static validarTelefono(telefono) {
        // Formato: +34 123 456 789 o 123456789
        const soloNumeros = telefono.replace(/\D/g, '');
        return soloNumeros.length >= 9 && soloNumeros.length <= 12;
    }
    
    static formatearNombre(nombre) {
        return nombre
            .trim()
            .toLowerCase()
            .split(' ')
            .filter(palabra => palabra.length > 0)
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }
    
    static validarPersona(datos) {
        const errores = [];
        
        // Validar nombre
        if (!datos.nombre || datos.nombre.trim().length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
        }
        
        // Validar email
        if (!datos.email || !this.validarEmail(datos.email)) {
            errores.push("El email no tiene un formato válido");
        }
        
        // Validar edad
        if (!datos.edad || !this.validarEdad(datos.edad)) {
            errores.push("La edad debe ser un número entre 0 y 120");
        }
        
        // Validar teléfono (opcional)
        if (datos.telefono && !this.validarTelefono(datos.telefono)) {
            errores.push("El teléfono no tiene un formato válido");
        }
        
        return {
            valido: errores.length === 0,
            errores,
            datosLimpios: errores.length === 0 ? {
                nombre: this.formatearNombre(datos.nombre),
                email: datos.email.toLowerCase().trim(),
                edad: Number(datos.edad),
                telefono: datos.telefono?.replace(/\D/g, '') || null
            } : null
        };
    }
}

// Ejemplos de uso:
const casos = [
    {
        nombre: "  ana  garcia  ",
        email: "ANA@GMAIL.COM",
        edad: "25",
        telefono: "+34 123 456 789"
    },
    {
        nombre: "a",
        email: "email-invalido",
        edad: "abc",
        telefono: "123"
    }
];

casos.forEach((caso, index) => {
    console.log(`\n--- Caso ${index + 1} ---`);
    const resultado = ValidadorPersona.validarPersona(caso);
    
    if (resultado.valido) {
        console.log("✅ Datos válidos:", resultado.datosLimpios);
    } else {
        console.log("❌ Errores encontrados:");
        resultado.errores.forEach(error => console.log(`  - ${error}`));
    }
});
```

#### Has terminado el curso? 🎉

Para profundizar en javascript puedes seguir el siguiente nivel de curso: [nivel intermedio del curso](/lessons/js/course-javascript-2nd-level/)