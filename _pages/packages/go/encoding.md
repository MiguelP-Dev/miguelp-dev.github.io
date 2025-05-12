---
layout: default
title: "Encoding con Go"
description: Guía del paquete encoding de Go para codificación y decodificación de datos
permalink: /packages/go/encoding/
category: packages
article: true
subcategory: "Serialization & Deserialization"
icon: 🔄
---
## Paquete encoding en Go
El paquete `encoding` proporciona interfaces y subpaquetes para codificar y decodificar datos en varios formatos. Este documento explora en detalle sus características y casos de uso prácticos.

### 1. Subpaquetes Principales

#### 1.1 encoding/json
```go
// filepath: ejemplos/encoding/json_example.go
package main
import (
    "encoding/json"
    "fmt"
    "log"
)
type Usuario struct {
    ID        int      `json:"id"`
    Nombre    string   `json:"nombre"`
    Email     string   `json:"email"`
    Roles     []string `json:"roles,omitempty"`
    Activo    bool     `json:"activo"`
    MetaData  map[string]any `json:"metadata,omitempty"`
}
func ejemploJSON() {
    usuario := Usuario{
        ID:     1,
        Nombre: "Juan Pérez",
        Email:  "juan@ejemplo.com",
        Roles:  []string{"admin", "user"},
        Activo: true,
        MetaData: map[string]any{
            "último_acceso": "2024-03-22",
            "preferencias": map[string]string{
                "tema": "oscuro",
                "idioma": "es",
            },
        },
    }
    // Codificación con formato
    jsonData, err := json.MarshalIndent(usuario, "", "    ")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("JSON Formateado:\n%s\n", jsonData)
    // Decodificación con validación
    var usuarioDecodificado Usuario
    if err := json.Unmarshal(jsonData, &usuarioDecodificado); err != nil {
        log.Fatal(err)
    }
}
```

#### 1.2 encoding/xml
```go
// filepath: ejemplos/encoding/xml_example.go
package main
import (
    "encoding/xml"
    "fmt"
    "log"
)
type Configuracion struct {
    XMLName     xml.Name `xml:"configuracion"`
    Version     string   `xml:"version,attr"`
    BaseDatos   DB      `xml:"database"`
    Servidor    Server  `xml:"server"`
}
type DB struct {
    Host     string `xml:"host"`
    Puerto   int    `xml:"port"`
    Usuario  string `xml:"user"`
    Password string `xml:"password,omitempty"`
}
type Server struct {
    Puerto    int      `xml:"port"`
    SSL       bool     `xml:"ssl"`
    Dominios  []string `xml:"domains>domain"`
}
func ejemploXML() {
    config := Configuracion{
        Version: "1.0",
        BaseDatos: DB{
            Host:     "localhost",
            Puerto:   5432,
            Usuario:  "admin",
            Password: "secreto",
        },
        Servidor: Server{
            Puerto: 8080,
            SSL:    true,
            Dominios: []string{
                "ejemplo.com",
                "api.ejemplo.com",
            },
        },
    }
    xmlData, err := xml.MarshalIndent(config, "", "    ")
    if err != nil {
        log.Fatal(err)
    }
    // Agregar cabecera XML
    xmlString := xml.Header + string(xmlData)
    fmt.Printf("XML Formateado:\n%s\n", xmlString)
}
```

#### 1.3 encoding/csv
```go
// filepath: ejemplos/encoding/csv_example.go
package main
import (
    "encoding/csv"
    "fmt"
    "log"
    "os"
    "strconv"
)
type Producto struct {
    ID        int
    Nombre    string
    Precio    float64
    Stock     int
    Categoria string
}
func procesarCSV(filename string) ([]Producto, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer file.Close()
    reader := csv.NewReader(file)
    reader.Comma = ';'  // Personalizar separador
    reader.Comment = '#' // Ignorar líneas que comienzan con #
    // Leer encabezados
    headers, err := reader.Read()
    if err != nil {
        return nil, err
    }
    var productos []Producto
    for {
        record, err := reader.Read()
        if err != nil {
            break // EOF o error
        }
        id, _ := strconv.Atoi(record[0])
        precio, _ := strconv.ParseFloat(record[2], 64)
        stock, _ := strconv.Atoi(record[3])
        producto := Producto{
            ID:        id,
            Nombre:    record[1],
            Precio:    precio,
            Stock:     stock,
            Categoria: record[4],
        }
        productos = append(productos, producto)
    }
    return productos, nil
}
```

