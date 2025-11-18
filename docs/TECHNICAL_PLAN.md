# PictoNet: A Technical Plan for Generating SVG Pictograms from Communicative Intents

## I. Introduction: The Vision for PictoNet

### 1.1. Project Definition and Core Innovation

This report presents the technical plan for the development of **PictoNet**, a generative system designed to translate communicative intents expressed in natural language into semantically grounded and accessible pictograms in SVG (Scalable Vector Graphics) format. PictoNet's core innovation lies in its ability to go beyond literal text-to-image synthesis, addressing the more complex task of pragmatically aware intermodal translation. The primary application context identified is Augmentative and Alternative Communication (AAC), a field where the clarity, coherence, and accessibility of visual symbols are paramount.

### 1.2. The Gap in Current Text-to-Image Systems

Current text-to-SVG systems excel at generating visually appealing graphics from literal descriptions (e.g., "an orange fox with geometric lines"), but they lack the sophisticated natural language understanding (NLU) capabilities to interpret nuanced "communicative intents" (e.g., "I need you to give the book to Maria"). This limitation prevents their effective application in domains like AAC, where the goal is not artistic creation but the unambiguous transmission of a message. PictoNet is positioned to fill this gap, bringing a layer of semantic and pragmatic intelligence to the generation process.

### 1.3. Strategic Roadmap and Report Structure
The proposed development strategy for PictoNet is based on a modular, phased approach. This report is structured to guide the reader through this strategy, beginning with the linguistic and cognitive foundations that underpin the system. Section II details the semantic framework for deconstructing communicative intent. Section III analyses existing architectural paradigms for vector graphic generation, justifying the selected approach. Section IV presents the proposed system architecture for PictoNet. Sections V and VI address training, data, and evaluation strategies. Section VII focuses on a critical aspect: engineering for accessibility. Finally, Section VIII concludes with a development roadmap and strategic recommendations.

## II. A Semantic Framework for Deconstructing Communicative Intent

For PictoNet to translate intents rather than just descriptions, a robust NLU frontend is imperative. This module must transform a simple text string into a rich, structured semantic representation suitable for subsequent visual translation.

### 2.1. The Need for a Multilayered Semantic Abstraction
A single theoretical approach is insufficient to capture the entirety of a communicative intent. A superficial syntactic analysis cannot determine the who, what, and how of an utterance in a functional way. Therefore, PictoNet requires a framework that integrates multiple levels of analysis: situational context (frame semantics), conceptual primitives (natural semantic metalanguage), and pragmatic function (speech acts). The integration of these three levels into a single hierarchical data structure is fundamental to bridging the semantic gap between language and pictograms.

### 2.2. Layer 1: Frame Semantics for Situational Context

Frame Semantics is a theory that links language to conceptual structures or "frames," which represent stereotyped situations. For a text input, this layer identifies the central event or state (the frame), the participants (frame elements or roles), and the objects involved.

For technical implementation, the use of pre-trained models for semantic frame analysis is proposed. The `frame-semantic-transformer` library, built on the T5 transformer and trained on FrameNet 1.7, is a prime candidate. Its ability to identify "triggers" (the words that evoke a frame), classify the corresponding frame, and extract its arguments (the roles) directly from the text is a critical first step for PictoNet's NLU pipeline. For example, for the input "I need you to give the book to Maria," this layer would identify the **Giving** frame, with a **Donor** (implied "you"), a **Recipient** (Maria), and a **Theme** (the book).

### 2.3. Layer 2: Natural Semantic Metalanguage (NSM) for Conceptual Decomposition
Natural Semantic Metalanguage (NSM) is a reductive paraphrasing methodology that breaks down complex meanings into a finite set of universal and irreducible "semantic primes". This approach is crucial for mapping the vast expressiveness of natural language to the restricted vocabulary of a pictogram system.

