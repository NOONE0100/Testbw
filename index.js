const INITIAL_QUESTION_INDEX = 0;

document.addEventListener('DOMContentLoaded', () => {
    initCommonPage();

    document.getElementById('start-btn').addEventListener('click', () => {
        playNavSound();
        navigateTo('./instructions.html');
    });

    const savedState = loadState();
    if (savedState) {
        if (savedState.isComplete) {
            window.location.href = './result.html';
        } else if (savedState.currentQuestion > INITIAL_QUESTION_INDEX) {
            window.location.href = './quiz.html';
        }
    }
});
