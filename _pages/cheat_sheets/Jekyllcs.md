---
layout: default
title: Jekyll
description: "Herramienta para crear sitios web estáticos con facilidad
category: cheatsheets"
permalink: /cheat_sheets/jekyllcs/
subcategory: "static sites"
icon: 📚
article: true
---

## Introducción a Jekyll

Jekyll es un generador de sitios estáticos simple escrito en Ruby. Transforma archivos de texto plano (Markdown, HTML, etc.) en un sitio web estático completo que puede servirse en cualquier servidor web. Jekyll es el motor tras GitHub Pages y es ideal para blogs, documentación y sitios personales.

## Instalación y Configuración

### Requisitos previos

```bash
# Instalar Ruby (si no está instalado)
# En Windows: usar RubyInstaller
# En macOS: ya viene instalado o usar Homebrew
# En Linux:
sudo apt-get install ruby-full build-essential

# Verificar instalación
ruby -v
```

### Instalación de Jekyll

```bash
# Instalar Jekyll y Bundler
gem install jekyll bundler

# Verificar instalación
jekyll -v
```

### Crear un nuevo sitio

```bash
# Crear un nuevo sitio Jekyll
jekyll new mi-sitio

# Entrar al directorio
cd mi-sitio

# Iniciar el servidor local
bundle exec jekyll serve

# Iniciar con actualizaciones automáticas (live reload)
bundle exec jekyll serve --livereload

# Construir el sitio sin servidor
jekyll build
```

## Estructura de Directorios

```plaintext
mi-sitio/
├── _config.yml        # Configuración global
├── _data/             # Archivos de datos (YAML, JSON, CSV)
├── _drafts/           # Borradores no publicados
├── _includes/         # Fragmentos reutilizables de HTML
├── _layouts/          # Plantillas para páginas
├── _posts/            # Entradas del blog
├── _sass/             # Archivos SCSS para ser procesados
├── _site/             # Sitio generado (no editar)
├── assets/            # Imágenes, CSS, JS, etc.
├── index.md/html      # Página principal
└── Gemfile            # Dependencias de Ruby
```

## Configuración (_config.yml)

```yaml
# Información básica del sitio
title: Mi Sitio Web
email: info@ejemplo.com
description: >- # esto significa ignorar nuevas líneas hasta "baseurl:"
  Una descripción de mi sitio que aparecerá en los resultados
  de búsqueda y metadatos.
baseurl: "/mi-sitio" # la subrruta de tu sitio, e.j. /blog
url: "https://ejemplo.com" # la URL base del sitio
twitter_username: mituiter
github_username:  migithub

# Configuración de construcción
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Exclusiones de la conversión
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - README.md

# Configuraciones personalizadas
author: Nombre Apellido
permalink: /:categories/:year/:month/:day/:title/
timezone: Europe/Madrid

# Colecciones
collections:
  productos:
    output: true
    permalink: /productos/:path/
  equipo:
    output: true

# Valores predeterminados para layouts
defaults:
  -
    scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Autor Predeterminado"
  -
    scope:
      path: ""
      type: "pages"
    values:
      layout: "page"
```

## Front Matter

El Front Matter es un bloque YAML al inicio de cada archivo que define metadatos y configuraciones.

```yaml
---
layout: post
title: "Mi Primer Post"
date: 2025-04-18 12:00:00 -0500
categories: [jekyll, tutorial]
tags: [web, desarrollo]
author: John Doe
permalink: /mi-primer-post/
published: true
excerpt: Un resumen breve del post que se mostrará en la lista de posts.
image: /assets/images/imagen.jpg
custom_variable: valor personalizado
---
```

## Crear Contenido

### Posts

Los posts se almacenan en `_posts/` con el formato: `AAAA-MM-DD-titulo-del-post.md`

```markdown
---
layout: post
title: "Bienvenido a Jekyll"
date: 2025-04-18
---

# Título Principal

Este es mi primer post en Jekyll. 

## Subtítulo

Contenido del post con **markdown** y más.

![Imagen de ejemplo](/assets/images/ejemplo.jpg)

[Enlace a otro sitio](https://ejemplo.com)
```

### Páginas

Las páginas pueden estar en la raíz o en subdirectorios.

