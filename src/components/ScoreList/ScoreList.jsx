import React from "react";

export default function ScoreList({
  items = [],
  title = "Estadísticas",
  showTotal = false,
}) {
  if (!items.length) {
    return <p role="status">No hay datos</p>;
  }

  const total = items.reduce((acc, it) => acc + Number(it.value || 0), 0);

  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map(({ label, value }, i) => (
          <li key={i}>
            <span>{label}: </span>
            <strong>{value}</strong>
          </li>
        ))}
      </ul>

      {showTotal && <p data-testid="total">Total: {total}</p>}
    </section>
  );
}