NSM provides a target "interlingua" between language and pictograms. Concepts identified by Frame Semantics that do not have a direct pictographic equivalent (e.g., abstract ideas, complex emotions) can be decomposed into NSM "explications" using primes like WANT, THINK, GOOD, BAD, and BECAUSE. This decomposed structure is much easier to map to the visual conventions of AAC systems. For example, the abstract concept of "forgiving" could be broken down into an explication like:

> "Someone X did something bad. Someone Y felt something bad because of this. After this, someone Y thought something good about X. Because of this, someone Y did not want to do something bad to X."

This sequence of primes is much easier to represent visually than the original abstract verb.

A significant research and development challenge for the PictoNet project will be the creation of a computational model that can analyse text and generate NSM explications. Since no general-purpose NSM parsers exist, this will likely require the development of a sequence-to-sequence model (like T5) trained on a synthetic dataset of concepts and their manually crafted NSM paraphrases. This development represents a fundamental research contribution of the project itself.

### 2.4. Layer 3: Speech Act Classification for Pragmatic Function
Speech Act Theory classifies utterances by their function (e.g., assertion, question, command, request) rather than their literal meaning. This layer determines the overall purpose of the communication.

Although libraries like DialogTag exist, they are often trained on specific corpora (e.g., telephone conversations). For PictoNet, a more robust approach would be to fine-tune a general-purpose sequence classification model from a platform like Hugging Face on a custom-annotated dataset to recognise key speech acts relevant in AAC contexts. The identified speech act will inform the overall composition of the pictogram. For example, a **Request** might add a question mark symbol or a specific visual modifier, while a **Command** could be represented more directly.

The true innovation of this NLU module lies not in the isolated use of these theories, but in their **integration into a single hierarchical data structure**, likely a JSON object. In this structure, the top level defines the Speech Act, the next level defines the FrameNet Frame and its Elements, and complex or abstract Frame Elements are in turn decomposed into NSM explications. This creates a rich, machine-readable "brief" for the SVG generation engine.

## III. Architectural Paradigms for Generative Vector Graphics
This section provides a critical review of existing text-to-SVG architectures to justify PictoNet's technical approach, focusing on the balance between generating structured, editable code and achieving high visual fidelity.

### 3.1. Approach 1: Autoregressive Generation (SVG as Code)

This paradigm treats SVG generation as a code generation task, where LLMs are trained to produce the XML markup of an SVG file token by token. The exemplary model is **StarVector**, a multimodal vision-language model based on StarCoder that excels in this approach. It processes text or images and generates high-quality, structured SVG code, especially for icons, logos, and diagrams. Its strength lies in producing clean, compact, and semantically meaningful code, which ensures a syntactically valid and structured output, essential for editability and accessibility. However, it may struggle to generate the nuanced visual details or complex paths required for more expressive pictograms.

### 3.2. Approach 2: Optimisation and Diffusion-Based Methods
These methods typically start with a set of vector primitives (e.g., Bézier curves) and iteratively optimise their parameters to match a target, which is often a raster image generated by a powerful diffusion model. Models like **VectorFusion** use a pre-trained pixel-based diffusion model to guide the optimisation of vector graphics without needing a dataset of captioned SVGs. Although these methods produce visually rich graphics, the resulting SVG code is often unstructured and "messy," with a large number of redundant anchor points, making it difficult to edit or semantically parse.

### 3.3. Approach 3: Hybrid LLM-Diffusion Frameworks

This emerging paradigm combines the strengths of the previous two. An LLM first generates a basic, semantically structured SVG "template" using geometric primitives. Then, a diffusion model or a dual-stage optimisation pipeline refines this template to add detail and visual complexity. The leading model in this approach is **Chat2SVG**, which uses an LLM for the initial template and then employs a diffusion model-guided optimisation process to refine path-level latents and point coordinates. This approach is the most promising for PictoNet, as it allows leveraging the NLU and structured generation capabilities of an LLM while using optimisation techniques to create visually appealing pictograms.

### 3.4. Architectural Recommendation for PictoNet