```markdown
---
layout: page
title: Acerca de
permalink: /acerca/
---

Esta es la página Acerca de mi sitio Jekyll.
```

### Borradores

Los borradores se almacenan en `_drafts/` sin la fecha en el nombre.

```bash
# Ejecutar con borradores visibles
bundle exec jekyll serve --drafts
```

## Liquid - Lenguaje de Plantillas

Jekyll usa Liquid para procesamiento de plantillas.

### Objetos

{% raw %}

```liquid
{{ page.title }}         # Muestra el título de la página actual
{{ site.title }}         # Muestra el título del sitio desde _config.yml
{{ content }}            # Muestra el contenido procesado de la página
```

{% endraw %}

### Tags

{% raw %}

```liquid
{% if page.show_sidebar %}
  <div class="sidebar">
    <!-- contenido de la barra lateral -->
  </div>
{% endif %}

{% for post in site.posts %}
  <h2>{{ post.title }}</h2>
{% endfor %}

{% assign mi_variable = "un valor" %}
```

{% endraw %}

### Filtros

{% raw %}

```liquid
{{ "hola mundo" | capitalize }}  # Hola mundo
{{ "Mi String" | downcase }}      # mi string
{{ page.date | date: "%Y-%m-%d" }} # 2025-04-18
```

{% endraw %}

## Layouts y Includes

### Layouts

Los layouts definen la estructura HTML de las páginas.

{% raw %}

```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }} - {{ site.title }}</title>
    <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
  </head>
  <body>
    {% include header.html %}
    
    <main>
      {{ content }}
    </main>
    
    {% include footer.html %}
  </body>
</html>
```

{% endraw %}

{% raw %}

```html
<!-- _layouts/post.html -->
---
layout: default
---
<article class="post">
  <h1>{{ page.title }}</h1>
  <time>{{ page.date | date: "%d %B %Y" }}</time>
  
  <div class="content">
    {{ content }}
  </div>
  
  {% if page.tags %}
    <div class="tags">
      {% for tag in page.tags %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
</article>
```

{% endraw %}

### Includes

Los includes son fragmentos reutilizables.

{% raw %}

```html
<!-- _includes/header.html -->
<header>
  <h1>{{ site.title }}</h1>
  <nav>
    <ul>
      <li><a href="{{ '/' | relative_url }}">Inicio</a></li>
      <li><a href="{{ '/blog' | relative_url }}">Blog</a></li>
      <li><a href="{{ '/acerca' | relative_url }}">Acerca de</a></li>
    </ul>
  </nav>
</header>
```

{% endraw %}

{% raw %}

```liquid
<!-- Uso con parámetros -->
{% include author-bio.html author=page.author %}
```

{% endraw %}

## Datos y Colecciones

### Datos

Los archivos en `_data/` son accesibles en `site.data`

```yaml
# _data/navigation.yml
- name: Inicio
  link: /
- name: Blog
  link: /blog/
- name: Acerca de
  link: /acerca/
```

{% raw %}

```liquid
<!-- Uso de datos -->
<nav>
  <ul>
    {% for item in site.data.navigation %}
      <li><a href="{{ item.link | relative_url }}"{% if page.url == item.link %} class="active"{% endif %}>{{ item.name }}</a></li>
    {% endfor %}
  </ul>
</nav>
```

{% endraw %}

### Colecciones

Las colecciones se definen en `_config.yml` y los archivos se almacenan en directorios con el prefijo `_`.

```yaml
# _config.yml
collections:
  productos:
    output: true
    permalink: /productos/:name/
```

```markdown
<!-- _productos/producto1.md -->
---
layout: producto
titulo: Producto Premium
precio: 99.99
imagen: /assets/productos/premium.jpg
---

Descripción detallada del producto premium.
```

{% raw %}

```liquid
<!-- Acceso a colecciones -->
<h2>Nuestros Productos</h2>
<div class="productos">
  {% for producto in site.productos %}
    <div class="producto">
      <h3>{{ producto.titulo }}</h3>
      <p>Precio: ${{ producto.precio }}</p>
      <img src="{{ producto.imagen | relative_url }}" alt="{{ producto.titulo }}">
      <div class="descripcion">{{ producto.content }}</div>
      <a href="{{ producto.url | relative_url }}">Ver detalles</a>
    </div>
  {% endfor %}
</div>
```

