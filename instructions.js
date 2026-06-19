document.addEventListener('DOMContentLoaded', () => {
    initCommonPage();

    document.getElementById('begin-quiz-btn').addEventListener('click', () => {
        playNavSound();

        const state = {
            currentQuestion: 0,
            answers: new Array(70).fill(null),
            selectedCurrent: null,
            isComplete: false,
            result: null,
            scores: null
        };
        saveState(state);

        navigateTo('./quiz.html');
    });
});
