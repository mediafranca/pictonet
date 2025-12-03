## PictoNet – Technical Plan (2025–2027)

A public-interest initiative for accessible, transparent, and culturally grounded symbol generation


## 0. Overview

PictoNet is an open project committed to expanding communication opportunities for individuals who rely on Augmentative and Alternative Communication (AAC). The initiative seeks to design a controllable, transparent text-to-SVG generative system that supports the production of cognitively accessible pictograms.

This technical roadmap reflects the current evidence gathered in experimental work carried out with image and text generative models, documented in the PictoNet experimental logbook  ￼. The plan outlines a realistic sequence of actions that can be achieved within the lifespan of a doctoral research programme while maintaining the broader goal of serving the public good through open, interpretable, and culturally responsive technology.

## 1. Stage One — Dataset Consolidation (Q2–Q3 2025)

A reliable dataset is the foundation for any generative system intended for communicative use. Initial experiments demonstrated that training collapses when the model receives few or inconsistent samples. This stage focuses on creating a stable, representative corpus.

### 1.1 Curate a structured SVG dataset
- Assemble a core collection of 500–1,000 SVG pictograms.
- Standardise line thickness, proportions, and spatial conventions.
- Document semantic intent (action, object, context) through metadata.
- Align all files with a consistent SVG grammar that models can learn.

### 1.2 Establish a formal SVG syntax specification

Experimental results showed:

- truncated outputs due to context limitations,
- repetitive generations without termination tokens,
- invalid or partially rendered structures.

To address this:

- define a canonical ordering of SVG elements,
- enforce explicit closing tokens,
- specify minimal and maximal structural variation.

Deliverables

- `svg_core_dataset/`
- `svg_syntax_spec.md`

## 2. Stage Two — Controlled LLM Training Pipeline (Q3–Q4 2025)

Experiments using Qwen3-4B-Instruct revealed that long-context training (32k tokens) is essential for generating complete SVGs. However, semantic alignment cannot be achieved without a carefully staged approach.

### 2.1 Two-phase supervised fine-tuning

**Phase A — Structural Learning**

Objective: teach the model how an SVG is built.

- Use 1–2k samples from structured vector datasets (such as SVGX).
- Maintain strict formatting and predictable grammar.
- Emphasise correct generation boundaries.

**Phase B — Semantic Learning**

Objective: teach the model what AAC pictograms represent.

- Fine-tune using the curated PICTOS-based dataset.
- Provide rich semantic metadata.
- Retain long context windows and controlled LoRA modules.

### 2.2 Termination token training

As the model often fails to produce <|im_end|>, each sample will:

- include a closing token,
- show explicit start–end boundaries,
- incorporate examples of incorrect sequences for contrastive learning.

### 3. Stage Three — Reinforcement Learning with GRPO (Q1–Q2 2026)

Reinforcement Learning (RL) is expected to improve semantic reliability and reduce hallucination. Guidance from the experimental logbook notes the need for:

- a minimum of 500 samples,
- around 12 hours of training time,
- more than 1,000 RL steps.

### 3.1 Reward functions

Reward design will prioritise communicative clarity and technical stability.

- SVG validity reward: renders without error.
- Style reward: line weight, proportion, and geometry within defined bounds.
- Semantic reward: alignment between prompt and pictogram.
- Termination reward: production of the correct closing token.

### 3.2 Expected outcomes

RL is not intended to produce perfectly formed pictograms. Its purpose is to:

- stabilise the structure,
- encourage appropriate termination,
- improve alignment with AAC meanings,
- reduce unpredictable SVG patterns.


## 4. Stage Four — Prototype Text-to-SVG Engine (Q3–Q4 2026)

This prototype will translate the trained model into a tool that AAC experts can use to explore, test, and refine generated pictograms.

### 4.1 Inference interface

- Prompt → SVG output.
- Real-time rendering and syntax validation.
- Automatic correction for minor structural errors.

### 4.2 Integration with PictoForge

PictoForge acts as the expert-in-the-loop environment.

- Import SVG predictions.
- Allow experts to refine structure, meaning, and visual form.
- Store every revision with metadata describing the reasoning behind it.

### 4.3 Metadata logging

Each interaction will create a record containing:

- original prompt,
- raw model output,
- expert edits,
- semantic notes and contextual rationale.

This will support later refinement of the model and strengthen interpretability.

## 5. Stage Five — Expert-in-the-Loop Evaluation (2027)

### 5.1 Workshops with AAC practitioners

Coordinated sessions will evaluate:

- semantic adequacy,
- level of abstraction,
- visual clarity,
- suitability for autistic adolescents and young adults.

### 5.2 Analysis of expert edits

Each expert correction will be treated as:

- a semantic constraint,
- a stylistic preference grounded in practice,
- a culturally situated adjustment where required.

### 5.3 Iterative refinement

Produce model checkpoints labelled according to the iteration cycle:

- `pictomodel-alpha`
- `pictomodel-beta`
- `pictomodel-release-candidate`


## 6. Stage Six — Final Deliverables (Late 2027)

### 6.1 Model and dataset release

- Open-licensed trained model.
- Complete dataset with documentation.
- Reproducible training pipeline.

### 6.2 Documentation and technical notes

- architecture of the text-to-SVG system,
- training workflow,
- dataset construction guidelines,
- evaluation outcomes.

### 6.3 Conceptual contribution

The project will articulate:

- a design framework for treating AI as a malleable material in AAC practice,
- methods for embedding expert judgement into generative systems,
- tools for transparent and culturally sensitive pictogram generation,
- a sociotechnical account of how experts and models co-define a representational space.


PictoNet positions accessible communication as a shared public responsibility.

By developing open and interpretable tools—guided by AAC professionals, grounded in transparent generative methods, and made available to communities who rely on visual communication—the project aims to support communication rights and linguistic dignity for people with complex communication needs.
