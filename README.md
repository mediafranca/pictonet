# PictoNet: Local, Modular, and Semantically Grounded Pictogram Generation

**PictoNet** is an open and public initiative led by [MediaFranca](https://github.com/mediafranca). It aims to develop a generative pictogram system to support individuals with complex communication needs (CCN), with a particular focus on cognitive accessibility, cultural responsiveness, and self-determination.

PictoNet is a research-driven visual language pipeline designed to generate editable, semantically meaningful SVG pictograms from natural language input. It is built around the principle of doing more with less: using small, local models, modular components, and iterative refinement rather than relying on large-scale, opaque AI infrastructures.

The core insight is to bootstrap the system with a seed model that generates synthetic training data for a more refined model down the line. The approach is highly adaptable, culturally aware, and geared towards self-hosted, federated environments.

This repository hosts the preliminary development of the core engine for pictogram generation. The project is in an early research and prototyping phase and is not yet suitable for production use.

## Project Goals

- Develop a generative model capable of producing semantically coherent pictograms from textual input.
- Create a public infrastructure for dataset sharing, model evaluation, and interface testing.
- Encourage collaborative contributions from the research, AAC, and design communities.

## Roadmap

This roadmap outlines the planned development milestones for the PictoNet project:

1. **Identification of Foundational Models**  
   Evaluation of suitable architectures for text-to-image generation and symbolic reasoning, with emphasis on interpretability and SVG output.

2. **Dataset Generation and Curation**  
   - Construction of training datasets combining visual, linguistic, and contextual information.  
   - Validation and expert curation to ensure consistency, usability, and inclusivity of generated outputs.

3. **Development of RLHF Interface**  
   - Design and implementation of a Reinforcement Learning from Human Feedback (RLHF) interface for iterative model improvement.  
   - Integration of community feedback and expert annotations to guide model fine-tuning.

## High-Level Strategy

### Objective

To build a pictogram-based AAC (Augmentative and Alternative Communication) tool that translates natural language into structured, context-aware, and editable SVGs — optimised for accessibility, transparency, and cultural relevance.

### Design Philosophy

* Prioritise modularity over complexity
* Enable local training and deployment
* Design for human-in-the-loop collaboration
* Use semantic abstraction to guide visual composition
* Emphasise cultural adaptability and transparent workflows

## System Architecture

The pipeline consists of three iterative stages:

### 1. Semantic Planning (LLM as Visual Planner)

* **Input**: A phrase in natural language (e.g. "A friendly robot holding a green triangular flag")

* **LLM Role**: Acts as a semantic parser and visual planner, producing a structured scene blueprint:

  * **Entities (objects)**: e.g. `robot_body`, `robot_head`, `flag`
  * **Attributes**: shape, colour, emotion, etc.
  * **Spatial relationships**: above, inside, near, etc.
  * **Style hints**: e.g. cartoonish, minimal, sharp

* **Output**: A JSON or XML blueprint for the scene layout

This layer can use local LLMs (e.g. Mistral, LLaMA) with prompt engineering or light fine-tuning for domain-specific planning.

### 2. SVG Generation (Token-to-Icon)

* **Approach A: Symbol Reuse**
  Use a curated `<defs>` library of basic shapes and icons, composable into new images via attributes.

* **Approach B: SVG Synthesis**
  For new entities or combinations, generate SVG code from scratch using:

  * Diffusion models with SVG output
  * LLMs fine-tuned on SVG syntax
  * Hybrid symbolic models (e.g. OmniSVG)

* **Layout Composition**:
  Using the semantic plan, each element is placed using:

  * `x`, `y`, `width`, `height`, `transform`
  * Proper z-index ordering by SVG DOM order
  * Semantic tagging via `id`, `class`, and `data-*`

* **Output**: A fully structured and valid SVG file with embedded semantics

### 3. Human Feedback & Refinement Loop

* **Rendering & Review**:
  Display SVG to user for visual, semantic, and functional validation.

* **Feedback Modes**:

  * Direct SVG editing (drag, resize, restyle)
  * Natural language commands (e.g. "make the flag bigger")
  * Auditing via LLM (comparison with initial intent)

* **Refinement Cycle**:

  * Log changes
  * Re-generate only affected components
  * Use human corrections to train improved iterations

## Seed Model: Bootstrapping with Small Data

To initiate the system:

* Curate \~50 input phrases from AAC contexts (e.g. ARASAAC)
* Handcraft or adapt \~50 corresponding SVGs
* Train a small model that can generalise basic combinations
* Use this as a **synthetic data generator** for further training

This foundational phase facilitates iterative development without requiring large data corpora.

## Workflow Summary

1. User inputs natural language
2. LLM parses it into a structured scene blueprint
3. Generator model creates SVG components
4. Composer assembles final SVG
5. User provides feedback (visual or textual)
6. System logs feedback and retrains incrementally

## Security, Accessibility and Governance Considerations

* **Local-first approach**: By favouring local inference and training, PictoNet reduces dependency on external servers and increases user control over data.
* **Editable by design**: All SVGs include semantic metadata, making them modifiable through UI or direct code intervention.
* **Transparent versioning**: All edits and generated outputs can be logged and version-controlled (e.g. via Git), allowing rollbacks and auditability.
* **Community contribution model**: Pictograms and scene blueprints can be peer-reviewed and validated before being used in re-training cycles.
* **Cultural sensitivity**: Local variants of pictograms can be added or swapped to reflect specific linguistic, social or symbolic preferences.

## Future Directions

* **Editor Integration**: A web-based editor for SVGs will allow visual editing with semantic tags preserved.
* **Federated learning**: The system will eventually support federated updates from decentralised users, maintaining model coherence while respecting privacy.
* **Stylistic expansion**: Incorporate stylisation models (e.g. sketch-like, isotype, cartoon) depending on user preference or context.
* **Multi-language pipeline**: Add parsing support for phrases in multiple languages, while keeping the scene blueprint format language-neutral.
* **Eye-tracking and situated interaction**: Explore using gaze tracking and contextual signals to predict user intent (cf. Visual World Paradigm).

## Contributing

This project is open to collaboration from researchers, developers, designers, and AAC users. Contributions can include:

* SVG icon contributions (following semantic and stylistic guidelines)
* Dataset suggestions and linguistic corpora
* Improvements to the editor, parser or layout engine
* Feedback from AAC practitioners and communities

For details on how to contribute, please see our [CONTRIBUTING.md](CONTRIBUTING.md) or [CONTRIBUIR.md](CONTRIBUIR.md) if you prefer Spanish.

For questions, proposals or to join the development circle, please open an issue or contact the project maintainer.

## License

This project is licensed under the terms of the [MIT License](LICENSE), unless otherwise stated.


