# Happy Birthday Siti — Digital Gift

Versi revisi:
1. Background halaman pertama memakai foto blur.
2. Penutup/envelope menggunakan aksen diamond emas yang lebih elegan, bukan love bulat.
3. Halaman 2 tetap siap untuk foto.
4. Halaman 3 memakai maroon + kartu letter putih + teks hitam.
5. Dua foto di halaman 3 bisa diklik untuk slide foto 1 ↔ foto 2.
6. Memories memakai maroon dan foto akan pop-up saat cursor diarahkan.
7. Halaman berikutnya adalah video fullscreen yang autoplay muted.
8. Halaman gift/surat tambahan dihapus.
9. Music page memakai file audio dari folder assets.
10. Halaman terakhir tetap tersedia.
11. Klik area halaman otomatis pindah ke halaman berikutnya; tombol bawah tetap ada.
12. Semua wording diarahkan untuk birthday Siti.

## FILE YANG PERLU KAMU MASUKKAN

Taruh file berikut di folder `assets/`:

### Background halaman 1
`page1-bg.jpg`

### Video
`birthday-video.mp4`

Video dibuat `autoplay muted loop playsinline` agar browser mengizinkan autoplay.
Kalau ingin video hanya sekali, hapus `loop` dari tag video di index.html.

### Lagu
`song.mp3`

Lagu akan dicoba diputar ketika masuk ke halaman music. Browser bisa menolak autoplay audio pada kondisi tertentu; tombol `play song` tetap tersedia sebagai fallback.

## FOTO
Foto-foto placeholder di index.html bisa diganti menjadi:
`<img src="assets/nama-foto.jpg" alt="...">`

atau gunakan CSS background-image sesuai kebutuhan.

## Menjalankan
Tidak perlu npm install karena ini HTML/CSS/JS biasa.

PowerShell:
`cd C:\project\anniversary`
`start index.html`

Atau gunakan VS Code + Live Server.

## Deploy
Bisa langsung upload folder ke GitHub dan deploy ke Netlify/Vercel.

### Amplop halaman pertama
Amplop dibuat ulang dengan gaya dark green seperti referensi: kertas hijau tua, flap segitiga, lipatan depan, dan wax seal emas. Klik amplop untuk animasi flap sebelum masuk ke halaman berikutnya.