#### 1.4 encoding/base64
```go
// filepath: ejemplos/encoding/base64_example.go
package main
import (
    "encoding/base64"
    "fmt"
    "strings"
)
func ejemploBase64() {
    // Datos originales
    data := "¡Hola, mundo! Esto es un ejemplo de Base64 en Go"
    
    // Codificación estándar
    encoded := base64.StdEncoding.EncodeToString([]byte(data))
    fmt.Printf("Codificado (Standard): %s\n", encoded)
    
    // Decodificación estándar
    decoded, err := base64.StdEncoding.DecodeString(encoded)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Decodificado: %s\n", string(decoded))
    
    // Usando URL encoding (seguro para URLs)
    urlEncoded := base64.URLEncoding.EncodeToString([]byte(data))
    fmt.Printf("URL-safe encoding: %s\n", urlEncoded)
    
    // Encoding personalizado
    buf := make([]byte, base64.StdEncoding.EncodedLen(len(data)))
    base64.StdEncoding.Encode(buf, []byte(data))
    fmt.Printf("Con buffer pre-asignado: %s\n", string(buf))
    
    // Streaming encoder/decoder
    reader := strings.NewReader(data)
    encoder := base64.NewEncoder(base64.StdEncoding, os.Stdout)
    defer encoder.Close()
    
    fmt.Printf("Stream encoding: ")
    io.Copy(encoder, reader)
    fmt.Println()
}
```

#### 1.5 encoding/hex
```go
// filepath: ejemplos/encoding/hex_example.go
package main
import (
    "encoding/hex"
    "fmt"
    "log"
)
func ejemploHex() {
    // Datos de ejemplo (representando bytes binarios)
    data := []byte{0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64}
    
    // Convertir bytes a string hexadecimal
    hexString := hex.EncodeToString(data)
    fmt.Printf("Datos en hexadecimal: %s\n", hexString)
    
    // Decodificación de string hexadecimal a bytes
    original, err := hex.DecodeString(hexString)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Datos originales: %s\n", string(original))
    
    // Usando encoders y decoders para streams
    dst := make([]byte, hex.EncodedLen(len(data)))
    hex.Encode(dst, data)
    fmt.Printf("Usando Encode: %s\n", string(dst))
    
    // Decodificación directa
    decoded := make([]byte, hex.DecodedLen(len(dst)))
    _, err = hex.Decode(decoded, dst)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Usando Decode: %s\n", string(decoded))
    
    // Manejo de errores de formato
    _, err = hex.DecodeString("invalid hex")
    if err != nil {
        fmt.Printf("Error esperado: %v\n", err)
    }
}
```

#### 1.6 encoding/binary
```go
// filepath: ejemplos/encoding/binary_example.go
package main
import (
    "bytes"
    "encoding/binary"
    "fmt"
    "log"
)
type Mensaje struct {
    ID        uint16
    Longitud  uint32
    Flags     uint8
    Payload   [16]byte
}
func ejemploBinary() {
    // Crear un mensaje de prueba
    msg := Mensaje{
        ID:       1234,
        Longitud: 16,
        Flags:    0x01,
    }
    copy(msg.Payload[:], []byte("Datos binarios"))
    
    // Crear un buffer para la serialización
    buf := new(bytes.Buffer)
    
    // Serializar la estructura con orden big endian
    err := binary.Write(buf, binary.BigEndian, msg)
    if err != nil {
        log.Fatal("Error de codificación:", err)
    }
    
    fmt.Printf("Datos serializados (%d bytes): %v\n", buf.Len(), buf.Bytes())
    
    // Leer los datos de nuevo a una estructura
    var msgDecoded Mensaje
    err = binary.Read(buf, binary.BigEndian, &msgDecoded)
    if err != nil {
        log.Fatal("Error de decodificación:", err)
    }
    
    fmt.Printf("ID: %d\n", msgDecoded.ID)
    fmt.Printf("Longitud: %d\n", msgDecoded.Longitud)
    fmt.Printf("Flags: %#x\n", msgDecoded.Flags)
    fmt.Printf("Payload: %s\n", string(msgDecoded.Payload[:]))
    
    // Ejemplo de uso de funciones individuales
    var num uint16 = 43981 // 0xABCD en hexadecimal
    
    // Usando PutUint16 para escribir en un slice
    b := make([]byte, 2)
    binary.BigEndian.PutUint16(b, num)
    fmt.Printf("Valor 0x%X representado en BigEndian: % X\n", num, b)
    
    binary.LittleEndian.PutUint16(b, num)
    fmt.Printf("Valor 0x%X representado en LittleEndian: % X\n", num, b)
}
```

