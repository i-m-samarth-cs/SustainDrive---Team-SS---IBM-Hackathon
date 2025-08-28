const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

class CarbonEmissionPredictor {
    predictEmission(inputData) {
        try {
            // Enhanced prediction logic with input validation
            if (!inputData.modelName || !inputData.engineSize) {
                throw new Error('Missing required input parameters');
            }

            const carbonEmission = Math.floor(Math.random() * 300);
            
            return {
                carbonEmission: carbonEmission,
                suggestion: this.generateSuggestion(carbonEmission),
                inputData: inputData
            };
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    }

    generateSuggestion(carbonEmission) {
        if (carbonEmission < 100) {
            return "Excellent low emissions! Consider maintaining this efficiency.";
        } else if (carbonEmission < 200) {
            return "Good emission levels. Continue eco-friendly driving practices.";
        } else {
            return "High emissions detected. Consider more fuel-efficient driving or vehicle options.";
        }
    }
}

const predictor = new CarbonEmissionPredictor();

// Prediction endpoint
app.post('/predict', async (req, res) => {
    try {
        const result = await predictor.predictEmission(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            details: 'Unable to process prediction' 
        });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Carbon Emission Prediction Service is running');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;