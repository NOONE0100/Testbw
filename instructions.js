document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    document.addEventListener('mousemove', (e) => {
        const spotlight = document.getElementById('spotlight');
        if(spotlight) {
            spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
            spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
        }
    });

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;

    function playNavSound() {
        try {
            if (!audioCtx) audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle'; 
            osc.frequency.setValueAtTime(400, audioCtx.currentTime); 
            osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime); 
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.connect(gain); 
            gain.connect(audioCtx.destination); 
            osc.start(); 
            osc.stop(audioCtx.currentTime + 0.1);
        } catch(e) {}
    }

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
        localStorage.setItem('personaPremiumState', JSON.stringify(state));

        setTimeout(() => {
            window.location.href = './quiz.html';
        }, 200);
    });
});