#### 1.7 encoding/gob
```go
// filepath: ejemplos/encoding/gob_example.go
package main
import (
    "bytes"
    "encoding/gob"
    "fmt"
    "log"
)
type Persona struct {
    Nombre   string
    Edad     int
    Activo   bool
    Contacto ContactInfo
    Tags     []string
}
type ContactInfo struct {
    Email   string
    Telefono string
}
func ejemploGob() {
    // Registrar tipos que se utilizarán
    gob.Register(Persona{})
    
    // Crear datos de ejemplo
    persona := Persona{
        Nombre: "Ana García",
        Edad:   28,
        Activo: true,
        Contacto: ContactInfo{
            Email:   "ana@ejemplo.com",
            Telefono: "+34 600 123 456",
        },
        Tags: []string{"cliente", "premium", "verificado"},
    }
    
    // Crear buffer para codificación
    var buf bytes.Buffer
    
    // Crear un encoder y codificar
    enc := gob.NewEncoder(&buf)
    err := enc.Encode(persona)
    if err != nil {
        log.Fatal("Error de codificación:", err)
    }
    
    fmt.Printf("Datos GOB codificados: %d bytes\n", buf.Len())
    
    // Decodificación
    var personaDecodificada Persona
    dec := gob.NewDecoder(&buf)
    err = dec.Decode(&personaDecodificada)
    if err != nil {
        log.Fatal("Error de decodificación:", err)
    }
    
    fmt.Printf("Datos decodificados:\n")
    fmt.Printf("Nombre: %s\n", personaDecodificada.Nombre)
    fmt.Printf("Edad: %d\n", personaDecodificada.Edad)
    fmt.Printf("Activo: %t\n", personaDecodificada.Activo)
    fmt.Printf("Email: %s\n", personaDecodificada.Contacto.Email)
    fmt.Printf("Tags: %v\n", personaDecodificada.Tags)
    
    // Codificación de tipos complejos
    var interfaceMap = map[string]interface{}{
        "entero": 42,
        "cadena": "texto",
        "objeto": persona,
        "mapa": map[string]int{"a": 1, "b": 2},
    }
    
    var bufComplex bytes.Buffer
    encComplex := gob.NewEncoder(&bufComplex)
    if err := encComplex.Encode(interfaceMap); err != nil {
        log.Fatal("Error codificando mapa:", err)
    }
    
    var decodedMap map[string]interface{}
    decComplex := gob.NewDecoder(&bufComplex)
    if err := decComplex.Decode(&decodedMap); err != nil {
        log.Fatal("Error decodificando mapa:", err)
    }
    
    fmt.Println("Mapa complejo decodificado correctamente")
}
```

