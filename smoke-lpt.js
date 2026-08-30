import { writeFile } from "node:fs/promises";
import { generateLptDocument } from "../server/lpt.ts";
import { storageGetSignedUrl } from "../server/storage.ts";

const result = await generateLptDocument(
  {
    kegiatan: "distribusi",
    tanggal: "2026-07-06",
    pelapor: "Petugas Uji",
    puskesmas: [
      { nama: "Setu", jumlahItem: 24 },
      { nama: "Keranggan", jumlahItem: 59 },
    ],
  },
  0,
);

const downloadUrl = await storageGetSignedUrl(result.key);
const response = await fetch(downloadUrl);
if (!response.ok) throw new Error(`Unduhan hasil ekspor gagal: ${response.status}`);
await writeFile("/home/ubuntu/work_lpt/smoke-lpt.docx", Buffer.from(await response.arrayBuffer()));
console.log(JSON.stringify({ fileName: result.fileName, key: result.key, totalItem: result.preview.totalItem }));
