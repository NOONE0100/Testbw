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
        } else if (savedState.currentQuestion > 0) {
            window.location.href = './quiz.html';
        }
    }
});
