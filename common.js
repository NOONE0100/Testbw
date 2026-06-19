const AUDIO_RAMP_DURATION = 0.1;
const AUDIO_STOP_DELAY = 0.1;
const AUDIO_SELECT_FREQUENCY_START = 800;
const AUDIO_SELECT_FREQUENCY_END = 400;
const AUDIO_NAV_FREQUENCY_START = 400;
const AUDIO_NAV_FREQUENCY_END = 600;
const AUDIO_SELECT_GAIN_START = 0.1;
const AUDIO_NAV_GAIN_START = 0.05;
const AUDIO_GAIN_END = 0.01;
const NAVIGATION_DELAY_MS = 200;

function initCommonPage() {
    lucide.createIcons();

    const spotlight = document.getElementById('spotlight');
    if (!spotlight) return;

    let pendingX = 0;
    let pendingY = 0;
    let frameRequested = false;

    const updateSpotlight = () => {
        frameRequested = false;
        spotlight.style.setProperty('--mouse-x', `${pendingX}px`);
        spotlight.style.setProperty('--mouse-y', `${pendingY}px`);
    };

    document.addEventListener('mousemove', (e) => {
        pendingX = e.clientX;
        pendingY = e.clientY;
        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(updateSpotlight);
        }
    }, { passive: true });
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
            osc.frequency.setValueAtTime(AUDIO_SELECT_FREQUENCY_START, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(AUDIO_SELECT_FREQUENCY_END, audioCtx.currentTime + AUDIO_RAMP_DURATION);
            gain.gain.setValueAtTime(AUDIO_SELECT_GAIN_START, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(AUDIO_GAIN_END, audioCtx.currentTime + AUDIO_RAMP_DURATION);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(AUDIO_NAV_FREQUENCY_START, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(AUDIO_NAV_FREQUENCY_END, audioCtx.currentTime + AUDIO_RAMP_DURATION);
            gain.gain.setValueAtTime(AUDIO_NAV_GAIN_START, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(AUDIO_GAIN_END, audioCtx.currentTime + AUDIO_RAMP_DURATION);
        }

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + AUDIO_STOP_DELAY);
    } catch (e) {
        // swallow audio errors so page still works
    }
}

function playNavSound() {
    playSound('nav');
}

function navigateTo(url, delay = NAVIGATION_DELAY_MS) {
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