Based on the analysis, a **hybrid framework inspired by Chat2SVG** is recommended. This allows PictoNet to first generate a semantically sound and structurally clean SVG scaffold based on the communicative intent, and then apply a controlled refinement process to enhance its visual appeal without sacrificing the underlying structure. The key to the success of this approach is to treat the LLM-generated template as a non-negotiable "semantic scaffold." The subsequent refinement process must be heavily constrained to modify only aesthetics (e.g., line style, path smoothness) without altering the core geometric primitives that map to semantic elements.

There is an inherent tension between the visual complexity of diffusion-guided optimisation and the goal of human editability. As models like Chat2SVG add more complex Bézier curves to match a diffusion target, the resulting SVG paths become harder to manipulate. This implies that PictoNet should offer a **"complexity" parameter**, allowing the user to choose between a "schematic" output (pure LLM generation, highly editable) or a "detailed" one (hybrid generation, less editable).

### 3.5. Table 1: Comparative Analysis of Text-to-SVG Generation Architectures

| Feature | Autoregressive Generation (StarVector) | Diffusion-Based Optimisation (VectorFusion) | Hybrid Framework (Chat2SVG) |
|---------|----------------------------------------|---------------------------------------------|------------------------------|
| **Output Structure** | Highly structured, clean XML code | Unstructured, collection of optimized paths | Semantically structured, with added path complexity |
| **Semantic Control** | High. Each primitive can correspond to a concept | Low. Optimisation focuses on global visual similarity | Very high. The LLM establishes the initial semantic scaffold |
| **Visual Fidelity** | Moderate to high for icons; limited for complex scenes | Very high, capable of producing rich, detailed graphics | Very high, combines LLM structure with diffusion detail |
| **Editability** | High. Clean code is easy to manipulate in SVG editors | Low. Complex paths with many anchor points | Moderate. Base structure is editable, but refined paths are complex |
| **Data Requirements** | Requires large datasets of (text, SVG) or (image, SVG) pairs | Can work without captioned SVG datasets | Requires data for the LLM and pre-trained diffusion models |
| **Suitability for PictoNet** | Good for structure, but may lack visual expressiveness | Unsuitable due to lack of structure and semantic control | Ideal. Balances structure, semantic control, and visual quality |


## IV. Proposed System Architecture for PictoNet: A Multiphase Pipeline

This section presents the detailed technical plan for PictoNet, integrating the semantic framework from Section II with the recommended hybrid architecture from Section III. The system is conceived as an end-to-end pipeline:

**Raw Text Input** → **Semantic Analysis Frontend** → **Structured Semantic Representation (JSON)** → **Conceptual Mapping Engine** → **Set of Pictogram Concepts** → **Hybrid SVG Generation Core** → **Accessible SVG Output**

### 4.1. Module 1: Semantic Analysis Frontend

This module executes the multilayered analysis described in Section II. It is a pipeline of fine-tuned transformer models: a speech act classifier, the `frame-semantic-transformer` parser, and a custom T5 model for NSM decomposition. The output is a single JSON object containing the complete semantic analysis of the input text. This JSON object is the most critical artifact of the system, as it decouples linguistic analysis from visual generation, allowing for independent development and debugging of each component and making the system adaptable to different pictogram systems.

### 4.2. Module 2: Conceptual Mapping Engine
This module translates the semantic representation into a set of visual concepts based on a target pictogram system. The primary target system is the **ARASAAC pictogram library**, due to its large size (~13,000 symbols), open license, and, critically, its well-defined system of visual conventions for representing abstract concepts, actions, and places. Although the exact download format needs confirmation, its use in high-resolution signage suggests the availability of vector formats.

The mapping is not a simple 1:1 correspondence. It involves a system that interprets the semantic JSON to programmatically apply ARASAAC's conventions. For example, a concept marked as `[abstract]` in the NSM analysis will trigger the "cloud" convention, while a plural noun will trigger the "+" symbol.

### 4.3. Table 2: Mapping of ARASAAC Symbolic Conventions

