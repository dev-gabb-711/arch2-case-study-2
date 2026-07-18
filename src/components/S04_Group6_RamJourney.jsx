import { useState } from 'react';
import cpuImg from '../assets/S04_Group6_InsideRAMImg/cpuImg.png';
import monitor from '../assets/S04_Group6_InsideRAMImg/monitor.png';
import pokeball from '../assets/S04_Group6_InsideRAMImg/pokeball.png';
import pokemonMini from '../assets/S04_Group6_InsideRAMImg/S04_Group6_pokemon-mini.png';

export default function RamJourney() {
  const stepsData = [
    {
      title: "CPU REQUEST",
      desc: "The CPU needs Pikachu's data! The CPU executes an instruction that would need a display, so it determines that it needs assets or data not currently available. The CPU’s integrated memory controller generates a read command accompanied by a specific physical memory address.",
      target: "cpu",
      hint: "CPU sends a raw data request with a physical address."
    },
    {
      title: "SYSTEM RAM FETCH",
      desc: "The read command travels to the System RAM to fetch Pikachu's data. The address is split into RAS and CAS signals. The row decoder activates the target wordline, and the column decoder selects the exact bits — Pikachu’s HP, Attack, and Speed — transferring them to the buffer.",
      target: "ram",
      hint: "RAM isolates, amplifies, and buffers the requested data bits."
    },
    {
      title: "CPU PROCESSING",
      desc: "The CPU receives Pikachu’s raw stats from RAM. It processes the data according to the running application logic, like calculating Pikachu’s Thunderbolt damage, and translates it into standardized graphics API commands for rendering.",
      target: "cpu",
      hint: "CPU translates raw RAM data into standard graphics API commands."
    },
    {
      title: "PCI EXPRESS TRANSPORT",
      desc: "The CPU sends Pikachu’s battle-ready data through PCIe lanes. Using DMA or MMIO, the command buffer and texture data (like Pikachu’s sprite) are delivered directly into the GPU’s VRAM.",
      target: "ram",
      hint: "Data travels through PCIe lanes directly into VRAM."
    },
    {
      title: "GPU EXECUTION",
      desc: "The GPU’s command processor fetches the instructions from VRAM and distributes the workload across its parallel computing pipelines, like Pikachu unleashing sparks in multiple directions, to begin rendering the frame.",
      target: "ram",
      hint: "GPU's parallel pipelines actively process instructions from VRAM."
    },
    {
      title: "PAGE FLIPPING",
      desc: "Once Pikachu’s frame is fully rendered in the Back Buffer, the system prepares to display it. The GPU waits for a sync signal, and a page flip occurs, making the Back Buffer the active Front Buffer. Pikachu’s sprite is now ready to appear on screen!",
      target: "ram",
      hint: "Back Buffer becomes the active Front Buffer via a fast page flip."
    },
    {
      title: "SIGNAL GENERATION",
      desc: "The GPU's Display Controller continuously scans the active Front Buffer in VRAM, pixel by pixel. It converts digital pixel data into a serialized stream of high-speed differential signals (like HDMI or DisplayPort).",
      target: "screen",
      hint: "Display Controller serializes frame buffer data into a video stream."
    },
    {
      title: "SCREEN DISPLAY",
      desc: "The serialized digital stream arrives at the monitor's input interface. Just as Pikachu’s Thunderbolt lights up the battlefield, the screen decodes these signals and illuminates pixels to reveal Pikachu’s sprite and stats to the player!",
      target: "screen",
      hint: "The monitor decodes signals to draw the final game frames on screen."
    }
  ];
    const [currentStep, setCurrentStep] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);

  const handleComponentClick = (component) => {
    if (
      component === stepsData[currentStep].target &&
      !missionComplete
    ) {
      setMissionComplete(true);
    }
  };
  const getPacketPosition = () => {
  const target = stepsData[currentStep].target;

  if (target === "cpu") return "packet-cpu";
  if (target === "ram") return "packet-ram";

  return "packet-screen";
};

  return (
    <div className="ram-journey-hud">
      {/* Header Tracker */}
      <div className="ram-journey-header">
        <div className="ram-journey-mission">
          <img src={pokeball.src} alt="" className="pokeball-icon" />MISSION: LOAD PIKACHU DATA
        </div>
        <div className="ram-journey-counter">
          STEP {currentStep + 1} / {stepsData.length}
        </div>
      </div>

      {/* 8 Circles Tracker */}
      <div className="ram-journey-tracker">
        {stepsData.map((_, index) => {
          let stepClass = "ram-journey-step";
          if (index === currentStep) stepClass += " active";
          else if (index < currentStep) stepClass += " completed";

          return (
            <div 
              key={index} 
              className={stepClass}
             onClick={() => {
          if(index <= currentStep){
            setCurrentStep(index);
            setMissionComplete(false);
          }
        }}
              style={{ cursor: 'pointer' }}
            >
              <div className="number">{index + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Main Screen Body (Hati sa Dalawa: Text sa Kaliwa, Visual sa Kanan) */}
      <div className="ram-journey-body">
        
        {/* KALIWA: Ang Text / Info Panel na hindi na matatakpan */}
        <div className="ram-journey-info">
          <div className="step-badge">STEP {currentStep + 1}</div>
          <div>
            <div className="status-label">STATUS</div>
            <div className="status-value">{stepsData[currentStep].title}</div>
          </div>
          <div className="desc">{stepsData[currentStep].desc}</div>
        </div>

        {/* KANAN: Ang Visual Monitor / Chips Block na mas maliit na ang lapad */}
        <div className="ram-journey-visual">
          <div className="ram-journey-visual-labels">
            <span>CPU</span>
            <span>RAM MODULE</span>
            <span>SCREEN</span>
          </div>

          <div className="ram-journey-track">
            <div
  className={`ram-journey-cpu ${
    stepsData[currentStep].target === "cpu" && !missionComplete
      ? "mission-target"
      : ""
  }`}
  onClick={() => handleComponentClick("cpu")}
>
              <img src={cpuImg.src} alt="CPU" className="cpu-pika" />
            </div>
            <div
      className={`ram-journey-chips ${stepsData[currentStep].target === "ram" && !missionComplete
      ? "mission-target"
      : ""}`}
  onClick={() => handleComponentClick("ram")}
>
              {stepsData.map((_, index) => (
                <div
                key={index}
                className={`ram-journey-chip ${currentStep >= index ? 'active' : ''}`}>
                </div>
              ))}
            </div>
           <div
  className={`ram-journey-screen
    ${currentStep === 7 ? "loaded" : ""}
    ${
      stepsData[currentStep].target === "screen" && !missionComplete
        ? "mission-target"
        : ""
    }
  `} onClick={() => handleComponentClick("screen")}
>
              <img src={monitor.src} alt="Screen" className="cpu-pika" />
            </div>
          <div className={`ram-journey-packet show ${getPacketPosition()}`}>
  <img src={pokemonMini.src} alt="Pikachu Data Packet" />
</div>
</div> {/* closes ram-journey-track */}

<div className="ram-journey-hint">
  {
    missionComplete
      ? `✓ ${stepsData[currentStep].title} completed`
      : (
          stepsData[currentStep].target === "cpu"
            ? "Awaiting CPU activation..."
            : stepsData[currentStep].target === "ram"
            ? "Awaiting memory response..."
            : "Awaiting display initialization..."
        )
  }
</div>

          <div className="ram-journey-controls">
            <button
                  onClick={() => {
        setCurrentStep((s) => Math.max(0, s - 1));
        setMissionComplete(false);
      }}
            disabled={currentStep === 0}
            >
              <span className="key">◀</span> BACK
              </button>
              <button
              className="primary"
              onClick={() => {
  setCurrentStep((s) =>
    Math.min(stepsData.length - 1, s + 1)
  );
  setMissionComplete(false);
}}
              disabled={currentStep === stepsData.length - 1 || !missionComplete}
              >
                NEXT <span className="key">▶</span>
                </button>
                </div>

        </div>

      </div>
    </div>
  );
}