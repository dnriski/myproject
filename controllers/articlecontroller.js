module.exports = {
  login: (req, res) =>
    res.render("./menu/login", {
      title: "Halaman Login",
    }),
  greet: (req, res) => {
    const name = req.query.name;
    res.render("greet", { name });
  },
  home: (req, res) => {
    res.render("./index", {
      title: "Halaman Home",
    });
  },

  //halaman about
  about: (req, res) => {
    res.render("./contact/about", {
      title: "Halaman about",
    });
  },
  //halaman contact

  // contact: async (req, res) => {
  //   const contacts = await Contact.find();

  //   res.render("./contact/contact", {
  //     title: "Halaman data Pelanggan",
  //     contacts,
  //     msg: req.flash("msg"),
  //   });
  // },

  //halaman form tambah data (sebelum detail)
  addcontact: (req, res) => {
    res.render("./contact/add-contact", {
      title: "Form Tambah Data Contact",
    });
  },
};
