import React, { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-lpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kegiatan: "distribusi",
          tanggal: "2026-07-06",
          pelapor: "Petugas Uji",
          puskesmas: [
            { nama: "Setu", jumlahItem: 24 },
            { nama: "Keranggan", jumlahItem: 59 }
          ]
        })
      });
      const data = await res.json();
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border border-border p-2 rounded-lg bg-card">
          <img 
            src="/kop-lpt-uptd-farmasi.png" 
            alt="Kop LPT UPTD Farmasi" 
            className="w-full h-auto rounded"
          />
        </div>

        <header className="border-b border-border pb-4">
          <h1 className="text-2xl font-bold font-display text-primary">Asisten LPT Distribusi Obat</h1>
          <p className="text-sm text-muted-foreground">UPTD Farmasi - Sistem Pembuatan BAST & LPT</p>
        </header>

        <main className="space-y-4">
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg transition"
          >
            {loading ? 'Memproses Dokumen DOCX...' : 'Generate Dokumen LPT (.docx)'}
          </button>

          {downloadUrl && (
            <div className="p-4 bg-accent text-accent-foreground rounded-lg text-center">
              <p className="text-sm font-semibold mb-2">Dokumen Berhasil Dibuat!</p>
              <a href={downloadUrl} target="_blank" rel="noreferrer" className="underline font-bold text-primary">
                Download File LPT (.docx)
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

