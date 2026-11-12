import { useEffect, useState } from 'react'
import './App.css'
import DaftarTransaksi from './DaftarTransaksi.jsx'
import FormTransaksi from './FormTransaksi.jsx'

const KUNCI_PENYIMPANAN = 'catatan-keuangan-mini'

function bacaTransaksi() {
  const dataTersimpan = localStorage.getItem(KUNCI_PENYIMPANAN)

  if (!dataTersimpan) {
    return []
  }

  try {
    const data = JSON.parse(dataTersimpan)
    if (Array.isArray(data)) {
      return data
    }

    console.error('Data transaksi di localStorage bukan berupa daftar.')
    return []
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Data transaksi di localStorage tidak dapat dibaca.', error)
      return []
    }

    throw error
  }
}

const formatRupiah = (nilai) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 2,
  }).format(nilai)

function App() {
  const [transaksi, setTransaksi] = useState(bacaTransaksi)

  useEffect(() => {
    localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(transaksi))
  }, [transaksi])

  const totalSaldo = transaksi.reduce((total, item) => {
    const nominal = Number(item.nominal)
    return total + (item.jenis === 'pemasukan' ? nominal : -nominal)
  }, 0)

  const tambahTransaksi = ({ keterangan, nominal, jenis }) => {
    setTransaksi((daftarSaatIni) => [
      {
        id: crypto.randomUUID(),
        keterangan,
        nominal: Number(nominal),
        jenis,
        tanggal: new Date().toISOString(),
      },
      ...daftarSaatIni,
    ])
  }

  const hapusTransaksi = (id) => {
    setTransaksi((daftarSaatIni) =>
      daftarSaatIni.filter((item) => item.id !== id),
    )
  }

  return (
    <main className="wadah">
      <header className="kepala">
        <div className="logo" aria-hidden="true">
          K
        </div>
        <div>
          <p className="label-atas">PENGELOLAAN UANG</p>
          <h1>Catatan Keuangan Mini</h1>
          <p className="subjudul">Catat uang masuk dan keluar dengan mudah.</p>
        </div>
      </header>

      <section className="kartu kartu-saldo" aria-labelledby="judul-saldo">
        <div>
          <p className="label-saldo" id="judul-saldo">
            Total saldo
          </p>
          <p className="nilai-saldo">{formatRupiah(totalSaldo)}</p>
        </div>
        <div className="ikon-saldo" aria-hidden="true">
          Rp
        </div>
      </section>

      <FormTransaksi onTambah={tambahTransaksi} />
      <DaftarTransaksi
        transaksi={transaksi}
        onHapus={hapusTransaksi}
        formatRupiah={formatRupiah}
      />

      <footer className="catatan-kaki">
        Data transaksi tersimpan otomatis di perangkat ini.
      </footer>
    </main>
  )
}

export default App
