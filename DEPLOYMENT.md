# Proceso de Despliegue - Pantallas de Auth0 (ACUL)

Este documento detalla el proceso paso a paso para el desarrollo, compilación, subida y configuración de las pantallas personalizadas de Auth0 (Advanced Custom Universal Login - ACUL). Está redactado en español para facilitar el entendimiento de los equipos de Desarrollo (Dev), Staging (STG) y Gestión de Configuración de Software (SCM).

---

## 1. DESARROLLO

El desarrollo de las pantallas personalizadas se realiza bajo el siguiente flujo de trabajo:

*   **Uso de SDK:** Usar SDK `@auth0/auth0-acul-react` en componentes React para interactuar con el contexto y las acciones de Auth0.
*   **Pruebas Locales:** Probar localmente con `ul-context-inspector` (variants JSON) para emular el comportamiento de Auth0 y validar los diferentes estados de la interfaz.
*   **Entorno de Desarrollo Local ("Inspector"):** Para levantar el inspector para ver los cambios live, se debe ejecutar:
    ```bash
    auth0 acul dev
    ```

---

## 2. COMPILACIÓN

Una vez finalizado el desarrollo, se procede a compilar el proyecto para generar los paquetes finales listos para producción:

*   **Comando de Compilación:**
    ```bash
    npm run build
    ```
*   **Optimización:** Este comando optimiza el código y genera la carpeta `dist/` con bundles separados y optimizados por cada pantalla específica.

### Estructura de Distribución (Directorio `dist/`)

La compilación generará la siguiente estructura de archivos en la carpeta `dist/`:

```text
dist/
└── assets/
    ├── shared/ (Recursos globales compartidos)
    │   ├── style.css          → Estilos generales (basados en Tailwind y el tema de Auth0)
    │   ├── react-vendor.js    → Núcleo de React (peso aproximado: 194 kB)
    │   ├── vendor.js          → Dependencias y librerías externas (peso aproximado: 347 kB)
    │   └── common.js          → Hooks y componentes transversales (peso aproximado: 95 kB)
    ├── signup-id/
    │   └── index.js           → Lógica particular de la pantalla de identificación (rango de 1-6 kB)
    ├── signup-password/
    │   └── index.js           → Script para la gestión de contraseña
    └── passkey-enrollment/
        └── index.js           → Módulo para el registro de llaves de paso (passkeys)
```

---

## 3. SUBIDA A CDN

Para que Auth0 pueda cargar los recursos, los archivos compilados dentro de la carpeta `dist/` deben subirse a la red de entrega de contenido (CDN) correspondiente según el ambiente:

*   **Destinos CDN:**
    *   **CDN6 (`https://cdn6.coppel.com`):** Utilizada para ambientes bajos (Develop, QA, Staging).
    *   **CDN5 (`https://cdn5.coppel.com`):** Utilizada exclusivamente para el ambiente de Producción.
*   **Ruta Estructurada (Path):** Los archivos deben colocarse bajo la ruta:
    ```text
    /Auth0/{AMBIENTE}/ACUL/*
    ```
*   **Versionado:** Para evitar problemas de caché, se utiliza un versionado estructurado en el path, por ejemplo:
    ```text
    ACUL/v1.0.0/assets
    ```

---

## 4. CONFIGURACIÓN AKAMAI (CORS) (hecho)

Debido a que las pantallas se ejecutan bajo dominios específicos de Coppel pero cargan recursos desde la CDN, es obligatorio configurar reglas de CORS en Akamai para permitir que los recursos del path `/Auth0/{AMBIENTE}/ACUL/*` sean accesibles por los orígenes autorizados.

*   **Inyección de cabecera (Header):** Se debe inyectar la cabecera `Access-Control-Allow-Origin` según corresponda al ambiente.
*   **Estrategia:** Validar siempre en los ambientes bajos antes de proceder a producción.

### Paths en `https://cdn6.coppel.com` para Ambientes Bajos

| Ambiente | Path en CDN6 (Match) | Origin Permitido (Access-Control-Allow-Origin) |
| :--- | :--- | :--- |
| **Develop** | `/Auth0/DEV/ACUL/*` | `https://login-dev.coppel.com` |
| **QA** | `/Auth0/QA/ACUL/*` | `https://login-qa.coppel.com` |
| **Staging** | `/Auth0/STG/ACUL/*` | `https://login-stag.coppel.com` |

### Paths en `https://cdn5.coppel.com` para Producción

| Ambiente | Path en CDN5 (Match) | Origin Permitido (Access-Control-Allow-Origin) |
| :--- | :--- | :--- |
| **Producción** | `/Auth0/PROD/ACUL/*` | `https://login.coppel.com` |

---

## 5. CONFIGURACIÓN EN AUTH0

Finalmente, para activar las pantallas personalizadas dentro del Tenant de Auth0, se realiza la configuración individual por pantalla:

1.  **Modo de Edición:** Por cada pantalla en la sección de Branding de Auth0, se debe habilitar y seleccionar el **Modo Avanzado** (Advanced Custom Universal Login).
2.  **Head Tags:** Se deben configurar las etiquetas `<link>` (para el CSS) y `<script>` (para los archivos JS) apuntando a las URLs de los archivos cargados en la CDN correspondientes al ambiente actual.
    *   *Nota:* Las URLs definitivas de los archivos (CSS + JS compartidos + JS específico de la pantalla) deben ser proporcionadas por el desarrollador dentro del ticket de solicitud de subida a cada ambiente.
3.  **Additional Data:** Agregar las variables de metadata o configuración adicionales requeridas para el correcto funcionamiento de cada interfaz.
