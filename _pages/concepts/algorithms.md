---
layout: default
title: "Algoritmos"
description: "Algoritmos para principiantes: De lo simple a lo complejo"
permalink: /concepts/algorithms/
category: concepts
subcategory: algorithms
icon: 🧠
article: true
---

## 1. Fundamentos de Algoritmos

### ¿Qué es un Algoritmo?

Un algoritmo es un conjunto finito y ordenado de pasos que resuelve un problema específico.

**Ejemplo paso a paso** - Algoritmo para preparar un sándwich:

1. Tomar dos rebanadas de pan
2. Colocar jamón sobre una rebanada
3. Colocar queso sobre el jamón
4. Colocar la segunda rebanada de pan encima
5. El sándwich está listo

### Complejidad Algorítmica Básica

Mide la eficiencia de un algoritmo en términos de tiempo y espacio.

**Ejemplo sencillo** - Análisis de un algoritmo que suma elementos:

```go
func suma(arr []int) int{
    total := 0
    for i :=0; i < len(arr); i++ {
        total += arr[i]
    }
    return total
}
```

Análisis:

1. La inicialización toma tiempo constante: O(1)
2. El bucle se ejecuta n veces (n = tamaño del arreglo)
3. Complejidad total: O(n) - crece linealmente con el tamaño de entrada

## 2. Algoritmos de Búsqueda Simples

### Búsqueda Lineal

El método más sencillo: recorre el arreglo elemento por elemento.

**Ejemplo paso a paso:**

Buscando el valor 6 en [4, 2, 7, 1, 6, 9, 3]

1. ¿4 = 6? No
2. ¿2 = 6? No
3. ¿7 = 6? No
4. ¿1 = 6? No
5. ¿6 = 6? Sí, ¡Encontrado en la posición 4!

### Búsqueda Binaria

Más eficiente pero requiere un arreglo ordenado.

**Ejemplo paso a paso:**

Buscando el valor 7 en [1, 2, 3, 4, 5, 6, 7, 8, 9]

1. Mitad: 5 (índice 4)
2. 7 > 5, por lo que buscamos en la mitad derecha: [6, 7, 8, 9]
3. Mitad: 7 (índice 6 del arreglo original)
4. 7 = 7, ¡Encontrado!

## 3. Algoritmos de Ordenamiento Básicos

### Ordenamiento por Inserción

Simula cómo ordenamos cartas en nuestra mano.

**Ejemplo paso a paso:**

Ordenando [5, 2, 4, 6, 1, 3]

1. [5] está ordenado
2. Insertamos 2: [2, 5]
3. Insertamos 4: [2, 4, 5]
4. Insertamos 6: [2, 4, 5, 6]
5. Insertamos 1: [1, 2, 4, 5, 6]
6. Insertamos 3: [1, 2, 3, 4, 5, 6]

### Ordenamiento por Selección

Busca repetidamente el elemento mínimo y lo coloca al principio.

**Ejemplo paso a paso:**

Ordenando [64, 25, 12, 22, 11]

1. Mínimo = 11, intercambiamos con 64: [11, 25, 12, 22, 64]
2. Mínimo = 12, intercambiamos con 25: [11, 12, 25, 22, 64]
3. Mínimo = 22, intercambiamos con 25: [11, 12, 22, 25, 64]
4. Mínimo = 25, ya está en su lugar: [11, 12, 22, 25, 64]
5. Resultado: [11, 12, 22, 25, 64]

### Ordenamiento Burbuja

Compara pares adyacentes y los intercambia si están en orden incorrecto.

**Ejemplo paso a paso:**

Ordenando [5, 1, 4, 2, 8]

Primera pasada:

1. [5, 1, 4, 2, 8] → [1, 5, 4, 2, 8]
2. [1, 5, 4, 2, 8] → [1, 4, 5, 2, 8]
3. [1, 4, 5, 2, 8] → [1, 4, 2, 5, 8]
4. [1, 4, 2, 5, 8] (no hay cambio)