| ARASAAC Convention | Semantic Trigger in PictoNet's Pipeline |
|--------------------|------------------------------------------|
| Cloud for intangible concepts | Concept marked as `[abstract]` during NSM analysis |
| + symbol for plurality | Noun identified with the morphological tag `[plural]` |
| Red circle for indeterminate concept | Frame element identified as Indeterminate or a vague quantifier |
| Store outline for commercial places | Frame location classified as Commercial_Building |
| Male/female representations for actions | Gender of the agent or participant identified in coreference analysis |

### 4.4. Module 3: Hybrid SVG Generation Core

This module generates the final SVG in two stages, following the Chat2SVG methodology:

**1. LLM-Based Template Generation:** An LLM (e.g., a fine-tuned variant of Llama or GPT) receives the set of pictogram concepts and their spatial relationships, inferred from the semantic roles of the analysis. The LLM's task is to generate a clean, structured SVG "scaffold" using basic primitives, where each element is semantically tied to a concept and assigned a unique ID. The ability to infer a logical visual composition from semantic roles (e.g., "agents are usually on the left") is a spatial reasoning capability that must be explicitly trained in this model, possibly by analysing existing compositions in ARASAAC materials.

**2. Controlled Visual Refinement:** This stage enhances the template. A diffusion model (e.g., SDXL with ControlNet) can be used to generate a richer raster target image, conditioned on both the input text and the rendered SVG template to ensure structural consistency. Then, a differentiable rasterizer optimises the SVG scaffold to match the target. The optimisation is constrained: it primarily adjusts the coordinates and styles of the paths, but is heavily penalised for removing semantically significant elements or altering their fundamental shape.

### 4.5. Module 4: Accessibility Post-processor
This final module ensures that the generated SVG complies with accessibility standards. It programmatically injects accessibility metadata directly into the final SVG code, drawing information from the initial semantic analysis. This process is detailed in Section VII.

## V. Data, Training, and Reinforcement Learning Strategy

This section details the plan for acquiring data and training the PictoNet model, with a strong emphasis on using Reinforcement Learning (RL) to ensure the quality and validity of the structured output.

### 5.1. Primary Dataset: The ARASAAC Pictogram Library

The primary data source will be the ARASAAC library. The first step is to programmatically download the entire library, confirming its availability in a structured vector format like SVG. Each pictogram is associated with keywords and categories, which will form the basis for the initial text-to-pictogram mapping.

### 5.2. Data Augmentation and Synthetic Dataset Creation
The main challenge is the lack of a large-scale dataset of "communicative intents" paired with complex, multi-element pictogram scenes. This dataset must be created synthetically. The process involves using a powerful LLM (e.g., GPT-4) to generate a large number of sentences representing diverse intents and, for each sentence, generating a corresponding "ideal" scene description in terms of ARASAAC pictogram names and their spatial relationships. These `(intent, pictogram_scene_description)` pairs will be the primary training data.

### 5.3. Multiphase Training Regimen

Training will be conducted in two phases:

**1. Supervised Fine-Tuning (SFT):** The main LLM of the Generation Module will be fine-tuned on the synthetic dataset. The goal is to teach the model the basic mapping from a scene description to a structured SVG scaffold, establishing a reliable baseline performance.

**2. Reinforcement Learning (RL):** The outputs of the SFT model may lack compositional coherence or semantic nuance. RL is crucial for refining performance and enforcing strict constraints. Instead of being just an optional polish, RL is the central mechanism for ensuring that every output is a valid and accessible SVG. The reward function becomes a formal specification of the system's requirements, transforming goals like syntactic validity and accessibility into mathematically optimizable objectives.

### 5.4. Reinforcement Learning with Custom Multi-Component Rewards
The success of RL depends on the design of the reward function. PictoNet will use a composite reward signal that evaluates the generated SVG on multiple axes, inspired by RL techniques used to enforce strict JSON schemas and improve compositional accuracy in SVG generation:

