---
layout: default
title: "Sassy CSS"
description: "Una extensión de css que le añade características poderosas"
permalink: /cheat_sheets/scsscs/
category: cheatsheets
subcategory: "frontend"
icon: 💎
article: true
---

## Introducción a SCSS

SCSS (Sassy CSS) es una extensión de la sintaxis de CSS que añade características poderosas como variables, anidamiento, mixins, herencia y más. SCSS es procesado y compilado a CSS estándar que los navegadores pueden entender.

## Instalación y Configuración

### Instalación con npm
```bash
# Instalación global
npm install -g sass

# Instalación local en proyecto
npm install sass --save-dev
```

### Compilación
```bash
# Compilación básica
sass input.scss output.css

# Compilación con watch
sass --watch input.scss:output.css

# Compilación de directorio
sass --watch scss/:css/

# Opciones de compilación
sass input.scss output.css --style compressed
sass input.scss output.css --style expanded
```

## Sintaxis Básica

### Variables

```scss
// Definición de variables
$primary-color: #3498db;
$secondary-color: #2ecc71;
$base-font-size: 16px;
$font-stack: Helvetica, sans-serif;

// Uso de variables
body {
  font-family: $font-stack;
  font-size: $base-font-size;
  color: $primary-color;
}
```

### Anidamiento

```scss
nav {
  background-color: #333;
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  li {
    display: inline-block;
  }
  
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
    
    &:hover {
      color: white;
      background-color: black;
    }
  }
}
```

### Operaciones

```scss
$container-width: 100%;
$column-count: 4;
$margin: 20px;

.column {
  width: ($container-width / $column-count) - $margin;
  margin-left: $margin / 2;
  margin-right: $margin / 2;
}

.text {
  font-size: 14px + 2px;
}
```

## Características Avanzadas

### Partials y @import

```scss
// _reset.scss
html, body, ul, ol {
  margin: 0;
  padding: 0;
}

// main.scss
@import 'reset';
@import 'variables';
@import 'mixins';

body {
  background-color: $primary-color;
}
```

### Mixins

```scss
// Definición básica
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

// Uso
.box {
  @include border-radius(10px);
}

// Mixin con valores por defecto
@mixin box-shadow($x: 0, $y: 0, $blur: 5px, $color: rgba(0,0,0,.5)) {
  -webkit-box-shadow: $x $y $blur $color;
     -moz-box-shadow: $x $y $blur $color;
          box-shadow: $x $y $blur $color;
}

// Uso
.card {
  @include box-shadow(2px, 2px, 10px);
}

// Mixin con contenido
@mixin media-query($breakpoint) {
  @if $breakpoint == 'tablet' {
    @media (max-width: 768px) { @content; }
  } @else if $breakpoint == 'mobile' {
    @media (max-width: 480px) { @content; }
  }
}

// Uso
.container {
  width: 1200px;
  
  @include media-query('tablet') {
    width: 100%;
    padding: 0 20px;
  }
  
  @include media-query('mobile') {
    padding: 0 10px;
  }
}
```

### Herencia con @extend

```scss
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

### Funciones

```scss
// Funciones integradas
$base-color: #036;

.element {
  // Ajuste de luminosidad
  background-color: lighten($base-color, 20%);  // Más claro
  border-color: darken($base-color, 10%);      // Más oscuro
  
  // Ajuste de opacidad
  color: rgba($base-color, 0.8);
  
  // Mezcla de colores
  highlight-color: mix($base-color, #fff, 30%);
}

// Función personalizada
@function calculate-width($col-count, $margin) {
  @return 100% / $col-count - ($margin * 2);
}

// Uso
.col-3 {
  width: calculate-width(3, 1%);
}
```

### Directivas de Control

```scss
// Condicionales
$theme: 'dark';

body {
  @if $theme == 'dark' {
    background-color: #333;
    color: white;
  } @else if $theme == 'light' {
    background-color: #fff;
    color: #333;
  } @else {
    background-color: #f5f5f5;
    color: #555;
  }
}

// Bucles
// For
@for $i from 1 through 5 {
  .col-#{$i} {
    width: 100% / $i;
  }
}

// Each
$sizes: small, medium, large, xlarge;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: #{$size}px;
  }
}

$icons: (home: 16px, user: 20px, settings: 24px);