Segunda pasada:

1. [1, 4, 2, 5, 8] → [1, 4, 2, 5, 8]
2. [1, 4, 2, 5, 8] → [1, 2, 4, 5, 8]
3. [1, 2, 4, 5, 8] (no hay cambios)

Tercera pasada: sin cambios, terminamos con [1, 2, 4, 5, 8]

## 4. Estructuras de Datos Básicas

### Arreglos y Matrices

Colecciones indexadas de elementos del mismo tipo.

**Ejemplo paso a paso** - Operaciones con arreglos:

* Crear un arreglo: `arr = [10, 20, 30, 40, 50]`

```go
arr := []int{10, 20, 30, 40, 50}
```

* Acceder al elemento en posición 2: `arr[2]` = 30

```go
fmt.Println(arr[2])
```

* Modificar un elemento: `arr[1] = 25` → [10, 25, 30, 40, 50]

```go
arr[1] = 25
```

* Recorrer el arreglo:

```go
for i := 0; i < len(arr); i++ {
    fmt.Println(arr[i])
}

```

### Listas Enlazadas

Secuencia de nodos donde cada uno apunta al siguiente.

**Ejemplo paso a paso** - Creación de una lista enlazada simple:

1. Creamos el nodo con valor 10 (cabeza)
2. Creamos el nodo con valor 20 y lo conectamos a la cabeza
3. Creamos el nodo con valor 30 y lo conectamos al nodo anterior
4. Resultado: 10 → 20 → 30

## 5. Algoritmos Recursivos

Un algoritmo que se llama a sí mismo con un caso base para terminar.

**Ejemplo paso a paso** - Cálculo del factorial:

Factorial(4):

1. ¿4 = 0? No, entonces 4 * Factorial(3)
2. ¿3 = 0? No, entonces 3 * Factorial(2)
3. ¿2 = 0? No, entonces 2 * Factorial(1)
4. ¿1 = 0? No, entonces 1 * Factorial(0)
5. ¿0 = 0? Sí, devuelve 1
6. Subiendo: 1 * 1 = 1
7. Subiendo: 2 * 1 = 2
8. Subiendo: 3 * 2 = 6
9. Subiendo: 4 * 6 = 24
10. Resultado: Factorial(4) = 24

**Ejemplo paso a paso** - Secuencia de Fibonacci:

Fibonacci(5):

1. ¿5 <= 1? No
2. Calculamos Fibonacci(4) y Fibonacci(3)
        - Para Fibonacci(4):
        - ¿4 <= 1? No
        - Calculamos Fibonacci(3) y Fibonacci(2)
        - (seguimos el proceso recursivo)
        - Para Fibonacci(3):
        - (similar al anterior)

3. Resultado: Fibonacci(5) = 5

## 6. Algoritmos de Ordenamiento Avanzados

### Mergesort

Divide el arreglo a la mitad, ordena cada mitad y luego las combina.

**Ejemplo paso a paso:**

Arreglo: [5, 2, 4, 7, 1, 3, 6]

1. Dividimos en mitades:
        - [5, 2, 4] y [7, 1, 3, 6]
2. Seguimos dividiendo:
        - [5], [2, 4] y [7], [1, 3, 6]
        - [5], [2], [4] y [7], [1], [3, 6]
        - [5], [2], [4] y [7], [1], [3], [6]
3. Combinamos en orden:
        - [2, 5], [4] y [1, 7], [3, 6]
        - [2, 4, 5] y [1, 3, 6, 7]
        - [1, 2, 3, 4, 5, 6, 7]

### Quicksort

Utiliza la estrategia "divide y vencerás" con un elemento pivote.

**Ejemplo paso a paso:**

Ordenando [7, 2, 1, 6, 8, 5, 3, 4]

1. Elegimos un pivote (usemos 4)
2. Colocamos elementos menores a la izquierda y mayores a la derecha
        - [2, 1, 3] 4 [7, 6, 8, 5]