- **Syntactic Validity Reward:** A binary reward. If the SVG code is well-formed and valid XML, the reward is positive; otherwise, it is negative. This is a hard constraint.
- **Semantic Alignment Reward:** A continuous reward based on the cross-modal similarity between the input intent and the rendered SVG, measured with models like CLIP or SigLIP.
- **Compositional Fidelity Reward:** A reward that measures whether all requested pictograms are present and correctly related. This can be evaluated by a "judge" LLM.
- **Accessibility Compliance Reward:** A novel reward component. A script parses the generated SVG to check for the presence and correctness of accessibility tags (`<title>`, `<desc>`, `role="img"`). The reward is proportional to the level of compliance.

## VI. Evaluation Protocols and Performance Benchmarks
This section defines a rigorous, multifaceted evaluation framework, recognising that standard image generation metrics are insufficient for this task.

### 6.1. The Insufficiency of Traditional Metrics

Metrics like FID and IS, common in raster image generation, are not suitable for vector graphics as they do not capture structural or editability properties. Metrics like CLIPScore measure text-image alignment but miss the nuances of composition and symbolic accuracy.

### 6.2. Adoption of Specialised Benchmarks for SVG

Specialised benchmarks will be used to evaluate the model's core capabilities in Symbolic Graphics Programming:

- **SGP-GenBench:** This benchmark is directly relevant for its three axes: Object Fidelity (does a single concept generate an accurate pictogram?), Scene Fidelity (does a multi-concept prompt generate a coherent scene?), and Compositionality (does the model correctly handle attributes, spatial relationships, and numeracy?).
- **SVGauge:** This human-aligned metric will be used to complement automated scores. It measures visual fidelity using image embeddings and semantic consistency by comparing the captions of the generated SVG with the original prompt.

### 6.3. Custom Metrics for PictoNet's Unique Goals
Custom metrics will be developed to evaluate specific aspects of PictoNet:

- **Intent Translation Accuracy (ITA):** A human-in-the-loop evaluation where evaluators rate how well the pictogram conveys the full pragmatic meaning of the text.
- **ARASAAC Convention Adherence (ACA):** An automated metric that parses the SVG and checks for the correct application of ARASAAC's visual rules.
- **Accessibility Compliance Score (ACS):** An automated script that validates the generated SVG against a checklist of accessibility requirements.

The multifaceted evaluation framework mirrors PictoNet's multiphase architecture, allowing for precise error attribution. If the overall ITA score is low but the SGP-GenBench score is high, it suggests the problem lies in the initial semantic analysis, not the SVG generator. Human judgment remains the ultimate benchmark; success is measured by the end-user's quick and accurate comprehension, which requires regular user studies with the AAC community to create a virtuous cycle of human-aligned improvement.

## VII. Engineering for Accessibility: Programmatic Generation of Compliant SVGs
This section provides a practical implementation guide to ensure that every SVG generated by PictoNet is fully accessible, treating accessibility as a primary design constraint.

### 7.1. The Moral and Technical Imperative of Accessibility

For an AAC tool, accessibility is not optional. SVGs must be programmatically interpretable by assistive technologies. The generation of inline SVGs is advocated, as this provides maximum control over accessibility attributes.

### 7.2. Programmatic Implementation within PictoNet

The core of this section is how the SVG Generation Module must use information from the semantic analysis to automatically embed the necessary accessibility features. The semantic analysis not only serves to generate the image but is also the direct source for generating high-quality accessibility metadata.

- **`<title>` Element:** The name of the central concept from the frame analysis will be used to generate a concise, descriptive title (e.g., `<title id="titleID">A person giving a book to another person.</title>`).
- **`<desc>` Element:** A more detailed description, potentially the original input text, will be placed in the `<desc>` tag (e.g., `<desc id="descID">Communicative intent: I need you to give the book to Maria.</desc>`).
- **`role="img"`:** The root `<svg>` element will be programmatically assigned `role="img"` to ensure assistive technologies correctly identify it as a graphic object.
- **`aria-labelledby`:** The `<svg>` tag will use `aria-labelledby` to point to the IDs of the `<title>` and `<desc>` elements, the most robust pattern for ensuring they are read by screen readers.

