import { useState } from 'react';

export default function RamJourney() {
  const stepsData = [
    {
      title: "CPU REQUEST",
      desc: "The CPU executes an instruction that would need a display, so it determines that it needs assets or data not currently available. The CPU’s integrated memory controller generates a read command accompanied by a specific physical memory address.",
      hint: "CPU sends a raw data request with a physical address."
    },
    {
      title: "SYSTEM RAM FETCH",
      desc: "The read command travels to the System RAM. The address is split into RAS and CAS signals. The row decoder activates the target wordline in the memory matrix. The column decoder selects the specific data bits, transferring them to the data buffer.",
      hint: "RAM isolates, amplifies, and buffers the requested data bits."
    },
    {
      title: "CPU PROCESSING",
      desc: "The CPU receives the raw data from the System RAM, processes it according to the running application logic, and determines the changes required for the display. It translates these into a standardized graphics API command stream.",
      hint: "CPU translates raw RAM data into standard graphics API commands."
    },
    {
      title: "PCI EXPRESS TRANSPORT",
      desc: "The CPU triggers a DMA transfer or uses Memory-Mapped I/O (MMIO) to send the command buffer and necessary vertex/texture data across the PCI Express (PCIe) directly to the dedicated GPU's Video RAM.",
      hint: "Data travels through PCIe lanes directly into VRAM."
    },
    {
      title: "GPU EXECUTION",
      desc: "The GPU’s command processor fetches the instructions from VRAM and distributes the workload across its parallel computing pipelines to begin rendering the frame.",
      hint: "GPU's parallel pipelines actively process instructions from VRAM."
    },
    {
      title: "PAGE FLIPPING",
      desc: "Once the entire frame is fully rendered in the Back Buffer, the system prepares to display it. The GPU waits for a sync signal, and a page flip occurs, making the Back Buffer the active Front Buffer.",
      hint: "Back Buffer becomes the active Front Buffer via a fast page flip."
    },
    {
      title: "SIGNAL GENERATION",
      desc: "The GPU's Display Controller continuously scans the active Front Buffer in VRAM, pixel by pixel. It converts digital pixel data into a serialized stream of high-speed differential signals (like HDMI or DisplayPort).",
      hint: "Display Controller serializes frame buffer data into a video stream."
    },
    {
      title: "SCREEN DISPLAY",
      desc: "The serialized digital stream arrives at the monitor's input interface. The screen decodes these signals, lighting up individual pixels to visually reveal the final rendered output to the player.",
      hint: "The monitor decodes signals to draw the final game frames on screen."
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="ram-journey-hud">
      {/* Header Tracker */}
      <div className="ram-journey-header">
        <div className="ram-journey-mission">MEMORY FETCH</div>
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
              onClick={() => setCurrentStep(index)}
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
            <span>RAM</span>
            <span>SCREEN</span>
          </div>

          <div className="ram-journey-track">
            <div className="ram-journey-cpu">CPU</div>
            <div className="ram-journey-chips">
              <div className={`ram-journey-chip ${currentStep >= 1 ? 'active' : ''}`}></div>
              <div className={`ram-journey-chip ${currentStep >= 3 ? 'active' : ''}`}></div>
              <div className={`ram-journey-chip ${currentStep >= 4 ? 'active' : ''}`}></div>
              <div className={`ram-journey-chip ${currentStep >= 6 ? 'active' : ''}`}></div>
            </div>
            <div className="ram-journey-screen">
              {currentStep === 7 ? "🎮✨" : "🎮"} 
              {/* //Placeholder muna yan delete this kapag babaguhin na */}
            </div>
            <div className="ram-journey-packet show"></div>
          </div>

          <div className="ram-journey-hint">
            {stepsData[currentStep].hint}
          </div>
        </div>

      </div>
    </div>
  );
}