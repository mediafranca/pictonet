# Project: PictoNet

## Project Overview

PictoNet is a visionary generative language model designed to be a vital component in the Augmentative and Alternative Communication (AAC) ecosystem. It aims to address the challenge of meaning construction when a common language is not shared, enabling individuals with complex communication needs (CCN) to express themselves more effectively. PictoNet reframes generative systems as transparent, editable design materials that communities can shape to reflect their own communicative priorities, fostering co-creation and user sovereignty.

This repository, `mediafranca/pictonet`, hosts the core generative engine and foundational documentation. It is structured into two main parts:

1.  **A static website/documentation portal:** Built with [Eleventy](https://www.11ty.dev/), a static site generator. This site provides information about the project, its goals, and foundational reports. It is configured for internationalization (i18n) with support for English and Spanish.
2.  **An SVG editor application (preliminary development):** The `svg-edit/` directory contains a full-stack application built with React, Vite, and Tailwind CSS on the frontend, and an Express.js and TypeScript backend. This serves as a preliminary development environment for SVG editing functionality. The official, independent repository for the PictoForge interface, which handles RLHF (Reinforcement Learning from Human Feedback), auditing, and rating pictogram quality, is located at `https://github.com/mediafranca/pictoforge`.

PictoNet's core functionality is driven by a 5-stage generative pipeline that transforms natural language into accessible and semantically structured SVG pictograms.

## PictoNet Generative Pipeline

The PictoNet generative pipeline is a modular, five-stage process that translates a natural language utterance into a fully accessible and semantically structured pictogram:

1.  **Semantic Analysis (NLU Frontend):** Deconstructs user input text to understand communicative intent, performing Speech Act Classification, Frame Semantics Analysis, and NSM (Natural Semantic Metalanguage) Decomposition. The output is a structured semantic JSON object.
2.  **Conceptual Mapping to Visual Primitives:** Translates the structured semantic JSON into concrete visual concepts by querying a pictogram library (e.g., ARASAAC) and associating semantic roles with pictogram IDs. The output is a "Pictogram Concept Set" JSON.
3.  **Hybrid SVG Generation:** Synthesizes the final SVG file using a two-part process:
    *   **Scaffolding Generation (LLM):** A specialized Large Language Model generates a clean, structured SVG "scaffolding" where each element corresponds to a semantic concept.
    *   **Visual Refinement (Diffusion):** A conditional diffusion model refines the visual aesthetics of the SVG template without altering its underlying semantic structure.
4.  **Accessibility Post-processing:** A programmatic script injects crucial accessibility metadata (e.g., `role="img"`, `<title>`, `<desc>`, `aria-labelledby`) into the SVG to ensure WCAG/ARIA compliance.
5.  **Refinement and Iteration (RLHF):** Through the PictoForge interface, users evaluate, edit, and rate generated pictograms. This feedback is used to retrain and improve the models from Stage 1 and Stage 3 using Reinforcement Learning from Human Feedback.

## Building and Running

### Main Website (Eleventy)

The main website is in the root of the repository.

**Dependencies:**

*   Node.js
*   npm

**Key Commands:**

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run in development mode:**
    ```bash
    npm run dev
    ```
    This will start a local development server with live reloading at `http://localhost:8080`.
*   **Build for production:**
    ```bash
    npm run build
    ```
    This will generate the static site in the `docs/` directory.

### SVG Editor (Preliminary Development - `svg-edit/`)

This directory contains a preliminary development of an SVG editor. The official PictoForge interface is an independent repository.

**Dependencies:**

*   Node.js
*   npm

**Key Commands:**

*   **Navigate to the directory:**
    ```bash
    cd svg-edit
    ```
*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run in development mode:**
    ```bash
    npm run dev
    ```
    This will start the development server for both the frontend and backend.
*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Run in production mode:**
    ```bash
    npm start
    ```

## Development Conventions

### Main Website

*   **Templating:** The site uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating.
*   **Styling:** CSS is written in [Sass](https://sass-lang.com/) and located in `src/css/`. The output is in `docs/css/`.
*   **Internationalization (i18n):** The site uses the `@11ty/eleventy-plugin-i18n` plugin. Language files are located in `src/_data/i18n/`. The default language is Spanish.
*   **Directory Structure:**
    *   `src/`: Input directory for Eleventy.
    *   `docs/`: Output directory for the generated site.
    *   `src/_includes/`: Reusable layout components.
    *   `src/_data/`: Global data files.

### SVG Editor (Preliminary Development - `svg-edit/`)

*   **Frontend:**
    *   **Framework:** [React](https://react.dev/)
    *   **Build Tool:** [Vite](https://vitejs.dev/)
    *   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    *   **UI Components:** A rich set of UI components from [Radix UI](https://www.radix-ui.com/) and other libraries are used.
    *   **Routing:** [wouter](https://github.com/molefrog/wouter)
    *   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
*   **Backend:**
    *   **Framework:** [Express.js](https://expressjs.com/)
    *   **Language:** [TypeScript](https://www.typescriptlang.org/)
    *   **Database:** The use of `drizzle-orm` suggests a SQL database. The configuration is in `drizzle.config.ts`.
*   **Directory Structure:**
    *   `client/`: Frontend React application.
    *   `server/`: Backend Express.js application.
    *   `shared/`: Code shared between the frontend and backend.
