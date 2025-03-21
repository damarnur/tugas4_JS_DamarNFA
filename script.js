// Class Kendaraan sebagai parent class
class Kendaraan {
  constructor(id, jenis, model, tahun, tarifSewa) {
    this.id = id;
    this.jenis = jenis;
    this.model = model;
    this.tahun = tahun;
    this.tarifSewa = tarifSewa;
    this.tersedia = true;
  }

  getInfo() {
    return `${this.jenis} ${this.model} (${this.tahun}) - Tarif: Rp${this.tarifSewa}/hari`;
  }

  setStatus(status) {
    this.tersedia = status;
  }
}

// Class Pelanggan sesuai permintaan
class Pelanggan {
  constructor(nama, nomorTelepon) {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = null;
    this.tanggalMulai = null;
    this.lamaSewa = 0;
  }

  // Metode untuk mencatat transaksi penyewaan
  sewaKendaraan(kendaraan, lamaSewa) {
    if (!kendaraan.tersedia) {
      return `Maaf, ${kendaraan.getInfo()} sedang tidak tersedia.`;
    }

    this.kendaraanDisewa = kendaraan;
    this.tanggalMulai = new Date();
    this.lamaSewa = lamaSewa;

    // Update status kendaraan
    kendaraan.setStatus(false);

    return `${
      this.nama
    } berhasil menyewa ${kendaraan.getInfo()} selama ${lamaSewa} hari.`;
  }

  // Metode untuk pengembalian kendaraan
  kembalikanKendaraan() {
    if (!this.kendaraanDisewa) {
      return `${this.nama} tidak sedang menyewa kendaraan.`;
    }

    const kendaraan = this.kendaraanDisewa;
    const biayaSewa = this.lamaSewa * kendaraan.tarifSewa;

    // Update status kendaraan
    kendaraan.setStatus(true);

    // Reset data penyewaan pelanggan
    this.kendaraanDisewa = null;
    this.tanggalMulai = null;
    this.lamaSewa = 0;

    return `${
      this.nama
    } telah mengembalikan ${kendaraan.getInfo()}. Total biaya: Rp${biayaSewa}.`;
  }

  getInfoPenyewaan() {
    if (!this.kendaraanDisewa) {
      return `${this.nama} tidak sedang menyewa kendaraan.`;
    }

    return `${this.nama} (${
      this.nomorTelepon
    }) menyewa ${this.kendaraanDisewa.getInfo()} selama ${
      this.lamaSewa
    } hari sejak ${this.tanggalMulai.toLocaleDateString()}.`;
  }
}

// Class SistemManajemenTransportasi untuk mengelola seluruh sistem
class SistemManajemenTransportasi {
  constructor() {
    this.daftarKendaraan = [];
    this.daftarPelanggan = [];
  }

  tambahKendaraan(kendaraan) {
    this.daftarKendaraan.push(kendaraan);
    return `${kendaraan.getInfo()} berhasil ditambahkan ke sistem.`;
  }

  tambahPelanggan(pelanggan) {
    this.daftarPelanggan.push(pelanggan);
    return `Pelanggan ${pelanggan.nama} berhasil didaftarkan.`;
  }

  // Menampilkan daftar pelanggan yang sedang menyewa kendaraan
  tampilkanPelangganAktif() {
    const pelangganAktif = this.daftarPelanggan.filter(
      (pelanggan) => pelanggan.kendaraanDisewa !== null
    );

    if (pelangganAktif.length === 0) {
      return "Tidak ada pelanggan yang sedang menyewa kendaraan.";
    }

    let daftar = "Daftar Pelanggan yang Sedang Menyewa Kendaraan:\n";
    pelangganAktif.forEach((pelanggan, index) => {
      daftar += `${index + 1}. ${pelanggan.getInfoPenyewaan()}\n`;
    });

    return daftar;
  }

  // Menampilkan daftar kendaraan yang tersedia
  tampilkanKendaraanTersedia() {
    const kendaraanTersedia = this.daftarKendaraan.filter(
      (kendaraan) => kendaraan.tersedia
    );

    if (kendaraanTersedia.length === 0) {
      return "Tidak ada kendaraan yang tersedia saat ini.";
    }

    let daftar = "Daftar Kendaraan Tersedia:\n";
    kendaraanTersedia.forEach((kendaraan, index) => {
      daftar += `${index + 1}. ${kendaraan.getInfo()}\n`;
    });

    return daftar;
  }
}

// Contoh penggunaan
// Membuat instance sistem
const sistem = new SistemManajemenTransportasi();

// Membuat beberapa kendaraan
const mobil1 = new Kendaraan("M001", "Mobil", "Toyota Avanza", 2022, 350000);
const mobil2 = new Kendaraan("M002", "Mobil", "Honda Brio", 2023, 300000);
const motor1 = new Kendaraan("MT001", "Motor", "Honda Vario", 2022, 100000);

// Menambahkan kendaraan ke sistem
sistem.tambahKendaraan(mobil1);
sistem.tambahKendaraan(mobil2);
sistem.tambahKendaraan(motor1);

// Membuat beberapa pelanggan
const pelanggan1 = new Pelanggan("Budi Santoso", "081234567890");
const pelanggan2 = new Pelanggan("Ani Wijaya", "082345678901");
const pelanggan3 = new Pelanggan("Citra Dewi", "083456789012");

// Menambahkan pelanggan ke sistem
sistem.tambahPelanggan(pelanggan1);
sistem.tambahPelanggan(pelanggan2);
sistem.tambahPelanggan(pelanggan3);

// Mencatat transaksi penyewaan
console.log(pelanggan1.sewaKendaraan(mobil1, 3));
console.log(pelanggan2.sewaKendaraan(motor1, 2));

// Menampilkan daftar pelanggan yang sedang menyewa kendaraan
console.log(sistem.tampilkanPelangganAktif());

// Menampilkan kendaraan yang tersedia
console.log(sistem.tampilkanKendaraanTersedia());

// Contoh pengembalian kendaraan
console.log(pelanggan1.kembalikanKendaraan());

// Cek daftar pelanggan aktif setelah pengembalian
console.log(sistem.tampilkanPelangganAktif());

// Cek kendaraan tersedia setelah pengembalian
console.log(sistem.tampilkanKendaraanTersedia());
