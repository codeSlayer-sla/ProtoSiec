# Documentación del Portal de Datos Abiertos SIEC

## Introducción

Este documento proporciona una descripción detallada del Portal de Datos Abiertos del Sistema Integrado de Estadísticas Criminales (SIEC) de Panamá. El portal está diseñado para ofrecer acceso transparente a información estadística criminal y de seguridad pública, facilitando la investigación, análisis y formulación de políticas públicas.

## Misión y Visión

### Misión
Desarrollar programas, proyectos, y actividades destinados al procesamiento de las estadísticas criminales con fines de investigación, observación, análisis situacional, y formulación de políticas públicas, para la toma de decisiones a nivel estratégico, en la lucha por la disminución de los índices de criminalidad en nuestra sociedad.

### Visión
Contribuir a la generación, desarrollo y aplicación del conocimiento científico y tecnológico, que permita reducir los índices delictivos y mejorar la convivencia ciudadana, para la prevención y control de la criminalidad, con orientación hacia la excelencia en el ámbito nacional e internacional.

## Componentes Principales del Portal

### 1. Página Principal

La página principal del portal ofrece una visión general de los servicios y datos disponibles. Incluye:

- **Encabezado (Navbar)**: Menú de navegación principal con enlaces a las diferentes secciones.
- **Sección Hero**: Presentación visual atractiva con animación de partículas y mensaje de bienvenida.
- **Mapa Interactivo de Panamá**: Visualización geográfica que permite explorar datos por provincia.
- **Conjuntos de Datos Destacados**: Muestra de los conjuntos de datos más relevantes o recientes.
- **Estadísticas Destacadas**: Cifras clave sobre criminalidad y seguridad en Panamá.
- **Sección Sobre SIEC**: Información sobre la misión, visión y objetivos del SIEC.
- **Formulario de Contacto**: Permite a los usuarios enviar consultas o comentarios.
- **Chatbot Asistente**: Guía interactiva para navegar por el portal.

### 2. Mapa Interactivo

El mapa interactivo de Panamá permite visualizar estadísticas por provincia. Características:

- Visualización de datos por provincia al pasar el cursor sobre cada región
- Muestra información como población, tasa de criminalidad e incidentes reportados
- Opción para ver datos históricos y tendencias
- Posibilidad de descargar los datos visualizados

### 3. Conjuntos de Datos

Esta sección presenta los diferentes conjuntos de datos disponibles:

- Organización por categorías (tipo de delito, ubicación, período)
- Descripción detallada de cada conjunto de datos
- Opciones de descarga en múltiples formatos (JSON, CSV, Excel, PDF, GeoJSON)
- Metadatos sobre la fuente y fecha de actualización

### 4. Visualizaciones de Datos

Herramientas interactivas para explorar y analizar los datos:

- Gráficos de líneas para tendencias temporales
- Gráficos de barras para comparaciones
- Gráficos circulares para distribuciones
- Mapas de calor para concentraciones geográficas
- Visualizaciones avanzadas para análisis más detallados

### 5. API para Desarrolladores

Documentación y recursos para acceder programáticamente a los datos:

- Endpoints disponibles
- Parámetros de consulta
- Ejemplos de código
- Formatos de respuesta
- Límites de uso

### 6. Formulario de Contacto

Permite a los usuarios comunicarse con el equipo del SIEC:

- Campos para nombre, correo electrónico y mensaje
- Validación de datos en tiempo real
- Confirmación de envío
- Opciones alternativas de contacto

## Guía Técnica de Componentes

### Formulario de Contacto

El formulario de contacto permite a los usuarios enviar mensajes al equipo del SIEC. A continuación se detalla su funcionamiento:

#### Componentes Principales:

1. **Interfaz de Usuario (contact-form.tsx)**
   - Formulario con campos para nombre, correo electrónico y mensaje
   - Validación de datos antes del envío
   - Indicadores visuales de estado (enviando, éxito, error)
   - Mensajes de confirmación o error

2. **Procesamiento del Servidor (api/contact/route.ts)**
   - Recibe los datos del formulario
   - Valida la información recibida
   - Envía el correo electrónico usando el servicio de Gmail
   - Devuelve respuesta de éxito o error

#### Flujo de Trabajo:

1. El usuario completa el formulario con su nombre, correo electrónico y mensaje
2. Al hacer clic en "Enviar", se validan los datos en el navegador
3. Si la validación es exitosa, se envían los datos al servidor
4. El servidor procesa la solicitud y envía un correo electrónico
5. Se muestra un mensaje de confirmación o error al usuario

#### Configuración del Correo Electrónico:

El sistema utiliza Gmail como servicio de correo electrónico para enviar los mensajes del formulario de contacto. La configuración incluye:

