function initCommonPage() {
    lucide.createIcons();

    document.addEventListener('mousemove', (e) => {
        const spotlight = document.getElementById('spotlight');
        if (spotlight) {
            spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
            spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
        }
    });
}

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let commonAudioCtx = null;

function getCommonAudioContext() {
    if (!AudioContextClass) return null;
    if (!commonAudioCtx) commonAudioCtx = new AudioContextClass();
    if (commonAudioCtx.state === 'suspended') commonAudioCtx.resume();
    return commonAudioCtx;
}

function playSound(type = 'select') {
    try {
        const audioCtx = getCommonAudioContext();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        if (type === 'select') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        }

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        // swallow audio errors so page still works
    }
}

function playNavSound() {
    playSound('nav');
}

function navigateTo(url, delay = 200) {
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

function loadState() {
    const savedState = localStorage.getItem('personaPremiumState');
    return savedState ? JSON.parse(savedState) : null;
}

function saveState(state) {
    localStorage.setItem('personaPremiumState', JSON.stringify(state));
}

function resetState() {
    localStorage.removeItem('personaPremiumState');
}
