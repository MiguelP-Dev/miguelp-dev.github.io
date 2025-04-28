---
layout: default
title: Liquid Cheat Sheet
description: Lenguaje de plnatillas para cargar contenido dinámico en páginas web
category: cheatsheets
permalink: /cheat_sheets/liquidcs/
subcategory: liquid
icon: 📋
article: true
---

## Introducción a Liquid

Liquid es un lenguaje de plantillas creado por Shopify que se utiliza para cargar contenido dinámico en páginas web. Consiste en:

- **Objetos**: Representan contenido y se muestran con {% raw %}`{{ }}`{% endraw %} (dobles llaves)
- **Tags(Etiquetas)**: Crean lógica y control de flujo con {% raw %} `{% %}` {% endraw %} (llave y porcentaje)
- **Filtros**: Modifican la salida de objetos con {% raw %}`|`{% endraw %} (pipe)

## Sintaxis Básica

### Objetos

{% raw %}

```liquid
{{ product.title }}           // Muestra el título del producto
{{ shop.name }}               // Muestra el nombre de la tienda
{{ page.content }}            // Muestra el contenido de una página
```

{% endraw %}

### Tags(Etiquetas)

{% raw %}

```liquid
{% if condition %}            // Inicia un bloque condicional
{% elsif other_condition %}   // Condición alternativa
{% else %}                    // Bloque por defecto
{% endif %}                   // Cierra el bloque condicional

{% for item in collection %}  // Inicia un bucle
{% endfor %}                  // Cierra el bucle
```

{% endraw %}

### Filtros

{% raw %}

```liquid
{{ product.price | money }}                  // Formatea como precio
{{ product.title | upcase }}                 // Convierte a mayúsculas
{{ "Hola Mundo" | replace: "Mundo", "Shopify" }}  // Reemplaza texto
```

{% endraw %}

## Objetos Globales

### shop

{% raw %}

```liquid
{{ shop.name }}               // Nombre de la tienda
{{ shop.email }}              // Email de la tienda
{{ shop.url }}                // URL de la tienda
{{ shop.currency }}           // Moneda principal de la tienda
```

{% endraw %}

### request

{% raw %}

```liquid
{{ request.page_type }}       // Tipo de página actual
{{ request.path }}            // Ruta de la página actual
{{ request.host }}            // Dominio de la tienda
```

{% endraw %}

### customer (en sesión)

{% raw %}

```liquid
{{ customer.name }}           // Nombre completo del cliente
{{ customer.email }}          // Email del cliente
{{ customer.orders_count }}   // Número de pedidos del cliente
{{ customer.tags }}           // Tags asignados al cliente
```

{% endraw %}

## Operadores de Comparación

{% raw %}

```liquid
{% if product.price > 100 %}                // Mayor que
{% if product.price < 100 %}                // Menor que
{% if product.price >= 100 %}               // Mayor o igual que
{% if product.price <= 100 %}               // Menor o igual que
{% if product.price == 100 %}               // Igual a
{% if product.price != 100 %}               // No igual a
{% if product.title contains "Camiseta" %}  // Contiene
```

{% endraw %}

## Operadores Lógicos

{% raw %}

```liquid
{% if condition1 and condition2 %}          // Operador AND lógico
{% if condition1 or condition2 %}           // Operador OR lógico
{% if condition1 and condition2 or condition3 %}  // Combinación de operadores
{% unless condition %}                       // Inverso de "if"
{% endunless %}
```

{% endraw %}

## Bucles y Control de Flujo

{% raw %}

```liquid
{% for product in collection.products %}
  {{ product.title }}
{% endfor %}

{% for i in (1..5) %}         // Bucle en un rango
  {{ i }}
{% endfor %}

{% break %}                   // Salir del bucle
{% continue %}                // Saltar a la siguiente iteración
{% cycle 'odd', 'even' %}     // Alternar valores en cada iteración
```

{% endraw %}

### Variables del Bucle

{% raw %}

```liquid
{{ forloop.index }}           // Índice actual (empezando por 1)
{{ forloop.index0 }}          // Índice actual (empezando por 0)
{{ forloop.first }}           // ¿Es la primera iteración?
{{ forloop.last }}            // ¿Es la última iteración?
{{ forloop.length }}          // Número total de iteraciones
```

{% endraw %}

## Variables

{% raw %}

```liquid
{% assign variable = "valor" %}             // Asignar una variable
{% capture mi_variable %}Contenido{% endcapture %}  // Captura HTML/contenido
```

{% endraw %}

## Includes y Renders

{% raw %}

```liquid
{% include 'snippet-name' %}                // Incluye un snippet
{% include 'product-card', product: product %}  // Con parámetros

{% render 'snippet-name' %}                 // Renderiza un snippet (recomendado)
{% section 'nombre-seccion' %}              // Incluye una sección
```

{% endraw %}

## Filtros Útiles

### Texto

{% raw %}

