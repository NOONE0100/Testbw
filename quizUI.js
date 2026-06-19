import { saveQuizState } from './storage.js';

export function createQuizUI(engine) {
    const ui = {
        engine,

        renderQuestion(animate = true) {
            const question = this.engine.getCurrentQuestion();
            const updateContent = () => {
                document.getElementById('q-meta').innerText = `Question ${this.engine.state.currentQuestion + 1} of ${this.engine.questions.length}`;
                const progress = this.engine.getProgress();
                document.getElementById('progress-bar').style.width = `${progress}%`;
                document.getElementById('q-pct').innerText = `${Math.round(progress)}%`;
                document.getElementById('q-text').innerText = question.q;
                document.getElementById('opt-text-0').innerText = question.a;
                document.getElementById('opt-text-1').innerText = question.b;
                this.updateOptionUI();
                const nextBtn = document.getElementById('next-btn');
                nextBtn.disabled = this.engine.state.selectedCurrent === null;
                nextBtn.innerHTML = (this.engine.state.currentQuestion === this.engine.questions.length - 1) ?
                    'Calculate Result <i data-lucide="check-circle"></i>' :
                    'Continue <i data-lucide="arrow-right"></i>';
                lucide.createIcons();
            };

            const wrapper = document.getElementById('q-wrapper');
            const opts = document.getElementById('opt-container');

            if (animate) {
                wrapper.style.opacity = '0'; wrapper.style.transform = 'translateX(-10px)';
                opts.style.opacity = '0'; opts.style.transform = 'translateX(10px)';
                setTimeout(() => {
                    updateContent();
                    wrapper.style.transition = 'all 0.4s ease';
                    opts.style.transition = 'all 0.4s ease';
                    wrapper.style.opacity = '1'; wrapper.style.transform = 'translateX(0)';
                    opts.style.opacity = '1'; opts.style.transform = 'translateX(0)';
                }, 300);
            } else {
                updateContent();
            }
        },

        updateOptionUI() {
            document.getElementById('opt-0').classList.toggle('selected', this.engine.state.selectedCurrent === 0);
            document.getElementById('opt-1').classList.toggle('selected', this.engine.state.selectedCurrent === 1);
        },

        attachHandlers() {
            document.getElementById('opt-0').addEventListener('click', () => {
                if (this.engine.state.selectedCurrent !== 0) playSound('select');
                this.engine.selectOption(0);
                this.updateOptionUI();
                document.getElementById('next-btn').disabled = false;
            });

            document.getElementById('opt-1').addEventListener('click', () => {
                if (this.engine.state.selectedCurrent !== 1) playSound('select');
                this.engine.selectOption(1);
                this.updateOptionUI();
                document.getElementById('next-btn').disabled = false;
            });

            document.getElementById('next-btn').addEventListener('click', () => {
                if (this.engine.state.selectedCurrent === null) return;

                if (this.engine.advance()) {
                    saveQuizState(this.engine.state);
                    this.renderQuestion(true);
                } else {
                    const finalState = this.engine.calculateResult();
                    saveQuizState(finalState);
                    setTimeout(() => {
                        window.location.href = './result.html';
                    }, 600);
                }
            });
        }
    };

    return ui;
}
