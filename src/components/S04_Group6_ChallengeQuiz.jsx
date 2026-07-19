import { useEffect } from "react";

const quiz_bank = [
    {
        question: "Question 1",
        options: [
            "Ans1",
            "Ans2",
            "Ans3",
            "Ans4"
        ],
        answerIndex: 0
    },
    {
        question: "Question 2",
        options: [
            "Ans1",
            "Ans2",
            "Ans3",
            "Ans4"
        ],
        answerIndex: 1
    }
]

export default function QuizLogic() {
    useEffect(() => {
        let currentIndex = 0;

        const qNum = document.querySelector('.question-number');
        const qText = document.querySelector('.question-text');
        const choices = document.querySelectorAll('.quiz-option:not(#next-btn)');
        const next = document.querySelector('#next-btn');

        function loadQuestion() {
            const current = quiz_bank[currentIndex];

            if (qNum)
                qNum.innerText = `QUESTION ${currentIndex + 1}`;
            if (qText)
                qText.innerText = current.question;
            if (next)
                next.style.display = 'none';

            choices.forEach((btn, i) => {
                btn.classList.remove('active');
                const textSpan = btn.querySelector('.option-text');
                if (textSpan)
                    textSpan.innerText = current.options[i]
            })
        }

        let selectedIndex = null;
        let answerLocked = false;

        choices.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (answerLocked) return
                answerLocked = true;
                
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }

                selectedIndex = i;
                const currentQuestion = quiz_bank[currentIndex]

                choices.forEach((b, i) => {
                    if (i === currentQuestion.answerIndex) {
                        b.classList.add('correct')
                    } else if (i === selectedIndex) {
                        b.classList.add('incorrect')
                    }
                })

                setTimeout(() => {
                    if (next) {
                        next.style.display = "block"
                        next.querySelector('.option-text').innerText = currentIndex === quiz_bank.length - 1 ? "Restart Quiz ↺" : "Next Question →"
                    }
                }, 600)
            })
        })

        if (next) {
            next.addEventListener('click', () => {
                answerLocked = false;
                selectedIndex = null;
                choices.forEach(btn => btn.classList.remove('correct', 'incorrect'))

                if (currentIndex < quiz_bank.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                loadQuestion();
            })
        }

        loadQuestion();
    }, [])
}