```liquid
{{ product.title | upcase }}                // MAYÚSCULAS
{{ product.title | downcase }}              // minúsculas
{{ product.title | capitalize }}            // Primera Letra En Mayúscula
{{ product.title | escape }}                // Escapar HTML
{{ "Hola " | append: "Mundo" }}             // Concatenar
{{ product.title | slice: 0, 5 }}           // Extrae una parte del texto
{{ product.title | strip_html }}            // Elimina HTML
{{ product.title | truncate: 20 }}          // Trunca texto a 20 caracteres
```

{% endraw %}

### Números

{% raw %}

```liquid
{{ product.price | money }}                 // Formatea como moneda
{{ product.price | money_without_currency }}  // Sin símbolo de moneda
{{ product.price | divided_by: 100 }}       // División
{{ product.price | times: 0.8 }}            // Multiplicación
{{ product.price | plus: 10 }}              // Suma
{{ product.price | minus: 10 }}             // Resta
{{ product.price | round }}                 // Redondea
{{ product.price | at_least: 5 }}           // Valor mínimo
{{ product.price | at_most: 100 }}          // Valor máximo
```

{% endraw %}

### Fechas

{% raw %}

```liquid
{{ product.published_at | date: "%d/%m/%Y" }}  // Formatea fecha
{{ "now" | date: "%H:%M" }}                  // Hora actual
{{ article.published_at | time_tag }}        // Etiqueta <time> HTML
```

{% endraw %}

### Arrays

{% raw %}

```liquid
{{ product.tags | join: ", " }}             // Une array con comas
{{ product.tags | first }}                  // Primer elemento
{{ product.tags | last }}                   // Último elemento
{{ product.tags | size }}                   // Número de elementos
{{ collection.products | sort: "price" }}   // Ordenar por precio
{{ collection.products | where: "type", "Camiseta" }}  // Filtrar por tipo
```

{% endraw %}

## Objetos Específicos por Página

### Página de Producto

{% raw %}

```liquid
{{ product.title }}           // Título del producto
{{ product.description }}     // Descripción
{{ product.price }}           // Precio
{{ product.images }}          // Imágenes
{{ product.featured_image }}  // Imagen destacada
{{ product.variants }}        // Variantes
{{ product.options }}         // Opciones (color, talla, etc.)
{{ product.tags }}            // Etiquetas
{{ product.type }}            // Tipo de producto
{{ product.vendor }}          // Proveedor/Marca
```

{% endraw %}

### Página de Colección

{% raw %}

```liquid
{{ collection.title }}        // Título de la colección
{{ collection.description }}  // Descripción
{{ collection.products }}     // Productos en la colección
{{ collection.all_products_count }}  // Total de productos
{{ collection.image }}        // Imagen de la colección
```

{% endraw %}

### Página de Carrito

{% raw %}

```liquid
{{ cart.items }}              // Items en el carrito
{{ cart.item_count }}         // Cantidad de productos
{{ cart.total_price }}        // Precio total
{{ cart.original_total_price }}  // Precio sin descuentos
```

{% endraw %}

## Condiciones Especiales

{% raw %}

```liquid
{% if template == "product" %}               // Verificar tipo de página
{% if product.available %}                   // ¿Producto disponible?
{% if cart.item_count > 0 %}                 // ¿Carrito con productos?
{% if customer %}                            // ¿Cliente logueado?
{% if collections.frontpage.products.size > 0 %}  // ¿Colección con productos?
```

{% endraw %}

## Liquid Avanzado

### Filtrado de Colecciones

{% raw %}

```liquid
{% assign featured_products = collections.all.products | where: "type", "Camiseta" %}
{% assign discounted_products = collections.all.products | where: "compare_at_price", ">" , "price" %}
```

{% endraw %}

### Secciones con Bloques

{% raw %}

```liquid
{% for block in section.blocks %}
  {% case block.type %}
    {% when 'heading' %}
      <h2>{{ block.settings.title }}</h2>
    {% when 'text' %}
      <p>{{ block.settings.text }}</p>
  {% endcase %}
{% endfor %}
```

{% endraw %}

### Schema de una Sección

{% raw %}

```liquid
{% schema %}
{
  "name": "Banner Hero",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Título",
      "default": "Mi título"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Imagen"
    }
  ],
  "presets": [
    {
      "name": "Banner Hero",
      "category": "Promotional"
    }
  ]
}
{% endschema %}
```

{% endraw %}

## Consejos y Buenas Prácticas

1. **Comentarios**: Usa {% raw %}`{% comment %}Este es un comentario{% endcomment %}`{% endraw %} para documentar tu código
2. **Depuración**: Usa {% raw %}`{% debug %}`{% endraw %} o {% raw %}`{{ variable | json }}`{% endraw %} para ver el contenido de variables
3. **Caché**: Utiliza {% raw %}`{% render %}`{% endraw %} en lugar de {% raw %}`{% include %}`{% endraw %} para mejor rendimiento
4. **Snippets**: Divide elementos reutilizables en snippets
5. **Clases dinámicas**: {% raw %}`<div class="{% if product.available %}in-stock{% else %}out-of-stock{% endif %}">...</div>`{% endraw %}
6. **Traducción**: Usa {% raw %}`{{ 'products.product.add_to_cart' | t }}`{% endraw %} para texto traducible
