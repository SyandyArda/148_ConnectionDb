// Import library yang dibutuhkan
const express = require('express');
const mysql = require('mysql2');

// Inisialisasi aplikasi Express
const app = express();
const port = 3000; // <-- DIUBAH: Kembalikan ke 3000 agar tidak bentrok

// Konfigurasi koneksi database
const db = mysql.createPool({
    host: 'localhost',
    port: 3309,         // <-- DITAMBAHKAN: Sesuaikan dengan port MySQL Anda
    user: 'root',
    password: 'Arsyan290105',       // Biarkan kosong jika tidak ada password
    database: 'mahasiswa'
});

// Middleware (ini tidak wajib, tapi bagus untuk debugging)
app.use((req, res, next) => {
    console.log(`Menerima request: ${req.method} ${req.url}`);
    next();
});

// Membuat route GET untuk mengambil semua data dari tabel biodata
app.get('/biodata', (req, res) => {
    const sql = "SELECT * FROM biodata";
    db.query(sql, (err, results) => {
        if (err) {
            // Jika koneksi gagal, error akan muncul di sini
            console.error("Error saat query ke database:", err);
            return res.status(500).json({
                message: "Gagal mengambil data dari database.",
                error: err
            });
        }
        
        // Kirim hasil query sebagai respons JSON
        res.json({
            message: "Data berhasil diambil",
            data: results
        });
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`✅ Server berjalan di http://localhost:${port}`);
    console.log('Tekan CTRL + C untuk menghentikan server.');
});