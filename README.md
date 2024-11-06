# PictoNet

Sistema de generación automática de pictogramas vectoriales para accesibilidad cognitiva.

## Estructura del Proyecto

PictoNet está organizado en cinco repositorios principales, cada uno con una responsabilidad específica:

- **pictonet-core**: Modelos de ML y pipeline de entrenamiento
- **pictonet-data**: Procesamiento y gestión de datos
- **pictonet-api**: API REST/GraphQL
- **pictonet-web**: Interfaz web
- **pictonet-tools**: Herramientas de desarrollo

## Introducción

PictoNet es un sistema que utiliza machine learning para generar pictogramas vectoriales a partir de conceptos textuales. El proyecto busca mejorar la accesibilidad cognitiva generando pictogramas claros y consistentes en formato SVG.

## Arquitectura

```
pictonet/
├── pictonet-core/     # Núcleo de ML
├── pictonet-data/     # Gestión de datos
├── pictonet-api/      # API REST/GraphQL
├── pictonet-web/      # Frontend
└── pictonet-tools/    # Utilidades
```

## Primeros Pasos

1. Clona este repositorio y sus submodulos:
```bash
git clone --recursive https://github.com/tuusuario/pictonet.git
```

2. Sigue las instrucciones de instalación en cada subreposotorio.

3. Consulta la documentación específica de cada componente en sus respectivos READMEs.

## Licencia

MIT