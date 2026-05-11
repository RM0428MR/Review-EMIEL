import type { DrinkMethod } from '../../lib/types';

type IconName = 'cup' | 'ice' | 'milk';

const OPTIONS: { k: DrinkMethod; icon: IconName }[] = [
  { k: 'そのまま', icon: 'cup' },
  { k: '氷を入れて', icon: 'ice' },
  { k: '牛乳で割って', icon: 'milk' },
];

const STROKE = '#7aa9d9';

function CupIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18 L48 18 L45 50 a4 4 0 0 1 -4 3.5 L23 53.5 a4 4 0 0 1 -4 -3.5 Z" />
      <path d="M17 26 Q32 30 47 26" />
      <path d="M17 26 Q32 22 47 26" />
    </svg>
  );
}

function IceIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16 L36 12 L46 18 L32 22 Z" />
      <path d="M22 16 L22 32 L32 36 L32 22 Z" />
      <path d="M32 22 L46 18 L46 32 L32 36 Z" />
      <path d="M10 36 L24 32 L34 38 L20 42 Z" />
      <path d="M10 36 L10 50 L20 54 L20 42 Z" />
      <path d="M20 42 L34 38 L34 50 L20 54 Z" />
      <path d="M30 38 L44 34 L54 40 L40 44 Z" />
      <path d="M30 38 L30 50 L40 54 L40 44 Z" />
      <path d="M40 44 L54 40 L54 50 L40 54 Z" />
    </svg>
  );
}

function MilkIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 22 L20 54 L44 54 L44 22 L38 14 L26 14 Z" />
      <path d="M20 22 L44 22" />
      <path d="M26 14 L26 22" />
      <path d="M38 14 L38 22" />
      <path d="M22 40 Q28 37 32 40 T44 40" />
    </svg>
  );
}

const ICON_MAP: Record<IconName, () => JSX.Element> = {
  cup: CupIcon,
  ice: IceIcon,
  milk: MilkIcon,
};

const DEFAULT_NOTES: Record<DrinkMethod, string> = {
  'そのまま': 'キンキンに冷やしてそのままが一番すき！',
  '氷を入れて': '氷をたっぷり入れてキリッと冷たく！',
  '牛乳で割って': '牛乳で割るとまろやかで濃厚〜！',
};

interface Props {
  picked: DrinkMethod;
  note?: string;
}

export default function DrinkMethodPicker({ picked, note }: Props) {
  const displayNote = note ?? DEFAULT_NOTES[picked];

  return (
    <div>
      <div className="grid">
        {OPTIONS.map((o) => {
          const Icon = ICON_MAP[o.icon];
          const isOn = picked === o.k;
          return (
            <div key={o.k} className={`item${isOn ? ' on' : ''}`} aria-current={isOn ? 'true' : undefined}>
              <div className="icn"><Icon /></div>
              {o.k}
            </div>
          );
        })}
      </div>
      <p className="note">{displayNote}</p>

      {/* hydration mismatch 回避: <style> 内の特殊文字は React が SSR で
          escape するが <style> は RAW_TEXT で browser が decode しない。
          dangerouslySetInnerHTML で escape を回避する。 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; justify-items: center; }
        .item {
          font-size: 10px;
          color: #5a7a98;
          font-family: var(--font-jp);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .icn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icn svg { width: 70%; height: 70%; }
        .item.on .icn { border-color: #a8c8e8; }
        .note {
          margin-top: 10px;
          font-size: 11px;
          color: #7aa9d9;
          text-align: center;
          text-wrap: pretty;
          word-break: keep-all;
          overflow-wrap: anywhere;
          line-height: 1.5;
        }
      ` }} />
    </div>
  );
}
