# PictoNet

## Vision

PictoNet is an open-source, federated pictogram generation engine designed to support adaptive and inclusive communication. It provides a decentralised and evolving visual language where users can train, edit, and share pictograms that align with their linguistic and cultural contexts. By leveraging AI-driven generation, semantic tokenisation, and community-driven curation, PictoNet enables a truly participatory and accessible approach to pictographic communication.

As a federated system, PictoNet ensures that control over data and models remains distributed. Users and communities can host their own nodes, train models locally, and contribute to shared repositories without centralised control. This structure allows community-defined models to emerge, adapting to different visual styles and semantic needs.

### **Open-Source and Licensing**

PictoNet is released under the **MIT Licence**, meaning anyone can use, modify, and distribute it freely. The system is designed to respect **ethical AI principles**, ensuring that generated pictograms remain adaptable to diverse linguistic and cultural needs. Community contributions are encouraged to improve accessibility, performance, and the adaptability of the generated pictograms.

## **Repository Architecture**

The PictoNet ecosystem is organised into multiple repositories to ensure scalability, modularity, and collaborative development. These repositories are hosted at [https://github.com/hspencer/pictonet](https://github.com/hspencer/pictonet) and structured as follows:

### **1. AI Weights Repository** (`pictonet-models`)

This repository contains AI-generated pictogram models, trained using community-driven datasets. While no predefined translations exist, PictoNet is designed to enable the generation of community-specific models based on user contributions and local adaptations. Model releases include:

- **Community-Generated Models**: Trained collaboratively by users with specific visual and semantic needs.
- **Federated Learning Models**: Adaptive models that refine themselves based on user feedback and corrections.
- **Localised Adaptations**: Versions that reflect region-specific cultural and contextual requirements.

### **2. AI Core** (`pictonet-core`)

The core of PictoNet’s AI processing, handling:

- Semantic tokenisation based on **Natural Semantic Metalanguage (NSM)**.
- Scene composition algorithms that structure pictograms based on subject, interaction, and context.
- Adaptive model learning, enabling pictograms to evolve based on user feedback.

### **3. Spine-Edit (SVG Editor)** (`pictonet-editor`)

A browser-based vector editor for modifying and refining AI-generated pictograms. Features include:

- Editable **spine-based SVG structures**, where stroke weight and style are adjustable.
- Live syncing with the AI model, allowing real-time refinement.
- Support for **personalised visual adaptation**, ensuring pictograms align with user preferences and local expectations.

### **4. User Management & Federated Learning** (`pictonet-users`)

This repository manages identity, authentication, and user-specific learning preferences. It supports:

- Decentralised user nodes, enabling localised training and adaptation.
- Privacy-preserving **federated learning**, ensuring that improvements can be shared without exposing personal data.
- Role-based contributions, allowing users to curate, approve, and refine pictograms collaboratively.

### **5. Community Hub & Website** (`pictonet-site`)

The public-facing interface for PictoNet, hosting:

- **Pictogram Library**: A browsable collection of generated pictograms with metadata and usage examples.
- **Collaboration Tools**: Forums and issue trackers for community discussions.
- **Documentation & Tutorials**: Guides on using, customising, and contributing to PictoNet.

## **Installation and Development**

To set up PictoNet locally:

```bash
# Clone the AI core repository
git clone https://github.com/hspencer/pictonet-core.git

# Install dependencies
cd pictonet-core
pip install -r requirements.txt

# Run the local server
python main.py
```

For SVG editing:

```bash
git clone https://github.com/hspencer/pictonet-editor.git
cd pictonet-editor
npm install
npm run dev
```

## **Contributing to PictoNet**

PictoNet follows an open governance model inspired by projects like Mozilla and W3C initiatives. Contributions are welcome in various forms:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b my-contribution`.
3. **Make changes and commit them**.
4. **Submit a pull request (PR) for review**.

For major contributions, we encourage opening a proposal issue first to discuss implementation details with the community.

## **Future Roadmap**

- **Integration with AR & VR**: Enabling real-time pictogram overlays for accessibility in physical spaces.
- **Multi-user collaboration tools**: Supporting group editing and consensus-based pictogram refinement.
- **Automated style compression**: AI-assisted recognition of individual drawing patterns to enhance personalisation.
- **Expanded support for federated learning**: Enabling community-trained models without centralised servers.

## **Contact & Community**

For questions, suggestions, or to get involved, join the discussion at [https://github.com/hspencer/pictonet](https://github.com/hspencer/pictonet) or email us at [**community@pictos.net**](mailto:community@pictonet.org).