#### 1.8 encoding/ascii85
```go
// filepath: ejemplos/encoding/ascii85_example.go
package main
import (
    "encoding/ascii85"
    "fmt"
    "os"
)
func ejemploAscii85() {
    // Datos de ejemplo
    data := []byte("El codificador ASCII85 utiliza 5 caracteres ASCII para representar 4 bytes")
    
    // Calcular el tamaño máximo de la salida
    maxEncodedLen := ascii85.MaxEncodedLen(len(data))
    dst := make([]byte, maxEncodedLen)
    
    // Codificar
    n := ascii85.Encode(dst, data)
    encoded := dst[:n]
    fmt.Printf("Datos ASCII85: %s\n", string(encoded))
    
    // Decodificar
    maxDecodedLen := ascii85.MaxDecodedLen(len(encoded))
    decoded := make([]byte, maxDecodedLen)
    n, _, err := ascii85.Decode(decoded, encoded, true)
    if err != nil {
        fmt.Println("Error decodificando:", err)
        return
    }
    decoded = decoded[:n]
    fmt.Printf("Decodificado: %s\n", string(decoded))
    
    // Usar el codificador como stream
    fmt.Println("\nCodificación como stream:")
    encoder := ascii85.NewEncoder(os.Stdout)
    encoder.Write(data)
    encoder.Close()
    fmt.Println()
}
```

#### 1.9 encoding/asn1
```go
// filepath: ejemplos/encoding/asn1_example.go
package main
import (
    "encoding/asn1"
    "fmt"
    "log"
    "time"
)
// Definición de estructura para ASN.1
type CertificateInfo struct {
    Serial       int
    NotBefore    time.Time
    NotAfter     time.Time
    CommonName   string
    Organization string
}
func ejemploASN1() {
    // Datos para codificar
    info := CertificateInfo{
        Serial:       123456789,
        NotBefore:    time.Now(),
        NotAfter:     time.Now().AddDate(1, 0, 0), // Válido por 1 año
        CommonName:   "example.com",
        Organization: "Ejemplo S.A.",
    }
    
    // Codificar a ASN.1 DER
    data, err := asn1.Marshal(info)
    if err != nil {
        log.Fatal("Error de codificación ASN.1:", err)
    }
    
    fmt.Printf("Datos ASN.1 DER: %d bytes\n", len(data))
    fmt.Printf("Hex: % X\n", data[:20]) // Mostrar los primeros 20 bytes
    
    // Decodificar de ASN.1 DER
    var decodedInfo CertificateInfo
    rest, err := asn1.Unmarshal(data, &decodedInfo)
    if err != nil {
        log.Fatal("Error de decodificación ASN.1:", err)
    }
    if len(rest) > 0 {
        fmt.Printf("Advertencia: %d bytes no utilizados\n", len(rest))
    }
    
    // Verificar datos decodificados
    fmt.Printf("Serial: %d\n", decodedInfo.Serial)
    fmt.Printf("Válido desde: %v\n", decodedInfo.NotBefore)
    fmt.Printf("Válido hasta: %v\n", decodedInfo.NotAfter)
    fmt.Printf("CN: %s\n", decodedInfo.CommonName)
    fmt.Printf("O: %s\n", decodedInfo.Organization)
    
    // Uso de ObjectIdentifier
    oidEmail := asn1.ObjectIdentifier{1, 2, 840, 113549, 1, 9, 1}
    fmt.Printf("OID para Email: %v\n", oidEmail.String())
}
```

### 2. Casos de Uso Avanzados

#### 2.1 Codificador/Decodificador Personalizado
```go
// filepath: ejemplos/encoding/custom_codec.go
package main
import (
    "encoding/json"
    "time"
)
type FechaPersonalizada time.Time
func (f FechaPersonalizada) MarshalJSON() ([]byte, error) {
    fecha := time.Time(f)
    return json.Marshal(fecha.Format("02/01/2006"))
}
func (f *FechaPersonalizada) UnmarshalJSON(data []byte) error {
    var fechaStr string
    if err := json.Unmarshal(data, &fechaStr); err != nil {
        return err
    }
    fecha, err := time.Parse("02/01/2006", fechaStr)
    if err != nil {
        return err
    }
    *f = FechaPersonalizada(fecha)
    return nil
}
```