3. Recursivamente ordenamos los subarreglos
        - Para [2, 1, 3]:
            - Pivote: 3
            - [1, 2] 3 []
            - [1, 2] ya está ordenado: [1, 2, 3]
        - Para [7, 6, 8, 5]:
            - Pivote: 5
            - [] 5 [7, 6, 8]
            - Para [7, 6, 8]:
            - Pivote: 8
            - [7, 6] 8 []
            - Para [7, 6]:
                - Pivote: 6
                - [] 6 [7]
                - Resultado: [6, 7]
            - Resultado: [6, 7, 8]
            - Resultado: [5, 6, 7, 8]
4. Resultado final: [1, 2, 3, 4, 5, 6, 7, 8]

## 7. Estructuras de Datos Avanzadas

### Pilas y Colas

Estructuras con reglas específicas de acceso.

**Ejemplo paso a paso** - Operaciones con una pila:

1. Creamos una pila vacía: `pila = []`
2. Insertamos (push) elementos:
        - `pila.push(5)` → [5]
        - `pila.push(8)` → [5, 8]
        - `pila.push(3)` → [5, 8, 3]
3. Eliminamos (pop) elementos:
        - `pila.pop()` → devuelve 3, pila = [5, 8]
        - `pila.pop()` → devuelve 8, pila = [5]

### Árboles Binarios

Cada nodo tiene como máximo dos hijos.

**Ejemplo paso a paso** - Construcción de un árbol binario de búsqueda:

Insertamos: 5, 3, 7, 2, 4, 6, 8

```mermaid
graph TD
    A[5] -->|Paso 1| B[5]
    
    B -->|Paso 2: 3 < 5| C[5]
    C -->|Izquierda| D[3]
    
    C -->|Paso 3: 7 > 5| E[5]
    E -->|Izquierda| F[3]
    E -->|Derecha| G[7]
    
    E -->|Paso 4: 2 < 5, 2 < 3| H[5]
    H -->|Izquierda| I[3]
    I -->|Izquierda| J[2]
    H -->|Derecha| K[7]
    
    H -->|Paso 5: 4 < 5, 4 > 3| L[5]
    L -->|Izquierda| M[3]
    M -->|Izquierda| N[2]
    M -->|Derecha| O[4]
    L -->|Derecha| P[7]
    
    L -->|Paso 6: 6 > 5, 6 < 7| Q[5]
    Q -->|Izquierda| R[3]
    R -->|Izquierda| S[2]
    R -->|Derecha| T[4]
    Q -->|Derecha| U[7]
    U -->|Izquierda| V[6]
    
    Q -->|Paso 7: 8 > 5, 8 > 7| W[5]
    W -->|Izquierda| X[3]
    X -->|Izquierda| Y[2]
    X -->|Derecha| Z[4]
    W -->|Derecha| AA[7]
    AA -->|Izquierda| AB[6]
    AA -->|Derecha| AC[8]
```

El diagrama muestra paso a paso cómo se va construyendo el árbol binario de búsqueda al insertar cada elemento. El árbol final se ve así:

```mermaid
graph TD
    A[5] -->|Izquierda| B[3]
    A -->|Derecha| C[7]
    B -->|Izquierda| D[2]
    B -->|Derecha| E[4]
    C -->|Izquierda| F[6]
    C -->|Derecha| G[8]
```

### Recorridos en Árboles Binarios

Existen tres formas principales de recorrer un árbol binario:

```mermaid
graph TD
    A[Recorridos de Árboles Binarios] --> B[Preorden Raíz-Izquierda-Derecha]
    A --> C[Inorden Izquierda-Raíz-Derecha]
    A --> D[Postorden Izquierda-Derecha-Raíz]
    B --> E["Preorden para árbol ejemplo: 5, 3, 2, 4, 7, 6, 8"]
    C --> F["Inorden para árbol ejemplo: 2, 3, 4, 5, 6, 7, 8 (ordenado en BST)"]
    D --> G["Postorden para árbol ejemplo: 2, 4, 3, 6, 8, 7, 5"]
```

