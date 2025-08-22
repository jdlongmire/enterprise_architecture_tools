// Technology Research Agent - Core Module
// File: js/agents/technology-research.js

class TechnologyResearchAgent {
    constructor() {
        this.name = "Technology Research Agent";
        this.currentAnalysis = null;
        this.analysisHistory = [];
    }

    // Main research workflow
    async conductResearch(technologyArea, options = {}) {
        try {
            // Initialize analysis session
            this.currentAnalysis = {
                id: this.generateAnalysisId(),
                technology: technologyArea,
                timestamp: new Date().toISOString(),
                status: 'in-progress',
                artifacts: {}
            };

            // Update UI with progress
            this.updateProgress("Initializing research for " + technologyArea, 10);

            // Phase 1: Market Research
            const marketResearch = await this.conductMarketResearch(technologyArea);
            this.updateProgress("Completing market landscape analysis", 30);

            // Phase 2: Vendor Analysis  
            const vendorAnalysis = await this.conductVendorAnalysis(technologyArea, marketResearch);
            this.updateProgress("Analyzing vendor ecosystem", 50);

            // Phase 3: Hype Cycle Analysis
            const hypeCycleData = await this.generateHypeCycleAnalysis(technologyArea, marketResearch);
            this.updateProgress("Generating hype cycle positioning", 70);

            // Phase 4: Strategic Whitepaper
            const whitepaper = await this.generateStrategicWhitepaper(technologyArea, {
                marketResearch,
                vendorAnalysis,
                hypeCycleData
            });
            this.updateProgress("Creating strategic whitepaper", 90);

            // Phase 5: Generate Artifacts
            const artifacts = await this.generateArtifacts({
                technologyArea,
                marketResearch,
                vendorAnalysis,
                hypeCycleData,
                whitepaper
            });

            this.currentAnalysis.artifacts = artifacts;
            this.currentAnalysis.status = 'completed';
            this.updateProgress("Analysis complete", 100);

            // Save to history
            this.saveAnalysisToHistory(this.currentAnalysis);

            return this.currentAnalysis;

        } catch (error) {
            console.error("Research failed:", error);
            this.updateProgress("Research failed: " + error.message, 0);
            throw error;
        }
    }

    // Phase 1: Conduct comprehensive market research
    async conductMarketResearch(technologyArea) {
        const prompt = `You are a senior enterprise technology analyst conducting comprehensive market research.

Technology Area: ${technologyArea}

Conduct thorough research and provide a structured analysis covering:

1. **Market Overview**
   - Current market size and growth trajectory
   - Key driving forces and adoption factors
   - Market maturity indicators

2. **Technology Landscape**
   - Core capabilities and use cases
   - Technical architecture patterns
   - Implementation approaches

3. **Adoption Trends**
   - Industry vertical adoption rates
   - Enterprise vs SMB adoption patterns
   - Geographic adoption variations

4. **Key Players Analysis**
   - Leading vendors and their market positions
   - Emerging players and disruptors
   - Technology platform leaders

5. **Business Impact Assessment**
   - ROI and value proposition analysis
   - Risk factors and challenges
   - Strategic advantages

Provide your analysis in a structured format with clear sections and actionable insights. Focus on enterprise architecture implications and strategic decision-making factors.`;

        return await this.callClaudeAPI(prompt, {
            maxTokens: 4000,
            temperature: 0.3
        });
    }

    // Phase 2: Analyze vendor ecosystem
    async conductVendorAnalysis(technologyArea, marketContext) {
        const prompt = `You are an enterprise architecture analyst specializing in vendor evaluation and competitive analysis.

Technology Area: ${technologyArea}

Market Context:
${marketContext}

Provide a comprehensive vendor ecosystem analysis including:

1. **Market Leaders**
   - Top 5-7 established vendors
   - Market share and positioning
   - Strength/weakness analysis

2. **Emerging Players**
   - Innovative startups and challengers
   - Unique value propositions
   - Growth trajectory assessment

3. **Platform Ecosystem**
   - Integration capabilities
   - Partnership networks
   - Developer ecosystem strength

4. **Competitive Dynamics**
   - Competitive positioning map
   - Differentiation strategies
   - Price/value positioning

5. **Vendor Evaluation Framework**
   - Key evaluation criteria
   - Scoring methodology
   - Selection recommendations

Focus on practical enterprise purchasing decisions and strategic vendor partnerships. Consider the 4 P's framework: People, Process, Platform, Price.`;

        return await this.callClaudeAPI(prompt, {
            maxTokens: 4000,
            temperature: 0.3
        });
    }

