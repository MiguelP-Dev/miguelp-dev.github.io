---
layout: default
title: "Circuit Breakers en Go"
description: "Implementación del patrón Circuit Breaker en Go para sistemas distribuidos resilientes. Aprende a prevenir fallos en cascada, mejorar la disponibilidad del sistema y implementar recuperación automática usando librerías como sony/gobreaker y go-breaker, con ejemplos prácticos y configuraciones avanzadas."
permalink: /concepts/go/circuitbreakers/
category: concepts
subcategory: architectures
icon: 🔌
article: true
tags: ["go", "microservices", "resilience", "distributed-systems", "fault-tolerance"]
keywords: ["circuit breaker go", "sony gobreaker", "go-breaker", "sistemas distribuidos", "resiliencia", "microservicios"]
---

## Circuit Breakers en Go

**El Circuit Breaker en Sistemas Distribuidos: Un Mecanismo de Defensa Esencial**  

**Introducción**  
En el mundo del software, especialmente en sistemas distribuidos y microservicios, los fallos son inevitables. Un servicio puede dejar de responder por sobrecarga, errores de red, o bugs inesperados. Si no manejamos estos fallos inteligentemente, un problema pequeño puede propagarse como un efecto dominó, colapsando todo el sistema. Aquí entra el **Circuit Breaker** (cortacircuitos), un patrón de diseño inspirado en los cortacircuitos eléctricos, que actúa como un "guardián" para prevenir catástrofes.  

---

**¿Qué es un Circuit Breaker?**  
Imagina un sistema eléctrico en tu casa: si hay un cortocircuito, un disyuntor corta la corriente para evitar daños. En software, el Circuit Breaker hace lo mismo: **monitorea las solicitudes entre servicios** y, si detecta que un servicio falla repetidamente, "abre el circuito" para bloquear nuevas solicitudes temporalmente. Esto evita que el sistema desperdicie recursos en intentos inútiles y le da al servicio afectado tiempo para recuperarse.  

---

**¿Cómo Funciona? Los Tres Estados Clave**  
El Circuit Breaker opera mediante una máquina de estados simple:  

1. **Cerrado (Closed)**:  
   - Estado normal. Todas las solicitudes pasan al servicio.  
   - Si ocurren errores (ej: timeout, respuestas HTTP 500), se incrementa un contador de fallos.  
   - **Umbral de fallos**: Si se supera un límite predefinido (ej: 5 fallos en 10 segundos), el circuito se abre.  

2. **Abierto (Open)**:  
   - Bloquea todas las solicitudes nuevas. No se envían más peticiones al servicio problemático.  
   - Tras un tiempo de espera (**timeout**), el circuito pasa a estado "medio abierto".  

3. **Medio Abierto (Half-Open)**:  
   - Permite un número limitado de solicitudes de prueba.  
   - Si tienen éxito, el circuito se cierra nuevamente. Si fallan, vuelve a abrirse.  

---

**Parámetros Clave para Configurarlo**  

- **Umbral de errores**: ¿Cuántos fallos activan el circuito? (Ej: 50% de errores en 1 minuto).  
- **Timeout**: ¿Cuánto tiempo permanece abierto antes de intentar recuperarse? (Ej: 30 segundos).  
- **Límite de solicitudes en Half-Open**: ¿Cuántas peticiones de prueba permitir? (Ej: 3).  

---

**¿Por Qué Usar un Circuit Breaker? Beneficios**  

1. **Evita el Colapso Total**:  
   - Si un servicio de pago falla, el Circuit Breaker evita que los usuarios queden "atorados" esperando respuestas infinitas, mostrando un mensaje alternativo ("Reintentar más tarde").  

2. **Optimiza Recursos**:  
   - Reduce la carga en servicios inestables. En vez de 1000 solicitudes fallidas por segundo, se bloquean y se redirigen a alternativas.  

3. **Recuperación Automatizada**:  
   - El sistema no depende de intervención humana. El circuito se cierra automáticamente cuando el servicio se normaliza.  

4. **Mejora la Experiencia del Usuario**:  
   - Fallos rápidos ("fail-fast") son mejores que esperas eternas. Los usuarios pueden recibir respuestas alternativas (ej: caché, modo offline).  

---

**Casos de Uso Comunes**  

- **Microservicios**: Si el servicio de autenticación falla, el Circuit Breaker evita que otros servicios (como carrito de compras) se bloqueen.  
- **Llamadas a APIs Externas**: Si una API de terceros (ej: pasarela de pago) no responde, se activa el circuito para no saturar tu sistema.  
- **Acceso a Bases de Datos**: Si la base de datos está lenta, el Circuit Breaker evita que los hilos de la aplicación se agoten esperando.  