{% endraw %}

## Gestión de Assets

### CSS y SCSS

Jekyll procesa automáticamente SCSS en `_sass/`.

```scss
// assets/css/main.scss
---
---

@import "variables";
@import "base";
@import "layout";
```

```scss
// _sass/_variables.scss
$primary-color: #007bff;
$font-family: 'Helvetica', sans-serif;
```

### Imágenes y otros assets

{% raw %}

```liquid
<!-- Enlaces a imágenes -->
![Logo]({{ '/assets/images/logo.png' | relative_url }})

<!-- CSS y JavaScript -->
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
<script src="{{ '/assets/js/main.js' | relative_url }}"></script>
```

{% endraw %}

## Paginación

Requiere el plugin `jekyll-paginate`.

```yaml
# _config.yml
plugins:
  - jekyll-paginate
paginate: 5
paginate_path: "/blog/page:num/"
```

{% raw %}

```liquid
<!-- index.html (o blog.html) -->
<div class="posts">
  {% for post in paginator.posts %}
    <article>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    </article>
  {% endfor %}
</div>

<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | relative_url }}" class="previous">
      Anterior
    </a>
  {% endif %}
  
  <span class="page_number">
    Página {{ paginator.page }} de {{ paginator.total_pages }}
  </span>
  
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | relative_url }}" class="next">
      Siguiente
    </a>
  {% endif %}
</div>
```

{% endraw %}

## SEO y Feed RSS

Requiere los plugins `jekyll-seo-tag` y `jekyll-feed`.

```yaml
# _config.yml
plugins:
  - jekyll-seo-tag
  - jekyll-feed

# Configuraciones SEO
title: Mi Sitio Web
description: Descripción para SEO
twitter:
  username: miusuario
  card: summary
logo: /assets/images/logo.png
social:
  name: Nombre Completo
  links:
    - https://twitter.com/miusuario
    - https://github.com/miusuario
```

{% raw %}

```html
<!-- En _layouts/default.html -->
<head>
  <!-- Otros meta tags -->
  {% seo %}
  {% feed_meta %}
</head>
```

{% endraw %}

## Plugins Populares

```ruby
# Gemfile
gem 'jekyll-seo-tag'
gem 'jekyll-feed'
gem 'jekyll-sitemap'
gem 'jekyll-paginate'
gem 'jekyll-redirect-from'
gem 'jemoji'
gem 'jekyll-mentions'
```

```yaml
# _config.yml
plugins:
  - jekyll-seo-tag
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-paginate
  - jekyll-redirect-from
  - jemoji
  - jekyll-mentions
```

## Temas

### Usar un tema existente

```ruby
# Gemfile
gem 'minima', '~> 2.5'
# o
gem 'jekyll-theme-minimal'
```

```yaml
# _config.yml
theme: minima
# o
remote_theme: pages-themes/minimal
```

### Personalizar un tema

1. Identifica los archivos del tema:

```bash
bundle info --path minima
```

2. Copia los archivos que quieres personalizar a tu proyecto con la misma ruta relativa.

## Despliegue

### GitHub Pages

```yaml
# Gemfile
gem 'github-pages', group: :jekyll_plugins
```

Configuración de GitHub Pages:

1. Crea un repositorio en GitHub: `username.github.io`
2. Sube tu código al repositorio
3. Configura la fuente en Settings > Pages

### Netlify

1. Sube tu código a GitHub, GitLab o Bitbucket
2. En Netlify: New site from Git > selecciona tu repositorio
3. Build command: `jekyll build` o `bundle exec jekyll build`
4. Publish directory: `_site/`

## Técnicas Avanzadas

### Contenido Personalizado para Usuario

{% raw %}

```liquid
{% if site.data.users[page.user].plan == 'premium' %}
  <div class="premium-content">Contenido exclusivo para usuarios premium</div>
{% endif %}
```

{% endraw %}

### Multilenguaje

```plaintext
mi-sitio/
├── _data/
│   ├── translations/
│   │   ├── en.yml
│   │   └── es.yml
├── en/
│   └── index.html
└── es/
    └── index.html
```

