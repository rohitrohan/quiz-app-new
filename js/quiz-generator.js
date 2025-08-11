// AI Quiz Generator
// This module integrates with Gemini Pro API to generate quizzes automatically

// Check if Gemini API is available
function checkGeminiAvailability() {
    if (typeof GeminiAPI === 'undefined') {
        console.error('Gemini API not loaded. Please include api/gemini-config.js');
        return false;
    }
    
    if (!GeminiAPI.isConfigured()) {
        console.warn('Gemini API key not configured. AI features will be disabled.');
        return false;
    }
    
    return true;
}

// Add AI generation button to quiz editor
function addAIGeneratorToEditor() {
    // Check if we're on the quiz editor page
    const questionsContainer = document.getElementById('questions-container');
    if (!questionsContainer) return;
    
    // Check if Gemini is available
    if (!checkGeminiAvailability()) {
        console.log('AI quiz generation not available');
        return;
    }
    
    // Create AI generator section
    const aiSection = document.createElement('div');
    aiSection.className = 'ai-generator-section';
    aiSection.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 25px;
        border-radius: 12px;
        margin-bottom: 20px;
    `;
    
    aiSection.innerHTML = `
        <h3 style="margin-bottom: 15px;">🤖 AI Question Generator</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <input type="text" id="ai-topic" placeholder="Enter topic (e.g., JavaScript, World War II)" 
                   style="padding: 10px; border-radius: 6px; border: none;">
            <select id="ai-question-type" style="padding: 10px; border-radius: 6px; border: none;">
                <option value="mcq">Multiple Choice</option>
                <option value="short">Short Answer</option>
                <option value="mixed">Mixed Types</option>
            </select>
            <input type="number" id="ai-count" placeholder="Number of questions" min="1" max="20" value="5"
                   style="padding: 10px; border-radius: 6px; border: none;">
            <select id="ai-difficulty" style="padding: 10px; border-radius: 6px; border: none;">
                <option value="easy">Easy</option>
                <option value="medium" selected>Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
        <button onclick="generateAIQuestions()" 
                style="background: white; color: #667eea; border: none; padding: 10px 20px; 
                       border-radius: 6px; cursor: pointer; font-weight: bold;">
            Generate Questions with AI
        </button>
        <div id="ai-status" style="margin-top: 10px; display: none;"></div>
    `;
    
    // Insert before questions container
    questionsContainer.parentNode.insertBefore(aiSection, questionsContainer);
}

// Generate questions using AI
async function generateAIQuestions() {
    const topic = document.getElementById('ai-topic').value.trim();
    const type = document.getElementById('ai-question-type').value;
    const count = parseInt(document.getElementById('ai-count').value) || 5;
    const difficulty = document.getElementById('ai-difficulty').value;
    const statusDiv = document.getElementById('ai-status');
    
    if (!topic) {
        showAIStatus('Please enter a topic', 'error');
        return;
    }
    
    if (!checkGeminiAvailability()) {
        showAIStatus('AI service not available. Please configure Gemini API key.', 'error');
        return;
    }
    
    try {
        showAIStatus('Generating questions with AI... This may take a moment.', 'loading');
        
        let generatedQuestions;
        
        if (type === 'mixed') {
            // Generate mixed question types
            const mcqCount = Math.ceil(count * 0.6);
            const shortCount = Math.floor(count * 0.3);
            const essayCount = count - mcqCount - shortCount;
            
            const mcqQuestions = await GeminiAPI.generateQuestions(topic, difficulty, mcqCount, 'mcq');
            const shortQuestions = await GeminiAPI.generateQuestions(topic, difficulty, shortCount, 'short');
            const essayQuestions = essayCount > 0 ? 
                await GeminiAPI.generateQuestions(topic, difficulty, essayCount, 'essay') : [];
            
            generatedQuestions = [...mcqQuestions, ...shortQuestions, ...essayQuestions];
        } else {
            generatedQuestions = await GeminiAPI.generateQuestions(topic, difficulty, count, type);
        }
        
        // Add generated questions to the editor
        if (generatedQuestions && generatedQuestions.length > 0) {
            generatedQuestions.forEach(question => {
                // Add to questions array (assuming quiz-editor.js is loaded)
                if (typeof questions !== 'undefined' && typeof addQuestionToUI === 'function') {
                    questions.push(question);
                    addQuestionToUI(question, questions.length - 1);
                }
            });
            
            showAIStatus(`Successfully generated ${generatedQuestions.length} questions!`, 'success');
            
            // Update question count
            if (typeof questionCount !== 'undefined') {
                questionCount = questions.length;
            }
        } else {
            showAIStatus('No questions were generated. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error generating AI questions:', error);
        showAIStatus('Failed to generate questions: ' + error.message, 'error');
    }
}

// Show AI status message
function showAIStatus(message, type) {
    const statusDiv = document.getElementById('ai-status');
    if (!statusDiv) return;
    
    statusDiv.style.display = 'block';
    statusDiv.style.padding = '10px';
    statusDiv.style.borderRadius = '6px';
    statusDiv.style.marginTop = '10px';
    
    switch (type) {
        case 'loading':
            statusDiv.style.background = 'rgba(255,255,255,0.2)';
            statusDiv.innerHTML = `<span style="margin-right: 10px;">⏳</span> ${message}`;
            break;
        case 'success':
            statusDiv.style.background = 'rgba(76, 175, 80, 0.2)';
            statusDiv.innerHTML = `<span style="margin-right: 10px;">✅</span> ${message}`;
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
            break;
        case 'error':
            statusDiv.style.background = 'rgba(244, 67, 54, 0.2)';
            statusDiv.innerHTML = `<span style="margin-right: 10px;">❌</span> ${message}`;
            break;
    }
}

// Generate quiz from uploaded document
async function generateQuizFromDocument(file) {
    if (!checkGeminiAvailability()) {
        throw new Error('AI service not available');
    }
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const text = e.target.result;
                const questions = await GeminiAPI.generateFromText(text);
                resolve(questions);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };
        
        // Read file as text
        reader.readAsText(file);
    });
}

// Evaluate essay answers with AI
async function evaluateEssayWithAI(question, answer, rubric) {
    if (!checkGeminiAvailability()) {
        console.log('AI evaluation not available');
        return null;
    }
    
    try {
        const evaluation = await GeminiAPI.evaluateEssay(question, answer, rubric);
        return evaluation;
    } catch (error) {
        console.error('Error evaluating essay:', error);
        return null;
    }
}

// Get personalized quiz recommendations
async function getQuizRecommendations(userId) {
    if (!checkGeminiAvailability()) {
        return null;
    }
    
    try {
        // Fetch user profile and recent performance
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        
        // Fetch recent results
        const resultsSnapshot = await db.collection('results')
            .where('userId', '==', userId)
            .orderBy('completedAt', 'desc')
            .limit(10)
            .get();
        
        const recentPerformance = [];
        resultsSnapshot.forEach(doc => {
            const data = doc.data();
            recentPerformance.push({
                quizTitle: data.quizTitle,
                score: data.percentage,
                date: data.completedAt
            });
        });
        
        // Get AI recommendations
        const recommendations = await GeminiAPI.generateRecommendations(
            userData,
            recentPerformance
        );
        
        return recommendations;
    } catch (error) {
        console.error('Error getting recommendations:', error);
        return null;
    }
}

// Add smart hints using AI
async function generateSmartHint(question, difficulty) {
    if (!checkGeminiAvailability()) {
        return null;
    }
    
    const prompt = `Generate a helpful hint for this question without giving away the answer:
    
    Question: ${question}
    Difficulty: ${difficulty}
    
    The hint should guide the student toward the answer without revealing it directly.
    Keep it brief (1-2 sentences).`;
    
    try {
        const hint = await GeminiAPI.callAPI(prompt);
        return hint.trim();
    } catch (error) {
        console.error('Error generating hint:', error);
        return null;
    }
}

// Analyze quiz performance and provide feedback
async function analyzeQuizPerformance(resultData, quizData) {
    if (!checkGeminiAvailability()) {
        return null;
    }
    
    const prompt = `Analyze this quiz performance and provide constructive feedback:
    
    Quiz: ${quizData.title}
    Score: ${resultData.percentage}%
    Correct Answers: ${resultData.correctAnswers}/${resultData.totalQuestions}
    Time Taken: ${resultData.timeSpent} seconds
    
    Provide:
    1. Performance summary
    2. Strengths demonstrated
    3. Areas for improvement
    4. Study recommendations
    
    Format as JSON:
    {
      "summary": "Brief performance summary",
      "strengths": ["strength1", "strength2"],
      "improvements": ["area1", "area2"],
      "recommendations": ["recommendation1", "recommendation2"]
    }`;
    
    try {
        const response = await GeminiAPI.callAPI(prompt);
        const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(cleanResponse);
    } catch (error) {
        console.error('Error analyzing performance:', error);
        return null;
    }
}

// Initialize AI features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add AI generator to quiz editor if on that page
    if (window.location.pathname.includes('quiz-editor')) {
        setTimeout(addAIGeneratorToEditor, 500);
    }
});

// Export functions for use in other modules
window.QuizGenerator = {
    checkAvailability: checkGeminiAvailability,
    generateQuestions: generateAIQuestions,
    generateFromDocument: generateQuizFromDocument,
    evaluateEssay: evaluateEssayWithAI,
    getRecommendations: getQuizRecommendations,
    generateHint: generateSmartHint,
    analyzePerformance: analyzeQuizPerformance
};