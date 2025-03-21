import Groq from "groq-sdk";

const urlParams = new URLSearchParams(window.location.search);
const domain = urlParams.get('domain');
const level = urlParams.get('level');

console.log("Domain:", domain); // Debugging
console.log("Level:", level);   // Debugging

const groq = new Groq({ apiKey: 'YOUR_GROQ_API_KEY' });

async function fetchQuestionsForDomain() {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{
                role: "user",
                content: `Generate ${level} questions for the domain: ${domain}`,
            }],
            model: "llama-3.3-70b-versatile",
        });

        console.log("API Response:", completion); // Debugging
        updateQuestionUI(completion.choices[0]?.message?.content || "No questions available.");
    } catch (error) {
        console.error("Error fetching questions:", error);
        updateQuestionUI("Failed to load questions. Please try again later.");
    }
}

function updateQuestionUI(question) {
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    questionText.textContent = question;
    answersContainer.innerHTML = ''; // Clear previous answers

    // Dummy answers for demo purposes
    ['Answer 1', 'Answer 2', 'Answer 3'].forEach(answer => {
        let button = document.createElement('button');
        button.textContent = answer;
        button.className = 'btn';
        button.onclick = () => handleAnswerClick(answer);
        answersContainer.appendChild(button);
    });
}

function handleAnswerClick(answer) {
    console.log("Answer clicked:", answer);
    // Implement your logic for handling answer clicks here
}

document.addEventListener('DOMContentLoaded', fetchQuestionsForDomain);
