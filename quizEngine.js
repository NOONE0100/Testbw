const PERCENTAGE_SCALE = 100;
const QUESTION_INDEX_INCREMENT = 1;
const RESULT_GROUP_SIZE = 7;
const INITIAL_SCORE_VALUE = 0;
const OPTION_A = 0;
const OPTION_B = 1;
const RESULT_CATEGORY_MOD_EI = 0;
const RESULT_CATEGORY_MOD_SN_FIRST = 1;
const RESULT_CATEGORY_MOD_SN_SECOND = 2;
const RESULT_CATEGORY_MOD_TF_FIRST = 3;
const RESULT_CATEGORY_MOD_TF_SECOND = 4;
const RESULT_CATEGORY_MOD_JP_FIRST = 5;
const RESULT_CATEGORY_MOD_JP_SECOND = 6;

export function createQuizEngine(state, questions) {
    const engine = {
        state,
        questions,

        getCurrentQuestion() {
            return this.questions[this.state.currentQuestion];
        },

        getProgress() {
            return (this.state.currentQuestion / this.questions.length) * PERCENTAGE_SCALE;
        },

        selectOption(optionIndex) {
            this.state.selectedCurrent = optionIndex;
            this.state.answers[this.state.currentQuestion] = optionIndex;
        },

        advance() {
            if (this.state.currentQuestion < this.questions.length - QUESTION_INDEX_INCREMENT) {
                this.state.currentQuestion += QUESTION_INDEX_INCREMENT;
                this.state.selectedCurrent = this.state.answers[this.state.currentQuestion];
                return true;
            }
            return false;
        },

        calculateResult() {
            const s = { E: INITIAL_SCORE_VALUE, I: INITIAL_SCORE_VALUE, S: INITIAL_SCORE_VALUE, N: INITIAL_SCORE_VALUE, T: INITIAL_SCORE_VALUE, F: INITIAL_SCORE_VALUE, J: INITIAL_SCORE_VALUE, P: INITIAL_SCORE_VALUE };

            this.state.answers.forEach((ans, index) => {
                const mod = index % RESULT_GROUP_SIZE;
                if (mod === RESULT_CATEGORY_MOD_EI) { ans === OPTION_A ? s.E++ : s.I++; }
                else if (mod === RESULT_CATEGORY_MOD_SN_FIRST || mod === RESULT_CATEGORY_MOD_SN_SECOND) { ans === OPTION_A ? s.S++ : s.N++; }
                else if (mod === RESULT_CATEGORY_MOD_TF_FIRST || mod === RESULT_CATEGORY_MOD_TF_SECOND) { ans === OPTION_A ? s.T++ : s.F++; }
                else if (mod === RESULT_CATEGORY_MOD_JP_FIRST || mod === RESULT_CATEGORY_MOD_JP_SECOND) { ans === OPTION_A ? s.J++ : s.P++; }
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
