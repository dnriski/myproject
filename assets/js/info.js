//Jumbotron
const judul = document.getElementById("judul");
judul.innerHTML = "Selamat Datang di Tokopakedi";
const thumb = document.querySelector("div p.lead");
thumb.innerHTML = "Lengkapi outfit harianmu dengan belanja di sini <i class='bi bi-hand-thumbs-up-fill' style='color:red;'></i> <i class='bi bi-hand-thumbs-up-fill' style='color:red;'></i>";
const menu2 = document.querySelectorAll(".menu");
menu2[0].innerHTML = "Belanja";
menu2[1].innerHTML = "List";
//Akhir Jumbotron

//Content
const jdlContent = document.querySelector("section h2");
jdlContent.innerHTML = "Produk Kami";
const namaProduk = document.querySelectorAll(".card-title");
namaProduk[0].innerHTML = "Shoes";
namaProduk[1].innerHTML = "Arloji";
namaProduk[2].innerHTML = "Jacket";
namaProduk[3].innerHTML = "Necklace";
namaProduk[4].innerHTML = "Glasses";
namaProduk[5].innerHTML = "Hat";

const isiProduk = document.querySelectorAll(".card-text");
isiProduk[0].innerHTML = "Sepatu ini sangat cocok untuk dipakai bepergian dan sangat nyaman dipakai";
isiProduk[1].innerHTML = "Tampil menawan dan mewah dengan arloji dari molex";
isiProduk[2].innerHTML = "Dibuat dengan bahan berkualitas dan sangat nyaman dipakai";
isiProduk[3].innerHTML = "Yuk!! beli dan berikan pada orang tersayang xixixi";
isiProduk[4].innerHTML = "Tampil percaya diri depan semua orang dengan memakai produk dari eyeblind";
isiProduk[5].innerHTML = "Selain keren juga terhindar dari panas matahari";
//AkhirContent

//About
const jdlContent2 = document.querySelector("section.mt-5 div h2");
jdlContent2.innerHTML = "Belanja di Tokopakedi";

const about = document.querySelectorAll(".about");
about[0].innerHTML = "Tokopakedi menyediakan fashion dan aksesoris yang berkualitas untuk memenuhi kebutuhan fashion di masa sekarang.";
about[2].innerHTML = "Dapatkan Promo menarik dengan selalu belanja di Tokopakedi, juga ada banyak diskon menarik serta cashback dan free ongkir ";
about[1].innerHTML = "Kami menyediakan berbagai produk lokal dan internasional yang berkualitas dengan harga yang terjangkau. Kami akan selalu mengupdate produk produk terbaru. Tampil keren dengan produk dari kami.";
about[3].innerHTML = "Tokopakedi akan tersedia untuk versi mobile";
//Akhir About

const btn = document.querySelectorAll(".cardbtn");
btn[0].innerHTML = "Lihat Produk";
btn[1].innerHTML = "Lihat Produk";
btn[2].innerHTML = "Lihat Produk";
btn[3].innerHTML = "Lihat Produk";
btn[4].innerHTML = "Lihat Produk";
btn[5].innerHTML = "Lihat Produk";
