import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export default function LikeButton({ slug }: Props) {
  const [liked, setLiked] = useState(false);
  const key = `liked-${slug}`;

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(key) === '1');
    } catch {
      // localStorage unavailable, ignore
    }
  }, [key]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    try {
      if (next) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
    } catch {
      // ignore
    }
  };

  const color = liked ? '#e88aa8' : '#a8c0d8';

  return (
    <button
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? 'お気に入り解除' : 'お気に入り'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        lineHeight: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width={13} height={13} aria-hidden="true">
        <path
          d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z"
          fill={liked ? color : 'none'}
          stroke={color}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