```yaml
# _data/translations/es.yml
nav:
  home: Inicio
  about: Acerca de
greeting: Bienvenido a mi sitio
```

{% raw %}

```liquid
<!-- _includes/header.html -->
{% assign translations = site.data.translations[page.lang] %}
<header>
  <nav>
    <a href="{{ site.baseurl }}/{{ page.lang }}/">{{ translations.nav.home }}</a>
    <a href="{{ site.baseurl }}/{{ page.lang }}/about/">{{ translations.nav.about }}</a>
  </nav>
</header>
```

{% endraw %}

### Búsqueda con Lunr.js

{% raw %}

```html
<!-- search.html -->
---
layout: page
title: Búsqueda
---

<input type="text" id="search-input" placeholder="Buscar en el sitio...">
<ul id="results-container"></ul>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
```

{% endraw %}

```javascript
// search.js
(function() {
  function displaySearchResults(results, store) {
    const searchResults = document.getElementById('results-container');
    if (results.length) {
      let resultList = '';
      for (const n in results) {
        const item = store[results[n].ref];
        resultList += '<li><a href="' + item.url + '">' + item.title + '</a></li>';
      }
      searchResults.innerHTML = resultList;
    } else {
      searchResults.innerHTML = '<li>No se encontraron resultados</li>';
    }
  }

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  const searchTerm = getQueryVariable('query');
  if (searchTerm) {
    document.getElementById('search-input').value = searchTerm;
    
    // Fetch the JSON index
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        const store = {};
        // Load the data into the store
        for (const key in data) {
          store[key] = {
            'title': data[key].title,
            'content': data[key].content,
            'url': data[key].url
          };
        }
        
        // Build the index
        const idx = lunr(function() {
          this.field('title', { boost: 10 });
          this.field('content');
          for (const key in data) {
            this.add({
              'id': key,
              'title': data[key].title,
              'content': data[key].content
            });
          }
        });
        
        // Performm the search
        const results = idx.search(searchTerm);
        displaySearchResults(results, store);
      });
  }
})();
```

{% raw %}

```liquid
<!-- search.json -->
---
layout: none
---
{
  {% for post in site.posts %}
    "{{ post.url | slugify }}": {
      "title": "{{ post.title | xml_escape }}",
      "content": {{ post.content | strip_html | strip_newlines | jsonify }},
      "url": "{{ post.url | xml_escape }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
}
```

{% endraw %}

## Solución de Problemas

### Errores Comunes

1. **Error de dependencias**:

   ```bash
   bundle update
   bundle install
   ```

2. **Error de compilación**:

   ```bash
   # Eliminar el directorio _site
   rm -rf _site
   bundle exec jekyll build --trace
   ```

3. **Conflictos con Liquid**:

{% raw %}

```liquid
{% raw %}
  Este contenido {{ no será }} procesado por Liquid
{ % endraw % } 
```

**Nota Importante: Al igual que el raw, el endraw no lleva los espacios entre las llaves y el signo de porcentaje esto es para que no se interprete el endraw como un tag liquid para este ejemplo.**
{% endraw %}

4. **Error en GitHub Pages**:
   - Verifica que estás usando plugins compatibles
   - Usa `remote_theme` en lugar de `theme` para temas personalizados

## Recursos y Comunidad

- [Documentación Oficial de Jekyll](https://jekyllrb.com/docs/)
- [Temas Jekyll](https://jekyllthemes.io/)
- [Plugins Jekyll](https://github.com/planetjekyll/awesome-jekyll-plugins)
- [Jekyll Talk (Foro)](https://talk.jekyllrb.com/)
- [GitHub Pages Docs](https://docs.github.com/es/pages)

## Comandos Rápidos

```bash
# Crear un nuevo sitio
jekyll new nombre-sitio

# Iniciar servidor local
bundle exec jekyll serve

# Compilar sitio
bundle exec jekyll build

# Limpiar archivos generados
bundle exec jekyll clean

# Actualizar dependencias
bundle update

# Ver información versión
jekyll -v

# Crear un nuevo post (con plugin jekyll-compose)
bundle exec jekyll post "Título del Post"
```
