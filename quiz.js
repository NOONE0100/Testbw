import { quizQuestions } from './questions.js';
import { createQuizEngine } from './quizEngine.js';
import { createQuizUI } from './quizUI.js';
import { loadQuizState } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    initCommonPage();

    const state = loadQuizState();

    if (!state || state.isComplete) {
        window.location.href = './index.html';
        return;
    }

    const engine = createQuizEngine(state, quizQuestions);
    const ui = createQuizUI(engine);

    ui.attachHandlers();
    ui.renderQuestion(false);
});
