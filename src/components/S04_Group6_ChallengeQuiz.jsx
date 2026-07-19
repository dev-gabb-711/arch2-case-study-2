import { useEffect } from "react";

const quiz_bank = [
    {
        question: "What is RAM?",
        options: [
            "A semiconductor that temporarily stores data and program instructions",
            "A router that temporarily stores data and program instructions",
            "A switch that temporarily stores data and program instructions",
            "A semiconductor that permanently stores data and program instructions"
        ],
        answerIndex: 0
    },
    {
        question: "The process that lets the CPU perform a sequence of operations is called _____",
        options: [
            "Go-Grow-Glow Cycle",
            "Discover-Offer-Request-Acknowledge Cycle",
            "Read-Write-Update Cycle",
            "Fetch-Decode-Execute Cycle"
        ],
        answerIndex: 3
    },
    {
        question: "RAM is a type of volatile memory.",
        options: [
            "True",
            "False"
        ],
        answerIndex: 0
    }
];

export default function QuizLogic() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let currentIndex = 0;
        let answerLocked = false;

        const qNum = document.querySelector('.question-number');
        const qText = document.querySelector('.question-text');
        const next = document.querySelector('#next-btn');
        const choicesHolder = document.querySelector('#quiz-choices');
        const alphabet = ["A.", "B.", "C.", "D."];

        function loadQuestion() {
            const current = quiz_bank[currentIndex];
            answerLocked = false;

            if (qNum) {
                qNum.innerText = `QUESTION ${currentIndex + 1}`;
            }

            if (qText) {
                qText.innerText = current.question;
            }

            if (next) {
                next.style.display = 'none';
            }

            if (choicesHolder) {
                choicesHolder.innerHTML = '';

                current.options.forEach((optionText, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'quiz-option';

                    btn.innerHTML = `
                        <span class="option-letter">${alphabet[i]}</span>
                        <span class="option-text">${optionText}</span>
                    `;

                    btn.addEventListener('click', () => {
                        if (answerLocked) return;
                        answerLocked = true;

                        if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                        }

                        const allChoices = choicesHolder.querySelectorAll('.quiz-option');

                        allChoices.forEach((b, id) => {
                            b.classList.remove('active');
                            if (id === current.answerIndex) {
                                b.classList.add('correct');
                            } else if (id === i) {
                                b.classList.add('incorrect');
                            }
                        });

                        setTimeout(() => {
                            if (next) {
                                next.style.display = "block";
                                next.querySelector('.option-text').innerText = 
                                    currentIndex === quiz_bank.length - 1 ? "Restart Quiz ↺" : "Next Question →";
                            }
                        }, 600);
                    });
                    
                    choicesHolder.appendChild(btn);
                });
            }
        }

        if (next) {
            next.addEventListener('click', () => {
                if (currentIndex < quiz_bank.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                loadQuestion();
            });
        }

        loadQuestion();
    }, []);
}