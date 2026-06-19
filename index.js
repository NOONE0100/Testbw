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

    document.getElementById('start-btn').addEventListener('click', () => {
        playNavSound();
        setTimeout(() => {
            window.location.href = './instructions.html';
        }, 200);
    });

    const savedState = localStorage.getItem('personaPremiumState');
    if (savedState) {
        const state = JSON.parse(savedState);
        if (state.isComplete) window.location.href = './result.html';
        else if (state.currentQuestion > 0) window.location.href = './quiz.html';
    }
});
