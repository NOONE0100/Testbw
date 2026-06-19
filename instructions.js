const TOTAL_QUESTIONS = 70;
const INITIAL_QUESTION_INDEX = 0;

document.addEventListener('DOMContentLoaded', () => {
    initCommonPage();

    document.getElementById('begin-quiz-btn').addEventListener('click', () => {
        playNavSound();

        const state = {
            currentQuestion: INITIAL_QUESTION_INDEX,
            answers: new Array(TOTAL_QUESTIONS).fill(null),
            selectedCurrent: null,
            isComplete: false,
            result: null,
            scores: null
        };
        saveState(state);

        navigateTo('./quiz.html');
    });
});
