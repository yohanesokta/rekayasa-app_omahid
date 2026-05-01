# Dokumentasi Lokasi CRUD Admin

Dokumen ini memetakan di mana letak logika operasi database (CRUD: Create, Read, Update, Delete) khusus untuk kebutuhan antarmuka / fitur panel **Admin** (terutama Manajemen Produk) dalam arsitektur aplikasi Omah.id. 

Aplikasi ini menggunakan pendekatan Next.js 14/15 App Router, di mana logika CRUD admin rata-rata dieksekusi secara langsung melalui **Server Actions** dan **Server Components** di dalam direktori `app/dashboard`.

---

## 1. Manajemen Produk (Product CRUD)

Area admin utama terpusat di direktori `/app/dashboard/products` dan `/app/dashboard/stock`. Berikut adalah pemetaan rinci tempat query Prisma dipanggil:

### A. Create (Tambah Produk Baru)
- **Lokasi File**: `app/dashboard/products/add/page.tsx`
- **Metode**: Server Action (dideklarasikan di dalam komponen melalui `"use server"` function).
- **Penjelasan**: Saat admin men-submit form penambahan produk, data akan diproses dan query `await prisma.product.create({ ... })` dieksekusi untuk menyisipkan data baru ke dalam database.

### B. Read (Melihat Daftar Produk & Stok)
Admin membaca data produk dari dua halaman berbeda yang menggunakan Server-Side Rendering (Server Components) untuk mem-fetch data langsung:
- **Daftar Utama**: `app/dashboard/products/page.tsx`
  - Memanggil `await prisma.product.findMany({ include: { images: true }, orderBy: { createdAt: 'desc' } })` saat halaman dimuat (untuk mengisi tabel produk admin).
- **Daftar Stok**: `app/dashboard/stock/page.tsx`
  - Memanggil `await prisma.product.findMany({ orderBy: { stock: 'asc' } })` untuk menampilkan halaman rekap khusus manajemen jumlah stok.

### C. Update (Ubah Data Produk / Stok)
- **Ubah Data Produk (Full Edit)**: `app/dashboard/products/[id]/edit/page.tsx`
  - **Metode**: Pertama, menggunakan `prisma.product.findUnique` untuk membaca data lama. Kemudian memiliki fungsi Server Action yang mengeksekusi `await prisma.product.update({ ... })` untuk menyimpan modifikasi yang dikirim dari form (nama, harga, kategori, gambar).
- **Ubah Stok Cepat**: `app/dashboard/stock/page.tsx`
  - **Metode**: Pada halaman manajemen stok, terdapat aksi Server Action kecil yang hanya mengeksekusi pembaruan kuantitas stok menggunakan `await prisma.product.update({ where: { id }, data: { stock } })`.

### D. Delete (Hapus Produk)
- **Lokasi File**: `app/dashboard/products/page.tsx`
- **Metode**: Inline Server Action pada Action/Button Hapus.
- **Penjelasan**: Mengeksekusi `await prisma.product.delete({ where: { id } })`. Berkat aturan `onDelete: Cascade` di `schema.prisma`, pemanggilan fungsi delete ini juga akan secara otomatis membersihkan semua data gambar (`ProductImage`) yang terkait dengan produk tersebut.

---

## 2. API Routes & Endpoint Pembantu
Walaupun alur admin sebagian besar menggunakan Server Actions langsung di halaman dashboard, ada pula logika CRUD tambahan (seperti untuk populating data saat development) yang berlokasi di Route Handlers (API):

- **Database Seeding (Pengisian Data Awal)**:
  - Lokasi: `app/api/products/seed/route.ts`
  - Fungsi: Menggunakan API GET yang memanggil `prisma.product.create()` dalam loop untuk menginjeksi produk dummy ke database (hanya untuk keperluan testing).
- **API List Produk (Digunakan juga oleh Front-End Publik)**:
  - Lokasi: `app/api/products/route.ts`
  - Fungsi: Mengembalikan data dari `prisma.product.findMany()` dalam format JSON.
