//Navbar
const link = document.getElementsByTagName("a")[0];
link.innerHTML = "<h2>Tokopakedi</h2>";

//Akhir Navbar

//footer
const footerInfo = document.querySelectorAll("footer.footer div h2");
footerInfo[0].innerHTML = "Informasi Perusahaan";
footerInfo[1].innerHTML = "Product";
footerInfo[2].innerHTML = "Hubungi Kami";

const footerIsi = document.querySelectorAll("footer.footer div p");
footerIsi[0].innerHTML =
  "Tokopakedi merupakan perusahaan perdagangan busana di Indonesia yang menawarkan koleksi pakaian dan aksesoris";
footerIsi[1].innerHTML = "Busana dan Aksesoris";
footerIsi[2].innerHTML = "<i class='bi bi-telephone'></i> +62823 2287 8769";
footerIsi[3].innerHTML =
  "<i class='bi bi-envelope'></i> nugrohorisk157@gmail.com";

const footerEnd = document.querySelector(".footer-end");
footerEnd.innerHTML =
  " &#169 Copyright 2021 | dibuat dengan <i class='bi bi-heart-fill' style=color:red;></i> | oleh Riski Dwi Nugroho";
