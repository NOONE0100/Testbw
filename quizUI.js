import { saveQuizState } from './storage.js';

const TRANSITION_DURATION_MS = 300;
const TRANSITION_EASING = 'all 0.4s ease';
const HIDDEN_OPACITY = '0';
const VISIBLE_OPACITY = '1';
const OFFSCREEN_LEFT = 'translateX(-10px)';
const OFFSCREEN_RIGHT = 'translateX(10px)';
const ONSCREEN = 'translateX(0)';
const LAST_QUESTION_TEXT = 'Calculate Result <i data-lucide="check-circle"></i>';
const CONTINUE_TEXT = 'Continue <i data-lucide="arrow-right"></i>';
const OPTION_ZERO = 0;
const OPTION_ONE = 1;
const QUESTION_NUMBER_OFFSET = 1;
const LAST_QUESTION_OFFSET = 1;
const RESET_DELAY_MS = 600;

export function createQuizUI(engine) {
    const qMeta = document.getElementById('q-meta');
    const progressBar = document.getElementById('progress-bar');
    const qPct = document.getElementById('q-pct');
    const qText = document.getElementById('q-text');
    const optText0 = document.getElementById('opt-text-0');
    const optText1 = document.getElementById('opt-text-1');
    const opt0 = document.getElementById('opt-0');
    const opt1 = document.getElementById('opt-1');
    const nextBtn = document.getElementById('next-btn');
    const wrapper = document.getElementById('q-wrapper');
    const opts = document.getElementById('opt-container');

    const ui = {
        engine,

        renderQuestion(animate = true) {
            const question = this.engine.getCurrentQuestion();
            const updateContent = () => {
                qMeta.innerText = `Question ${this.engine.state.currentQuestion + QUESTION_NUMBER_OFFSET} of ${this.engine.questions.length}`;
                const progress = this.engine.getProgress();
                progressBar.style.width = `${progress}%`;
                qPct.innerText = `${Math.round(progress)}%`;
                qText.innerText = question.q;
                optText0.innerText = question.a;
                optText1.innerText = question.b;
                this.updateOptionUI();
                nextBtn.disabled = this.engine.state.selectedCurrent === null;
                nextBtn.innerHTML = (this.engine.state.currentQuestion === this.engine.questions.length - LAST_QUESTION_OFFSET) ?
                    LAST_QUESTION_TEXT :
                    CONTINUE_TEXT;
                lucide.createIcons();
            };

            if (animate) {
                wrapper.style.opacity = HIDDEN_OPACITY; wrapper.style.transform = OFFSCREEN_LEFT;
                opts.style.opacity = HIDDEN_OPACITY; opts.style.transform = OFFSCREEN_RIGHT;
                setTimeout(() => {
                    updateContent();
                    wrapper.style.transition = TRANSITION_EASING;
                    opts.style.transition = TRANSITION_EASING;
                    wrapper.style.opacity = VISIBLE_OPACITY; wrapper.style.transform = ONSCREEN;
                    opts.style.opacity = VISIBLE_OPACITY; opts.style.transform = ONSCREEN;
                }, TRANSITION_DURATION_MS);
            } else {
                updateContent();
            }
        },

        updateOptionUI() {
            opt0.classList.toggle('selected', this.engine.state.selectedCurrent === OPTION_ZERO);
            opt1.classList.toggle('selected', this.engine.state.selectedCurrent === OPTION_ONE);
        },

        attachHandlers() {
            opt0.addEventListener('click', () => {
                if (this.engine.state.selectedCurrent !== OPTION_ZERO) playSound('select');
                this.engine.selectOption(OPTION_ZERO);
                this.updateOptionUI();
                nextBtn.disabled = false;
            });

            opt1.addEventListener('click', () => {
                if (this.engine.state.selectedCurrent !== OPTION_ONE) playSound('select');
                this.engine.selectOption(OPTION_ONE);
                this.updateOptionUI();
                nextBtn.disabled = false;
            });

            nextBtn.addEventListener('click', () => {
                if (this.engine.state.selectedCurrent === null) return;

                if (this.engine.advance()) {
                    saveQuizState(this.engine.state);
                    this.renderQuestion(true);
                } else {
                    const finalState = this.engine.calculateResult();
                    saveQuizState(finalState);
                    setTimeout(() => {
                        window.location.href = './result.html';
                    }, RESET_DELAY_MS);
                }
            });
        }
    };

    return ui;
}
