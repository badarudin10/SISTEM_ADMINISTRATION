import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateLptDocument } from "../server/lpt.ts";
import { storageGetSignedUrl } from "../server/storage.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { kegiatan, tanggal, pelapor, puskesmas } = req.body;

    const result = await generateLptDocument(
      {
        kegiatan: kegiatan || "distribusi",
        tanggal: tanggal || "2026-07-06",
        pelapor: pelapor || "Petugas Uji",
        puskesmas: puskesmas || [
          { nama: "Setu", jumlahItem: 24 },
          { nama: "Keranggan", jumlahItem: 59 },
        ],
      },
      0
    );

    const downloadUrl = await storageGetSignedUrl(result.key);

    return res.status(200).json({
      fileName: result.fileName,
      key: result.key,
      totalItem: result.preview?.totalItem || 0,
      downloadUrl: downloadUrl
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

