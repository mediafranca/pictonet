# Contribuir a PictoNet

**PictoNet** es una iniciativa colaborativa y abierta que integra aprendizaje automático, diseño de interacción y accesibilidad comunicacional. Damos la bienvenida a contribuciones desde una amplia gama de disciplinas—incluyendo diseño visual, lingüística, comunicación aumentativa y alternativa (CAA), estudios culturales y desarrollo de software.

## Tipos de contribución

No es necesario ser programador o programadora para contribuir de manera significativa a este proyecto. Puedes aportar en distintas formas:

- **Diseñando o revisando pictogramas**  
  Puedes sugerir mejoras en la forma, claridad, adecuación cultural o estructura semántica de los pictogramas generados. Todos los pictogramas son tratados como propuestas visuales sujetas a interpretación contextual. Agradecemos especialmente los aportes en formato SVG simplificado o en forma de comentarios estructurados.

- **Aportando metadatos o correcciones**  
  Puedes ayudar a etiquetar pictogramas con descripciones precisas y culturalmente respetuosas, corrigiendo errores en la representación de acciones, objetos o contextos.

- **Dando retroalimentación sobre usabilidad y accesibilidad**  
  Si eres usuario/a de sistemas CAA, familiar, cuidador/a o profesional del área, tus comentarios sobre comprensión, relevancia o accesibilidad son fundamentales.

- **Curando ejemplos de entrenamiento**  
  Puedes colaborar en la construcción del corpus, emparejando conceptos con estructuras visuales o validando combinaciones generadas por el modelo.

- **Documentando representaciones culturales alternativas**  
  Puedes proponer metáforas visuales o signos que representen de mejor manera a comunidades específicas (por ejemplo, comunidades indígenas, contextos latinoamericanos, usuarios neurodivergentes).

Por favor utiliza la pestaña [Issues](https://github.com/mediafranca/pictonet/issues) para sugerir nuevos pictogramas, proponer correcciones o comentar sobre los existentes. Si no manejas GitHub, puedes contactarnos directamente para proponer otras vías de colaboración.

---

## Contribuciones técnicas

Si deseas contribuir con código, modelos o herramientas de procesamiento, sigue estos pasos.

### 1. Realiza un fork del repositorio

Primero, crea una copia del repositorio `mediafranca/pictonet` en tu cuenta de GitHub.

### 2. Clona tu fork localmente

```bash
git clone https://github.com/tu-usuario/pictonet.git
cd pictonet
```

### 3. Crea una rama

Usa un nombre descriptivo para tu contribución:

```bash
git checkout -b feature/nombre-de-tu-rama
```

### 4. Realiza los cambios

Asegúrate de que el código sea modular, legible y documentado.

### 5. Haz commit y push

```bash
git add .
git commit -m "Agrega [descripción breve de tu contribución]"
git push origin feature/nombre-de-tu-rama
```

### 6. Crea un Pull Request

Desde tu fork, crea un Pull Request hacia la rama `main` del repositorio original y describe con claridad tu aporte.

---

## Estructura del repositorio

La estructura está diseñada para facilitar el entrenamiento local y remoto del modelo:

```
pictonet/
├── server/             # Servidor backend (por ejemplo Flask, FastAPI)
│   ├── app/            # Lógica principal y rutas de API
│   ├── config/         # Configuraciones y variables de entorno
│   └── utils/          # Funciones auxiliares
├── data/               # Conjuntos de datos y anotaciones
├── models/             # Modelos entrenados o definiciones
├── scripts/            # Scripts para entrenamiento, evaluación, conversión
├── notebooks/          # Notebooks exploratorios y de documentación
├── requirements.txt    # Dependencias de Python
├── environment.yml     # Definición de entorno Conda (opcional)
├── Dockerfile          # Definición de contenedor
└── README.md           # Descripción general del proyecto
```

Para ejecutar localmente:

```bash
# Crear y activar entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python server/app/main.py
```

---

## Recomendaciones

* Mantén los Pull Requests acotados y bien documentados.
* Escribe mensajes de commit informativos y precisos.
* Documenta las decisiones relevantes en el código.
* Respeta la estructura existente del repositorio.

---

Gracias por tu interés en contribuir. PictoNet es una construcción colectiva: cada pictograma, archivo, línea de código o sugerencia cuenta.
