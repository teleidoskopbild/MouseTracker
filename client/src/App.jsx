import { useState, useEffect } from "react";
import Pusher from "pusher-js";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Pusher initialisieren
  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    // Verbindung zu einem Channel und Event
    const channel = pusher.subscribe("mouse-channel");
    channel.bind("mouse-move", function (data) {
      console.log("Mausbewegung empfangen:", data);
      setMousePosition({ x: data.x, y: data.y });
    });

    return () => {
      pusher.unsubscribe("mouse-channel");
    };
  }, []);

  // Mausbewegungen erfassen und an den Server senden
  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Mausposition an den Server senden
    fetch("http://localhost:4001/api/mouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.error("Fehler:", err));
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove); // Clean up event listener
    };
  }, []);

  return (
    <div>
      <h1>Mouse Tracker</h1>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "lightgray",
        }}
      >
        {/* Mausposition des anderen Benutzers anzeigen */}
        <div
          style={{
            position: "absolute",
            left: `${mousePosition.x - 10}px`,
            top: `${mousePosition.y - 130}px`,
            width: "1px",
            height: "1px",
            borderLeft: "7px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "10px solid black",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {/* Pseudo-Mauszeiger */}
        </div>
      </div>
    </div>
  );
}

export default App;
