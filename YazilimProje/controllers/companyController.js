var mysql = require("mysql");

var baglanti = mysql.createConnection({//Bağlantı bilgilerini tanımlama
  host:"localhost",
  user:"root",
  pass:"",
  database:"staj_takip"
});


exports.getCompanyPage = (req, res) => {
  res.status(200).render("company", {
    page_name: "company",
  });
};

exports.getApplicantPage = (req, res) => {
  const staj_ID =  req.params.staj_ID;
  var sorgu = "SELECT stajlar.staj_ID, ogrenci.ogrenci_ID, ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad, ogrenci.bolum_ID FROM ((ogrenci_staj INNER JOIN ogrenci ON ogrenci_staj.ogrenci_ID = ogrenci.ogrenci_ID) INNER JOIN stajlar ON ogrenci_staj.staj_ID = stajlar.staj_ID)  WHERE ogrenci_staj.staj_ID ="+staj_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.status(200).render("applicant", {
      page_name: "applicant",
      results: results
    });
  });
};

exports.getCertificatePage = (req, res) => {
  const staj_ID = req.params.staj_ID;
  const ogrenci_ID = req.params.ogrenci_ID;
  var sorgu = "SELECT ogrenci.ogrenci_ID, ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad, staj_bilgisi.staj_baslama_tarih, staj_bilgisi.staj_bitis_tarih FROM staj_bilgisi INNER JOIN ogrenci ON staj_bilgisi.ogrenci_ID = ogrenci.ogrenci_ID WHERE staj_bilgisi.staj_ID =" + staj_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.status(200).render("certificate", {
      page_name: "certificate",
      results: results
    });
  });
};

exports.getEvaluationPage = (req, res) => {
  const staj_ID = req.params.staj_ID;
  const ogrenci_ID = req.params.ogrenci_ID;
  var sorgu = "SELECT ogrenci.ogrenci_ID, ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad, staj_bilgisi.staj_baslama_tarih, staj_bilgisi.staj_bitis_tarih FROM staj_bilgisi INNER JOIN ogrenci ON staj_bilgisi.ogrenci_ID = ogrenci.ogrenci_ID WHERE staj_bilgisi.staj_ID =" + staj_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.status(200).render("evaluation", {
      page_name: "evaluation",
      results: results
    });
  });
};

exports.getInternshipBookPage = (req, res) => {
  const staj_ID = req.params.staj_ID;
  const ogrenci_ID = req.params.ogrenci_ID;
  var sorgu = "SELECT * FROM staj_defteri INNER JOIN ogrenci ON staj_defteri.ogrenci_ID = ogrenci.ogrenci_ID WHERE staj_defteri.staj_ID =" + staj_ID + " AND staj_defteri.ogrenci_ID=" + ogrenci_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.status(200).render("internshipBook", {
      page_name: "internshipBook",
      results: results
    });
  });
};

exports.internshipBookAccept = (req, res) => {
  const staj_ID = req.params.staj_ID;
  const ogrenci_ID = req.params.ogrenci_ID;
  const staj_defteri_ID = req.params.staj_defteri_ID;
  var sorgu = "UPDATE sonuclandirma SET staj_defteri_onay = 1 WHERE staj_defteri_ID =" + staj_defteri_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.redirect('/company/approved/internshipBook/' + staj_ID + "/" + ogrenci_ID)
  });
};

exports.internshipBookReject = (req, res) => {
  const staj_ID = req.params.staj_ID;
  const ogrenci_ID = req.params.ogrenci_ID;
  const staj_defteri_ID = req.params.staj_defteri_ID;
  var sorgu = "UPDATE sonuclandirma SET staj_defteri_onay = 0 WHERE staj_defteri_ID =" + staj_defteri_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.redirect('/company/approved/internshipBook/' + staj_ID + "/" + ogrenci_ID)
  });
};

exports.getApprovedPage = (req, res) => {
  const staj_ID = req.params.staj_ID;
  var sorgu = "SELECT * FROM ((ogrenci_staj INNER JOIN staj_bilgisi ON ogrenci_staj.staj_ID = staj_bilgisi.staj_ID AND ogrenci_staj.ogrenci_ID= staj_bilgisi.ogrenci_ID) INNER JOIN ogrenci ON ogrenci_staj.ogrenci_ID= ogrenci.ogrenci_ID) WHERE ogrenci_staj.onaylama =1 AND ogrenci_staj.staj_ID=" + staj_ID;// Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.status(200).render("approved", {
      page_name: "approved",
      results: results
    });
  });
};

exports.getStudentReviewPage = (req, res) => {
  const ogrenci_ID =  req.params.ogrenci_ID;
  const staj_ID = req.params.staj_ID;
  var sorgu = "SELECT stajlar.staj_ID, ogrenci.ogrenci_ID ,ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad, ogrenci.sinif,ogrenci.ortalama,ogrenci.egitim_seviyesi,ogrenci.telefon,ogrenci.e_mail,ogrenci.sertifika,ogrenci.proje_adi FROM ogrenci,stajlar WHERE ogrenci.ogrenci_ID  ="+ ogrenci_ID+" AND stajlar.staj_ID = "+staj_ID; // Sorgu
  baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
    if (err) throw err;
    res.status(200).render("studentReview", {
      page_name: "studentReview",
      results: results
    });
  });
};


exports.getInternshipCreatePage = (req, res) => {
  res.status(200).render("internshipCreate", {
    page_name: "internshipCreate",
  });
};