---

**Desafíos y Buenas Prácticas**  

- **Configuración Sensible**: Umbrales muy bajos activan falsas alarmas; umbrales altos permiten fallos prolongados.  
- **Monitoreo**: Herramientas como Prometheus o Grafana ayudan a visualizar el estado de los circuitos.  
- **Fallbacks**: Siempre provee respuestas alternativas (ej: datos en caché) cuando el circuito está abierto.  
- **No es una Solución Mágica**: Debe complementarse con reintentos, timeouts y balanceo de carga.  

---

**Ejemplo en la Vida Real**  

Imagina una app de comercio electrónico:  

1. El servicio de recomendaciones empieza a fallar por alta demanda.  
2. El Circuit Breaker detecta 10 errores seguidos y abre el circuito.  
3. Los usuarios ven una sección de "Productos populares" (datos en caché) en vez de recomendaciones.  
4. Tras 1 minuto, el circuito permite 2 solicitudes de prueba. Si funcionan, todo vuelve a la normalidad.  

---

## Circuit Breakers en Go

En Go, la implementación de Circuit Breakers es relativamente sencilla gracias a goroutines y canales. Las librerías `sony/gobreaker` y `go-breaker` son las más populares en la comunidad Go, cada una con sus propias características y enfoques.

---

### Ejemplo 1: Usando Sony/GoBreaker (Librería Más Popular)

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "time"

    "github.com/sony/gobreaker"
)