@each $name, $size in $icons {
  .icon-#{$name} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

// While
$i: 1;
@while $i <= 5 {
  .item-#{$i} {
    width: 100% / $i;
  }
  $i: $i + 1;
}
```

### Interpolación

```scss
$name: 'sidebar';
$property: 'margin';
$direction: 'top';

.#{$name} {
  #{$property}-#{$direction}: 20px;
}

// Compila a: .sidebar { margin-top: 20px; }
```

## Módulos y Namespaces

```scss
// _colors.scss
@mixin colors() {
  $primary: blue;
  $secondary: green;
  
  @content;
}

// main.scss
@use 'colors' as c;

.element {
  @include c.colors {
    background-color: $primary;
    border-color: $secondary;
  }
}

// Con namespaces
@use 'colors';

.button {
  background-color: colors.$primary;
}
```

## Lista y Mapas

### Listas

```scss
$font-sizes: 12px, 14px, 16px, 18px, 24px;

// Acceder a elementos
h1 {
  font-size: nth($font-sizes, 5);  // 24px
}

h2 {
  font-size: nth($font-sizes, 4);  // 18px
}

// Funciones de listas
$border-config: 1px solid #ccc;

.box {
  border: $border-config;
}

// Añadir a una lista
$font-sizes: append($font-sizes, 36px);

// Longitud de una lista
$list-length: length($font-sizes);
```

### Mapas

```scss
$breakpoints: (
  small: 576px,
  medium: 768px,
  large: 992px,
  xlarge: 1200px
);

// Acceso a valores del mapa
@media (min-width: map-get($breakpoints, 'medium')) {
  .container {
    width: 750px;
  }
}

// Funciones de mapas
$has-key: map-has-key($breakpoints, 'large');  // true
$keys: map-keys($breakpoints);                 // (small, medium, large, xlarge)
$values: map-values($breakpoints);             // (576px, 768px, 992px, 1200px)

// Merge mapas
$breakpoints-extra: (
  xxlarge: 1400px
);

$all-breakpoints: map-merge($breakpoints, $breakpoints-extra);
```

## Técnicas Avanzadas

### Generación de Selectores

```scss
$selectors: 'header', 'main', 'footer';

@each $selector in $selectors {
  .#{$selector}-container {
    padding: 20px;
    margin-bottom: 10px;
  }
}

// Generar clases de utilidad
$spacing-values: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px
);

@each $name, $value in $spacing-values {
  .m-#{$name} {
    margin: $value;
  }
  
  .p-#{$name} {
    padding: $value;
  }
  
  @each $dir in top, right, bottom, left {
    .m#{str-slice($dir, 0, 1)}-#{$name} {
      margin-#{$dir}: $value;
    }
    
    .p#{str-slice($dir, 0, 1)}-#{$name} {
      padding-#{$dir}: $value;
    }
  }
}
```

### BEM con SCSS

```scss
.block {
  // Propiedades del bloque
  
  &__element {
    // Propiedades del elemento
    
    &--modifier {
      // Propiedades del modificador
    }
  }
  
  &--modifier {
    // Propiedades del modificador de bloque
  }
}

// Ejemplo práctico
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &__header {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    
    &--highlighted {
      background-color: #f5f5f5;
    }
  }
  
  &__body {
    padding: 20px;
  }
  
  &--featured {
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
}
```

### Media Queries Anidadas

```scss
.responsive-element {
  width: 100%;
  
  @media (min-width: 768px) {
    width: 50%;
    float: left;
    
    @media (orientation: landscape) {
      padding-right: 10px;
    }
  }
  
  @media (min-width: 992px) {
    width: 33.33%;
  }
}
```

### CSS Grid con SCSS

```scss
$grid-columns: 12;

.grid {
  display: grid;
  grid-template-columns: repeat($grid-columns, 1fr);
  grid-gap: 20px;
  
  @for $i from 1 through $grid-columns {
    .col-#{$i} {
      grid-column: span $i;
    }
  }
  
  @media (max-width: 768px) {
    @for $i from 1 through $grid-columns {
      .col-md-#{$i} {
        grid-column: span $i;
      }
    }
  }
  
  @media (max-width: 576px) {
    @for $i from 1 through $grid-columns {
      .col-sm-#{$i} {
        grid-column: span $i;
      }
    }
  }
}
```

### Theming

```scss
// _themes.scss
$themes: (
  light: (
    bg-color: #fff,
    text-color: #333,
    link-color: #0066cc,
    border-color: #ddd
  ),
  dark: (
    bg-color: #333,
    text-color: #fff,
    link-color: #66b3ff,
    border-color: #666
  )
);

