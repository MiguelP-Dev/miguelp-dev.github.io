---
layout: default
title: "Validator Tags"
description: "Hoja de referencias de etiquetas para trabajar con el paquete de validación en Go"
permalink: /cheat_sheets/validatorcs/
category: cheatsheets
subcategory: "tags"
icon: ✅
article: true
---

## Validator Tags

**Validaciones básicas:**

- `validate:"required"` - Campo requerido
- `validate:"omitempty"` - Omitir validación si está vacío
- `validate:"min=1"` - Valor mínimo
- `validate:"max=100"` - Valor máximo
- `validate:"len=10"` - Longitud exacta
- `validate:"eq=10"` - Igual a un valor
- `validate:"ne=10"` - No igual a un valor
- `validate:"gt=10"` - Mayor que
- `validate:"gte=10"` - Mayor o igual que
- `validate:"lt=10"` - Menor que
- `validate:"lte=10"` - Menor o igual que

**Validaciones de cadenas:**

- `validate:"alpha"` - Solo letras
- `validate:"alphanum"` - Letras y números
- `validate:"numeric"` - Solo números
- `validate:"email"` - Formato de email
- `validate:"url"` - Formato de URL
- `validate:"uri"` - Formato de URI
- `validate:"uuid"` - Formato UUID
- `validate:"uuid3"` - Formato UUID v3
- `validate:"uuid4"` - Formato UUID v4
- `validate:"uuid5"` - Formato UUID v5
- `validate:"hexcolor"` - Color hexadecimal
- `validate:"rgb"` - Color RGB
- `validate:"rgba"` - Color RGBA
- `validate:"ascii"` - Solo caracteres ASCII
- `validate:"lowercase"` - Solo minúsculas
- `validate:"uppercase"` - Solo mayúsculas
- `validate:"containsany=abcd"` - Contiene cualquiera de estos caracteres
- `validate:"contains=substring"` - Contiene subcadena
- `validate:"startswith=prefix"` - Comienza con
- `validate:"endswith=suffix"` - Termina con

**Formatos y patrones:**

- `validate:"datetime=2006-01-02"` - Formato de fecha
- `validate:"json"` - Formato JSON válido
- `validate:"file"` - Campo de archivo
- `validate:"image"` - Imagen válida
- `validate:"base64"` - Codificación base64
- `validate:"ip"` - Dirección IP válida
- `validate:"ipv4"` - IPv4 válida
- `validate:"ipv6"` - IPv6 válida
- `validate:"cidr"` - CIDR válido
- `validate:"mac"` - Dirección MAC válida
- `validate:"regexp=^[a-zA-Z0-9]+$"` - Expresión regular

**Validaciones de array/slice/map:**

- `validate:"dive"` - Validar elementos dentro de un slice/array/map
- `validate:"unique"` - Elementos únicos
- `validate:"min=1,max=10"` - Longitud mínima y máxima

**Validaciones combinadas:**

- `validate:"required,min=1,max=100"` - Múltiples validaciones
- `validate:"oneof=red green blue"` - Uno de estos valores
- `validate:"excluded_with=Field1"` - No permitido si existe otro campo
- `validate:"required_with=Field1"` - Requerido si existe otro campo
- `validate:"required_without=Field1"` - Requerido si no existe otro campo