## 8. Técnicas de Diseño de Algoritmos - Divide y Vencerás con Árboles

El algoritmo Mergesort puede ser representado como un árbol de operaciones:

```mermaid
graph TD
    A["[5, 2, 4, 7, 1, 3, 6]"] --> B["[5, 2, 4]"]
    A --> C["[7, 1, 3, 6]"]
    
    B --> D["[5]"]
    B --> E["[2, 4]"]
    
    E --> F["[2]"]
    E --> G["[4]"]
    
    C --> H["[7]"]
    C --> I["[1, 3, 6]"]
    
    I --> J["[1]"]
    I --> K["[3, 6]"]
    
    K --> L["[3]"]
    K --> M["[6]"]
    
    D --> N["[5]"]
    F --> O["[2]"]
    G --> P["[4]"]
    H --> Q["[7]"]
    J --> R["[1]"]
    L --> S["[3]"]
    M --> T["[6]"]
    
    O --> U["[2]"]
    P --> V["[4]"]
    
    U & V --> W["[2, 4]"]
    N & W --> X["[2, 4, 5]"]
    
    R --> Y["[1]"]
    S --> Z["[3]"]
    T --> AA["[6]"]
    Q --> AB["[7]"]
    
    Y & Z --> AC["[1, 3]"]
    AA & AB --> AD["[6, 7]"] 
    
    AC & AD --> AE["[1, 3, 6, 7]"]
    
    X & AE --> AF["[1, 2, 3, 4, 5, 6, 7]"]
```

## 9. Algoritmos de Grafos

### Representación de Grafos

```mermaid
graph LR
    A((A)) --- B((B))
    A --- C((C))
    B --- D((D))
    C --- D

    subgraph "Matriz de Adyacencia"
    MA["    A  B  C  D<br>A   0  1  1  0<br>B   1  0  0  1<br>C   1  0  0  1<br>D   0  1  1  0"]
    end
    
    subgraph "Lista de Adyacencia"
    LA["A: [B, C]<br>B: [A, D]<br>C: [A, D]<br>D: [B, C]"]
    end
```

### BFS (Búsqueda en Anchura)

```mermaid
graph TD
    A((A)) --> B((B))
    A --> C((C))
    B --> D((D))
    B --> E((E))
    C --> F((F))
    E --> F
    
   subgraph "Orden de Visita BFS"
    BFS["Nivel 0: A
    Nivel 1: B, C
    Nivel 2: D, E, F
    
    Recorrido BFS: A, B, C, D, E, F"]
end
```

### DFS (Búsqueda en Profundidad)

```mermaid
graph TD
    A((A)) --> B((B))
    A --> C((C))
    B --> D((D))
    B --> E((E))
    C --> F((F))
    E --> F
    
    A -->|1| B
    B -->|2| D
    B -->|3| E
    E -->|4| F
    F -->|5| C
    
    subgraph "Orden de Visita DFS"
    DFS["1. A (inicio)<br>2. B (primer hijo de A)<br>3. D (primer hijo de B)<br>4. E (segundo hijo de B)<br>5. F (hijo de E)<br>6. C (segundo hijo de A, ya visitamos F)<br><br>Recorrido DFS: A, B, D, E, F, C"]
    end
```

### Algoritmo de Dijkstra

```mermaid
graph TD
    A((A)) -->|2| B((B))
    A -->|4| C((C))
    B -->|1| C
    B -->|3| D((D))
    C -->|1| D
```

```mermaid
graph TD
    subgraph "N°3: Desde B"
    P3["A = 0 ✓<br>B = 2 ✓<br>C = 3 (mejora)<br>D = 5<br>No visitados: C,D"]
    end
    
    subgraph "N°2: Desde A"
    P2["A = 0 ✓<br>B = 2<br>C = 4<br>D = ∞<br>No visitados: B,C,D"]
    end

    subgraph "N°1: Inicialización"
    P1["A = 0<br>B = ∞<br>C = ∞<br>D = ∞<br>No visitados: A,B,C,D"]
    end
```

