# PictoNet Web

Este repositorio corresponde a la **interfaz web** de PictoNet, un sistema que utiliza modelos de machine learning para generar pictogramas vectoriales (SVG) y mejorar la accesibilidad cognitiva. Aquí se concentra todo lo relacionado con la parte **Frontend** (plantillas, estilos, scripts y lógica de interacción del usuario).

## Estructura General

```
pictonet-web/
├─ src/
│  ├─ _data/
│  │  └─ i18n/
│  │     ├─ en.json
│  │     └─ es.json
│  ├─ _includes/
│  │  ├─ layouts/
│  │  │  └─ layout.njk
│  │  ├─ partials/
│  │  │  ├─ header.njk
│  │  │  ├─ footer.njk
│  │  │  └─ nav.njk
│  ├─ css/
│  │  └─ styles.scss       <- SCSS principal (compilado a styles.css)
│  ├─ js/
│  │  └─ pictonet.js       <- Lógica de frontend (modo oscuro, editor SVG, etc.)
│  ├─ index.njk            <- Página principal (Home)
│  ├─ about.njk            <- Sección "Acerca de PictoNet"
│  ├─ team.njk             <- Listado de equipo/usuarios
│  └─ svg-editor.njk       <- Página ejemplo: Editor de SVG (mock)
├─ eleventy.config.mjs      <- Configuración de Eleventy
├─ package.json
├─ package-lock.json
└─ README.md                <- Este archivo
```

## Requisitos Previos

- **Node.js** (versión 14 o superior recomendada; Eleventy requiere Node 18 para versiones recientes).
- **npm** o **yarn** instalado.
- Opcional: [**Sass**](https://sass-lang.com/) si deseas compilar manualmente el archivo `styles.scss`. Aunque puede hacerse vía scripts de npm.

## Configuración e Instalación

1. **Clona** este repositorio:

   ```bash
   git clone https://github.com/hspencer/pictonet.git
   cd pictonet
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

   *(Si usas Yarn, simplemente: `yarn`)*

3. **(Opcional) Compila los estilos** si haces cambios en `styles.scss`:

   ```bash
   npm run sass
   ```

   Esto generará/actualizará el archivo `styles.css` dentro de la carpeta `css`.

## Ejecutar el Sitio en Desarrollo

Para arrancar un servidor de desarrollo local con recarga en vivo:

```bash
npx @11ty/eleventy --serve
```

Por defecto, el sitio se servirá en [http://localhost:8080](http://localhost:8080). Eleventy quedará “escuchando” los cambios en archivos y se recargará automáticamente cuando detecte modificaciones.

Si prefieres un script en `package.json`, puedes agregar algo como:

```json
"scripts": {
  "dev": "eleventy --serve"
}
```

Y luego correr:

```bash
npm run dev
```

## Construir para Producción

Para generar la versión estática final en la carpeta **docs** (o la que definas en `eleventy.config.mjs`):

```bash
npx @11ty/eleventy
```

(o en caso de haber creado un script en `package.json`)

```bash
npm run build
```

El resultado final será una serie de archivos HTML y otros recursos listos para ser desplegados en tu hosting estático (GitHub Pages, Netlify, Vercel, etc.).

## Más Información

- **Eleventy**: [Documentación oficial](https://www.11ty.dev/docs/)  
- **Nunjucks**: [Guía de Nunjucks](https://mozilla.github.io/nunjucks/)  
- **i18n**: Se soporta internacionalización a través de la carpeta `i18n`, configurada en `eleventy.config.mjs`.

## Licencia

Este proyecto se distribuye bajo la Licencia [MIT](./LICENSE).  

¡Gracias por usar **PictoNet Web**! Cualquier mejora o corrección es bienvenida a través de _Issues_ o _Pull Requests_.