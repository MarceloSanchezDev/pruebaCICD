import { useState } from 'react';

export default function NameField() {
  const [name, setName] = useState('');
  return (
    <div>
      <label htmlFor="name">Nombre</label>
      <input
        id="name"
        placeholder="Escribe tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p aria-live="polite">Valor: {name || '—'}</p>
    </div>
  );
}
