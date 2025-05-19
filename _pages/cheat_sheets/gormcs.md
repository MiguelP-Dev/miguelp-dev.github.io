---
layout: default
title: "Gorm Tags"
description: "Hoja de referencias de etiquetas para trabajar con el orm de go GORM"
permalink: /cheat_sheets/gormcs/
category: cheatsheets
subcategory: "tags"
icon: 🏷️
article: true
---

## GORM Tags

**Etiquetas principales:**

- `gorm:"column:nombre_columna"` - Define el nombre de la columna en la base de datos
- `gorm:"primaryKey"` - Define una clave primaria
- `gorm:"autoIncrement"` - Habilita el auto-incremento
- `gorm:"index"` - Crea un índice para el campo
- `gorm:"uniqueIndex"` - Crea un índice único
- `gorm:"default:valor"` - Establece un valor predeterminado
- `gorm:"type:tipo_sql"` - Define el tipo de dato en SQL
- `gorm:"size:255"` - Define el tamaño del campo
- `gorm:"not null"` - No permite valores nulos
- `gorm:"embedded"` - Embebe una estructura
- `gorm:"embeddedPrefix:prefijo_"` - Prefijo para campos embebidos
- `gorm:"foreignKey:campo_id"` - Define una clave foránea
- `gorm:"references:id"` - Campo al que hace referencia la clave foránea
- `gorm:"constraint:onDelete:CASCADE,onUpdate:CASCADE"` - Restricciones de integridad referencial
- `gorm:"many2many:tabla_intermedia"` - Define tabla intermedia para relaciones muchos a muchos
- `gorm:"<-:update"` - Solo escribir durante actualización
- `gorm:"->:false"` - No leer de la base de datos
- `gorm:"<-:false"` - No escribir en la base de datos
- `gorm:"<-:create"` - Solo escribir durante la creación
- `gorm:"-"` - Ignorar este campo

**Etiquetas adicionales:**

- `gorm:"comment:comentario"` - Agrega un comentario a la columna
- `gorm:"check:condición"` - Agrega restricción CHECK
- `gorm:"precision:2"` - Precisión para valores decimales
- `gorm:"scale:2"` - Escala para valores decimales
- `gorm:"index:idx_nombre,sort:desc"` - Crea índice con ordenación
- `gorm:"uniqueIndex:idx_nombre,length:10"` - Especifica longitud para índice
- `gorm:"serializer:json"` - Serializa el campo usando JSON