@mixin themed() {
  @each $theme, $map in $themes {
    .theme-#{$theme} & {
      $theme-map: () !global;
      @each $key, $value in $map {
        $theme-map: map-merge($theme-map, ($key: $value)) !global;
      }
      
      @content;
      
      $theme-map: null !global;
    }
  }
}

@function t($key) {
  @return map-get($theme-map, $key);
}

// Uso
body {
  @include themed() {
    background-color: t('bg-color');
    color: t('text-color');
  }
}

a {
  @include themed() {
    color: t('link-color');
    
    &:hover {
      color: darken(t('link-color'), 10%);
    }
  }
}
```

## Mejores Prácticas

1. **Organización de Archivos**
   ```
   scss/
   ├── base/
   │   ├── _reset.scss
   │   ├── _typography.scss
   │   └── _base.scss
   ├── components/
   │   ├── _buttons.scss
   │   ├── _cards.scss
   │   └── _forms.scss
   ├── layout/
   │   ├── _header.scss
   │   ├── _footer.scss
   │   └── _grid.scss
   ├── pages/
   │   ├── _home.scss
   │   └── _about.scss
   ├── themes/
   │   └── _default.scss
   ├── utils/
   │   ├── _variables.scss
   │   ├── _functions.scss
   │   └── _mixins.scss
   └── main.scss
   ```

2. **Convenciones de Nomenclatura**
   - BEM: Block__Element--Modifier
   - SMACSS: Categorización (Base, Layout, Module, State, Theme)
   - ITCSS: Inverted Triangle CSS (Configuración, Herramientas, Genéricos, Elementos, Objetos, Componentes, Utilidades)

3. **Optimización**
   - Evitar anidamiento excesivo (máximo 3-4 niveles)
   - Usar placeholders (@extend %placeholder) para código reutilizable
   - Agrupar mediaQueries con herramientas como `node-sass-media-query-packer`

4. **Depuración**
   ```scss
   @debug "El valor de width es #{$width}";
   @warn "Esta función será deprecada en la próxima versión";
   @error "La variable requerida no está definida";
   ```

## Integración con Frameworks

### Bootstrap con SCSS

```scss
// Personalización de variables
$primary: #007bff;
$secondary: #6c757d;
$font-family-base: 'Roboto', sans-serif;

// Importar Bootstrap
@import "~bootstrap/scss/bootstrap";

// Personalización adicional
.btn-primary {
  text-transform: uppercase;
}
```

### Tailwind con SCSS

```scss
// Importación de Tailwind
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

// Creación de componentes personalizados con directivas @apply
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white py-2 px-4 rounded;
    
    &:hover {
      @apply bg-blue-600;
    }
  }
}
```

## Funciones Útiles

```scss
// Convertir px a rem
@function rem($pixels, $context: 16) {
  @return ($pixels / $context) * 1rem;
}

// Color con transparencia
@function transparent($color, $opacity) {
  @return rgba($color, $opacity);
}

// Obtener contraste
@function get-contrast-color($color) {
  $brightness: (red($color) * 299 + green($color) * 587 + blue($color) * 114) / 1000;
  @return if($brightness > 128, #000, #fff);
}

// Z-index manager
$z-indexes: (
  modal: 100,
  dropdown: 50,
  header: 40,
  footer: 30
);

@function z($name) {
  @return map-get($z-indexes, $name);
}

// Uso
.modal {
  z-index: z(modal);
}
```

## Resumen de Comandos y Atajos

| Característica     | Sintaxis SCSS                              | CSS Resultante                                      |
|--------------------|--------------------------------------------|----------------------------------------------------|
| Variables          | `$color: #333;`                            | N/A (Se compila como valores)                       |
| Anidamiento        | `.parent { .child {} }`                    | `.parent .child {}`                                 |
| Anidamiento & Ref  | `.el { &:hover {} }`                       | `.el:hover {}`                                      |
| Mixins             | `@mixin name() {}` + `@include name();`    | Código CSS resultante del mixin                     |
| Herencia           | `%shared {}` + `@extend %shared;`          | Selector combinado                                  |
| Operaciones        | `width: $var * 2;`                         | `width: 20px;` (resultado calculado)                |
| Condicionales      | `@if $var {} @else {}`                     | CSS basado en la condición evaluada                 |
| Loops              | `@for $i from 1 through 3 {}`              | CSS repetido según el bucle                         |
