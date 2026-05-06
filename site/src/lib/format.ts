// 日付・数値・URL ヘルパ

export function formatDate(d: string): string {
  // 'YYYY-MM-DD' / 'YYYY.MM.DD' どちらでも YYYY.MM.DD に揃える
  return d.replaceAll('-', '.');
}

export function getYear(d: string): number {
  return parseInt(d.replaceAll('-', '.').split('.')[0], 10);
}

export function getMonth(d: string): number {
  return parseInt(d.replaceAll('-', '.').split('.')[1], 10);
}

// Archive の年バケット。「それ以前」境界 = 2020 年未満。
export function archiveYearBucket(d: string): string {
  const y = getYear(d);
  if (y < 2020) return 'それ以前';
  return `${y}年`;
}