#### 2.2 Procesador de Configuración Multi-formato
```go
// filepath: ejemplos/encoding/config_processor.go
package main
import (
    "encoding/json"
    "encoding/xml"
    "fmt"
    "io"
    "path/filepath"
)
type ConfigProcessor struct {
    decoders map[string]func(io.Reader) (map[string]any, error)
}
func NewConfigProcessor() *ConfigProcessor {
    cp := &ConfigProcessor{
        decoders: make(map[string]func(io.Reader) (map[string]any, error)),
    }
    // Registrar decodificadores por extensión
    cp.decoders[".json"] = cp.decodeJSON
    cp.decoders[".xml"] = cp.decodeXML
    return cp
}
func (cp *ConfigProcessor) decodeJSON(r io.Reader) (map[string]any, error) {
    var result map[string]any
    decoder := json.NewDecoder(r)
    if err := decoder.Decode(&result); err != nil {
        return nil, err
    }
    return result, nil
}
func (cp *ConfigProcessor) decodeXML(r io.Reader) (map[string]any, error) {
    var result map[string]any
    decoder := xml.NewDecoder(r)
    if err := decoder.Decode(&result); err != nil {
        return nil, err
    }
    return result, nil
}
```

#### 2.3 Implementación de la Interfaz Encoding
```go
// filepath: ejemplos/encoding/custom_encoding.go
package main
import (
    "encoding"
    "errors"
    "fmt"
    "strconv"
    "strings"
)
// Implementación de TextMarshaler y TextUnmarshaler
type Coordenada struct {
    Latitud  float64
    Longitud float64
}
// MarshalText implementa la interfaz encoding.TextMarshaler
func (c Coordenada) MarshalText() ([]byte, error) {
    texto := fmt.Sprintf("%.6f,%.6f", c.Latitud, c.Longitud)
    return []byte(texto), nil
}
// UnmarshalText implementa la interfaz encoding.TextUnmarshaler
func (c *Coordenada) UnmarshalText(text []byte) error {
    s := string(text)
    partes := strings.Split(s, ",")
    if len(partes) != 2 {
        return errors.New("formato inválido: debe ser 'lat,long'")
    }
    
    lat, err := strconv.ParseFloat(partes[0], 64)
    if err != nil {
        return fmt.Errorf("latitud inválida: %v", err)
    }
    
    long, err := strconv.ParseFloat(partes[1], 64)
    if err != nil {
        return fmt.Errorf("longitud inválida: %v", err)
    }
    
    c.Latitud = lat
    c.Longitud = long
    return nil
}
func ejemploInterfacesEncoding() {
    // Crear una coordenada
    coord := Coordenada{40.416775, -3.703790} // Madrid
    
    // Confirmar que implementa las interfaces
    var _ encoding.TextMarshaler = coord
    var _ encoding.TextUnmarshaler = &coord
    
    // Serializar
    texto, err := coord.MarshalText()
    if err != nil {
        fmt.Println("Error serializando:", err)
        return
    }
    fmt.Printf("Coordenada serializada: %s\n", string(texto))
    
    // Deserializar en una nueva instancia
    var nuevaCoord Coordenada
    err = nuevaCoord.UnmarshalText(texto)
    if err != nil {
        fmt.Println("Error deserializando:", err)
        return
    }
    
    fmt.Printf("Coordenada deserializada: %.6f, %.6f\n", 
        nuevaCoord.Latitud, nuevaCoord.Longitud)
}
```

### 3. Mejores Prácticas

1. **Rendimiento**
   - Usar `Encoder/Decoder` para streams grandes
   - Reutilizar buffers cuando sea posible
   - Considerar formatos binarios para datos internos
   - Pre-asignar buffers con tamaños correctos usando `EncodedLen`/`DecodedLen`
   - Usar `encoding/gob` para comunicación binaria eficiente entre servicios Go

2. **Validación**
   - Implementar validación de datos
   - Manejar errores de formato
   - Validar límites y tipos de datos
   - Utilizar estructuras intermedias para datos no confiables

3. **Seguridad**
   - Evitar deserialización de datos no confiables
   - Implementar límites de tamaño
   - Usar campos privados cuando sea necesario
   - Validar entrada antes de procesar
   - Considerar implicaciones de seguridad al elegir formato

4. **Elección de Formato**
   - **JSON**: Interoperabilidad y legibilidad humana
   - **XML**: Documentos estructurados y compatibilidad con estándares
   - **GOB**: Comunicación eficiente entre servicios Go
   - **Binary**: Eficiencia máxima para formatos propietarios
   - **Base64/Hex**: Representación segura de datos binarios

