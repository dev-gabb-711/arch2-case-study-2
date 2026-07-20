import React, { useState, Fragment } from 'react';

// --- DATA STRUCTURES ---

const generationsData = {
  SDRAM: {
    year: "1990s",
    title: "SDRAM",
    description: "Synchronized commands with the system clock, replacing older asynchronous memory to enable faster data retrieval and burst transfers.",
    url: "https://www.electronics-notes.com/articles/electronic_components/semiconductor-ic-memory/sdram-synchronous-dram-what-is.php",
    delay: 1500 // Legacy SDRAM is visually much slower
  },
  DDR: {
    year: "2000",
    title: "DDR",
    description: "Transferred data on both the rising and falling edges of the clock signal, doubling the effective throughput over SDRAM.",
    url: "https://www.crucial.com/support/articles-faq-memory/differences-in-memory-speed-and-data-rate",
    delay: 1000
  },
  DDR2: {
    year: "2004",
    title: "DDR2",
    description: "Doubled bus speeds using an advanced 4-bit prefetch buffer while optimizing operational signaling and lowering overall power consumption.",
    url: "https://www.crucial.com/support/articles-faq-memory/differences-in-memory-speed-and-data-rate",
    delay: 850
  },
  DDR3: {
    year: "2007",
    title: "DDR3",
    description: "Reduced operating voltages down to 1.5V and introduced an 8-bit prefetch buffer to greatly improve signal integrity and multi-core processing.",
    url: "https://www.crucial.com/support/articles-faq-memory/differences-in-memory-speed-and-data-rate",
    delay: 650
  },
  DDR4: {
    year: "2014",
    title: "DDR4",
    description: "Increased bandwidth, density, and energy efficiency at lower operating voltages, making it the dominant standard for modern systems.",
    url: "https://www.corsair.com/us/en/explorer/diy-builder/memory/is-ddr5-better-than-ddr4/",
    delay: 450
  },
  DDR5: {
    year: "2020",
    title: "DDR5",
    description: "Introduced on-DIMM power management, dual independent 32-bit channels, and on-die ECC to shatter data rate and efficiency limits.",
    url: "https://www.crucial.com/support/memory-speeds-compatability",
    delay: 250
  }
};

const basePokemon = [
  { name: "Bulbasaur", hp: 45, atk: 49, def: 49 },
  { name: "Ivysaur", hp: 60, atk: 62, def: 63 },
  { name: "Venusaur", hp: 80, atk: 82, def: 83 },
  { name: "Charmander", hp: 39, atk: 52, def: 43 },
  { name: "Charmeleon", hp: 58, atk: 64, def: 58 },
  { name: "Charizard", hp: 78, atk: 84, def: 78 },
  { name: "Squirtle", hp: 44, atk: 48, def: 65 },
  { name: "Wartortle", hp: 59, atk: 63, def: 80 },
  { name: "Blastoise", hp: 79, atk: 83, def: 100 },
  { name: "Caterpie", hp: 45, atk: 30, def: 35 },
  { name: "Metapod", hp: 50, atk: 20, def: 55 },
  { name: "Butterfree", hp: 60, atk: 45, def: 50 },
  { name: "Weedle", hp: 40, atk: 35, def: 30 },
  { name: "Kakuna", hp: 45, atk: 25, def: 50 },
  { name: "Beedrill", hp: 65, atk: 90, def: 40 }
];

const generateMemoryGrid = () => {
  const memoryGrid = [];
  let currentAddress = 0x8000; 

  for (let r = 0; r < 5; r++) {
    const row = [];
    for (let c = 0; c < 12; c++) {
      const pokemonIndex = (r * 3) + Math.floor(c / 4);
      const statIndex = c % 4;
      const pokemon = basePokemon[pokemonIndex];

      let cellData;
      let dataType;

      switch (statIndex) {
        case 0: cellData = pokemon.name; dataType = 'NAME'; break;
        case 1: cellData = `HP:${pokemon.hp}`; dataType = 'HP'; break;
        case 2: cellData = `ATK:${pokemon.atk}`; dataType = 'ATK'; break;
        case 3: cellData = `DEF:${pokemon.def}`; dataType = 'DEF'; break;
      }

      row.push({
        rowId: r,
        colId: c,
        address: `0x${currentAddress.toString(16).toUpperCase()}`,
        data: cellData,
        type: dataType
      });
      currentAddress += 0x04;
    }
    memoryGrid.push(row);
  }
  return memoryGrid;
};

// --- REACT COMPONENT ---

