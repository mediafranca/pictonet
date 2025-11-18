# Contributing to PictoNet

First off, thank you for considering a contribution to PictoNet. This is a collaborative, public project, and we welcome contributions from researchers, developers, designers, practitioners, and anyone passionate about improving communication accessibility. Every contribution helps us build a more inclusive and expressive communicative future.

## Communication Channels

*   **[GitHub Issues](https://github.com/mediafranca/pictonet/issues)**: The best place for reporting bugs, submitting feature requests, or discussing specific implementation details.
*   **[GitHub Discussions](https://github.com/mediafranca/pictonet/discussions)**: For broader conversations, brainstorming new ideas, asking questions, and sharing your work related to the project.

## How to Contribute

We welcome many types of contributions, including but not limited to:

*   **Code**: Improvements to the generative pipeline, model training scripts, or data processing tools.
*   **Documentation**: Enhancements to our `README.md`, `TECHNICAL_PLAN.md`, foundational reports, or inline code comments.
*   **Datasets**: Suggestions for linguistic corpora or new pictogram concepts.
*   **Feedback**: Insights from AAC practitioners, communities, and individuals with lived experience.

### Contribution Workflow

To ensure a smooth collaboration process, please follow this workflow:

1.  **Find or Create an Issue**: Before starting work, check the [Issues tab](https://github.com/mediafranca/pictonet/issues) to see if there's an existing ticket for what you want to do. If not, please create a new one to outline the bug or feature. This allows the team to discuss the proposal and provide feedback.

2.  **Fork the Repository**: Fork the `mediafranca/pictonet` repository to your own GitHub account.

3.  **Create a Branch**: Create a new branch from `main` in your fork. Use a descriptive name, like `fix/nlu-bug` or `feature/new-nsm-parser`.
    ```bash
    git checkout -b your-branch-name
    ```

4.  **Set Up Your Development Environment**:
    *   Clone your fork:
        ```bash
        git clone https://github.com/your-username/pictonet.git
        cd pictonet
        ```
    *   Install Node.js dependencies:
        ```bash
        npm install
        ```
    *   Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    *   Install client dependencies:
        ```bash
        npm run postinstall
        ```
        *(Note: Please refer to the `TECHNICAL_PLAN.md` for a deeper understanding of the architecture and components.)*

5.  **Make Your Changes**: Write your code or documentation. Please adhere to the existing coding style and conventions.

6.  **Commit Your Changes**: Use clear and descriptive commit messages.
    ```bash
    git add .
    git commit -m "feat: Add new feature that does X" -m "Detailed description of the changes."
    ```

7.  **Push to Your Fork**:
    ```bash
    git push origin your-branch-name
    ```

8.  **Submit a Pull Request**: Open a pull request from your branch to the `main` branch of the `mediafranca/pictonet` repository. In the PR description, please reference the issue you are addressing (e.g., "Closes #123"). Provide a clear summary of the changes and any additional context.

The project maintainers will review your pull request, provide feedback, and merge it once it's ready.

Thank you for helping us build PictoNet!