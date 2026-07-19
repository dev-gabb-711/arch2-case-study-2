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
        question: "The memory stores program instructions and data digitally using packets.",
        options: [
            "True",
            "False"
        ],
        answerIndex: 1
    },
    {
        question: "The process that lets the CPU perform a sequence of operations is called ________.",
        options: [
            "Go-Grow-Glow Cycle",
            "Discover-Offer-Request-Acknowledge Cycle",
            "Read-Write-Update Cycle",
            "Fetch-Decode-Execute Cycle"
        ],
        answerIndex: 3
    },
    {
        question: "The RAM is a device that forwards data packets between computer networks.",
        options: [
            "True",
            "False"
        ],
        answerIndex: 1
    },
    {
        question: "All of the choices are part of Von Neumann Architecture, except:",
        options: [
            "CPU",
            "Memory Unit",
            "Input Device",
            "Switching Fabric"
        ],
        answerIndex: 3
    },
    {
        question: "This is a type of memory that stores information magnetically on the surface of a metal cylinder.",
        options: [
            "Magnetic Core Memory",
            "Fiber Optic Memory",
            "Drum Memory",
            "Matrix Core Memory"
        ],
        answerIndex: 2
    },
    {
        question: "The RAM gives the computer a workspace to run programs.",
        options: [
            "True",
            "False"
        ],
        answerIndex: 0
    },
    {
        question: "This is a type of bus which identifies the memory location of a data",
        options: [
            "Data Bus",
            "Forwarding Bus",
            "Address Bus",
            "Control Bus"
        ],
        answerIndex: 2
    },
    {
        question: "The CPU has to request for the data in the memory first if it is not available in its registers.",
        options: [
            "True",
            "False"
        ],
        answerIndex: 0
    },
    {
        question: "In the DRAM, the controller selects CAS first before RAS to access the correct row and column memory cell.",
        options: [
            "True",
            "False"
        ],
        answerIndex: 1
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