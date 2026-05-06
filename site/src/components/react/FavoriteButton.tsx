import { useEffect, useState } from 'react';

interface Props { slug: string; }

export default function FavoriteButton({ slug }: Props) {
  const [fav, setFav] = useState(false);
  const key = `liked-${slug}`;

  useEffect(() => {
    try { setFav(localStorage.getItem(key) === '1'); } catch {}
  }, [key]);

  const toggle = () => {
    const next = !fav;
    setFav(next);
    try {
      if (next) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
    } catch {}
  };

  return (
    <button onClick={toggle} aria-pressed={fav} className={fav ? 'on' : ''}>
      <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
        <path
          d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z"
          fill={fav ? '#fff' : 'none'}
          stroke={fav ? '#fff' : '#7aa9d9'}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      お気に入りに追加

      <style>{`
        button {
          width: 100%;
          margin-top: 14px;
          padding: 10px;
          font-size: 12px;
          background: transparent;
          color: #7aa9d9;
          border: 1.5px solid #7aa9d9;
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--font-jp);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        button.on { background: #7aa9d9; color: #fff; }
      `}</style>
    </button>
  );
}
