import { useEffect } from "react";

import drum from "../assets/EvolutionRAM/Drum.png"
import magnetic from "../assets/EvolutionRAM/MagneticCore.png"
import matrix from "../assets/EvolutionRAM/MatrixCore.png"
import dram from "../assets/EvolutionRAM/DRAM.png"

const ramData = [
    {
        name: "Drum Memory",
        year: "1932",
        features: [
            "First widely adopted magnetic memory technology",
            "Allowed electronic computers to store significantly larger amounts of information than earlier mechanical methods"
            
        ],
        description: [
            "As electronic computers emerged in the early twentieth century, engineers needed faster memory than mechanical devices. This became one of the first practical forms of electronic main memory, crucial to early computer development."
        ],
        image: drum.src
    },
    {
        name: "Magnetic Core Memory",
        year: "1951",
        features: [
            "Direct access to individual memory locations",
            "Non-volatile storage",
            "Faster and more reliable than drum memory"
        ],
        description: [
            "It used thousands of tiny ferrite rings called magnetic cores to store information. It can represent a bit of information through changing the direction of magnetization within the ring. Its performance and durability outweighed the intensive labor of manufacturing it."
        ],
        image: magnetic.src
    },
    {
        name: "Matrix Core Memory",
        year: "1950s-1960s",
        features: [
            "Introduced a structured row-and-column organization of memory cells",
            "Improved scalability for larger memory systems",
            "Simplified memory addressing and access"
        ],
        description: [
            "Instead of accessing each magnetic core individually, the matrix arrangement allowed the computer to access a specific memory cell along the horizontal and vertical wires. This influenced the array-based organization still used in modern semiconductor memory."
        ],
        image: matrix.src
    },
    {
        name: "DRAM",
        year: "1970",
        features: [
            "Introduced the one-transistor, one-capacitor memory cell",
            "Greatly increased memory density while reducing manufacturing costs",
            "Became the standard technology for main system memory"
        ],
        description: [
            "In 1968, IBM engineer Robert H. Dennard invented the DRAM architecture which stores information as tiny electrical charges inside microscopic capacitors. The memory cannot retain its data while powered as these charges naturally leak away overtime."
        ],
        image: dram.src
    },
    {
        name: "MOS DRAM and EPROM",
        year: "Early 1970s",
        features: [
            "High-density semiconductor memory using MOS",
            "Reduced manufacturing costs while increasing memory capacity",
            "Introduced programmable firmware storage through EPROM"
        ],
        description: [
            
        ],
        image: dram.src
    },
];

export default function EvolutionLogic() {
    useEffect(() => {
        const scrollSection = document.querySelector("#the-evolution-of-ram .scroll-section");
        const leftBtn = document.querySelector("#the-evolution-of-ram .scroll-left");
        const rightBtn = document.querySelector("#the-evolution-of-ram .scroll-right");
        const buttons = scrollSection?.querySelectorAll(".evolution-button");

        if (!scrollSection || !leftBtn || !rightBtn || !buttons) return;

        let currentIndex = 0;

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

            const data = ramData[currentIndex];
            document.querySelector("#the-evolution-of-ram .evolution-name").textContent = data.name;
            document.querySelector("#the-evolution-of-ram .evolution-sides p").textContent = data.year;

            const featuresList = document.querySelector("#the-evolution-of-ram .evolution-features");
            featuresList.innerHTML = "";
            data.features.forEach(f => {
                const li = document.createElement("li");
                li.innerHTML = f;
                featuresList.appendChild(li);
            });

            const descBox = document.querySelector("#the-evolution-of-ram .evolution-sides:last-of-type");
            descBox.innerHTML = "<h3>Description</h3>";
            data.description.forEach(d => {
                const p = document.createElement("p");
                p.textContent = d;
                descBox.appendChild(p);
            });

            const img = document.querySelector("#the-evolution-of-ram .dram-image");
            img.src = data.image;
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