    // Phase 3: Generate hype cycle analysis
    async generateHypeCycleAnalysis(technologyArea, marketResearch) {
        const prompt = `You are a senior technology analyst creating a Gartner-style hype cycle analysis.

Technology Area: ${technologyArea}

Market Research Context:
${marketResearch}

Create a comprehensive hype cycle analysis including:

1. **Current Position Assessment**
   - Where ${technologyArea} sits on the hype cycle
   - Justification for this positioning
   - Movement trend analysis

2. **Hype Cycle Phases Analysis**
   - Innovation Trigger: Initial breakthroughs and early implementations
   - Peak of Inflated Expectations: Market hype and overestimation
   - Trough of Disillusionment: Reality check and market correction
   - Slope of Enlightenment: Practical applications emerge
   - Plateau of Productivity: Mainstream adoption and proven value

3. **Timeline Projections**
   - Expected time to reach mainstream adoption
   - Key milestones and inflection points
   - Market maturity indicators

4. **Risk and Opportunity Assessment**
   - Implementation risks at current maturity level
   - Strategic opportunities for early/late adopters
   - Timing recommendations for enterprise adoption

5. **Strategic Recommendations**
   - When to evaluate vs implement
   - Pilot project recommendations
   - Strategic positioning advice

Provide data-driven insights with clear reasoning for positioning and timing recommendations.`;

        return await this.callClaudeAPI(prompt, {
            maxTokens: 3500,
            temperature: 0.2
        });
    }

    // Phase 4: Generate strategic whitepaper
    async generateStrategicWhitepaper(technologyArea, analysisData) {
        const settings = this.getSettings();
        const organizationName = settings.organizationName || "Your Organization";

        const prompt = `You are an enterprise architect creating an executive-level strategic technology whitepaper.

Technology: ${technologyArea}
Organization: ${organizationName}

Research Foundation:
Market Research: ${analysisData.marketResearch}
Vendor Analysis: ${analysisData.vendorAnalysis}
Hype Cycle Analysis: ${analysisData.hypeCycleData}

Create a comprehensive strategic whitepaper with the following structure:

**EXECUTIVE SUMMARY**
- Key findings and strategic recommendations
- Business impact assessment
- Implementation timeline recommendations

**1. TECHNOLOGY OVERVIEW**
- Definition and core capabilities
- Business value proposition
- Strategic importance for enterprise architecture

**2. MARKET LANDSCAPE ANALYSIS**
- Market size, growth, and maturity assessment
- Competitive landscape overview
- Industry adoption trends

**3. ENTERPRISE IMPLICATIONS**
- Strategic fit with business objectives
- Architectural considerations
- Integration requirements and challenges

**4. VENDOR ECOSYSTEM EVALUATION**
- Leading solution providers
- Evaluation criteria and methodology
- Vendor selection framework

**5. IMPLEMENTATION STRATEGY**
- Phased adoption approach
- Risk mitigation strategies
- Success metrics and KPIs

**6. FINANCIAL ANALYSIS**
- Investment requirements and TCO analysis
- ROI projections and payback timeline
- Budget planning considerations

**7. RECOMMENDATIONS AND NEXT STEPS**
- Strategic recommendations
- Immediate action items
- Long-term roadmap alignment

Format as a professional enterprise document with clear sections, executive-level language, and actionable recommendations.`;

        return await this.callClaudeAPI(prompt, {
            maxTokens: 6000,
            temperature: 0.2
        });
    }

