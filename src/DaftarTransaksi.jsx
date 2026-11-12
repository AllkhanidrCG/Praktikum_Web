function ItemTransaksi({ item, onHapus, formatRupiah }) {
  const isPemasukan = item.jenis === 'pemasukan'
  const tanggal = new Date(item.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <li className="item-transaksi">
      <div className={`ikon-transaksi ${isPemasukan ? 'ikon-masuk' : 'ikon-keluar'}`} aria-hidden="true">
        {isPemasukan ? '↙' : '↗'}
      </div>
      <div className="detail-transaksi">
        <p className="keterangan-transaksi">{item.keterangan}</p>
        <p className="meta-transaksi">
          {isPemasukan ? 'Pemasukan' : 'Pengeluaran'} <span aria-hidden="true">·</span> {tanggal}
        </p>
      </div>
      <p className={`nominal-transaksi ${isPemasukan ? 'teks-masuk' : 'teks-keluar'}`}>
        {isPemasukan ? '+' : '−'} {formatRupiah(Number(item.nominal))}
      </p>
      <button
        className="tombol-hapus"
        type="button"
        onClick={() => onHapus(item.id)}
        aria-label={`Hapus transaksi ${item.keterangan}`}
        title="Hapus transaksi"
      >
        ×
      </button>
    </li>
  )
}

function DaftarTransaksi({ transaksi, onHapus, formatRupiah }) {
  return (
    <section className="kartu" aria-labelledby="judul-daftar">
      <div className="judul-bagian">
        <div>
          <p className="label-atas">RIWAYAT</p>
          <h2 id="judul-daftar">Transaksi terbaru</h2>
        </div>
        <span className="jumlah-transaksi">{transaksi.length} transaksi</span>
      </div>

      {transaksi.length === 0 ? (
        <div className="kosong">
          <div className="ikon-kosong" aria-hidden="true">
            ↗
          </div>
          <p className="judul-kosong">Belum ada transaksi</p>
          <p>Transaksi yang kamu tambahkan akan muncul di sini.</p>
        </div>
      ) : (
        <ul className="daftar-transaksi">
          {transaksi.map((item) => (
            <ItemTransaksi
              key={item.id}
              item={item}
              onHapus={onHapus}
              formatRupiah={formatRupiah}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default DaftarTransaksi
