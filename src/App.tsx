import React, { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/generate-lpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kegiatan: "distribusi",
          tanggal: "2026-07-06",
          pelapor: "Petugas Uji"
        })
      });
      const data = await res.json();
      if (res.ok && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      } else {
        setErrorMsg(data.error || 'Gagal memproses dokumen.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#0284c7', fontSize: '24px', marginBottom: '8px' }}>Asisten LPT Distribusi Obat</h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>UPTD Farmasi - Sistem Pembuatan BAST & LPT</p>

      <button 
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: loading ? '#94a3b8' : '#0284c7',
          color: '#ffffff',
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
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px 0', color: '#166534', fontWeight: 'bold' }}>Dokumen Berhasil Dibuat!</p>
          <a href={downloadUrl} target="_blank" rel="noreferrer" style={{ color: '#0284c7', fontWeight: 'bold', textDecoration: 'underline' }}>
            Download File LPT (.docx)
          </a>
        </div>
      )}

      {errorMsg && (
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '14px' }}>
          <strong>Error Backend:</strong> {errorMsg}
        </div>
      )}
    </div>
  );
}