    // Generate downloadable artifacts
    async generateArtifacts(analysisData) {
        const artifacts = {};

        try {
            // Generate Executive Summary PDF
            artifacts.executiveSummary = await this.generateExecutiveSummaryPDF(analysisData);
            
            // Generate Hype Cycle Visualization
            artifacts.hypeCycleChart = await this.generateHypeCycleVisualization(analysisData);
            
            // Generate Vendor Landscape Chart
            artifacts.vendorLandscape = await this.generateVendorLandscapeChart(analysisData);
            
            // Generate Full Whitepaper PDF
            artifacts.whitepaper = await this.generateWhitepaperPDF(analysisData);
            
            // Generate Analysis Summary JSON
            artifacts.rawData = this.generateAnalysisJSON(analysisData);

            return artifacts;

        } catch (error) {
            console.error("Artifact generation failed:", error);
            throw new Error("Failed to generate analysis artifacts: " + error.message);
        }
    }

    // Generate Executive Summary PDF
    async generateExecutiveSummaryPDF(analysisData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(102, 126, 234);
        doc.text('Enterprise Architecture Analysis', 20, 30);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(`Technology: ${analysisData.technologyArea}`, 20, 45);
        
        doc.setFontSize(12);
        doc.setTextColor(128, 128, 128);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);

        // Executive Summary Section
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Executive Summary', 20, 75);
        
        // Extract key points from whitepaper
        const summaryText = this.extractExecutiveSummary(analysisData.whitepaper);
        const splitText = doc.splitTextToSize(summaryText, 170);
        doc.setFontSize(11);
        doc.text(splitText, 20, 90);

