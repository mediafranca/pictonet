# PictoNet: A Generative Pictographic System

**PictoNet** is an open-source, public good initiative by [MediaFranca](https://github.com/mediafranca) dedicated to building a generative language model for Augmentative and Alternative Communication (AAC). Our mission is to create a transparent, editable, and community-governed infrastructure that empowers individuals with complex communication needs (CCN) to express themselves more fully.

We are not just building a tool; we are seeding the conditions for a community-governed commons that can grow and evolve with the people it serves. This project reframes generative systems as design materials that communities can shape to reflect their own communicative priorities.

## The PictoNet Ecosystem

The PictoNet project is a modular ecosystem organized across several repositories. This structure separates concerns and clarifies how different parts of the project relate to one another.

*   **`mediafranca/pictonet`** (This Repository): The core generative engine. This repository contains the trained models, the source code for the 5-stage generative pipeline, the `PICTOS` training dataset, and foundational documentation, including the detailed technical plan.
*   **`mediafranca/pictoforge`**: The web-based interface for round-trip authoring, interaction, and feedback (RLHF). PictoForge is the primary gateway for users, practitioners, and researchers to engage with the generative model.
*   **`mediafranca/vcsci`**: The Visual Communicability and Semantic Correspondence Index. This repository stores the benchmark phrase sets and evaluation tools used to assess the clarity, effectiveness, and semantic accuracy of the generated pictograms.
*   **`mediafranca/manifesto`**: The repository for the project's guiding principles and ethical framework, open to discussion and community input.

## About This Repository (`mediafranca/pictonet`)

This repository contains the core of the PictoNet project: the generative engine that translates communicative intents into accessible, semantically-structured SVG pictograms. It serves as the central hub for the technical plan, model development, data management, and scripting related to the generative pipeline.

## Key Technical Concepts & Architecture Overview

PictoNet's core innovation lies in its ability to go beyond literal text-to-image synthesis, addressing the more complex task of pragmatically aware intermodal translation. This is achieved through a sophisticated **5-stage generative pipeline**:

1.  **Semantic Analysis Frontend**: Deconstructs natural language input into a rich, structured semantic representation using Frame Semantics, Natural Semantic Metalanguage (NSM), and Speech Act Classification.
2.  **Conceptual Mapping Engine**: Translates the semantic representation into a set of visual concepts based on a target pictogram system (e.g., ARASAAC).
3.  **Hybrid SVG Generation Core**: Generates the final SVG using a two-stage process: an LLM creates a semantically structured SVG "scaffold," which is then refined by a diffusion model for visual aesthetics.
4.  **Accessibility Post-processor**: Programmatically injects accessibility metadata (e.g., `<title>`, `<desc>`, `role="img"`, `aria-labelledby`) into the SVG to ensure WCAG/ARIA compliance.
5.  **Refinement and Iteration (RLHF)**: Utilizes Reinforcement Learning from Human Feedback (via PictoForge) to continuously improve the model's outputs.

For a comprehensive understanding of the linguistic and cognitive foundations, architectural paradigms, data/training strategies, evaluation protocols, and accessibility engineering, please refer to the full **[Technical Plan](docs/TECHNICAL_PLAN.md)**.

## Getting Started

This repository is primarily focused on the development and documentation of the PictoNet generative model.

### Prerequisites

*   Node.js (for general repository management, though core model development may use Python)
*   npm (for general repository management)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/mediafranca/pictonet.git
    cd pictonet
    ```
2.  Install general repository dependencies (if any):
    ```bash
    npm install
    ```
    *(Note: Specific dependencies for model training and development will be detailed within the `models/`, `scripts/`, and `notebooks/` directories.)*

## Contributing

We welcome contributions from developers, designers, researchers, speech therapists, educators, and individuals with lived experience. Your insights are critical to ensuring that PictoNet remains responsive, relevant, and truly inclusive.

Please read our **[CONTRIBUTING.md](CONTRIBUTING.md)** file for detailed information on how to get involved, including our contribution workflow, communication channels, and development setup. We also highly recommend reviewing the **[Technical Plan](docs/TECHNICAL_PLAN.md)** to understand the project's foundational concepts and architecture.

## Governance

The project operates under a community-managed, reciprocity-based governance model. We value transparent decision-making and aim to create a structure where dedicated contributors can take on greater responsibility over time. Key communication channels include:

*   **[GitHub Issues](https://github.com/mediafranca/pictonet/issues)**: For bug tracking, feature requests, and managing specific tasks.
*   **[GitHub Discussions](https://github.com/mediafranca/pictonet/discussions)**: For broader collaboration, brainstorming, and community conversations.

## License

This project is licensed under the terms of the [MIT License](LICENSE), unless otherwise stated.
