const passport = require("passport");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require("jsonwebtoken");
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

const User = require("../models/User");

exports.registerHandle = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Isikan seluruh data" });
  }

  if (password != password2) {
    errors.push({ msg: "Password tidak sama" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password minimal 8 karakter" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email ID sudah terdaftar" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const oauth2Client = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
          "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign({ name, email, password }, JWT_KEY, {
          expiresIn: "300m",
        });
        const CLIENT_URL = "http://" + req.headers.host;

        const output = `
                <h2>Please click on below link to activate your account</h2>
                <p>${CLIENT_URL}/auth/activate/${token}</p>
                <p><b>NOTE: </b> The above activation link expires in 300 minutes.</p>
                `;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId:
              "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken:
              "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken,
          },
        });

        // kirim mail
        const mailOptions = {
          from: '"Tokopakedi" <nodejsa@gmail.com>',
          to: email,
          subject: "Account Verification: NodeJS Auth ✔",
          generateTextFromHTML: true,
          html: output,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            req.flash(
              "error_msg",
              "Something went wrong on our end. Please register again."
            );
            res.redirect("/auth/login");
          } else {
            console.log("Mail sent : %s", info.response);
            req.flash(
              "success_msg",
              "Link aktivasi sudah dikirim ke email anda. Silahkan activasi untuk log in."
            );
            res.redirect("/auth/login");
          }
        });
      }
    });
  }
};

exports.activateHandle = (req, res) => {
  const token = req.params.token;
  let errors = [];
  if (token) {
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
      if (err) {
        req.flash(
          "error_msg",
          "Salah atau link sudah kadaluarsa! Tolong registrasi lagi."
        );
        res.redirect("/auth/register");
      } else {
        const { name, email, password } = decodedToken;
        User.findOne({ email: email }).then((user) => {
          if (user) {
            req.flash("error_msg", "Email sudah terdaftar! Silahkan log in.");
            res.redirect("/auth/login");
          } else {
            const newUser = new User({
              name,
              email,
              password,
            });

            bcryptjs.genSalt(10, (err, salt) => {
              bcryptjs.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    req.flash(
                      "success_msg",
                      "Akun anda sudah aktif. Kamu bisa login sekarang"
                    );
                    res.redirect("/auth/login");
                  })
                  .catch((err) => console.log(err));
              });
            });
          }
        });
      }
    });
  } else {
    console.log("Akun aktivasi error!");
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  let errors = [];

  if (!email) {
    errors.push({ msg: "Silahkan masukkan email" });
  }

  if (errors.length > 0) {
    res.render("forgot", {
      errors,
      email,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        errors.push({ msg: "User dengan Email ID tidak terdaftar!" });
        res.render("forgot", {
          errors,
          email,
        });
      } else {
        const oauth2Client = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
          "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, {
          expiresIn: "30m",
        });
        const CLIENT_URL = "http://" + req.headers.host;
        const output = `
                <h2>Click link dibawah untuk reset password</h2>
                <p>${CLIENT_URL}/auth/forgot/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

        User.updateOne({ resetLink: token }, (err, success) => {
          if (err) {
            errors.push({ msg: "Error resetting password!" });
            res.render("forgot", {
              errors,
              email,
            });
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                type: "OAuth2",
                user: "nodejsa@gmail.com",
                clientId:
                  "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
                clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
                refreshToken:
                  "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
                accessToken: accessToken,
              },
            });

            const mailOptions = {
              from: '"Tokopakedi" <nodejsa@gmail.com>', // sender address
              to: email, // list of receivers
              subject: "Account Password Reset: NodeJS Auth ✔", // Subject line
              html: output, // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                req.flash(
                  "error_msg",
                  "Something went wrong on our end. Please try again later."
                );
                res.redirect("/auth/forgot");
              } else {
                console.log("Mail sent : %s", info.response);
                req.flash(
                  "success_msg",
                  "Link untuk reset password sudah terkirim. Silahkan ikuti instruksi."
                );
                res.redirect("/auth/login");
              }
            });
          }
        });
      }
    });
  }
};

exports.gotoReset = (req, res) => {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
      if (err) {
        req.flash(
          "error_msg",
          "Salah atau link sudah kadaluarsa! Tolong registrasi lagi."
        );
        res.redirect("/auth/login");
      } else {
        const { _id } = decodedToken;
        User.findById(_id, (err, user) => {
          if (err) {
            req.flash("error_msg", "User dengan Email ID tidak terdaftar!");
            res.redirect("/auth/login");
          } else {
            res.redirect(`/auth/reset/${_id}`);
          }
        });
      }
    });
  } else {
    console.log("Password reset error!");
  }
};

exports.resetPassword = (req, res) => {
  var { password, password2 } = req.body;
  const id = req.params.id;
  let errors = [];

  if (!password || !password2) {
    req.flash("error_msg", "Isikan semua data");
    res.redirect(`/auth/reset/${id}`);
  } else if (password.length < 8) {
    req.flash("error_msg", "Password minimal 8 karakter");
    res.redirect(`/auth/reset/${id}`);
  } else if (password != password2) {
    req.flash("error_msg", "Password tidak sama");
    res.redirect(`/auth/reset/${id}`);
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;

        User.findByIdAndUpdate(
          { _id: id },
          { password },
          function (err, result) {
            if (err) {
              req.flash("error_msg", "Error resetting password!");
              res.redirect(`/auth/reset/${id}`);
            } else {
              req.flash("success_msg", "Reset password sukses!");
              res.redirect("/auth/login");
            }
          }
        );
      });
    });
  }
};

exports.loginHandle = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
};

exports.logoutHandle = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
};