- **Servidor SMTP**: smtp.gmail.com
- **Puerto**: 587
- **Seguridad**: TLS
- **Autenticación**: Requiere usuario y contraseña

#### Solución de Problemas Comunes:

1. **Error "dns.lookup"**:
   - **Causa**: Problemas de conexión con el servidor SMTP de Gmail
   - **Solución**: Verificar la conexión a internet y asegurarse de que el servidor tenga acceso a los servidores DNS

2. **Error de autenticación**:
   - **Causa**: Credenciales incorrectas o problemas con la configuración de seguridad de Gmail
   - **Solución**: Verificar las credenciales y habilitar el acceso de aplicaciones menos seguras en Gmail o usar contraseñas de aplicación

3. **Tiempo de espera agotado**:
   - **Causa**: Problemas de red o servidor SMTP no disponible
   - **Solución**: Aumentar los tiempos de espera en la configuración o verificar la disponibilidad del servidor

### Chatbot Asistente

El chatbot asistente proporciona una guía interactiva para navegar por el portal. Características:

#### Componentes Principales:

1. **Interfaz de Usuario**
   - Ventana de chat minimizable
   - Historial de mensajes
   - Campo de entrada de texto
   - Botones de opciones predefinidas

2. **Lógica de Procesamiento**
   - Reconocimiento de consultas comunes
   - Respuestas predefinidas para preguntas frecuentes
   - Opciones de navegación a diferentes secciones del portal
   - Capacidad para proporcionar información sobre datos y servicios

#### Flujo de Trabajo:

1. El usuario abre el chatbot desde el botón flotante
2. El chatbot muestra un mensaje de bienvenida con opciones iniciales
3. El usuario selecciona una opción o escribe una consulta
4. El chatbot procesa la entrada y proporciona una respuesta relevante
5. Si la respuesta incluye opciones de navegación, el usuario puede hacer clic para ir a esa sección

#### Funcionalidades Principales:

- **Navegación Asistida**: Dirige a los usuarios a secciones específicas del portal
- **Respuestas a Preguntas Frecuentes**: Proporciona información sobre el SIEC y sus datos
- **Asistencia para Descargas**: Guía a los usuarios en el proceso de descarga de datos
- **Sugerencias de Búsqueda**: Ofrece sugerencias basadas en la entrada del usuario

## Guía de Mantenimiento

### Actualización de Datos

Los conjuntos de datos deben actualizarse regularmente para mantener la relevancia del portal:

1. Preparar los nuevos datos en los formatos requeridos
2. Actualizar los archivos en el servidor
3. Actualizar los metadatos (fecha de actualización, fuente, etc.)
4. Verificar que las visualizaciones se actualicen correctamente

### Configuración del Correo Electrónico

Para modificar la configuración del correo electrónico:

1. Acceder al archivo `app/api/contact/route.ts`
2. Actualizar las credenciales y configuración según sea necesario
3. Probar el formulario para asegurarse de que funcione correctamente

Recomendaciones:
- Usar variables de entorno para las credenciales en lugar de hardcodearlas
- Configurar alertas para errores en el envío de correos
- Revisar regularmente los registros para detectar problemas

### Actualización del Chatbot

Para actualizar las respuestas y opciones del chatbot:

1. Acceder al archivo `components/chatbot.tsx`
2. Modificar las respuestas predefinidas en la función `getResponse`
3. Actualizar las opciones de navegación según sea necesario
4. Probar el chatbot para asegurarse de que funcione correctamente

## Preguntas Frecuentes

### ¿Cómo se actualizan los datos en el portal?
Los datos se actualizan periódicamente según los ciclos de recopilación del SIEC. Cada conjunto de datos incluye su fecha de última actualización.

### ¿Qué hacer si el formulario de contacto no funciona?
Verificar la conexión a internet, las credenciales de correo electrónico y los registros del servidor para identificar el problema específico.

### ¿Cómo se pueden añadir nuevas visualizaciones?
Las nuevas visualizaciones se pueden añadir creando componentes adicionales en la carpeta `components` y actualizando las páginas correspondientes.

### ¿Qué tecnologías se utilizan en el portal?
El portal utiliza Next.js, React, TypeScript, Tailwind CSS, Framer Motion, y otras bibliotecas modernas para proporcionar una experiencia de usuario óptima.

## Conclusión

El Portal de Datos Abiertos del SIEC es una herramienta valiosa para acceder a información estadística criminal y de seguridad pública en Panamá. Su diseño intuitivo y funcionalidades avanzadas facilitan la exploración, análisis y descarga de datos, contribuyendo a la transparencia y a la toma de decisiones informadas en materia de seguridad.

Para cualquier consulta adicional, no dude en contactar al equipo de soporte técnico del SIEC.
