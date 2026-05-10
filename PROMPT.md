# PELAJARI PROJECT INI DENGAN LENGKAP 

## Techstack yang digunakan :
- Next Js dengan prisma dan supabase dan supabase bucket
- Tailwind css untuk styling
- Supabase authentication

di sini sudah saya setup dan sebenernya project sudah setengah jadi jadi pastikan mengikuti pattern yang ada jangan menambahkan apapun yang tidak perlu.

Perubahan yang saya inginkan :

> Role User

1. tambahkan fitur chart dan fungsikan char nanti bisa ke halaman pembelian
urutan pembelian : barang -> (chart dulu atau langsung beli ) -> deskripsi checkout dan pemilihan metode pembayaran dan dapat melakukan custom barang karena ini bisa po untuk custom bentuk dll -> bayar pakai midtrans api key ada di env bisa di lihat di semua PAY_* nah implementasikan open new window midtrans lalu deteksi berhasil atau nggak untuk berhasil nya.

2. User bisa lihat apa yang ia tambahkan ke keranjang dan apa yang ia like. nah berarti butuh page 2 itu maka buat semirip mungkin dengan desain awal keseluruhan web. (Pelajari Bila Perlu)

3. Adakan simulation trak order nanti yang bisa di atur dari admin.


> Role Admin
beberapa halaman admin sudah ada kemungkinan di folder app/dashboard  tapi kamu perlu crosscheck juga.

1. tambahkan fitur dan halaman yang perlu di handle di user misal tadi fitur trak order maka harus ada fitur di admin untuk mengatur status order tersebut.


Note : Untuk fitur admin beberapa udah ada yang di buat oleh team kami di example/admin/ tapi mungkin itu duplikat dengan fitur yang udah ada. kamu bisa jadikan itu sebagai referensi dan tambahkan fitur yang ada di example jika belum ada dengan yang asli.!