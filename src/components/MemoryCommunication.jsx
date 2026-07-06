// src/components/MemoryEvolution.jsx
import React, { useState } from 'react';

const generationsData = {
  SDRAM: {
    year: "1990s",
    title: "SDRAM",
    description: "Synchronized commands with the system clock, replacing older asynchronous memory to enable faster data retrieval and burst transfers.",
    url: "https://www.electronics-notes.com/articles/electronic_components/semiconductor-ic-memory/sdram-synchronous-dram-what-is.php"
  },
  DDR: {
    year: "2000",
    title: "DDR",
    description: "Transferred data on both the rising and falling edges of the clock signal, doubling the effective throughput over SDRAM.",
    url: "https://www.crucial.com/support/articles-faq-memory/differences-in-memory-speed-and-data-rate"
  },
  DDR2: {
    year: "2004",
    title: "DDR2",
    description: "Doubled bus speeds using an advanced 4-bit prefetch buffer while optimizing operational signaling and lowering overall power consumption.",
    url: "https://www.crucial.com/support/articles-faq-memory/differences-in-memory-speed-and-data-rate"
  },
  DDR3: {
    year: "2007",
    title: "DDR3",
    description: "Reduced operating voltages down to 1.5V and introduced an 8-bit prefetch buffer to greatly improve signal integrity and multi-core processing.",
    url: "https://www.crucial.com/support/articles-faq-memory/differences-in-memory-speed-and-data-rate"
  },
  DDR4: {
    year: "2014",
    title: "DDR4",
    description: "Increased bandwidth, density, and energy efficiency at lower operating voltages, making it the dominant standard for modern systems.",
    url: "https://www.corsair.com/us/en/explorer/diy-builder/memory/is-ddr5-better-than-ddr4/"
  },
  DDR5: {
    year: "2020",
    title: "DDR5",
    description: "Introduced on-DIMM power management, dual independent 32-bit channels, and on-die ECC to shatter data rate and efficiency limits.",
    url: "https://www.crucial.com/support/memory-speeds-compatability"
  }
};

export default function MemoryEvolution() {
  const [activeGen, setActiveGen] = useState("DDR4");

  return (
    <div className="memory-bottom">
      <section className="memory-evolution">
        <h3>MEMORY COMMUNICATION EVOLUTION</h3>
        <div className="generation-list">
          {Object.keys(generationsData).map((key) => {
            const gen = generationsData[key];
            const isActive = activeGen === key;

            return (
              <button
                key={key}
                type="button"
                className={`generation-card ${isActive ? 'active-generation' : ''}`}
                onClick={() => setActiveGen(key)}
              >
                <span>{gen.title}</span>
                <small>{gen.year}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="memory-details">
        <h3>MEMORY COMMUNICATION DETAILS</h3>
        
        <div className="details-top-row">
          <h2>{generationsData[activeGen].title}</h2>
          <p>{generationsData[activeGen].description}</p>
        </div>
        
        <div className="details-bottom-row">
          <a href={generationsData[activeGen].url} className="learn-more-link">
            Learn more about specifications
          </a>
        </div>
      </section>
    </div>
  );
}