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
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 style={{ color: '#0284c7', margin: 0 }}>Asisten LPT Distribusi Obat</h1>
        <p style={{ color: '#666', margin: '4px 0 0 0' }}>UPTD Farmasi - Sistem Pembuatan BAST & LPT</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#0284c7',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Memproses Dokumen DOCX...' : 'Generate Dokumen LPT (.docx)'}
        </button>

        {downloadUrl && (
          <div style={{ padding: '16px', backgroundColor: '#e0f2fe', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Dokumen Berhasil Dibuat!</p>
            <a href={downloadUrl} target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: 'bold' }}>
              Download File LPT (.docx)
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
