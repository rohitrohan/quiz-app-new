// Gemini Pro API Configuration Template
// IMPORTANT: Copy this file to gemini-config.js and add your API key

const GEMINI_CONFIG = {
    // Get your API key from: https://makersuite.google.com/app/apikey
    API_KEY: 'YOUR_API_KEY_HERE',
    
    // API Endpoint
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Model settings
    MODEL_SETTINGS: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
    },
    
    // Safety settings
    SAFETY_SETTINGS: [
        {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
};

// Check if API key is configured
function isGeminiConfigured() {
    return GEMINI_CONFIG.API_KEY !== 'YOUR_API_KEY_HERE' && GEMINI_CONFIG.API_KEY !== '';
}

// Rest of the code remains the same...