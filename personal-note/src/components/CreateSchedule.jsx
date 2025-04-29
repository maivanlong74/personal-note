export default function parseSchedule(note) {
  const schedules = [];

  const dateRegex = /ngày\s(\d{1,2}\/\d{1,2}\/\d{4})/i;
  const match = note.match(dateRegex);

  if (!match) return [];

  const firstDateStr = match[1];
  const [day, month, year] = firstDateStr.split('/').map(Number);
  let currentDate = new Date(year, month - 1, day);

  const parts = note.split(/(ngày\s\d{1,2}\/\d{1,2}\/\d{4}|ngày mai|ngày sau)/i).filter(p => p.trim() !== '');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].toLowerCase();

    if (part.startsWith('ngày ')) {
      if (part.includes('/')) {
        const newDateMatch = part.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
        if (newDateMatch) {
          const [d, m, y] = newDateMatch[0].split('/').map(Number);
          currentDate = new Date(y, m - 1, d);
        }
      } else if (part.includes('mai') || part.includes('sau')) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      schedules.push({
        date: new Date(currentDate.getTime()),
        content: part.trim()
      });
    }
  }

  return schedules; // Trả về dạng chuẩn [{date, content}]
}