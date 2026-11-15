import XLSX from 'xlsx';
import fs from 'fs';

const wb = XLSX.readFile('LegacyTech_Data.xlsx');
const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

const map = new Map();
for (const r of rows) {
  if (!r.Location || r.Location === 'Unknown') continue; // أماكن بلا اسم
  const key = `${r.Location}|${r.City}`;
  if (!map.has(key)) {
    map.set(key, { name: r.Location, city: r.City, category: r.Category, sum: 0, count: 0 });
  }
  const p = map.get(key);
  p.sum += Number(r.Rating);
  p.count += 1;
}

const places = [...map.values()]
  .map((p, i) => ({
    id: i + 1,
    name: p.name,
    city: p.city,
    category: p.category,
    rating: Number((p.sum / p.count).toFixed(1)),
    reviews: p.count,
  }))
  .sort((a, b) => b.reviews - a.reviews);

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/places.json', JSON.stringify(places));
console.log(`تم إنشاء ${places.length} مكان`);