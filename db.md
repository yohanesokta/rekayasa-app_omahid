# Dokumentasi Database (Prisma Schema)

Dokumen ini berisi penjelasan komprehensif mengenai struktur database yang digunakan dalam aplikasi Omah.id, berdasarkan konfigurasi `prisma/schema.prisma`. Aplikasi ini menggunakan **PostgreSQL** sebagai sistem manajemen basis data dan **Prisma ORM** untuk berinteraksi dengan database.

## 1. Konfigurasi Utama

- **Generator Client**: Menggunakan `prisma-client-js` untuk men-generate query builder secara otomatis di Node.js/TypeScript.
- **Datasource**: Database utama yang digunakan adalah `postgresql`.

---

## 2. Enums (Enumerasi)

### `Role`
Enum ini digunakan untuk membedakan tingkat akses pengguna dalam sistem.
- `USER`: Peran default untuk pelanggan biasa yang mendaftar.
- `ADMIN`: Peran untuk administrator yang memiliki hak akses untuk mengelola produk, pesanan, dan fitur dashboard lainnya.

---

## 3. Entitas / Model Database

### A. Model `User`
Menyimpan data pengguna yang terdaftar di sistem.

| Field | Tipe Data | Keterangan | Relasi / Sifat |
|---|---|---|---|
| `id` | `String` | Primary Key. | Dihasilkan otomatis dengan format `cuid()`. |
| `name` | `String?` | Nama pengguna. | Bersifat opsional (bisa null). |
| `email` | `String` | Alamat email pengguna. | Harus unik (`@unique`), digunakan untuk login. |
| `password` | `String` | Kata sandi pengguna (biasanya di-hash). | Wajib diisi. |
| `role` | `Role` | Peran akses pengguna. | Default: `USER`. |
| `cart` | `Cart?` | Relasi ke keranjang belanja. | Relasi One-to-One (Satu User memiliki maksimal 1 Cart). |
| `wishlist` | `Wishlist[]`| Relasi ke daftar keinginan (wishlist). | Relasi One-to-Many (User bisa memiliki banyak item di wishlist). |
| `createdAt`| `DateTime` | Waktu akun dibuat. | Dibuat otomatis saat record ditambahkan. |
| `updatedAt`| `DateTime` | Waktu data pengguna terakhir diubah. | Diperbarui otomatis setiap kali record diubah. |

---

### B. Model `Product`
Menyimpan informasi tentang produk (seperti furniture) yang dijual.

| Field | Tipe Data | Keterangan | Relasi / Sifat |
|---|---|---|---|
| `id` | `String` | Primary Key. | Dihasilkan otomatis dengan format `cuid()`. |
| `name` | `String` | Nama produk. | Wajib diisi. |
| `description`| `String` | Deskripsi lengkap produk. | Wajib diisi. |
| `price` | `Float` | Harga produk. | Disimpan dalam bentuk pecahan/desimal. |
| `images` | `ProductImage[]`| Kumpulan gambar produk. | Relasi One-to-Many (Produk bisa memiliki banyak gambar). |
| `category` | `String?` | Kategori produk. | Bersifat opsional. |
| `stock` | `Int` | Jumlah stok yang tersedia. | Default: `0`. |
| `cartItems`| `CartItem[]`| Relasi ke item keranjang. | Menunjukkan produk ini sedang ada di keranjang mana saja. |
| `wishlistedBy`| `Wishlist[]`| Relasi ke daftar keinginan. | Menunjukkan produk ini difavoritkan oleh siapa saja. |
| `createdAt`| `DateTime` | Waktu produk ditambahkan. | Dibuat otomatis saat record ditambahkan. |
| `updatedAt`| `DateTime` | Waktu data produk terakhir diubah. | Diperbarui otomatis. |

---

### C. Model `ProductImage`
Karena satu produk bisa memiliki beberapa gambar (galeri), data gambar dipisah dalam tabel tersendiri.

| Field | Tipe Data | Keterangan | Relasi / Sifat |
|---|---|---|---|
| `id` | `String` | Primary Key. | Dihasilkan otomatis dengan format `cuid()`. |
| `url` | `String` | Tautan/path gambar (CDN/lokal). | Wajib diisi. |
| `productId`| `String` | Foreign Key ke tabel Product. | Merujuk ke id dari `Product`. |
| `product` | `Product` | Relasi balik ke Produk induk. | Jika Produk dihapus, semua gambarnya ikut terhapus (`onDelete: Cascade`). |

