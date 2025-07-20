---
layout: default
title: "TypeScript Moderno: Curso Completo"
description: "Domina TypeScript desde los fundamentos hasta temas avanzados"
permalink: /lessons/js/course-typescript/
category: lessons
subcategory: "web development"
icon: 📜
article: true
---

## ✨ Introducción al curso

Bienvenido a este curso de TypeScript. Aquí aprenderás desde los fundamentos hasta técnicas modernas para crear aplicaciones web robustas y escalables.  
No necesitas conocimientos previos de TypeScript, solo familiaridad con JavaScript y un editor de código.

**¿Qué encontrarás en este curso?**

- Explicaciones claras con ejemplos prácticos modernos
- Diferencias clave entre TypeScript y JavaScript
- Ejercicios prácticos con soluciones explicadas
- Proyectos finales para consolidar tus conocimientos
- Buenas prácticas y patrones de diseño con tipos
- Glosario y recursos recomendados

---

## 📝 Glosario de términos clave

| Término            | Definición breve |
|--------------------|-----------------|
| Tipo               | Define la estructura de datos que una variable puede contener |
| Interfaz           | Contrato que define la forma de un objeto |
| Genérico           | Tipo que puede trabajar con múltiples tipos de datos |
| Decorador          | Patrón para añadir funcionalidad a clases/métodos |
| Union Type         | Tipo que puede ser uno de varios tipos |
| Type Inference     | Capacidad de TS para inferir tipos automáticamente |
| Type Assertion     | Indicación explícita del tipo de un valor |
| Módulo             | Sistema para organizar código en archivos separados |
| Compilador         | Herramienta que transforma TS a JS |
| Declaration Files  | Archivos .d.ts que describen tipos de librerías JS |

---

## 🦾 Buenas prácticas y patrones modernos

- Usa tipos explícitos para APIs públicas e implícitos donde sea obvio
- Prefiere interfaces sobre types para objetos y clases
- Usa genéricos para crear componentes reutilizables
- Aprovecha los tipos literales para mayor seguridad
- Organiza tu código en módulos lógicos
- Usa strict mode en tsconfig.json
- Escribe archivos de declaración para extender librerías JS
- Utiliza utility types (Partial, Pick, Omit) cuando sea apropiado
- Documenta tipos complejos con comentarios JSDoc

---

## ♿ Accesibilidad y seguridad con TypeScript

- Usa tipos estrictos para validar datos de entrada del usuario
- Define tipos precisos para propiedades accesibles (ARIA)
- Crea tipos discriminados para estados de UI accesibles
- Usa never para casos inalcanzables en switches exhaustivos
- Aprovecha las aserciones de tipo para DOM seguro
- Implementa guards de tipo para validación en runtime

---

## 🏋️‍♂️ Ejercicios prácticos

Cada sección incluye ejercicios para practicar. ¡Intenta resolverlos antes de ver la solución!

---

## 1️⃣ Fundamentos de TypeScript

### Descripción

Aprenderás qué es TypeScript, cómo configurarlo y las diferencias clave con JavaScript.

---

## 📖 ¿Qué es TypeScript?

TypeScript es un superset tipado de JavaScript que compila a JavaScript puro. Desarrollado por Microsoft, añade tipos estáticos y herramientas avanzadas a JS.

### Ventajas

- Detección temprana de errores
- Mejor autocompletado y documentación en el editor
- Código más mantenible y escalable
- Compatibilidad con todo el ecosistema JavaScript
- Funcionalidades futuras de JS hoy (decoradores, etc.)

---

## 📖 Configuración inicial

1. Instalar TypeScript globalmente:

```bash
npm install -g typescript
```

2. Inicializar proyecto:

```bash
tsc --init
```

3. Configurar tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

---

## 📖 Tipos básicos

```typescript
let nombre: string = "Ana";
let edad: number = 25;
let activo: boolean = true;
let lista: number[] = [1, 2, 3];
let tupla: [string, number] = ["Ana", 25]; // Arreglo con tipos fijos
enum Color {Rojo, Verde, Azul}; // Enumeraciones
let cualquiera: any = "puede ser cualquier cosa"; // Evitar cuando sea posible
let vacio: void = undefined; // Para funciones sin retorno
let nulo: null = null;
let indefinido: undefined = undefined;
let nunca: never; // Para funciones que nunca retornan
```

---

## 📖 Interfaces

Definen la forma de un objeto:

```typescript
interface Usuario {
  nombre: string;
  edad: number;
  direccion?: string; // Opcional
}

let usuario: Usuario = {
  nombre: "Ana",
  edad: 25
};
```

---

## 📖 Funciones tipadas

```typescript
function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}

// Función flecha con tipo
const sumar = (a: number, b: number): number => a + b;

// Parámetros opcionales
function nombreCompleto(nombre: string, apellido?: string): string {
  return apellido ? `${nombre} ${apellido}` : nombre;
}

// Valores por defecto
function multiplicar(a: number, b: number = 1): number {
  return a * b;
}
```

---

## 📖 Clases

```typescript
class Persona {
  // Propiedades
  nombre: string;
  private edad: number; // Privado
  
  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }
  
  // Método
  saludar(): string {
    return `Hola, soy ${this.nombre}`;
  }
}

let ana = new Persona("Ana", 25);
console.log(ana.saludar());
```

---

## 2️⃣ Tipos avanzados

### Union Types

```typescript
let id: string | number;
id = "ABC123"; // OK
id = 123; // OK
id = true; // Error
```

### Type Aliases

```typescript
type ID = string | number;
let userId: ID = "ABC123";
```

### Literal Types

```typescript
type Direccion = "norte" | "sur" | "este" | "oeste";
let direccion: Direccion = "norte";
```

---

## 📖 Genéricos

Permiten crear componentes reutilizables:

```typescript
function identidad<T>(arg: T): T {
  return arg;
}

let salida = identidad<string>("hola");
let salida2 = identidad<number>(42);

// Con interfaces
interface Caja<T> {
  contenido: T;
}

let cajaString: Caja<string> = { contenido: "hola" };
let cajaNumero: Caja<number> = { contenido: 42 };
```

---

## 📖 Utility Types

TypeScript provee tipos útiles:

```typescript
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
}

// Partial: todas las propiedades opcionales
type UsuarioParcial = Partial<Usuario>;

// Pick: selecciona propiedades específicas
type UsuarioBasico = Pick<Usuario, "nombre" | "email">;

// Omit: excluye propiedades
type UsuarioSinEmail = Omit<Usuario, "email">;

// Record: crea un tipo con propiedades de un tipo específico
type UsuariosPorId = Record<string, Usuario>;
```

---

## 3️⃣ Módulos y Namespaces

### Módulos ES6

```typescript
// math.ts
export function sumar(a: number, b: number): number {
  return a + b;
}

// app.ts
import { sumar } from './math';
console.log(sumar(2, 3));
```

### Namespaces

```typescript
namespace Validacion {
  export function esEmail(valor: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }
}

let email = "test@example.com";
console.log(Validacion.esEmail(email));
```

---

## 4️⃣ Decoradores

(Requieren activar `experimentalDecorators` en tsconfig.json)

```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Llamando a ${key} con`, args);
    const resultado = original.apply(this, args);
    console.log(`Resultado:`, resultado);
    return resultado;
  };
  
  return descriptor;
}

class Calculadora {
  @log
  sumar(a: number, b: number): number {
    return a + b;
  }
}
```

---

## 5️⃣ TypeScript con DOM

```typescript
// Type assertions para elementos del DOM
const boton = document.getElementById("miBoton") as HTMLButtonElement;
const input = document.querySelector("input[type='text']") as HTMLInputElement;

// Manejador de eventos tipado
boton.addEventListener("click", (event: MouseEvent) => {
  console.log(`Hola, ${input.value}`);
  input.value = ""; // Limpiar input
});

// Creación dinámica de elementos
const div = document.createElement("div");
div.textContent = "Nuevo elemento";
document.body.appendChild(div);
```

---

## 6️⃣ TypeScript con APIs modernas

### Fetch API con tipos

```typescript
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function obtenerPosts(): Promise<Post[]> {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await respuesta.json();
}

obtenerPosts().then(posts => {
  posts.forEach(post => console.log(post.title));
});
```

---

## 7️⃣ Proyectos reales con TypeScript

### Configuración para React

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Componente React tipado

```typescript
interface Props {
  nombre: string;
  edad?: number;
}

const Saludo: React.FC<Props> = ({ nombre, edad = 25 }) => {
  return (
    <div>
      Hola, {nombre}. Tienes {edad} años.
    </div>
  );
};
```

### Uso de Hooks con TypeScript

```typescript
import React, { useState } from "react";
const Contador: React.FC = () => {
  const [contador, setContador] = useState(0);
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
};
```

### Uso de TypeScript con React Router

```typescript
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};
```