### 7.3. Example of Accessible Output

```xml
<svg role="img" aria-labelledby="pnetTitle123 pnetDesc123">
  <title id="pnetTitle123">A person giving a book to another person.</title>
  <desc id="pnetDesc123">Original intent: I need you to give the book to Maria.</desc>
  <!-- SVG content here -->
</svg>
```

### 7.4. Handling Decorative Elements and Colour Contrast
Any purely decorative elements added during refinement will be wrapped in a `<g>` tag with `aria-hidden="true"`. The colour palette used will be restricted to combinations that meet WCAG contrast requirements, and the system will avoid relying solely on colour to convey information. By defining accessibility as a set of machine-verifiable rules, it becomes a property that can be actively optimised through the RL reward function, transforming it from a "best practice" to a "mathematically optimised objective."

## VIII. Strategic Recommendations and Development Roadmap

This final section provides actionable next steps, outlining a phased development plan, potential risks, and future research directions for the PictoNet project.

### 8.1. Phased Development Roadmap

**Phase 1: Foundation (Months 1-6)**
- Acquisition and processing of the ARASAAC library
- Development and evaluation of the Semantic Analysis Frontend (Module 1)
- Creation of the synthetic dataset of `(intent, scene_description)` pairs

**Phase 2: Core Model Development (Months 7-15)**
- SFT of the LLM-based template generator
- Implementation and training of the Reinforcement Learning loop with the multi-component reward function
- Establishment of the full evaluation pipeline

**Phase 3: Refinement and User Studies (Months 16-24)**
- Integration of the controlled visual refinement module
- Conducting user studies with AAC users and professionals
- Iterative model improvement based on evaluation results and user feedback

### 8.2. Key Technical Challenges and Mitigation Strategies
- **Challenge: Computational Cost of RL.** RL training is expensive. **Mitigation:** Start with smaller models (e.g., 1-8B parameters) to validate the approach and leverage efficient RL frameworks.
- **Challenge: Nuance of Semantic Decomposition.** Accurately parsing all linguistic nuances is an open research problem. **Mitigation:** Start with a restricted set of common intents and frames, expanding coverage iteratively.
- **Challenge: Compositional Coherence.** Ensuring generated elements are arranged logically. **Mitigation:** Focus on compositional rewards in the RL function and potentially pre-train the model on layout composition from existing materials.

### 8.3. Future Research and Expansion

- **Interactivity:** Extend PictoNet to generate interactive SVGs
- **Animation:** Generate animated SVGs to represent actions and processes more dynamically
- **Personalisation:** Allow the model to adapt to a user's unique vocabulary or communication style
- **Integration of Intermodal Theories:** Further explore cognitive theories like Conceptual Blending or Dual Coding Theory to inform more creative or effective visual representations, such as generating new pictograms by blending existing ones

## IX. Conclusion
The technical plan presented for PictoNet outlines a novel and feasible system that addresses a significant gap in the field of generative AI. By integrating a sophisticated multilayered NLU frontend with a hybrid SVG generation architecture and a fundamental commitment to accessibility, PictoNet has the potential to transform how Augmentative and Alternative Communication is created and used. The focus on translating "communicative intents" rather than literal descriptions, coupled with the strategic use of Reinforcement Learning to enforce validity and accessibility constraints, positions this project at the forefront of intermodal generation research. The proposed roadmap offers a clear path from fundamental research to a robust, user-centered tool, with the potential for a profound and positive impact on the lives of individuals with communication difficulties.

---

## References

### Key Papers and Models

1. **Chat2SVG: Vector Graphics Generation with Large Language Models and Image Diffusion Models**
   - ResearchGate: https://www.researchgate.net/publication/394643692_Chat2SVG_Vector_Graphics_Generation_with_Large_Language_Models_and_Image_Diffusion_Models
   - arXiv: https://arxiv.org/html/2411.16602v1
   - Project Page: https://chat2svg.github.io/
   - CVF Paper: https://openaccess.thecvf.com/content/CVPR2025/papers/Wu_Chat2SVG_Vector_Graphics_Generation_with_Large_Language_Models_and_Image_CVPR_2025_paper.pdf

