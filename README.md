# Enterprise Architecture AI Agents

AI-powered tools for enterprise architecture strategy, assessment, and roadmap development using Claude AI.

## Overview

This project provides a suite of AI agents designed to accelerate Enterprise Architecture activities including:

- **Technology Research & Analysis** - Generate hype cycles, market analysis, and whitepapers
- **Strategic Analysis** - Business-technology alignment and strategic planning
- **Supplier Evaluation** - 4 P's framework assessments (People, Process, Platform, Price)
- **Technology Roadmaps** - Multi-year planning and dependency mapping
- **Architecture Decision Records** - Structured decision documentation

## Features

### AI Agent Capabilities
- **Technology Research Agent** - Input any technology area and receive comprehensive analysis
- **Strategic Analysis Agent** - High-level strategic technology assessment
- **Supplier Evaluation Agent** - Vendor comparison using proven 4 P's methodology
- **Roadmap Planning Agent** - Strategic technology roadmap development
- **ADR Generator Agent** - Architecture decision record creation

### Output Artifacts
- **Hype Cycle Analysis** - Market maturity and adoption timeline assessment
- **Vendor Landscape Visualizations** - Market positioning and competitive analysis
- **Strategic Whitepapers** - Comprehensive technology reports
- **Evaluation Matrices** - Structured supplier comparison frameworks
- **Executive Summaries** - Key findings and actionable recommendations

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Anthropic Claude API key

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/jdlongmire/enterprise_architecture_tools.git
   cd enterprise_architecture_tools
   ```

2. **Open the application:**
   - Open `index.html` in your web browser
   - Or serve locally using a simple HTTP server

3. **Configure Claude API:**
   - Obtain API key from [Anthropic Console](https://console.anthropic.com/)
   - Enter API key in the application settings
   - API key is stored locally in your browser

### Usage
1. **Open the EA Dashboard** - Navigate to `index.html`
2. **Select an AI Agent** - Choose from available agent types
3. **Enter Requirements** - Provide technology area or evaluation criteria
4. **Generate Analysis** - AI agent researches and creates artifacts
5. **Download Results** - Save reports, visualizations, and documentation

## Architecture

### Technology Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **AI Integration:** Anthropic Claude API
- **Visualizations:** Chart.js, D3.js
- **Document Generation:** jsPDF, HTML Canvas
- **Deployment:** GitHub Pages (static hosting)

### Agent Framework
```
EA Dashboard (index.html)
├── Technology Research Agent
├── Strategic Analysis Agent
├── Supplier Evaluation Agent
├── Roadmap Planning Agent
└── ADR Generator Agent
```

### Data Flow
1. **User Input** → Agent Selection & Requirements
2. **Research Phase** → Web search + Claude analysis
3. **Processing** → 4 P's framework application
4. **Artifact Generation** → Reports, visualizations, documentation
5. **Output Delivery** → Downloadable files and interactive results

## Project Structure

```
enterprise_architecture_tools/
├── index.html                 # Main EA Dashboard
├── css/                      # Stylesheets
├── js/                       # JavaScript modules
│   ├── agents/              # Individual AI agent implementations
│   ├── utils/               # Utility functions (PDF, charts, etc.)
│   └── config/              # Configuration and prompts
├── templates/               # Output templates
├── examples/                # Sample outputs and use cases
├── docs/                    # Documentation
└── assets/                  # Images, data, resources
```

## Agent Specifications

### Technology Research Agent
- **Input:** Technology area (e.g., "AIOps", "Zero Trust Security")
- **Output:** Hype cycle analysis, vendor landscape, strategic whitepaper
- **Sources:** Gartner, Forrester, IDC, vendor whitepapers, academic research

### Supplier Evaluation Agent
- **Framework:** 4 P's Methodology (People, Process, Platform, Price)
- **Input:** Vendor options, evaluation criteria, business requirements
- **Output:** Comparison matrix, TCO analysis, recommendation report

### Strategic Analysis Agent
- **Focus:** Business-technology alignment and strategic planning
- **Input:** Business objectives, current state, future vision
- **Output:** Strategic assessment, gap analysis, transformation roadmap

### Roadmap Planning Agent
- **Scope:** Multi-year technology planning and dependency mapping
- **Input:** Technology areas, business priorities, resource constraints
- **Output:** Visual roadmap, implementation timeline, resource allocation

### ADR Generator Agent
- **Purpose:** Architecture decision documentation and governance
- **Input:** Decision context, options, criteria, recommendation
- **Output:** Structured ADR document, decision rationale, alternatives analysis

## Configuration

### API Setup
1. **Anthropic Claude API Key**
   - Sign up at [Anthropic Console](https://console.anthropic.com/)
   - Generate API key
   - Configure in application settings

2. **Web Search Integration**
   - Uses built-in Claude web search capabilities
   - No additional API keys required

### Customization
- **Prompts:** Modify agent prompts in `/js/config/prompts.js`
- **Templates:** Customize output templates in `/templates/`
- **Styling:** Adjust appearance in `/css/`
- **Branding:** Update logos and colors in `/assets/`

## Examples

### Sample Use Cases
1. **"Evaluate AIOps platforms for our infrastructure monitoring"**
   - Technology research with vendor comparison
   - 4 P's evaluation framework
   - Strategic implementation roadmap

2. **"Assess Zero Trust security architecture options"**
   - Market landscape analysis
   - Supplier evaluation matrix
   - Implementation planning

3. **"Create 3-year cloud migration roadmap"**
   - Strategic analysis and planning
   - Dependency mapping
   - Resource allocation

### Sample Outputs
- [AIOps Technology Analysis](examples/sample-outputs/aiops-analysis.pdf)
- [Zero Trust Evaluation Matrix](examples/sample-outputs/zero-trust-evaluation.pdf)
- [Cloud Migration Roadmap](examples/sample-outputs/cloud-roadmap.pdf)

## Contributing

### Development
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-agent`
3. Make changes and test thoroughly
4. Submit pull request with clear description

### Adding New Agents
1. Create agent module in `/js/agents/`
2. Add UI components in `index.html`
3. Update configuration in `/js/config/`
4. Add documentation and examples

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

### Documentation
- [User Guide](docs/user-guide.md)
- [Technical Architecture](docs/architecture.md)
- [API Configuration](docs/api-setup.md)

### Issues and Feature Requests
- Use GitHub Issues for bug reports
- Use GitHub Discussions for feature requests
- Check existing issues before creating new ones

### Contact
- **Project Owner:** [Your Name]
- **Repository:** https://github.com/jdlongmire/enterprise_architecture_tools
- **Issues:** https://github.com/jdlongmire/enterprise_architecture_tools/issues

---

**Enterprise Architecture AI Agents** - Accelerating strategic technology decisions with AI-powered analysis and documentation.