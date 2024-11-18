import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  // Create ref for the card element
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // Skip if card element is not found
    if (!card) return;

    /**
     * Handles mouse movement over the card
     * @param {MouseEvent} e - Mouse event object
     */
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert position to percentage (-50 to 50)
      const xRotation = ((y - rect.height / 2) / rect.height) * -20;
      const yRotation = ((x - rect.width / 2) / rect.width) * 20;

      // Apply transform
      card.style.transform = `
        perspective(1000px)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    };

    /**
     * Resets card transform on mouse leave
     */
    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0)
        rotateY(0)
        scale3d(1, 1, 1)
      `;
    };

    // Add event listeners
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="App">
      <div className="card" ref={cardRef}>
        <div className="card-gradient">
          {/* Header with bank name and logo */}
          <div className="card-header">
            <span className="bank-name">ADRBank</span>
            <div className="bank-logo">
              {/* Simple placeholder logo */}
              <svg viewBox="0 0 32 32" fill="white">
                <circle cx="16" cy="16" r="16" />
              </svg>
            </div>
          </div>

          {/* Card number */}
          <div className="card-number">4242 4242 4242 4242</div>

          {/* Card holder and expiry info */}
          <div className="card-footer">
            <div className="holder-info">
              <span className="label">Card Holder Name</span>
              <span className="value">HILLERY NEVELIN</span>
            </div>
            <div className="expiry-info">
              <span className="label">Expired Date</span>
              <span className="value">10/28</span>
            </div>
            <div className="card-type">
              {/* Mastercard logo placeholder */}
              <div className="mastercard-logo">
                <div className="circle red"></div>
                <div className="circle yellow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