        // Generate blob for download
        const pdfBlob = doc.output('blob');
        return {
            type: 'pdf',
            name: `${analysisData.technologyArea}_Executive_Summary.pdf`,
            blob: pdfBlob,
            url: URL.createObjectURL(pdfBlob)
        };
    }

    // Generate Hype Cycle Visualization
    async generateHypeCycleVisualization(analysisData) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Create hype cycle curve visualization
        this.drawHypeCycleCurve(ctx, analysisData);

        // Convert to blob
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve({
                    type: 'image',
                    name: `${analysisData.technologyArea}_Hype_Cycle.png`,
                    blob: blob,
                    url: URL.createObjectURL(blob)
                });
            });
        });
    }

    // Generate Vendor Landscape Chart
    async generateVendorLandscapeChart(analysisData) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Create vendor landscape visualization
        this.drawVendorLandscape(ctx, analysisData);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve({
                    type: 'image',
                    name: `${analysisData.technologyArea}_Vendor_Landscape.png`,
                    blob: blob,
                    url: URL.createObjectURL(blob)
                });
            });
        });
    }

    // Generate Full Whitepaper PDF
    async generateWhitepaperPDF(analysisData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title page
        doc.setFontSize(24);
        doc.setTextColor(102, 126, 234);
        doc.text(`${analysisData.technologyArea}`, 20, 40);
        doc.text('Strategic Analysis', 20, 60);
        
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 80);

        // Content pages (simplified for demo)
        doc.addPage();
        doc.setFontSize(16);
        doc.text('Strategic Whitepaper', 20, 30);
        
        const content = analysisData.whitepaper.substring(0, 2000) + '...';
        const splitContent = doc.splitTextToSize(content, 170);
        doc.setFontSize(10);
        doc.text(splitContent, 20, 50);

        const pdfBlob = doc.output('blob');
        return {
            type: 'pdf',
            name: `${analysisData.technologyArea}_Strategic_Whitepaper.pdf`,
            blob: pdfBlob,
            url: URL.createObjectURL(pdfBlob)
        };
    }

    // Draw hype cycle curve
    drawHypeCycleCurve(ctx, analysisData) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw curve
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Hype cycle curve points
        const points = [
            {x: 100, y: height - 100}, // Start
            {x: 200, y: height - 400}, // Peak
            {x: 400, y: height - 150}, // Trough
            {x: 600, y: height - 300}, // Slope
            {x: 700, y: height - 280}  // Plateau
        ];
        
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Add labels
        ctx.fillStyle = '#333333';
        ctx.font = '14px Arial';
        ctx.fillText('Innovation Trigger', 50, height - 50);
        ctx.fillText('Peak of Inflated Expectations', 150, height - 450);
        ctx.fillText('Trough of Disillusionment', 350, height - 100);
        ctx.fillText('Slope of Enlightenment', 550, height - 250);
        ctx.fillText('Plateau of Productivity', 650, height - 230);
        
        // Mark technology position
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(300, height - 200, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(analysisData.technologyArea, 320, height - 195);
    }

    // Draw vendor landscape
    drawVendorLandscape(ctx, analysisData) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Title
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`${analysisData.technologyArea} Vendor Landscape`, 20, 30);
        
        // Axes
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, height - 100);
        ctx.lineTo(width - 100, height - 100);
        ctx.moveTo(100, height - 100);
        ctx.lineTo(100, 100);
        ctx.stroke();
        
        // Axis labels
        ctx.font = '14px Arial';
        ctx.fillText('Market Share →', width - 200, height - 70);
        ctx.save();
        ctx.translate(50, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Innovation →', -50, 0);
        ctx.restore();
        
        // Sample vendor positions (in real implementation, extract from analysis)
        const vendors = [
            {name: 'Leader A', x: 600, y: 200},
            {name: 'Leader B', x: 550, y: 250},
            {name: 'Challenger C', x: 400, y: 300},
            {name: 'Niche D', x: 300, y: 180}
        ];
        
        vendors.forEach(vendor => {
            ctx.fillStyle = '#667eea';
            ctx.beginPath();
            ctx.arc(vendor.x, vendor.y, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = '#333333';
            ctx.font = '12px Arial';
            ctx.fillText(vendor.name, vendor.x + 15, vendor.y + 5);
        });
    }

    // Call Claude API via Netlify function
    async callClaudeAPI(prompt, options = {}) {
        // Get the current site URL dynamically
        const baseUrl = window.location.origin;
        const functionUrl = `${baseUrl}/.netlify/functions/claude-api`;
        
        const requestBody = {
            prompt: prompt,
            options: {
                model: "claude-sonnet-4-20250514",
                maxTokens: options.maxTokens || 4000,
                temperature: options.temperature || 0.3
            }
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error || 'API request failed');
        }
        
        return data.content;
    }

    // Utility functions
    getSettings() {
        return JSON.parse(localStorage.getItem('ea-ai-settings') || '{}');
    }

    generateAnalysisId() {
        return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    updateProgress(message, percentage) {
        const event = new CustomEvent('researchProgress', {
            detail: { message, percentage }
        });
        document.dispatchEvent(event);
    }

    extractExecutiveSummary(whitepaper) {
        // Extract first paragraph or executive summary section
        const lines = whitepaper.split('\n');
        const summaryLines = [];
        let inSummary = false;
        
        for (const line of lines) {
            if (line.includes('EXECUTIVE SUMMARY') || line.includes('Executive Summary')) {
                inSummary = true;
                continue;
            }
            if (inSummary && line.trim().startsWith('**') && !line.includes('EXECUTIVE')) {
                break;
            }
            if (inSummary && line.trim()) {
                summaryLines.push(line.trim());
            }
        }
        
        return summaryLines.slice(0, 10).join(' ').substring(0, 800) + '...';
    }

    generateAnalysisJSON(analysisData) {
        const jsonData = {
            metadata: {
                id: this.currentAnalysis.id,
                technology: analysisData.technologyArea,
                timestamp: this.currentAnalysis.timestamp,
                agent: this.name
            },
            analysis: {
                marketResearch: analysisData.marketResearch,
                vendorAnalysis: analysisData.vendorAnalysis,
                hypeCycleData: analysisData.hypeCycleData,
                whitepaper: analysisData.whitepaper
            }
        };

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], {type: 'application/json'});
        return {
            type: 'json',
            name: `${analysisData.technologyArea}_Analysis_Data.json`,
            blob: blob,
            url: URL.createObjectURL(blob)
        };
    }

    saveAnalysisToHistory(analysis) {
        const history = JSON.parse(localStorage.getItem('ea-ai-outputs') || '[]');
        history.unshift({
            id: analysis.id,
            technology: analysis.technology,
            timestamp: analysis.timestamp,
            status: analysis.status,
            artifactCount: Object.keys(analysis.artifacts).length
        });
        
        // Keep only last 50 analyses
        if (history.length > 50) {
            history.splice(50);
        }
        
        localStorage.setItem('ea-ai-outputs', JSON.stringify(history));
        
        // Update UI
        const event = new CustomEvent('analysisCompleted', { detail: analysis });
        document.dispatchEvent(event);
    }
}

// Export for use in other modules
window.TechnologyResearchAgent = TechnologyResearchAgent;