2. **StarVector: A Foundation Model for SVG Generation**
   - GitHub: https://github.com/joanrod/star-vector
   - Project Page: https://starvector.github.io/

3. **VectorFusion: Text-to-SVG by Abstracting Pixel-Based Diffusion Models**
   - Project Page: https://vectorfusion.github.io/

### Semantic Analysis and NLU

4. **Frame Semantics and FrameNet**
   - frame-semantic-transformer (PyPI): https://pypi.org/project/frame-semantic-transformer/
   - NLTK FrameNet API: https://people.cs.georgetown.edu/nschneid/p/fnapi.pdf

5. **Natural Semantic Metalanguage (NSM)**
   - Griffith University - What is NSM: https://intranet.secure.griffith.edu.au/schools-departments/natural-semantic-metalanguage/what-is-nsm
   - Wikipedia: https://en.wikipedia.org/wiki/Natural_semantic_metalanguage
   - GeeksforGeeks: https://www.geeksforgeeks.org/nlp/natural-semantic-metalanguage/

6. **Speech Act Classification**
   - DialogTag (GitHub): https://github.com/bhavitvyamalik/DialogTag
   - Speech Act Classification Research: https://umu.diva-portal.org/smash/get/diva2:1161780/FULLTEXT01.pdf
   - Hugging Face Text Classification: https://huggingface.co/docs/transformers/tasks/sequence_classification

### ARASAAC Pictogram System

7. **ARASAAC Resources**
   - Main Website: https://arasaac.org/index.html
   - Pictographic System Reference: https://aulaabierta.arasaac.org/en/arasaac-pictographic-system-of-reference-in-the-aac
   - Download Pictograms: https://aulaabierta.arasaac.org/en/download-of-pictograms-and-pictograms-favorites-arasaac
   - Signage Applications: https://aulaabierta.arasaac.org/en/signage-of-public-spaces-and-services-with-arasaac-pictograms
   - Semantic Maps: https://aulaabierta.arasaac.org/en/aac-materials-semantic-maps
   - Symbol Libraries (OpenAAC): https://www.openaac.org/symbols.html

### Training and Evaluation

8. **Reinforcement Learning and Structured Outputs**
   - AI Structured Outputs: https://lakshmanok.medium.com/builders-beware-ai-structured-outputs-are-not-all-the-same-c802fffb6ee5
   - Training LLMs for JSON Schema Adherence: https://www.reddit.com/r/MachineLearning/comments/1iwxtmb/r_training_llms_for_strict_json_schema_adherence/

9. **Evaluation Benchmarks**
   - SGP-GenBench: https://www.emergentmind.com/topics/sgp-genbench

### Accessibility Standards

10. **SVG Accessibility**
    - Implementing Accessible SVG Elements: https://www.a11y-collective.com/blog/svg-accessibility/
    - Accessible SVG and ARIA: https://data.europa.eu/apps/data-visualisation-guide/accessible-svg-and-aria

### Cognitive and Linguistic Theories

11. **Intermodal and Cognitive Theories**
    - Conceptual Blending: https://en.wikipedia.org/wiki/Conceptual_blending
    - Dual-Coding Theory: https://en.wikipedia.org/wiki/Dual-coding_theory
    - Dual Coding in AI: https://studycardsai.com/blog/dual-coding-theory-ai-flashcards

### Additional Resources

12. **Text-to-SVG Tools and Tutorials**
    - Adobe Illustrator Text-to-Vector: https://www.adobe.com/products/illustrator/text-to-vector-graphic.html
    - Text to SVG AI Tutorial: https://www.svgai.org/blog/text-to-svg/text-to-svg-ai-tutorial
    - Chat2SVG Literature Review: https://www.themoonlight.io/en/review/chat2svg-vector-graphics-generation-with-large-language-models-and-image-diffusion-models