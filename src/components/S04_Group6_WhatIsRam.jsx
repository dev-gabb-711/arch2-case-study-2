import { useEffect, useRef, useState } from "react";

import chapter1 from "../assets/S04_Group6_gameboy.png";
import chapter2 from "../assets/S04_Group6_Chapter2.png";
import chapter3 from "../assets/S04_Group6_Chapter3.png";
import chapter4 from "../assets/S04_Group6_Chapter4.png";
import chapter5 from "../assets/S04_Group6_Chapter5.png";
import chapter6 from "../assets/S04_Group6_Chapter6.png";
import chapter7 from "../assets/S04_Group6_Chapter7.png";
import chapter8 from "../assets/S04_Group6_Chapter8.png";


const ramTopics = [
  {
    id: "what-is-ram",
    number: "01",
    chapterLabel: "CHAPTER 01",
    title: "What Is RAM?",
    visualLabel: "INTRODUCTION TO WORKING MEMORY",

    paragraphs: [
      "Random Access Memory, or RAM, is the computer’s primary working memory. It temporarily stores the programs, instructions, and data that the CPU is actively using, giving the processor much faster access than long-term storage devices such as SSDs and HDDs.",

      "A useful example is the original Nintendo Game Boy. Its compact hardware still required memory to process instructions, respond to button presses, update the display, and preserve active game information while the system was operating.",
    ],

    takeaway:
      "RAM keeps the information needed right now close to the processor.",

    sideTitle: "GAME BOY SYSTEM SNAPSHOT",

    sideIntro:
      "The Game Boy demonstrates how a small computer can combine processing, temporary memory, and permanent game storage inside a portable system.",

    specs: [
      {
        label: "System-on-Chip",
        value: "DMG-CPU",
      },
      {
        label: "CPU Core",
        value: "Sharp SM83",
      },
      {
        label: "CPU Design",
        value: "Z80 / Intel 8080 Hybrid",
      },
      {
        label: "Clock Speed",
        value: "~4.19 MHz",
      },
      {
        label: "Game Pak",
        value: "ROM with optional save RAM",
      },
      {
        label: "Early Game Size",
        value: "Up to 32 KB",
      },
    ],

    image: chapter1.src,
    imageAlt:
      "Nintendo Game Boy used as an example of a compact computer system",
    imageCaption: "NINTENDO GAME BOY",
    imageClass: "view-full",
  },

  {
    id: "random-access",
    number: "02",
    chapterLabel: "CHAPTER 02",
    title: "Why Is It Called Random Access?",
    visualLabel: "DIRECT MEMORY ADDRESSING",

    paragraphs: [
      "The term random access does not mean that RAM retrieves information unpredictably. It means the CPU can directly access any memory location in approximately the same amount of time, regardless of where that location appears inside the memory chip.",

      "Every location has a unique memory address. Instead of searching through all previously stored values, the processor specifies the required address and immediately reads or updates the information stored there.",
    ],

    takeaway:
      "The CPU retrieves data by address, not by searching through memory one item at a time.",

    sideTitle: "LIBRARY ANALOGY",

    sideIntro:
      "Memory addressing works like locating a book in an organized library.",

    points: [
      "Each book has a known location.",
      "The requested address identifies the target.",
      "The CPU goes directly to that location.",
      "Earlier memory values do not need to be checked first.",
    ],

    image: chapter2.src,
    imageAlt:
      "Placeholder illustration for direct memory access and memory addresses",
    imageCaption: "MEMORY ADDRESSING",
    imageClass: "view-controls",
  },

  {
    id: "ram-workspace",
    number: "03",
    chapterLabel: "CHAPTER 03",
    title: "RAM as the Computer’s Workspace",
    visualLabel: "ACTIVE PROGRAM DATA",

    paragraphs: [
      "RAM can be compared to an office desk. Permanent storage acts like a filing cabinet containing every available document, while RAM holds only the materials required for the current task. The CPU works with this readily available information instead of repeatedly retrieving it from slower storage.",

      "A larger workspace allows more programs, files, and operating-system data to remain available simultaneously. This reduces repeated transfers from storage and improves multitasking, application switching, and performance in memory-intensive programs.",
    ],

    takeaway:
      "More RAM provides a larger workspace, but RAM does not permanently store files.",

    sideTitle: "WORKSPACE ANALOGY",

    sideIntro:
      "The three main components have different roles during program execution.",

    comparisons: [
      {
        label: "CPU",
        value: "Office worker",
      },
      {
        label: "RAM",
        value: "Office desk",
      },
      {
        label: "SSD / HDD",
        value: "Filing cabinet",
      },
    ],

    image: chapter3.src,
    imageAlt:
      "Placeholder illustration for RAM as a temporary computer workspace",
    imageCaption: "ACTIVE WORKSPACE",
    imageClass: "view-controls",
  },

  {
    id: "volatile-memory",
    number: "04",
    chapterLabel: "CHAPTER 04",
    title: "Volatile Memory",
    visualLabel: "POWER-DEPENDENT STORAGE",

    paragraphs: [
      "RAM is volatile memory, meaning it requires a continuous supply of electrical power to preserve its contents. While the computer is running, electrical states inside the memory cells represent active data. Once power is removed, those states disappear and the stored information is lost.",

      "This is why unsaved documents, running applications, temporary game data, and other active information disappear after shutdown or a power interruption. Important information must be written to non-volatile storage before power is removed.",
    ],

    takeaway:
      "No power means no retained data in RAM.",

    sideTitle: "WHAT CAN DISAPPEAR?",

    sideIntro:
      "These forms of information commonly exist temporarily in RAM.",

    points: [
      "Unsaved documents",
      "Running applications",
      "Temporary game states",
      "Browser and operating-system data",
      "Intermediate calculation results",
    ],

    image: chapter4.src,
    imageAlt:
      "Placeholder illustration explaining volatile memory and power loss",
    imageCaption: "VOLATILE MEMORY",
    imageClass: "view-power",
  },

  {
    id: "computer-memory",
    number: "05",
    chapterLabel: "CHAPTER 05",
    title: "How Computer Memory Stores Information",
    visualLabel: "BITS, BYTES, AND ADDRESSES",

    paragraphs: [
      "Computer memory stores program instructions and data digitally using bits. Each bit represents either a 0 or a 1, and groups of eight bits form a byte. Text, images, sound, video, variables, and program instructions are ultimately represented using combinations of these binary values.",

      "Memory addresses organize these values so the CPU can locate them efficiently. A programming variable such as health, level, or score is ultimately stored at a physical memory location that the processor continuously reads and updates while the program runs.",
    ],

    takeaway:
      "Variables in software become binary values stored at specific memory addresses.",

    sideTitle: "MEMORY EXAMPLE",

    sideIntro:
      "A game can associate each value with its own location in memory.",

    memoryRows: [
      {
        address: "1000",
        value: "Player HP = 80",
      },
      {
        address: "1001",
        value: "Player Level = 12",
      },
      {
        address: "1002",
        value: "Player Gold = 950",
      },
    ],

    image: chapter5.src,
    imageAlt:
      "Placeholder illustration for bits, bytes, variables, and memory addresses",
    imageCaption: "MEMORY ORGANIZATION",
    imageClass: "view-screen",
  },

  {
    id: "bus-communication",
    number: "06",
    chapterLabel: "CHAPTER 06",
    title: "How the CPU Communicates with RAM",
    visualLabel: "ADDRESS, DATA, AND CONTROL BUSES",

    paragraphs: [
      "The CPU and RAM communicate through electrical pathways called system buses. The address bus identifies the memory location, the data bus carries the actual information, and the control bus specifies whether the operation is a read, write, enable, or refresh operation.",

      "During a memory read, the CPU places an address on the address bus and sends a Read signal through the control bus. RAM locates the requested information and returns it to the processor through the data bus.",
    ],

    takeaway:
      "The buses answer three questions: Where? What? And what operation should be performed?",

    sideTitle: "THE THREE SYSTEM BUSES",

    sideIntro:
      "All three buses must cooperate during every memory transaction.",

    comparisons: [
      {
        label: "Address Bus",
        value: "Where is the data?",
      },
      {
        label: "Data Bus",
        value: "What value is transferred?",
      },
      {
        label: "Control Bus",
        value: "Read, write, enable, or refresh?",
      },
    ],

    image: chapter6.src,
    imageAlt:
      "Placeholder illustration for communication between the CPU and RAM",
    imageCaption: "CPU ↔ RAM COMMUNICATION",
    imageClass: "view-controls",
  },

  {
    id: "von-neumann",
    number: "07",
    chapterLabel: "CHAPTER 07",
    title: "The Von Neumann Architecture",
    visualLabel: "FETCH, DECODE, AND EXECUTE",

    paragraphs: [
      "The Von Neumann Architecture stores program instructions and data together in main memory. The CPU repeatedly retrieves instructions from RAM, interprets them, performs the required operation, and stores updated values when necessary.",

      "This process is known as the Fetch–Decode–Execute Cycle. It repeats continuously while the computer is running, allowing the processor to execute programs and respond to user input at extremely high speeds.",
    ],

    takeaway:
      "RAM supplies the instructions and data that keep the processor’s execution cycle moving.",

    sideTitle: "EXECUTION CYCLE",

    sideIntro:
      "Every running program depends on the same repeating sequence.",

    sequence: [
      {
        step: "01",
        label: "Fetch",
        description: "Retrieve the next instruction from memory.",
      },
      {
        step: "02",
        label: "Decode",
        description: "Determine what the instruction requires.",
      },
      {
        step: "03",
        label: "Execute",
        description: "Perform the operation and update data.",
      },
      {
        step: "04",
        label: "Repeat",
        description: "Continue with the next instruction.",
      },
    ],

    image: chapter7.src,
    imageAlt:
      "Placeholder illustration for the Von Neumann Architecture and CPU cycle",
    imageCaption: "FETCH–DECODE–EXECUTE",
    imageClass: "view-controls",
  },

  {
    id: "ram-versus-rom",
    number: "08",
    chapterLabel: "CHAPTER 08",
    title: "RAM vs. ROM",
    visualLabel: "TEMPORARY AND PERMANENT MEMORY",

    paragraphs: [
      "RAM and ROM are both forms of computer memory, but they serve different purposes. RAM is volatile, fast, and continuously read from and written to while programs are running. ROM is non-volatile and retains the firmware needed to initialize the computer even when power is removed.",

      "During startup, firmware stored in ROM checks and prepares the hardware, locates the operating system on permanent storage, and loads it into RAM. ROM enables the computer to begin operating, while RAM becomes the active workspace used by the CPU.",
    ],

    takeaway:
      "ROM starts the computer; RAM gives it a workspace in which to run programs.",

    sideTitle: "RAM AND ROM",

    sideIntro:
      "The two memory types complement one another rather than compete.",

    comparisonTable: [
      {
        feature: "Purpose",
        ram: "Active programs and data",
        rom: "Firmware and startup instructions",
      },
      {
        feature: "Power Loss",
        ram: "Data is erased",
        rom: "Data is retained",
      },
      {
        feature: "Operation",
        ram: "Frequently read and written",
        rom: "Primarily read",
      },
      {
        feature: "Role",
        ram: "Working memory",
        rom: "System initialization",
      },
    ],

    image: chapter8.src,
    imageAlt:
      "Placeholder illustration comparing RAM and ROM",
    imageCaption: "RAM VS. ROM",
    imageClass: "view-full",
  },
];

