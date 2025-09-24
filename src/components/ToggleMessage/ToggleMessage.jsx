import { useState } from "react";

export default function ToggleMessage() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button aria-pressed={show} onClick={() => setShow((s) => !s)}>
        {show ? "Ocultar saludo" : "Mostrar saludo"}
      </button>

      {show && <h2>¡Hola!</h2>}
    </div>
  );
}
