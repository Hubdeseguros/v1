# HubSeguros

HubSeguros es una plataforma web SAAS que simplifica el trabajo de agentes de seguros, permitiéndoles gestionar clientes, pólizas y siniestros en un solo lugar.

## Características principales

- **Multirol**: Diferentes niveles de acceso para agentes, promotores y administradores de agencias
- **Dashboard interactivo**: Visualización de KPIs y métricas importantes
- **Gestión de clientes**: CRM completo para seguimiento de clientes y oportunidades
- **Gestión de pólizas**: Control centralizado de todas las pólizas
- **Seguimiento de siniestros**: Gestión completa del ciclo de vida de siniestros
- **Cobros y pagos**: Control financiero de la operación
- **Reportes y análisis**: Informes detallados para toma de decisiones

## Tecnologías utilizadas

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Autenticación**: JWT (simulada para demo)
- **Despliegue**: GitHub Pages

## Estructura del proyecto

```
hubseguros/
├── app/                  # Páginas de la aplicación (Next.js App Router)
├── components/           # Componentes React reutilizables
├── public/               # Archivos estáticos
├── styles/               # Estilos globales
└── ...
```

## Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/hubseguros.git
   cd hubseguros
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Credenciales de prueba

Para acceder al dashboard de demostración, utiliza las siguientes credenciales:

- **Email**: admin@admin.com
- **Contraseña**: admin123

## Despliegue

Para desplegar la aplicación en GitHub Pages:

1. Construye la aplicación:
   ```bash
   npm run build
   ```

2. Exporta los archivos estáticos:
   ```bash
   npm run export
   ```

3. Los archivos estáticos estarán disponibles en la carpeta `out/` listos para ser desplegados.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
