import { useState } from 'react';

const OPTIONS = [
  { k: 'そのまま', icon: '🥛' },
  { k: '氷を入れて', icon: '🧊' },
  { k: '牛乳で割って', icon: '🥛' },
];

export default function DrinkMethodPicker() {
  const [picked, setPicked] = useState('そのまま');

  return (
    <div>
      <div className="grid">
        {OPTIONS.map((o) => (
          <button
            key={o.k}
            onClick={() => setPicked(o.k)}
            className={picked === o.k ? 'on' : ''}
            aria-pressed={picked === o.k}
          >
            <div className="icn">{o.icon}</div>
            {o.k}
          </button>
        ))}
      </div>
      <p className="note">キンキンに冷やしてそのままが一番すき！</p>

      <style>{`
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        button {
          border: 1px solid #dbeaf7;
          background: transparent;
          border-radius: 10px;
          padding: 10px 4px;
          cursor: pointer;
          font-size: 10px;
          color: #5a7a98;
          font-family: var(--font-jp);
        }
        button.on { border: 2px solid #7aa9d9; background: #eaf4fc; }
        .icn { font-size: 20px; margin-bottom: 4px; }
        .note { margin-top: 10px; font-size: 11px; color: #7aa9d9; text-align: center; }
      `}</style>
    </div>
  );
}
