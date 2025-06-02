
# Contributing to PictoNet

Thank you for your interest in contributing to **PictoNet**. This is a collaborative, public project dedicated to developing a generative system for pictogram-based communication. We welcome contributions from researchers, developers, designers, and practitioners across disciplines.

## How to Contribute

### 1. Fork the Repository

Start by forking the `mediafranca/pictonet` repository to your own GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/pictonet.git
cd pictonet
````

### 3. Create a Branch

Use a descriptive name for your feature or fix:

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

Ensure that your code is clean, well-documented, and adheres to existing formatting conventions. Include comments where appropriate, and test your code locally.

### 5. Commit and Push

Commit your changes with a clear message:

```bash
git add .
git commit -m "Add [short description of your contribution]"
git push origin feature/your-feature-name
```

### 6. Submit a Pull Request

Go to your fork on GitHub and submit a pull request (PR) to the `main` branch of this repository. Include a description of the changes and the rationale behind them.

We will review your PR and may suggest improvements or request additional information before merging.

## Repository Structure

The repository is organised to support both local and server-side development of the PictoNet core engine:

```
pictonet/
├── server/             # Main backend server code (e.g., Flask, FastAPI or Node.js)
│   ├── app/            # Core application logic, API routes, model interfaces
│   ├── config/         # Configuration files and environment settings
│   └── utils/          # Helper functions and utilities
├── data/               # Sample datasets, input-output pairs, annotations
├── models/             # Placeholder directory for model definitions or checkpoints
├── scripts/            # CLI scripts for training, evaluation, or batch processing
├── notebooks/          # Jupyter notebooks for exploration and prototyping
├── requirements.txt    # Python dependencies (if applicable)
├── environment.yml     # Conda environment file (optional)
├── Dockerfile          # Container definition for deployment
└── README.md           # Project overview and roadmap
```

To run the project locally:


# Create and activate virtual environment (Python example)
```bash
python3 -m venv venv
source venv/bin/activate
```

# Install dependencies
```bash
pip install -r requirements.txt
```
# Run the server (assuming Flask or FastAPI)
```bash
python server/app/main.py
```

Alternatively, the `Dockerfile` allows for containerised development and testing.

## Guidelines

* Please keep PRs focused. If you have multiple unrelated changes, submit separate PRs.
* Write meaningful commit messages.
* Comment your code where it is not self-explanatory.
* Follow the project's coding style.
* Respect existing abstractions and directory structure.

## Reporting Issues

If you encounter a bug or have a feature request, please [open an issue](https://github.com/mediafranca/pictonet/issues) and include:

* A clear and descriptive title
* Steps to reproduce (if applicable)
* Environment details (e.g., OS, Python version)
* Suggested solutions or workarounds (if known)