---
layout: default
title: "Text en Go"
description: "Guía del paquete text de Go para manipulación avanzada de texto"
permalink: /packages/go/text/
category: packages
article: true
subcategory: "Text Processing"
icon: 📝
---

## Paquete `text` en Go

El paquete `text` en Go ofrece herramientas especializadas para manipulación avanzada de texto. Esta guía ampliada explora sus subpaquetes principales con ejemplos prácticos, mejores prácticas y técnicas avanzadas.  

---

### Subpaquete `text/template`

Generación dinámica de texto mediante plantillas.  

#### Funciones Clave

1. **`template.New` + `Parse`**
{% raw %}
   ```go  
   tmpl := template.Must(template.New("saludo").Parse("Hola, {{.Nombre}}!"))  
   tmpl.Execute(os.Stdout, struct{ Nombre string }{Nombre: "Ana"})  
   // Output: Hola, Ana!  
   ```  
{% endraw %}

2. **Plantillas con Lógica**
{% raw %}
   ```go  
   const tpl = `  
   {{range .Productos}}  
   - {{.Nombre}} (Stock: {{.Stock}})  
     {{if lt .Stock 10}}(¡Últimas unidades!){{end}}  
   {{end}}`  

   data := struct {  
       Productos []struct{ Nombre string; Stock int }  
   }{  
       []struct{ Nombre string; Stock int }{  
           {"Laptop", 5},  
           {"Mouse", 25},  
       },  
   }  

   template.Must(template.New("").Parse(tpl)).Execute(os.Stdout, data)  
   /* Output:  
      - Laptop (Stock: 5)  
        (¡Últimas unidades!)  
      - Mouse (Stock: 25)  
   */  
   ```  
{% endraw %}

3. **Funciones Personalizadas**
{% raw %}
   ```go  
   funcMap := template.FuncMap{  
       "mayusculas": strings.ToUpper,  
   }  

   tmpl := template.Must(  
       template.New("").Funcs(funcMap).Parse("{{. | mayusculas}}"),  
   )  
   tmpl.Execute(os.Stdout, "hola") // HOLA  
   ```  
{% endraw %}

**Mejores Prácticas**:

- Usar `html/template` para contenido web (escapado automático).  
- Validar plantillas en tiempo de compilación con `template.Must`.  

---

### Subpaquete `text/scanner`

Análisis léxico de texto.  

#### Casos de Uso Avanzados

1. **Tokenización Personalizada**

   ```go  
   var s scanner.Scanner  
   s.Init(strings.NewReader("3 + 4 * (5 - 2)"))  
   s.Mode ^= scanner.SkipComments // No ignorar comentarios  

   for tok := s.Scan(); tok != scanner.EOF; tok = s.Scan() {  
       fmt.Printf("%s\t%s\n", s.TokenText(), scanner.TokenString(tok))  
   }  
   /* Output:  
      3    Int  
      +    +  
      4    Int  
      *    *  
      (    (  
      5    Int  
      -    -  
      2    Int  
      )    )  
   */  
   ```  

2. **Escaneo de Identificadores**

   ```go  
   s.IsIdentRune = func(ch rune, i int) bool {  
       return unicode.IsLetter(ch) || (i > 0 && unicode.IsDigit(ch))  
   }  
   ```  

**Advertencia**: El scanner no maneja Unicode completo por defecto.  

---

### Subpaquete `text/tabwriter`

Formateo tabular profesional.  

#### Alineación Avanzada

```go  
w := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)  
fmt.Fprintln(w, "Item\tPrecio\tStock")  
fmt.Fprintln(w, "Laptop\t$1,200.50\t5")  
fmt.Fprintln(w, "Monitor\t$350.00\t15")  
w.Flush()  
/* Output:  
     Item    Precio    Stock  
   Laptop  $1,200.50       5  
   Monitor    $350.00      15  
*/  
```  

**Flags Útiles**:

- `tabwriter.Debug`: Muestra caracteres de alineación.  
- `tabwriter.FilterHTML`: Filtra tags HTML.  

---

### Subpaquete `text/unicode`

Manejo de propiedades Unicode.  

#### Ejemplos Prácticos

1. **Validación de Emojis**

   ```go  
   esEmoji := func(r rune) bool {  
       return unicode.In(r, unicode.So, unicode.Symbol)  
   }  
   fmt.Println(esEmoji('😊')) // true  
   ```  

2. **Normalización de Texto**

   ```go  
   import "golang.org/x/text/unicode/norm"  

   s := norm.NFC.String("café") // Forma Normalizada Canónica  
   ```  

---

### Integración entre Subpaquetes  

#### Generar Reporte Estructurado
{% raw %}
```go  
// 1. Parsear datos con scanner  
// 2. Procesar con lógica de negocio  
// 3. Formatear salida con template y tabwriter  

w := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', 0)  
tmpl := template.Must(template.New("reporte").Parse(`  
{{- range .}}  
{{.Nombre}}\t{{.Edad}}\t{{.Pais}}  
{{end}}`))  

tmpl.Execute(w, []struct{ Nombre, Pais string; Edad int }{  
    {"Ana", "México", 30},  
    {"Bob", "EEUU", 25},  
})  
w.Flush()  
```
{% endraw %}

---

### Errores Comunes  

#### 1. Inyección en Plantillas
{% raw %}
```go  
// ❌ Peligroso con datos no confiables  
tmpl.Parse("Hola, {{.}}") // Si . es "<script>", genera XSS  

// ✅ Seguro con html/template  
htmlTemplate.Parse("Hola, {{.}}") // Escapa automáticamente  
```  

#### 2. Tabuladores Mal Configurados

```go  
// ❌ Columnas desalineadas  
writer := tabwriter.NewWriter(os.Stdout, 0, 0, 1, ' ', 0)  

// ✅ Configuración óptima  
writer := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', tabwriter.AlignRight)  
```  
{% endraw %}

---

### Rendimiento y Optimización  

1. **Reutilizar Writers**:

   ```go  
   var buf bytes.Buffer  
   writer := tabwriter.NewWriter(&buf, 0, 0, 2, ' ', 0)  
   // Reutilizar para múltiples operaciones  
   ```  

2. **Precompilar Plantillas**:

   ```go  
   var reporteTmpl = template.Must(template.New("").Parse(tplString))  
   // Usar en múltiples goroutines  
   ```  

---

### Conclusión

El paquete `text` en Go es un conjunto de herramientas indispensable para:

- Generar documentos dinámicos (`template`)  
- Procesar lenguajes estructurados (`scanner`)  
- Crear salidas tabulares profesionales (`tabwriter`)  
- Manejar estándares Unicode (`unicode`)  

Al dominar estas herramientas, podrás construir aplicaciones que manejen texto complejo de manera eficiente y segura.  