const MemoryCommunication = () => {
  const [ras, setRas] = useState(null);
  const [cas, setCas] = useState(null);
  const [isAccessing, setIsAccessing] = useState(false);
  const [activeGen, setActiveGen] = useState("DDR4");

  const memoryGrid = generateMemoryGrid();
  
  const selectedCell = (ras !== null && cas !== null && !isAccessing) ? memoryGrid[ras][cas] : null;
  
  let currentOperation = 'IDLE';
  if (isAccessing) {
    currentOperation = 'READING...';
  } else if (selectedCell) {
    currentOperation = 'READ';
  } else if (ras !== null) {
    currentOperation = 'PENDING';
  }

  const handleGenerationClick = (genName) => {
    setActiveGen(genName);
    setRas(null);
    setCas(null);
  };

  const triggerCasStrobe = (targetColumn) => {
    setIsAccessing(true);
    
    // Fetch the specific latency config based on selected generation
    const generationLatency = generationsData[activeGen].delay;

    setTimeout(() => {
      setCas(targetColumn);
      setIsAccessing(false);
    }, generationLatency);
  };

  return (
    <Fragment>
      
      {/* =========================================
          TOP: MEMORY GRID & OUTPUT WINDOWS
          ========================================= */}
      <div className="memory-middle">
        
        {/* Left Side: Grid Layout */}
        <div className="memory-grid-area">
          <div className="memory-grid-header">
            <span></span>
            {Array.from({ length: 12 }).map((_, c) => (
              <span 
                key={`col-label-${c}`}
                className={cas === c ? 'active-column' : ''}
                onClick={() => {
                  if (ras !== null && cas === null && !isAccessing) {
                    triggerCasStrobe(c);
                  }
                }}
                style={{ 
                  cursor: (ras !== null && cas === null && !isAccessing) ? 'pointer' : 'not-allowed',
                  opacity: (ras !== null && cas === null && !isAccessing) ? 1 : 0.6
                }}
              >
                C{c}
              </span>
            ))}
          </div>

          <div 
            className="memory-grid"
            style={{
              cursor: isAccessing ? 'wait' : 'default'
            }}
          >
            {memoryGrid.map((row, r) => (
              <Fragment key={`row-${r}`}>
                <span 
                  className={`row-label ${ras === r ? 'active-row' : ''}`}
                  onClick={() => {
                    if (!isAccessing) {
                      setRas(r);
                      setCas(null);
                    }
                  }}
                  style={{ cursor: isAccessing ? 'not-allowed' : 'pointer' }}
                >
                  R{r}
                </span>

                {row.map((cell, c) => {
                  const isSelectedCell = ras === r && cas === c;
                  const isActiveRow = ras === r && !isSelectedCell;
                  const isActiveCol = cas === c && !isSelectedCell;

                  let cellClass = "memory-cell";
                  if (isSelectedCell) cellClass += " selected-cell";
                  if (isActiveRow) cellClass += " active-row";
                  if (isActiveCol) cellClass += " active-column";

                  return (
                    <div 
                      key={cell.address}
                      className={cellClass}
                      onClick={() => {
                        if (isAccessing) return;

                        if (ras === r && cas === null) {
                          triggerCasStrobe(c);
                        } else {
                          setRas(r);
                          setCas(null);
                        }
                      }}
                      title={`Address: ${cell.address} | Data: ${cell.data}`}
                    >
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>

          <div className="memory-step">
            Click any cell to see how RAS (row) and CAS (column) addresses split to target data in the matrix.
          </div>
        </div>

        {/* Right Side: Output Windows */}
        <div className="memory-output">
          <div className="memory-card cpu-request">
            <h3>CPU REQUEST</h3>
            <div className="request-item">
              <span>Operation</span>
              <strong>{currentOperation}</strong>
            </div>
            <div className="request-item">
              <span>Address</span>
              <strong>{selectedCell ? selectedCell.address : (isAccessing ? 'BUSY...' : '[UNINITIALIZED]')}</strong>
            </div>
            <div className="request-item">
              <span>Data</span>
              <strong>{selectedCell ? selectedCell.data : (isAccessing ? 'FETCHING...' : '[UNIDENTIFIED]')}</strong>
            </div>
          </div>

          <div className="memory-card">
            <h3>CURRENT SELECTION</h3>
            <p>
              <strong>Row:</strong> {ras !== null ? `R${ras}` : 'R'}
              {ras !== null && !isAccessing && (
                <span 
                  onClick={() => { setRas(null); setCas(null); }} 
                  style={{ cursor: 'pointer', paddingLeft: '5px' }}
                >
                </span>
              )}
              <strong> Col:</strong> {cas !== null ? `C${cas}` : (isAccessing ? '...' : 'C')}
              {cas !== null && !isAccessing && (
                <span 
                  onClick={() => setCas(null)} 
                  style={{ cursor: 'pointer', paddingLeft: '5px' }}
                >
                </span>
              )}
            </p>
            <p>
              <strong>Payload:</strong> {selectedCell ? selectedCell.data : (isAccessing ? 'BUSY' : '[DATA]')}
            </p>
          </div>
        </div>

      </div>

      {/* =========================================
          MIDDLE: INFO SECTION
          ========================================= */}
      <div className="memory-info">
        <div className="memory-card">
          <h3>HOW MEMORY ACCESS WORKS</h3>
          <p>
            DRAM stores data in a grid of rows and columns. To access a memory location, the controller first selects the row using <strong>RAS</strong>, then the column using <strong>CAS</strong>. This two-step process reduces hardware complexity while allowing fast access to the requested data.
          </p>
          <div className="info-split">
            <div className="info-split-item">
              <h4>RAS (Row Access Strobe)</h4>
              <p>RAS activates the row containing the requested data. Once the row is open, it remains ready for the column to be selected.</p>
              <p><strong>Purpose:</strong> Opens the correct memory row for access.</p>
            </div>
            <div className="info-split-item">
              <h4>CAS (Column Access Strobe)</h4>
              <p>CAS selects the correct column within the active row and retrieves the data stored at their intersection.</p>
              <p><strong>Purpose:</strong> Selects the exact memory cell within the active row.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM: DDR EVOLUTION BUTTONS
          ========================================= */}
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
                  onClick={() => handleGenerationClick(key)}
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
            <a href={generationsData[activeGen].url} className="learn-more-link" target="_blank" rel="noopener noreferrer">
              Learn more about specifications
            </a>
          </div>
        </section>
      </div>

    </Fragment>
  );
};

export default MemoryCommunication;