---

### D. Model `Cart` (Keranjang Belanja)
Menyimpan wadah keranjang belanja untuk masing-masing user.

| Field | Tipe Data | Keterangan | Relasi / Sifat |
|---|---|---|---|
| `id` | `String` | Primary Key. | Dihasilkan otomatis dengan format `cuid()`. |
| `userId` | `String` | Foreign Key ke tabel User. | Harus unik (`@unique`). |
| `user` | `User` | Relasi ke pemilik keranjang. | Merujuk ke id dari `User`. |
| `items` | `CartItem[]`| Daftar item/produk dalam keranjang.| Relasi One-to-Many (Keranjang memiliki banyak jenis item). |
| `createdAt`| `DateTime` | Waktu keranjang dibuat. | Dibuat otomatis saat record ditambahkan. |
| `updatedAt`| `DateTime` | Waktu keranjang terakhir diubah. | Diperbarui otomatis. |

---

### E. Model `CartItem` (Item Keranjang)
Merupakan tabel *junction/pivot* dengan tambahan jumlah kuantitas. Menghubungkan antara `Cart` dan `Product`.

| Field | Tipe Data | Keterangan | Relasi / Sifat |
|---|---|---|---|
| `id` | `String` | Primary Key. | Dihasilkan otomatis dengan format `cuid()`. |
| `cartId` | `String` | Foreign Key ke tabel Cart. | Wajib diisi. |
| `cart` | `Cart` | Relasi ke wadah Keranjang. | Merujuk ke id dari `Cart`. |
| `productId`| `String` | Foreign Key ke tabel Product. | Wajib diisi. |
| `product` | `Product` | Relasi ke Produk yang dimasukkan. | Merujuk ke id dari `Product`. |
| `quantity` | `Int` | Jumlah produk yang dibeli. | Default: `1`. |
| `createdAt`| `DateTime` | Waktu item ditambahkan ke keranjang. | Dibuat otomatis saat record ditambahkan. |
| `updatedAt`| `DateTime` | Waktu kuantitas terakhir diubah. | Diperbarui otomatis. |

---

### F. Model `Wishlist` (Daftar Keinginan / Favorit)
Merupakan tabel *junction* untuk menghubungkan User dengan Produk yang mereka sukai.

| Field | Tipe Data | Keterangan | Relasi / Sifat |
|---|---|---|---|
| `id` | `String` | Primary Key. | Dihasilkan otomatis dengan format `cuid()`. |
| `userId` | `String` | Foreign Key ke tabel User. | Wajib diisi. |
| `user` | `User` | Relasi ke pengguna yang memfavoritkan.| Merujuk ke id dari `User`. |
| `productId`| `String` | Foreign Key ke tabel Product. | Wajib diisi. |
| `product` | `Product` | Relasi ke Produk yang difavoritkan.| Merujuk ke id dari `Product`. |
| `createdAt`| `DateTime` | Waktu dimasukkan ke wishlist. | Dibuat otomatis saat record ditambahkan. |

> **Catatan Penting pada Wishlist:** Terdapat aturan `@@unique([userId, productId])` di level model. Ini berarti **satu user hanya bisa memfavoritkan satu produk yang sama sebanyak satu kali**. Tidak boleh ada duplikasi data produk yang sama untuk user yang sama di dalam wishlist.

---

## 4. Peta Relasi (Relationship Mapping)

- **User ↔ Cart (1:1)**
  Satu user hanya bisa memiliki satu keranjang belanja yang aktif.
- **User ↔ Wishlist (1:N)**
  Satu user bisa menambahkan banyak produk ke dalam daftar keinginannya.
- **Product ↔ ProductImage (1:N)**
  Satu produk dapat memiliki kumpulan banyak gambar, tetapi sebuah gambar hanya merujuk ke satu produk.
- **Cart ↔ CartItem (1:N)**
  Satu keranjang bisa berisi berbagai macam produk (items) yang berbeda.
- **Product ↔ CartItem (1:N)**
  Satu produk spesifik bisa berada di banyak keranjang milik berbagai user berbeda.
- **Product ↔ Wishlist (1:N)**
  Satu produk bisa difavoritkan oleh banyak user yang berbeda.
