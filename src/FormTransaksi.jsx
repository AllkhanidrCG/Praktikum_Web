import { useState } from 'react'

function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState('')
  const [nominal, setNominal] = useState('')
  const [jenis, setJenis] = useState('pemasukan')
  const [pesanError, setPesanError] = useState('')

  const tanganiKirim = (event) => {
    event.preventDefault()

    const nominalAngka = Number(nominal)
    if (!keterangan.trim()) {
      setPesanError('Keterangan transaksi wajib diisi.')
      return
    }

    if (!Number.isFinite(nominalAngka) || nominalAngka <= 0) {
      setPesanError('Nominal harus lebih besar dari 0.')
      return
    }

    setPesanError('')
    onTambah({
      keterangan: keterangan.trim(),
      nominal: nominalAngka,
      jenis,
    })
    setKeterangan('')
    setNominal('')
    setJenis('pemasukan')
  }

  return (
    <section className="kartu" aria-labelledby="judul-form">
      <div className="judul-bagian">
        <div>
          <p className="label-atas">TRANSAKSI BARU</p>
          <h2 id="judul-form">Tambah catatan</h2>
        </div>
      </div>

      <form className="form-transaksi" onSubmit={tanganiKirim}>
        <label className="kolom penuh" htmlFor="keterangan">
          Keterangan
          <input
            id="keterangan"
            className="input"
            type="text"
            placeholder="Contoh: Gaji bulanan"
            value={keterangan}
            onChange={(event) => {
              setKeterangan(event.target.value)
              setPesanError('')
            }}
            maxLength={80}
            required
          />
        </label>

        <label className="kolom" htmlFor="nominal">
          Nominal
          <div className="input-nominal">
            <span aria-hidden="true">Rp</span>
            <input
              id="nominal"
              type="number"
              placeholder="0"
              min="0.01"
              step="0.01"
              value={nominal}
              onChange={(event) => {
                setNominal(event.target.value)
                setPesanError('')
              }}
              required
            />
          </div>
        </label>

        <label className="kolom" htmlFor="jenis">
          Jenis transaksi
          <select
            id="jenis"
            className="input"
            value={jenis}
            onChange={(event) => setJenis(event.target.value)}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </label>

        {pesanError && (
          <p className="pesan-error penuh" role="alert">
            {pesanError}
          </p>
        )}

        <button className="tombol-tambah penuh" type="submit">
          <span aria-hidden="true">+</span> Simpan transaksi
        </button>
      </form>
    </section>
  )
}

export default FormTransaksi