### 4. Interfaces del Paquete Encoding

El paquete base `encoding` define interfaces clave que utilizan los subpaquetes específicos:

```go
// filepath: ejemplos/encoding/interfaces.go
package main
import (
    "encoding"
    "fmt"
    "reflect"
)
func mostrarInterfaces() {
    // Interfaces del paquete encoding
    fmt.Println("Interfaces principales del paquete encoding:")
    
    // BinaryMarshaler/BinaryUnmarshaler
    fmt.Println("1. encoding.BinaryMarshaler:")
    fmt.Println("   Para serialización/deserialización binaria eficiente")
    fmt.Println("   func (t T) MarshalBinary() ([]byte, error)")
    fmt.Println("   func (t *T) UnmarshalBinary(data []byte) error")
    
    // TextMarshaler/TextUnmarshaler
    fmt.Println("2. encoding.TextMarshaler:")
    fmt.Println("   Para serialización/deserialización a formato texto")
    fmt.Println("   func (t T) MarshalText() ([]byte, error)")
    fmt.Println("   func (t *T) UnmarshalText(text []byte) error")
    
    // Verificar si un tipo implementa una interfaz
    var valor float64 = 3.14
    _, implementaText := interface{}(valor).(encoding.TextMarshaler)
    fmt.Printf("¿float64 implementa TextMarshaler? %t\n", implementaText)
    
    // Usar reflection para descubrir implementaciones
    tipo := reflect.TypeOf(valor)
    textMarshalerType := reflect.TypeOf((*encoding.TextMarshaler)(nil)).Elem()
    fmt.Printf("¿%s implementa %s? %t\n", 
        tipo.Name(),
        textMarshalerType.Name(),
        tipo.Implements(textMarshalerType))
}
```

### 5. Comparativa de Formatos

| Formato | Ventajas | Desventajas | Casos de Uso |
|---------|----------|-------------|--------------|
| JSON    | - Legible por humanos<br>- Ampliamente soportado<br>- Ideal para APIs | - Menos eficiente<br>- Sin soporte para binarios | - APIs REST<br>- Configuraciones<br>- Datos web |
| XML     | - Muy estructurado<br>- Espacios de nombres<br>- Validación con DTD/XSD | - Verboso<br>- Complejo<br>- Menos eficiente | - Datos con esquema<br>- Interoperabilidad<br>- SOAP |
| CSV     | - Simple<br>- Compatible con hojas de cálculo<br>- Legible | - Esquema limitado<br>- Sin tipos de datos<br>- Ambigüedades | - Exportación de datos<br>- Importaciones simples<br>- Reportes |
| GOB     | - Muy eficiente<br>- Específico de Go<br>- Maneja tipos complejos | - No interoperable<br>- No legible | - Comunicación entre servicios Go<br>- Almacenamiento eficiente |
| Base64  | - Representa binarios como texto<br>- Seguro para texto | - Overhead 33%<br>- No legible | - Embedding binarios en JSON/XML<br>- Datos en URLs |
| Binary  | - Máxima eficiencia<br>- Control total del formato | - No legible<br>- Requiere documentación<br>- Frágil | - Protocolos de red<br>- Archivos binarios<br>- IoT/Embedded |
| ASN.1   | - Estándar establecido<br>- Esquema formal<br>- Eficiente | - Complejo<br>- Curva de aprendizaje | - Certificados X.509<br>- Telecomunicaciones<br>- Protocolos estándar |

### 6. Referencias

- [Documentación oficial de encoding](https://golang.org/pkg/encoding/)
- [Go Blog: JSON and Go](https://blog.golang.org/json)
- [Go XML Package Documentation](https://golang.org/pkg/encoding/xml/)
- [Effective Go: Marshaling & Unmarshaling](https://golang.org/doc/effective_go.html#marshaling)
- [Go Binary Package Documentation](https://golang.org/pkg/encoding/binary/)
- [Go Gob Package Documentation](https://golang.org/pkg/encoding/gob/)