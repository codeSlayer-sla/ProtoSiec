# Portal de Datos Abiertos SIEC

Este proyecto es un portal de datos abiertos para el Sistema Integrado de Estadísticas Criminales (SIEC) de Panamá. Proporciona acceso a información estadística criminal y de seguridad pública de manera transparente y abierta.

## Características principales

- **Mapa interactivo**: Visualización geográfica de estadísticas por provincia
- **Conjuntos de datos**: Acceso a múltiples conjuntos de datos sobre criminalidad y seguridad
- **API documentada**: Acceso programático a los datos para desarrolladores
- **Visualizaciones**: Gráficos y visualizaciones interactivas de los datos
- **Formatos múltiples**: Datos disponibles en JSON, CSV, GeoJSON y Excel
- **Herramientas para desarrolladores**: Bibliotecas y recursos para integración
- **Chatbot asistente**: Guía interactiva para navegar por el portal

## Estructura del proyecto

El proyecto está organizado en componentes reutilizables siguiendo las mejores prácticas de React y Next.js:

\`\`\`
/app                    # Directorio principal de la aplicación Next.js
  /page.tsx             # Página principal del portal
  /layout.tsx           # Layout principal de la aplicación
  /globals.css          # Estilos globales
/components             # Componentes reutilizables
  /ui                   # Componentes de UI básicos (shadcn/ui)
  /hero-animation.tsx   # Animación de partículas para el hero
  /panama-map.tsx       # Mapa interactivo de Panamá
  /dataset-card.tsx     # Tarjeta para mostrar conjuntos de datos
  /statistic-card.tsx   # Tarjeta para mostrar estadísticas
  /chatbot.tsx          # Componente de chatbot asistente
  /hover-image.tsx      # Componente de imagen con efectos hover
  /contact-form.tsx     # Formulario de contacto
  /api-documentation.tsx # Documentación de la API
  /data-formats.tsx     # Información sobre formatos de datos
  /data-visualization.tsx # Visualizaciones de datos
  /developer-tools.tsx  # Herramientas para desarrolladores
/hooks                  # Custom hooks
  /use-mobile.tsx       # Hook para detectar dispositivos móviles
  /use-toast.ts         # Hook para mostrar notificaciones
/lib                    # Utilidades y funciones auxiliares
  /utils.ts             # Funciones de utilidad
  /pdf-generator.ts     # Generador de PDFs
\`\`\`

## Componentes principales

### Mapa Interactivo (`panama-map.tsx`)

Mapa SVG interactivo de Panamá que muestra estadísticas por provincia al pasar el cursor sobre cada región. Incluye datos como población, tasa de criminalidad, incidentes reportados y tendencias.

### Chatbot (`chatbot.tsx`)

Asistente virtual que guía a los usuarios a través del portal mediante opciones predefinidas. Permite navegar a diferentes secciones del sitio y proporciona información relevante sobre los datos disponibles.

### Documentación de API (`api-documentation.tsx`)

Documentación completa de la API REST que permite acceder programáticamente a los datos. Incluye endpoints, ejemplos de código, información de autenticación y más.

### Visualización de Datos (`data-visualization.tsx`)

Componente que muestra visualizaciones interactivas de los datos, incluyendo gráficos de líneas, barras, circulares y mapas de calor.

### Formulario de Contacto (`contact-form.tsx`)

Formulario validado para que los usuarios puedan enviar consultas y solicitudes al equipo de SIEC.

## Tecnologías utilizadas

- **Next.js**: Framework de React para renderizado del lado del servidor
- **React**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de CSS utilitario
- **Framer Motion**: Biblioteca para animaciones
- **Shadcn/UI**: Componentes de UI reutilizables
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas
- **jsPDF**: Generación de documentos PDF

## Optimizaciones implementadas

1. **Componentización**: Código organizado en componentes reutilizables para mejor mantenibilidad
2. **Lazy loading**: Carga diferida de componentes pesados
3. **Responsive design**: Diseño adaptable a diferentes tamaños de pantalla
4. **Accesibilidad**: Implementación de prácticas de a11y
5. **Rendimiento**: Optimización de animaciones y renderizado
6. **SEO**: Metadatos y estructura semántica para mejor indexación

## Características interactivas

1. **Mapa interactivo**: Muestra estadísticas al pasar el cursor sobre provincias
2. **Chatbot guiado**: Asistente con opciones predefinidas para navegar el portal
3. **Efectos hover**: Componentes con efectos visuales al interactuar
4. **Visualizaciones interactivas**: Gráficos que responden a selecciones del usuario
5. **Formularios validados**: Validación en tiempo real con feedback inmediato
6. **Tabs y filtros**: Organización de contenido en pestañas navegables

## Guía de uso

1. **Exploración de datos**: Navega a la sección "Conjuntos de Datos" para ver los datos disponibles
2. **Consulta del mapa**: Utiliza el mapa interactivo para ver estadísticas por provincia
3. **Descarga de datos**: Cada conjunto de datos puede descargarse en múltiples formatos
4. **Uso de la API**: Consulta la documentación de la API para integrar los datos en tus aplicaciones
5. **Contacto**: Utiliza el formulario de contacto para enviar consultas al equipo de SIEC

## Mejoras futuras

- Implementación de autenticación para acceso a datos sensibles
- Integración con sistemas de análisis predictivo
- Creación de dashboards personalizables por el usuario
- Expansión de la API con más endpoints y funcionalidades
- Soporte para más idiomas (inglés, francés, etc.)
- Implementación de modo oscuro
