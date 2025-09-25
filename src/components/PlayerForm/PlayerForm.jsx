import { useState } from "react";

export default function PlayerForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    const n = name.trim();
    if (!n) e.name = "El nombre es requerido";

    const p = String(points).trim();
    if (p === "") {
      e.points = "Los puntos son requeridos";
    } else if (Number.isNaN(Number(p))) {
      e.points = "Los puntos deben ser numéricos";
    } else if (Number(p) < 0) {
      e.points = "Los puntos no pueden ser negativos";
    }
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault(); // evitamos validación nativa para controlar mensajes
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    onSubmit?.({ name: name.trim(), points: Number(points) });
  };

  const nameErrId = "name-error";
  const pointsErrId = "points-error";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby={errors.name ? nameErrId : undefined}
        />
        {errors.name && (
          <p role="alert" id={nameErrId}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="points">Puntos</label>
        <input
          id="points"
          type="text"
          inputMode="numeric"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          aria-describedby={errors.points ? pointsErrId : undefined}
        />
        {errors.points && (
          <p role="alert" id={pointsErrId}>
            {errors.points}
          </p>
        )}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}
