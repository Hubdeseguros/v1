# HubSeguros

HubSeguros es una plataforma SAAS B2B diseñada específicamente para el sector asegurador, con el objetivo de optimizar las operaciones y aumentar las ventas mediante la automatización y organización de procesos.

## Características principales

- **Sistema Multirol**: 
  - SUPERADMIN: Control total del sistema
  - ADMIN: Gestión de usuarios y roles
  - AGENCIA: Gestión completa de la agencia
  - PROMOTOR: Gestión de equipos y ventas
  - CLIENTE: Acceso limitado a información personal

- **Módulos Principales**:
  - CRM Integrado
  - Gestión de Pólizas
  - Control de Siniestros
  - Dashboard Analítico
  - Sistema de Cobros
  - Gestión de Usuarios

- **Funcionalidades**:
  - Gestión completa de clientes
  - Emisión y renovación de pólizas
  - Seguimiento de siniestros
  - Reportes y análisis
  - Automatización de procesos
  - Gestión financiera

## Tecnologías utilizadas

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Autenticación**: JWT (simulada para demo)
- **Despliegue**: GitHub Pages

## Arquitectura del Sistema

### Roles del Sistema

- **SUPERADMIN**: Control total del sistema
- **ADMIN**: Gestión de usuarios y roles
- **AGENCIA**: Gestión completa de la agencia
- **PROMOTOR**: Gestión de equipos y ventas
- **CLIENTE**: Acceso limitado a información personal

### Módulos Principales

1. **CRM Integrado**
   - Gestión de clientes
   - Seguimiento de interacciones
   - Historial completo

2. **Gestión de Pólizas**
   - Emisión de pólizas
   - Renovaciones
   - Vencimientos
   - Seguimiento

3. **Control de Siniestros**
   - Gestión documental
   - Seguimiento en tiempo real
   - Comunicación con aseguradoras

4. **Dashboard Analítico**
   - KPIs importantes
   - Seguimiento de objetivos
   - Informes avanzados

5. **Sistema de Cobros**
   - Gestión financiera
   - Liquidaciones
   - Pagos y recibos

6. **Gestión de Usuarios**
   - Roles y permisos
   - Control de acceso
   - Seguridad

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
