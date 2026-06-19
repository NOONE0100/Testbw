export function loadQuizState() {
    const savedState = localStorage.getItem('personaPremiumState');
    return savedState ? JSON.parse(savedState) : null;
}

export function saveQuizState(state) {
    localStorage.setItem('personaPremiumState', JSON.stringify(state));
}

export function clearQuizState() {
    localStorage.removeItem('personaPremiumState');
}
