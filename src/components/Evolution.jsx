import { useEffect } from "react";

import drum from "../assets/EvolutionRAM/Drum.png"
import magnetic from "../assets/EvolutionRAM/MagneticCore.png"
import matrix from "../assets/EvolutionRAM/MatrixCore.png"
import dram from "../assets/EvolutionRAM/DRAM.png"
import mos from "../assets/EvolutionRAM/mos-dram-epron.jpg"
import sdram from "../assets/EvolutionRAM/sdram.png"
import edo from "../assets/EvolutionRAM/edo.png"
import drdram from "../assets/EvolutionRAM/drdram.png"
import ddr1 from "../assets/EvolutionRAM/ddr1.png"
import ddr2 from "../assets/EvolutionRAM/ddr2.png"
import ddr3 from "../assets/EvolutionRAM/ddr3.png"

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
        description: [ "This era marked the transition to practical semiconductor memory, replacing magnetic cores with MOS integrated circuits. This fabrication breakthrough birthed two complementary branches: high-density DRAM for temporary working memory, and EPROM for permanent, reusable firmware storage."
            
        ],
        image: mos.src
    },
    {
        name: "SDRAM",
        year: "1993",
        features: [
            "Aligned all operations with the system clock for precise coordination.",
            "Enabled high-performance features like burst transfers and pipelining.",
            "Eliminated unpredictable waiting times to accelerate data speeds."
        ],
        description: [ "SDRAM was a major milestone that abandoned the old asynchronous model to sync directly with the computer's system clock. This perfect harmony allowed the CPU and memory to coordinate seamlessly, drastically reducing delays and boosting data bandwidth."
            
        ],
        image: sdram.src
    },
    {
        name: "Extended Data Out DRAM (EDO DRAM)",
        year: "1994",
        features: [
            "Prepared the next memory access while the previous data was still transferring.",
            "Shortened waiting times between consecutive memory operations.",
            "Boosted system performance without requiring major hardware overhauls."
        ],
        description: [ "Developed in the early 1990s, EDO DRAM was an evolutionary upgrade designed to bridge the growing performance gap between fast processors and slower memory. It served as a vital transitional technology that boosted efficiency without requiring major architectural changes."
            
        ],
        image: edo.src
    },
    {
        name: "DRDRAM and PSRAM",
        year: "Late 1990s",
        features: [
            "DRDRAM used a narrow, ultra-fast channel for high-speed computing.",
            "PSRAM matched DRAM density with a simplified, auto-refreshing SRAM interface.",
            "Optimized specifically for power-sensitive mobile and embedded devices."
        ],
        description: [ "As performance demands spiked, the industry experimented with alternative designs to bypass traditional memory limits. This led to high-bandwidth DRDRAM for high-performance systems, and energy-efficient PSRAM for the booming portable and embedded electronics market."
            
        ],
        image: drdram.src
    },
    {
        name: "DDR SDRAM",
        year: "2000",
        features: [
            "Transferred data on both the rising and falling edges of the cycle.",
            "Doubled performance without needing higher clock frequencies.",
            "Maintained core synchronous principles to keep production costs low."
        ],
        description: [ "Arriving at the turn of the millennium, DDR revolutionized memory by transferring data on both the rising and falling edges of the clock cycle. This clever design effectively doubled performance and bandwidth without requiring expensive increases to the clock speed itself."
            
        ],
        image: ddr1.src
    },
    {
        name: "DDR2 SDRAM",
        year: "2003",
        features: [
            "Used wider internal buffers and higher frequencies for faster transfer rates.",
            "Cut down on electrical consumption and system heat generation.",
            "Supported larger capacities to handle demanding multitasking workloads."
        ],
        description: [ "Built to handle the multi-core processors of the mid-2000s, DDR2 scaled up memory performance while aggressively targeting power consumption. By introducing larger buffers and lower operating voltages, it delivered higher capacities with less heat."
            
        ],
        image: ddr2.src
    },
    {
        name: "DDR3 SDRAM",
        year: "2007",
        features: [
            "Delivered much higher transfer rates and module capacities than DDR2.",
            "Dropped voltages further to extend laptop battery life.",
            "Engineered specifically to handle intensive, multi-core computer workloads."
        ],
        description: [ "DDR3 arrived to support the modern era of high-definition multimedia, virtualization, and heavy multitasking. By further optimizing transfer speeds and lowering power limits, it became a highly reliable, long-lasting standard for both desktops and laptops."
            
        ],
        image: ddr3.src
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