// Simulamos un servicio externo que puede fallar
func externalServiceCall() (string, error) {
    // Simula una llamada HTTP que puede fallar aleatoriamente
    resp, err := http.Get("http://httpbin.org/delay/1")
    if err != nil {
        return "", fmt.Errorf("error en la llamada HTTP: %w", err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 500 {
        return "", fmt.Errorf("error del servidor: %d", resp.StatusCode)
    }
    
    return "Respuesta exitosa del servicio", nil
}

func main() {
    // Configuración avanzada del Circuit Breaker
    settings := gobreaker.Settings{
        Name:        "ExternalServiceBreaker",
        MaxRequests: 3, // Máximo 3 requests en estado Half-Open
        Interval:    10 * time.Second, // Ventana de medición de 10 segundos
        Timeout:     30 * time.Second, // 30 segundos en estado Open
        
        // Función que determina si el CB está listo para aceptar requests
        ReadinessFunc: func(counts gobreaker.Counts) bool {
            // El CB está listo si han pasado al menos 5 segundos desde el último fallo
            return counts.ConsecutiveFailures == 0
        },
        
        // Función que determina cuándo abrir el circuito
        IsSuccessful: func(err error) bool {
            // Considera exitoso si no hay error o si el error no es crítico
            if err == nil {
                return true
            }
            // Puedes personalizar qué errores no deben abrir el circuito
            return false
        },
        
        // Callback cuando cambia el estado
        OnStateChange: func(name string, from gobreaker.State, to gobreaker.State) {
            log.Printf("[%s] Estado cambió de %s a %s", name, from, to)
        },
    }

    cb := gobreaker.NewCircuitBreaker(settings)

    // Cliente con Circuit Breaker integrado
    client := &ServiceClient{cb: cb}

    // Simulamos múltiples llamadas para ver el comportamiento del CB
    for i := 0; i < 20; i++ {
        result, err := client.CallExternalService()
        
        state := cb.State()
        counts := cb.Counts()
        
        fmt.Printf("Llamada %d: Estado=%s, Resultado=%v, Error=%v\n", 
            i+1, state, result, err)
        fmt.Printf("  Contadores: Requests=%d, TotalSuccesses=%d, TotalFailures=%d, ConsecutiveFailures=%d\n\n",
            counts.Requests, counts.TotalSuccesses, counts.TotalFailures, counts.ConsecutiveFailures)
        
        time.Sleep(2 * time.Second)
    }
}

// ServiceClient encapsula la lógica del servicio con Circuit Breaker
type ServiceClient struct {
    cb *gobreaker.CircuitBreaker
}

func (sc *ServiceClient) CallExternalService() (interface{}, error) {
    // Execute envuelve la función con protección del Circuit Breaker
    return sc.cb.Execute(func() (interface{}, error) {
        return externalServiceCall()
    })
}
```

---

### Ejemplo 2: Usando go-breaker (Enfoque Diferente)

```go
package main

import (
    "context"
    "fmt"
    "log"
    "math/rand"
    "time"

    "github.com/eapache/go-breaker"
)

// Simulador de servicio con probabilidad de fallo configurable
type UnreliableService struct {
    failureRate float64 // Porcentaje de fallos (0.0 - 1.0)
}

func (s *UnreliableService) ProcessRequest(ctx context.Context, requestID int) (string, error) {
    // Simula latencia variable
    delay := time.Duration(rand.Intn(100)) * time.Millisecond
    select {
    case <-time.After(delay):
        // Continúa con el procesamiento
    case <-ctx.Done():
        return "", ctx.Err()
    }
    
    // Simula fallos basados en la tasa de fallo configurada
    if rand.Float64() < s.failureRate {
        return "", fmt.Errorf("fallo simulado en request %d", requestID)
    }
    
    return fmt.Sprintf("Procesado exitosamente: request %d", requestID), nil
}

func main() {
    // Crear servicio no confiable con 60% de tasa de fallo inicialmente
    service := &UnreliableService{failureRate: 0.6}
    
    // Configurar Circuit Breaker de go-breaker
    cb := breaker.New(3, 1, 5*time.Second) // 3 fallos, 1 éxito, 5 segundos timeout
    
    // Cliente que usa el Circuit Breaker
    client := &ResilientClient{
        service: service,
        breaker: cb,
    }
    
    // Fase 1: Alta tasa de fallos - debería abrir el circuito
    fmt.Println("=== FASE 1: Alta tasa de fallos (60%) ===")
    for i := 1; i <= 10; i++ {
        result, err := client.MakeRequest(i)
        fmt.Printf("Request %d: %s | Error: %v\n", i, result, err)
        time.Sleep(500 * time.Millisecond)
    }
    
    fmt.Println("\n=== Esperando que el circuito se abra completamente ===")
    time.Sleep(2 * time.Second)
    
    // Fase 2: Circuito abierto - debe fallar rápido
    fmt.Println("\n=== FASE 2: Circuito abierto - fallos rápidos ===")
    for i := 11; i <= 15; i++ {
        result, err := client.MakeRequest(i)
        fmt.Printf("Request %d: %s | Error: %v\n", i, result, err)
        time.Sleep(500 * time.Millisecond)
    }
    
    // Fase 3: Mejoramos el servicio y esperamos recuperación
    fmt.Println("\n=== FASE 3: Mejorando servicio (10% fallos) y esperando recuperación ===")
    service.failureRate = 0.1 // Mejoramos significativamente el servicio
    
    // Esperamos el timeout para que pase a Half-Open
    time.Sleep(6 * time.Second)
    
    for i := 16; i <= 25; i++ {
        result, err := client.MakeRequest(i)
        fmt.Printf("Request %d: %s | Error: %v\n", i, result, err)
        time.Sleep(500 * time.Millisecond)
    }
    
    fmt.Println("\n=== Estadísticas finales ===")
    fmt.Printf("Circuito cerrado y funcionando normalmente\n")
}

// ResilientClient combina el servicio con Circuit Breaker
type ResilientClient struct {
    service *UnreliableService
    breaker *breaker.Breaker
}

func (rc *ResilientClient) MakeRequest(requestID int) (string, error) {
    // Crear contexto con timeout para evitar cuelgues
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()
    
    // Intentar ejecutar con Circuit Breaker
    result, err := rc.breaker.Run(func() (interface{}, error) {
        return rc.service.ProcessRequest(ctx, requestID)
    })
    
    if err != nil {
        // Manejar diferentes tipos de errores
        switch err {
        case breaker.ErrBreakerOpen:
            return "", fmt.Errorf("Circuit Breaker abierto - servicio no disponible")
        case breaker.ErrTooManyRequests:
            return "", fmt.Errorf("Demasiadas requests - limitando tráfico")
        default:
            return "", fmt.Errorf("Error del servicio: %w", err)
        }
    }
    
    return result.(string), nil
}
```

---

### Ejemplo 3: Circuit Breaker Personalizado sin Librerías Externas

```go
package main

import (
    "errors"
    "fmt"
    "sync"
    "time"
)

// Estados del circuit breaker
const (
    StateClosed = iota // Funcionamiento normal
    StateHalfOpen      // Permitiendo algunas peticiones de prueba
    StateOpen          // Circuito abierto, no permite peticiones
)

var (
    ErrTooManyRequests = errors.New("demasiados fallos: circuito abierto")
    ErrTimeout         = errors.New("timeout en la operación")
)

// CircuitBreaker implementa el patrón del mismo nombre
type CircuitBreaker struct {
    mutex                sync.Mutex
    state                int
    failureThreshold     int64
    successThreshold     int64
    failureCount         int64
    successCount         int64
    timeout              time.Duration  // Cuánto tiempo esperar antes de cambiar de abierto a semi-abierto
    lastStateChangeTime  time.Time
}

// NewCircuitBreaker crea una nueva instancia de CircuitBreaker
func NewCircuitBreaker(failureThreshold, successThreshold int64, timeout time.Duration) *CircuitBreaker {
    return &CircuitBreaker{
        state:               StateClosed,
        failureThreshold:    failureThreshold,
        successThreshold:    successThreshold,
        timeout:             timeout,
        lastStateChangeTime: time.Now(),
    }
}

// onSuccess actualiza el estado en caso de éxito
func (cb *CircuitBreaker) onSuccess() {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()

    switch cb.state {
    case StateClosed:
        // En estado cerrado (normal), simplemente reinicia el contador de fallos
        cb.failureCount = 0
    case StateHalfOpen:
        // En estado semi-abierto, incrementa el contador de éxitos
        cb.successCount++
        // Si alcanzamos el umbral de éxito, volvemos al estado normal
        if cb.successCount >= cb.successThreshold {
            cb.setState(StateClosed)
        }
    }
}

// onFailure actualiza el estado en caso de fallo
func (cb *CircuitBreaker) onFailure() {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()

    switch cb.state {
    case StateClosed:
        // Incrementa el contador de fallos
        cb.failureCount++
        // Si excedemos el umbral, abrimos el circuito
        if cb.failureCount >= cb.failureThreshold {
            cb.setState(StateOpen)
        }
    case StateHalfOpen:
        // Cualquier fallo en estado semi-abierto vuelve a abrir el circuito
        cb.setState(StateOpen)
    }
}

// setState cambia el estado del circuit breaker
func (cb *CircuitBreaker) setState(state int) {
    cb.state = state
    cb.lastStateChangeTime = time.Now()
    
    // Reiniciamos contadores cuando cambiamos de estado
    if state == StateHalfOpen {
        cb.successCount = 0
    } else if state == StateClosed {
        cb.failureCount = 0
    }
}

// currentState devuelve el estado actual del circuit breaker
func (cb *CircuitBreaker) currentState() int {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()

    // Comprueba si debe transicionar de Open a HalfOpen
    if cb.state == StateOpen && time.Since(cb.lastStateChangeTime) >= cb.timeout {
        cb.setState(StateHalfOpen)
    }
    
    return cb.state
}

// Execute ejecuta la función proporcionada con protección de circuit breaker
func (cb *CircuitBreaker) Execute(operation func() (any, error)) (any, error) {
    // Comprueba el estado actual
    state := cb.currentState()
    
    // Si el circuito está abierto, devuelve inmediatamente un error
    if state == StateOpen {
        return nil, ErrTooManyRequests
    }
    
    // Si está semi-abierto, solo permitimos algunas peticiones
    if state == StateHalfOpen {
        cb.mutex.Lock()
        allowed := cb.successCount < cb.successThreshold
        cb.mutex.Unlock()
        
        if !allowed {
            return nil, ErrTooManyRequests
        }
    }
    
    // Ejecuta la operación
    result, err := operation()
    
    // Actualiza el estado basado en el resultado
    if err != nil {
        cb.onFailure()
        return result, err
    }
    
    cb.onSuccess()
    return result, nil
}

// GetStateString devuelve una representación en string del estado actual
func (cb *CircuitBreaker) GetStateString() string {
    state := cb.currentState()
    switch state {
    case StateClosed:
        return "CLOSED"
    case StateHalfOpen:
        return "HALF_OPEN"
    case StateOpen:
        return "OPEN"
    default:
        return "UNKNOWN"
    }
}

// Ejemplo de uso
func main() {
    // Crea un circuit breaker que se abre después de 3 fallos,
    // se cierra después de 2 éxitos consecutivos en estado semi-abierto,
    // y espera 5 segundos antes de pasar de abierto a semi-abierto
    cb := NewCircuitBreaker(3, 2, 5*time.Second)
    
    // Función para simular un servicio externo con posibilidad de fallo
    externalServiceCall := func(shouldFail bool) (any, error) {
        if shouldFail {
            return nil, ErrTimeout
        }
        return "Éxito en la operación", nil
    }
    
    // Simulamos 4 llamadas fallidas consecutivas
    fmt.Println("=== SIMULANDO 4 LLAMADAS FALLIDAS CONSECUTIVAS ===")
    for i := 0; i < 4; i++ {
        result, err := cb.Execute(func() (any, error) {
            return externalServiceCall(true)
        })
        fmt.Printf("Llamada %d: Resultado=%v, Error=%v, Estado=%s\n", 
            i+1, result, err, cb.GetStateString())
    }
    
    // En este punto el circuito debería estar abierto (no se ejecuta la operación)
    fmt.Println("\n=== INTENTANDO LLAMAR CON CIRCUITO ABIERTO ===")
    result, err := cb.Execute(func() (any, error) {
        fmt.Println("Esta función NO debería ejecutarse")
        return externalServiceCall(false)
    })
    fmt.Printf("Resultado=%v, Error=%v, Estado=%s\n", result, err, cb.GetStateString())
    
    // Simulamos el paso del tiempo para que el circuito pase a semi-abierto
    fmt.Println("\n=== ESPERANDO A QUE EL CIRCUITO PASE A SEMI-ABIERTO ===")
    fmt.Println("Esperando 6 segundos...")
    time.Sleep(6 * time.Second)
    
    // Realizamos llamadas exitosas para cerrar el circuito
    fmt.Println("\n=== REALIZANDO 3 LLAMADAS EXITOSAS EN ESTADO SEMI-ABIERTO ===")
    for i := 0; i < 3; i++ {
        result, err := cb.Execute(func() (any, error) {
            return externalServiceCall(false)
        })
        fmt.Printf("Llamada %d: Resultado=%v, Error=%v, Estado=%s\n", 
            i+1, result, err, cb.GetStateString())
    }
    
    fmt.Println("\n=== CIRCUITO RESTABLECIDO CORRECTAMENTE ===")
    fmt.Printf("Estado final: %s\n", cb.GetStateString())
}
```

---

## Comparación de Librerías

### Sony/GoBreaker vs go-breaker

| Característica | Sony/GoBreaker | go-breaker (eapache) |
|---------------|----------------|---------------------|
| **Popularidad** | ★★★★★ | ★★★☆☆ |
| **Configurabilidad** | Alta - múltiples callbacks | Media - configuración simple |
| **Métricas** | Detalladas (Counts struct) | Básicas |
| **Estados** | 3 estados estándar | 3 estados estándar |
| **Thread Safety** | ✅ Completamente seguro | ✅ Completamente seguro |
| **Personalización** | Alta - ReadinessFunc, IsSuccessful | Media |
| **Documentación** | Excelente | Buena |
| **Mantenimiento** | Activo | Menos activo |

### Recomendaciones de Uso:

- **Sony/GoBreaker**: Para sistemas de producción que requieren configuración avanzada y métricas detalladas
- **go-breaker**: Para casos simples o prototipado rápido  
- **Implementación propia**: Cuando necesites lógica muy específica o quieras evitar dependencias externas

---

## Integración con Frameworks Populares

### Con Gin (Framework Web)

```go
func CircuitBreakerMiddleware(cb *gobreaker.CircuitBreaker) gin.HandlerFunc {
    return func(c *gin.Context) {
        result, err := cb.Execute(func() (interface{}, error) {
            c.Next()
            if c.Writer.Status() >= 500 {
                return nil, fmt.Errorf("server error: %d", c.Writer.Status())
            }
            return "success", nil
        })
        
        if err != nil {
            c.JSON(503, gin.H{"error": "Service temporarily unavailable"})
            c.Abort()
            return
        }
        
        // Si llegamos aquí, la request fue exitosa
        _ = result
    }
}
```

### Con gRPC

```go
func CircuitBreakerUnaryInterceptor(cb *gobreaker.CircuitBreaker) grpc.UnaryServerInterceptor {
    return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
        return cb.Execute(func() (interface{}, error) {
            return handler(ctx, req)
        })
    }
}
```

---

**Conclusión**  
El Circuit Breaker es como un "seguro" para sistemas distribuidos. No evita los fallos, pero sí minimiza su impacto, dando resiliencia y estabilidad. En Go, librerías como `sony/gobreaker` o `go-breaker` implementan este patrón de forma eficiente, aprovechando goroutines y canales. La elección entre implementar tu propia versión o usar una librería depende de tus necesidades específicas de configuración y monitoreo.

Como desarrollador, integrarlo requiere entender bien tus servicios y ajustar parámetros según patrones de tráfico reales. En un mundo donde la disponibilidad es crítica, dominar este patrón no es opcional: es esencial. La clave está en encontrar el equilibrio perfecto entre sensibilidad a fallos y tolerancia a variaciones normales del sistema.