exports.sendinternship = (req, res) => {
  const staj_adi = req.body.staj_adi;
  const s_yapilabilecek_tarih = req.body.s_yapilabilecek_tarih;
  const s_basvuru_tarih = req.body.s_basvuru_tarih;
  const kontenjan = req.body.kontenjan;
  const okul = req.body.okul;
  const bolum = req.body.bolum;
  const fakulte = req.body.fakulte;
  const sinif = req.body.sinif;
  const ortalama = req.body.ortalama;
  const telefon = req.body.telefon;
  const e_mail = req.body.e_mail;
  const linkedin = req.body.linkedin;
  const dil_adi = req.body.dil_adi;
  const dil_seviye = req.body.dil_seviye;
  const proje_adi = req.body.proje_adi;
  const proje_aciklamasi = req.body.proje_aciklamasi;
  const yetkinlik_adi = req.body.yetkinlik_adi;
  const yetkinlik_seviye = req.body.yetkinlik_seviye;
  const yetkinlik_aciklama = req.body.yetkinlik_aciklama;
  var sorgu = "INSERT INTO `stajlar`(`staj_adi`, `s_yapilabilecek_tarih`, `s_basvuru_tarih`, `kontenjan`, `okul`, `bolum`, `fakulte`, `sinif`, `ortalama`, `telefon`, `e_mail`, `linkedin`, `dil_adi`, `dil_seviye`, `proje_adi`, `proje_aciklamasi`, `yetkinlik_adi`, `yetkinlik_seviye`, `yetkinlik_aciklama`, `basvuran_sayisi`, `firma_ID`, `sigorta_ID`,`basvuranlar`,`onaylananlar`) VALUES ('"+staj_adi+"','"+s_yapilabilecek_tarih+"','"+s_basvuru_tarih+"','"+kontenjan+"', '"+okul+"','"+bolum+"','"+fakulte+"','"+sinif+"','"+ortalama+"','"+telefon+"','"+e_mail+"','"+linkedin+"','"+dil_adi+"','"+dil_seviye+"','"+proje_adi+"','"+proje_aciklamasi+"','"+yetkinlik_adi+"','"+yetkinlik_seviye+"','"+yetkinlik_aciklama+"','0','3','1','0','0')"; // Sorgu

  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    
  });


  // var sorgu1 = "INSERT INTO `s_tur`(`staj_turu`) VALUES ('"+req.body.staj_turu+"')"; // Sorgu
  // baglanti.query(sorgu1,function(err, results){//Sorguyu çalıştırma
  //   if(err) throw err;
  // });
  // var sorgu2 = "INSERT INTO `departmanlar`(`departman`)  VALUES ('"+req.body.departman+"')"; // Sorgu
  // baglanti.query(sorgu2,function(err, results){//Sorguyu çalıştırma
  //   if(err) throw err;
  // });

  // var sorgu3 = "INSERT INTO `sigorta`(`sigorta_durum`) VALUES ('"+req.body.sigorta_durum+"')"; // Sorgu
  // baglanti.query(sorgu3,function(err, results){//Sorguyu çalıştırma
  //   if(err) throw err;
  // });

  // var sorgu4 = "INSERT INTO `s_program`(`s_program_adi`) , `staj_program`(`s_program_ID`)  VALUES ('"+req.body.s_program_adi+"')"; // Sorgu
  // baglanti.query(sorgu4,function(err, results){//Sorguyu çalıştırma
  //   if(err) throw err;
  // });

  };
  exports.getInternshipsPage = (req, res) => {
    var sorgu = "SELECT stajlar.staj_ID, stajlar.staj_adi, stajlar.basvuran_sayisi FROM `stajlar` WHERE stajlar.firma_ID = 3";// Sorgu
    baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
      if (err) throw err;
      res.status(200).render("internships", {
        page_name: "internships",
        results: results
      });
    });
  };
  
  exports.getDeleteInternships = (req, res) => {
    const staj_ID =  req.params.staj_ID;
    var sorgu = "DELETE FROM `stajlar` WHERE staj_ID="+staj_ID;
    baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
      if(err) throw err;
      res.redirect('/company/internships')
    });
  };
  
  
  exports.getInternshipView = (req, res) => {
    const staj_ID =  req.params.staj_ID;
    var sorgu = "SELECT stajlar.staj_ID ,stajlar.s_yapilabilecek_tarih, stajlar.s_basvuru_tarih,stajlar.kontenjan,departmanlar.departman, stajlar.ortalama FROM ((staj_departman INNER JOIN stajlar ON staj_departman.staj_ID = stajlar.staj_ID ) INNER JOIN departmanlar ON staj_departman.departman_ID = departmanlar.departman_ID) WHERE stajlar.staj_ID  ="+ staj_ID;// Sorgu

      var sorgu1 = "SELECT s_program.s_program_adi FROM ((staj_program INNER JOIN stajlar ON staj_program.staj_ID = stajlar.staj_ID ) INNER JOIN s_program ON staj_program.s_program_ID = s_program.s_program_ID) WHERE stajlar.staj_ID  ="+staj_ID;// Sorgu
      var sorgu2 = "SELECT s_tur.staj_turu, stajlar.staj_ID FROM ((staj_tur INNER JOIN stajlar ON staj_tur.staj_ID = stajlar.staj_ID ) INNER JOIN s_tur ON staj_tur.staj_tur_ID = s_tur.staj_tur_ID) WHERE stajlar.staj_ID  ="+staj_ID;// Sorgu
     
      baglanti.query(sorgu, function (err, results) {//Sorguyu çalıştırma
        if (err) throw err;
      baglanti.query(sorgu1, function (err, sonuclar) {//Sorguyu çalıştırma
     if (err) throw err;
     baglanti.query(sorgu2, function (err, result1) {//Sorguyu çalıştırma
      if (err) throw err;
      res.status(200).render("internshipview", {
        page_name: "internshipview",
        results: results,
        sonuclar:sonuclar,
        result1: result1
      });
    });
  });
    });

  };
