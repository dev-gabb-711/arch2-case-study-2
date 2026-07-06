import { useEffect, useState } from "react";

export default function EvolutionLogic() {
    useEffect(() => {
        const scrollSection = document.querySelector("#the-evolution-of-ram .scroll-section");
        const leftBtn = document.querySelector("#the-evolution-of-ram .scroll-left");
        const rightBtn = document.querySelector("#the-evolution-of-ram .scroll-right");
        const buttons = scrollSection?.querySelectorAll(".evolution-button");

        if (!scrollSection || !leftBtn || !rightBtn || !buttons) return;

        let currentIndex = 0;
        const scrollAmount = 200;

        const updateHighlight = () => {
            buttons.forEach((btn, i) => {
                if (i === currentIndex) {
                    btn.classList.add('active');
                    const targetLeft = btn.offsetLeft - scrollSection.offsetLeft;
                    scrollSection.scrollTo({ left: targetLeft, behavior: "smooth" });
                } else {
                    btn.classList.remove('active');
                }
            })
        }

        const handleLeft = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateHighlight();
            }
        }

        const handleRight = () => {
            if (currentIndex < buttons.length - 1) {
                currentIndex++;
                updateHighlight();
            }
        }

        const handleClick = (e) => {
            const index = Array.from(buttons).indexOf(e.currentTarget)
            currentIndex = index;
            updateHighlight();
        }

        leftBtn.addEventListener("click", handleLeft);
        rightBtn.addEventListener("click", handleRight);
        buttons.forEach((btn) => {
            btn.addEventListener('click', handleClick)
        })

        updateHighlight();

        return () => {
            leftBtn.removeEventListener("click", handleLeft)
            rightBtn.removeEventListener("click", handleRight)
            buttons.forEach((btn) => {
                btn.removeEventListener("click", handleClick);
            });
        }
    }, []);

    return null;
}