```mermaid
graph TD
    subgraph "Resultado Final"
    RF["Distancias mínimas desde A:<br>A: 0<br>B: 2<br>C: 3<br>D: 4"]
    end
    
    subgraph "N°5: Desde D"
    P5["A = 0 ✓<br>B = 2 ✓<br>C = 3 ✓<br>D = 4 ✓<br>Todos visitados"]
    end
    
    subgraph "N°4: Desde C"
    P4["A = 0 ✓<br>B = 2 ✓<br>C = 3 ✓<br>D = 4 (mejora)<br>No visitados: D"]
    end
```

## Estructuras de Datos Jerárquicas Adicionales

### Árbol AVL (Árbol Binario Autobalanceado)

```mermaid
graph TD
    subgraph "Árbol Desequilibrado (Factor de Balance: 2)"
    A1[10] -->|Izquierda| B1[5]
    A1 -->|Derecha| C1[15]
    B1 -->|Izquierda| D1[3]
    B1 -->|Derecha| E1[7]
    D1 -->|Izquierda| F1[1]
    end
    
    subgraph "Rotación Derecha"
    A2[5] -->|Izquierda| B2[3]
    A2 -->|Derecha| C2[10]
    B2 -->|Izquierda| D2[1]
    C2 -->|Izquierda| E2[7]
    C2 -->|Derecha| F2[15]
    end
    
    subgraph "Factor de Balance (FB)"
    FB["FB = altura(izquierda) - altura(derecha)<br><br>FB = -1, 0, 1 → Árbol balanceado<br>FB < -1 o FB > 1 → Requiere rotación"]
    end
```

### Árbol B (para Bases de Datos)

```mermaid
graph TD
    A["[15, 30]"] -->|≤ 15| B["[5, 10]"]
    A -->|15-30| C["[20, 25]"]
    A -->|≥ 30| D["[35, 40, 45]"]
    
    B -->|≤ 5| E["[1, 3]"]
    B -->|5-10| F["[7, 8]"]
    B -->|≥ 10| G["[12, 13]"]
    
    C -->|≤ 20| H["[16, 18]"]
    C -->|20-25| I["[22, 23]"]
    C -->|≥ 25| J["[27, 28]"]
    
    D -->|≤ 35| K["[32, 33]"]
    D -->|35-40| L["[37, 38]"]
    D -->|40-45| M["[42, 43]"]
    D -->|≥ 45| N["[47, 48]"]
    
    subgraph "Propiedades del Árbol B"
    P1["• Todas las hojas están al mismo nivel<br>• Cada nodo tiene entre m/2 y m hijos<br>• Los datos están ordenados<br>• Optimizado para almacenamiento en disco"]
    end
```

Los diagramas Mermaid muestran claramente la estructura y funcionamiento de los árboles y grafos, facilitando la comprensión de estos conceptos fundamentales en algoritmos.

Estos diagramas ilustran:

1. La construcción paso a paso de un árbol binario de búsqueda
2. El árbol binario final con todos los elementos
3. Los diferentes tipos de recorridos en árboles (preorden, inorden, postorden)
4. La visualización del algoritmo Mergesort como un árbol de operaciones
5. Las representaciones de grafos con matriz y lista de adyacencia
6. Los algoritmos BFS y DFS con el orden de visita de los nodos
7. El algoritmo de Dijkstra para encontrar el camino más corto
8. Los árboles AVL con sus rotaciones para mantener el balance
9. La estructura de un árbol B utilizado en bases de datos

Estos diagramas son una herramienta poderosa para comprender y visualizar los conceptos fundamentales de estructuras de datos, algoritmos y estructuras de datos avanzadas.
