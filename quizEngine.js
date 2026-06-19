export function createQuizEngine(state, questions) {
    const engine = {
        state,
        questions,

        getCurrentQuestion() {
            return this.questions[this.state.currentQuestion];
        },

        getProgress() {
            return (this.state.currentQuestion / this.questions.length) * 100;
        },

        selectOption(optionIndex) {
            this.state.selectedCurrent = optionIndex;
            this.state.answers[this.state.currentQuestion] = optionIndex;
        },

        advance() {
            if (this.state.currentQuestion < this.questions.length - 1) {
                this.state.currentQuestion += 1;
                this.state.selectedCurrent = this.state.answers[this.state.currentQuestion];
                return true;
            }
            return false;
        },

        calculateResult() {
            const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

            this.state.answers.forEach((ans, index) => {
                const mod = index % 7;
                if (mod === 0) { ans === 0 ? s.E++ : s.I++; }
                else if (mod === 1 || mod === 2) { ans === 0 ? s.S++ : s.N++; }
                else if (mod === 3 || mod === 4) { ans === 0 ? s.T++ : s.F++; }
                else if (mod === 5 || mod === 6) { ans === 0 ? s.J++ : s.P++; }
            });

            this.state.result = (s.E >= s.I ? 'E' : 'I') +
                (s.S >= s.N ? 'S' : 'N') +
                (s.T >= s.F ? 'T' : 'F') +
                (s.J >= s.P ? 'J' : 'P');

            this.state.scores = s;
            this.state.isComplete = true;
            return this.state;
        }
    };

    return engine;
}