function TopicSidePanel({ topic }) {
  return (
    <div className="what-topic-panel">
      <div className="what-topic-panel-header">
        <h3>{topic.sideTitle}</h3>
      </div>

      {topic.sideIntro && (
        <p className="what-topic-panel-intro">{topic.sideIntro}</p>
      )}

      {topic.specs && (
        <div className="what-specs-box">
          <div className="what-specs-box-heading">
            <span>DEVICE SPECIFICATIONS</span>
            <strong>DMG-01</strong>
          </div>

          <dl className="what-specs-list">
            {topic.specs.map((spec) => (
              <div className="what-spec-row" key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {topic.points && (
        <ul className="what-topic-points">
          {topic.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      {topic.comparisons && (
        <div className="what-topic-comparisons">
          {topic.comparisons.map((item) => (
            <div className="what-topic-comparison" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      )}

      {topic.memoryRows && (
        <div className="what-memory-table">
          <div className="what-memory-table-header">
            <span>ADDRESS</span>
            <span>STORED VALUE</span>
          </div>

          {topic.memoryRows.map((row) => (
            <div className="what-memory-row" key={row.address}>
              <code>{row.address}</code>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {topic.sequence && (
        <div className="what-sequence">
          {topic.sequence.map((item) => (
            <div className="what-sequence-step" key={item.step}>
              <span>{item.step}</span>

              <div>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {topic.comparisonTable && (
        <div className="what-comparison-table">
          <div className="what-comparison-header">
            <span>FEATURE</span>
            <strong>RAM</strong>
            <strong>ROM</strong>
          </div>

          {topic.comparisonTable.map((row) => (
            <div className="what-comparison-row" key={row.feature}>
              <span>{row.feature}</span>
              <p>{row.ram}</p>
              <p>{row.rom}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WhatIsRam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    stepRefs.current.forEach((step, index) => {
      if (!step) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          threshold: 0.2,
          rootMargin: "-38% 0px -38% 0px",
        }
      );

      observer.observe(step);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  const activeTopic = ramTopics[activeIndex];

  return (
    <div className="what-scroll-section">
      <header className="what-scroll-header">
        <div className="what-scroll-header-line">
          <span className="what-scroll-section-number">
            SECTION 01
          </span>
        </div>

        <h2 className="glow-title">
          UNDERSTANDING RAM
        </h2>

        <div className="what-scroll-active-chapter">
          <span>{activeTopic.chapterLabel}</span>
          <p>{activeTopic.title}</p>
        </div>
      </header>

      <div className="what-scroll-content">

        {/* LEFT: lecture text */}
        <div className="what-scroll-left">

          {ramTopics.map((topic, index) => (
            <article
              key={topic.id}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              className={`what-scroll-step ${
                activeIndex === index ? "is-active" : ""
              }`}
            >
              <div className="what-scroll-step-copy">

                <span className="what-scroll-chapter-label">
                  {topic.chapterLabel}
                </span>

                <h3>
                  {topic.title}
                </h3>

                <div className="what-scroll-paragraphs">
                  {topic.paragraphs.map(
                    (paragraph, paragraphIndex) => (
                      <p key={`${topic.id}-${paragraphIndex}`}>
                        {paragraph}
                      </p>
                    )
                  )}
                </div>

                <div className="what-scroll-takeaway">
                  <span>
                    KEY TAKEAWAY
                  </span>

                  <strong>
                    {topic.takeaway}
                  </strong>
                </div>

              </div>
            </article>
          ))}

        </div>

        {/* CENTER: active chapter image */}
        <div className="what-scroll-center">
          <div className="what-scroll-center-sticky">

            <div className="what-scroll-visual">

              <div className="what-scroll-image-glow"></div>

              <div className="what-scroll-scan-ring ring-one"></div>
              <div className="what-scroll-scan-ring ring-two"></div>
              <div className="what-scroll-scan-ring ring-three"></div>

              <img
                key={activeTopic.id}
                src={activeTopic.image}
                alt={activeTopic.imageAlt}
                className={`what-scroll-gameboy ${activeTopic.imageClass}`}
              />

              <div className="what-scroll-floor-grid"></div>

            </div>

          </div>
        </div>

        {/* RIGHT: dynamic supporting notes */}
        <aside className="what-scroll-right">
          <div className="what-scroll-right-sticky">

            <TopicSidePanel topic={activeTopic} />

            <div className="what-scroll-progress">
              <span>
                CHAPTER{" "}
                {String(activeIndex + 1).padStart(2, "0")} OF{" "}
                {String(ramTopics.length).padStart(2, "0")}
              </span>

              <div className="what-scroll-progress-track">
                <div
                  className="what-scroll-progress-fill"
                  style={{
                    width: `${
                      ((activeIndex + 1) / ramTopics.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}