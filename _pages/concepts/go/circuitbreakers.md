---
layout: default
title: "Circuit Breakers en Go"
description: "Patron de diseño para el manejo de fallos en sistemas distribuidos"
permalink: /concepts/go/circuitbreakers/
category: concepts
subcategory: architectures
icon: 🔌
article: true
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

**Circuit Breakers en Go**  

En Go, la implementación de Circuit Breakers es relativamente sencilla gracias a goroutines y canales. Los paquetes `sony/gobreaker` y `go-breaker` son populares en la comunidad Go.

**Ejemplo en Go**  

```go
package main

import (
   "fmt"
   "github.com/sony/gobreaker"
   "time"
)

func main() {
   // Configuración del circuit breaker
   // Creamos una nueva instancia de Circuit Breaker y la asignamos a la variable cb
cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
    // Nombre del Circuit Breaker para identificarlo en logs o monitoreo
    Name: "myService",
    
    // Número máximo de solicitudes permitidas en estado semi-abierto
    // antes de cambiar al estado cerrado (normal)
    MaxRequests: 5,
    
    // Período de tiempo sobre el cual se miden las solicitudes fallidas
    // El contador de errores se reinicia después de este intervalo
    Interval: 30 * time.Second,
    
    // Tiempo que debe pasar en estado abierto (bloqueando solicitudes)
    // antes de cambiar a estado semi-abierto (permitiendo algunas solicitudes de prueba)
    Timeout: 10 * time.Second,
    
    // Función que determina si el Circuit Breaker está listo para permitir solicitudes
    // En este caso siempre devuelve true, lo que significa que siempre está dispuesto
    // a aceptar solicitudes si el estado interno lo permite
    Readiness: gobreaker.ReadinessFunc(func() bool { 
        return true 
    }),
    
    // Función callback que se ejecuta cada vez que el Circuit Breaker cambia de estado
    // Imprime un mensaje con el nombre del Circuit Breaker y los estados anterior y nuevo
    OnStateChange: func(name string, from gobreaker.State, to gobreaker.State) {
        fmt.Printf("Circuit Breaker: %s state changed from %s to %s\n", name, from, to)
    },
})

   // Función para llamar al servicio
   callService := func() (string, error) {
      if cb.Allow() {
         // Llamar al servicio
         // ...
         // Si falla, reportar el error al circuit breaker
         cb.ReportFailure()
         return "", fmt.Errorf("Error al llamar al servicio")
      }
      return "", fmt.Errorf("Circuit Breaker abierto")
   }

   // Ejemplo de uso
   for i := 0; i < 15; i++ {
      res, err := callService()
      fmt.Println(res, err)
      time.Sleep(1 * time.Second)
   }
}
```

---

**Conclusión**  
El Circuit Breaker es como un "seguro" para sistemas distribuidos. No evita los fallos, pero sí minimiza su impacto, dando resiliencia y estabilidad. En Go, librerías como `sony/gobreaker` o `go-breaker` implementan este patrón de forma eficiente, aprovechando goroutines y canales. Como desarrollador, integrarlo requiere entender bien tus servicios y ajustar parámetros según patrones de tráfico reales. En un mundo donde la disponibilidad es crítica, dominar este patrón no es opcional: es esencial.
