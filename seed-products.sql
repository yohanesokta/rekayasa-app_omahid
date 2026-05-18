-- SQL Seed untuk 10 Produk OMAH.id
-- Berdasarkan skema Prisma di prisma/schema.prisma

-- Membersihkan data lama jika diperlukan (Opsional, gunakan dengan hati-hati)
-- DELETE FROM "ProductImage" WHERE "productId" LIKE 'seed_prod_%';
-- DELETE FROM "Product" WHERE "id" LIKE 'seed_prod_%';

-- 1. Insert ke tabel Product
INSERT INTO "Product" ("id", "name", "description", "price", "category", "stock", "createdAt", "updatedAt") VALUES
('seed_prod_1', 'Sofa Velvet Hijau', 'Sofa mewah dengan bahan velvet warna hijau botol yang elegan. Sangat nyaman untuk ruang tamu bergaya klasik maupun modern.', 4500000, 'SOFA', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_2', 'Kursi Makan Minimalis', 'Kursi makan dengan desain scandinavian, menggunakan kayu solid dan dudukan empuk.', 850000, 'KURSI', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_3', 'Meja Tamu Marmer', 'Meja tamu dengan top marmer asli dan kaki besi gold yang memberikan kesan mewah.', 3200000, 'MEJA', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_4', 'Rak Buku Kayu Pinus', 'Rak buku minimalis dengan 5 tingkat, terbuat dari kayu pinus berkualitas tinggi.', 1250000, 'RAK', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_5', 'Cermin Dinding Bulat', 'Cermin dinding dengan bingkai kayu jati, cocok untuk dekorasi ruang tamu atau kamar tidur.', 650000, 'DEKORASI', 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_6', 'Kabinet Dapur Modern', 'Kabinet penyimpanan dapur dengan finishing matte dan handle stainless steel.', 2800000, 'LEMARI', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_7', 'Lampu Meja Industrial', 'Lampu meja dengan gaya industrial, cocok untuk meja kerja atau lampu tidur.', 450000, 'LAMPU', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_8', 'Tempat Tidur Queen Size', 'Rangka tempat tidur queen size dengan sandaran kepala berlapis kain abu-abu.', 5500000, 'TEMPAT TIDUR', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_9', 'Meja Kerja Ergonomis', 'Meja kerja dengan ketinggian yang pas untuk produktivitas maksimal di rumah.', 1750000, 'MEJA', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_prod_10', 'Sofa Armchair Kuning', 'Kursi santai satu dudukan dengan warna kuning cerah untuk menghidupkan suasana ruangan.', 1950000, 'SOFA', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2. Insert ke tabel ProductImage
INSERT INTO "ProductImage" ("id", "url", "productId") VALUES
('seed_img_1', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000', 'seed_prod_1'),
('seed_img_2', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000', 'seed_prod_2'),
('seed_img_3', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000', 'seed_prod_3'),
('seed_img_4', 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1000', 'seed_prod_4'),
('seed_img_5', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000', 'seed_prod_5'),
('seed_img_6', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000', 'seed_prod_6'),
('seed_img_7', 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000', 'seed_prod_7'),
('seed_img_8', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000', 'seed_prod_8'),
('seed_img_9', 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=1000', 'seed_prod_9'),
('seed_img_10', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000', 'seed_prod_10');
