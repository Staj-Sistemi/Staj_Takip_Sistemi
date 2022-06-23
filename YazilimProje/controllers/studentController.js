var mysql = require("mysql");

var baglanti = mysql.createConnection({//Bağlantı bilgilerini tanımlama
  host:"localhost",
  user:"root",
  pass:"",
  database:"staj_takip"
});



exports.getStudentPage = (req, res) => {
  res.status(200).render("student", {
    page_name: "student",
  });
};

exports.getProfilePage = (req, res) => {
    var sorgu = "SELECT * FROM `ogrenci` WHERE ogrenci_ID = 1";// Sorgu
    baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    	if(err) throw err;
      var sorgu2 = "SELECT * FROM `bolumler` WHERE bolum_ID =" + results[0].bolum_ID;
      //console.log(results)
      baglanti.query(sorgu2,function(err, result){//Sorguyu çalıştırma
        if(err) throw err;
        //console.log(result)
        res.status(200).render("profile", {
          page_name: "profile",
          results: results,
          result: result
        });
      });
    	//console.log("Veritabanı oluşturuldu!");
    });
};

exports.getEducationInformationPage = (req, res) => {
  var sorgu = "SELECT okul.okul_adi, fakulte.fakulte_adi, bolumler.bolum, ogrenci.egitim_seviyesi, ogrenci.sinif, ogrenci.ortalama, ogrenci.ogrenci_numara FROM (((ogrenci INNER JOIN bolumler ON ogrenci.bolum_ID = bolumler.bolum_ID) INNER JOIN fakulte ON ogrenci.fakulte_ID = fakulte.fakulte_ID) INNER JOIN okul ON ogrenci.okul_ID = okul.okul_ID) WHERE ogrenci.ogrenci_ID = 1";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.status(200).render("educationInformation", {
      page_name: "educationInformation",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });

};



exports.getProjectPage = (req, res) => {
  var sorgu = "SELECT proje_adi, proje_aciklamasi, sertifika, sertifika_aciklamasi, staj_tecrube, seminer FROM ogrenci WHERE ogrenci.ogrenci_ID = 1";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.status(200).render("project", {
      page_name: "project",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.getCompaniesPage = (req, res) => {
  var sorgu = "SELECT firma_ID,firma_adi, lokasyon, kurulus_tarihi, personel_sayisi FROM firma WHERE durum='Onaylı'";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
   
    res.status(200).render("companies", {
      page_name: "companies",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.getApprovedAppealPage = (req, res) => {
  var sorgu = "SELECT firma.firma_adi, firma.firma_ID, basvurular.tarih_araligi, ogrenci.ogrenci_ID, staj_basvuru.durumu, staj_basvuru.staj_basvuru_ID FROM (((staj_basvuru INNER JOIN basvurular ON staj_basvuru.basvuru_ID = basvurular.basvuru_ID) INNER JOIN firma ON staj_basvuru.firma_ID = firma.firma_ID) INNER JOIN ogrenci ON staj_basvuru.ogrenci_ID = ogrenci.ogrenci_ID) WHERE staj_basvuru.durumu='Kesinleştirilme bekleniyor' || staj_basvuru.durumu='Kesinleştirildi' && ogrenci.ogrenci_ID=1";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.status(200).render("approvedAppeal", {
      page_name: "approvedAppeal",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.getExpectedAppealPage = (req, res) => {
  var sorgu = "SELECT firma.firma_adi, basvurular.tarih_araligi, staj_basvuru.durumu, staj_basvuru.staj_basvuru_ID FROM (((staj_basvuru INNER JOIN basvurular ON staj_basvuru.basvuru_ID = basvurular.basvuru_ID) INNER JOIN firma ON staj_basvuru.firma_ID = firma.firma_ID) INNER JOIN ogrenci ON staj_basvuru.ogrenci_ID = ogrenci.ogrenci_ID) WHERE staj_basvuru.durumu='Bekleniyor...' && ogrenci.ogrenci_ID=1";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.status(200).render("expectedAppeal", {
      page_name: "expectedAppeal",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.getRejectedAppealPage = (req, res) => {

  var sorgu = "SELECT firma.firma_adi, basvurular.tarih_araligi, staj_basvuru.durumu, staj_basvuru.staj_basvuru_ID FROM (((staj_basvuru INNER JOIN basvurular ON staj_basvuru.basvuru_ID = basvurular.basvuru_ID) INNER JOIN firma ON staj_basvuru.firma_ID = firma.firma_ID) INNER JOIN ogrenci ON staj_basvuru.ogrenci_ID = ogrenci.ogrenci_ID) WHERE staj_basvuru.durumu='Reddedilmiş' && ogrenci.ogrenci_ID=1";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.status(200).render("rejectedAppeal", {
      page_name: "rejectedAppeal",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });

};

exports.getInternshipsNotebookPage = (req, res) => {
  var sorgu = "SELECT staj_defteri.staj_defteri_ID, staj_defteri.tarih, staj_defteri.yapilan_is, staj_defteri.firma_ID, staj_defteri.ogrenci_ID, staj_defteri.aciklama, firma.firma_adi FROM staj_defteri INNER JOIN firma ON staj_defteri.firma_ID = firma.firma_ID WHERE staj_defteri.ogrenci_ID = 1 ";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
   
    res.status(200).render("internshipsNotebook", {
      page_name: "internshipsNotebook",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });
  

};

exports.getReportAddPage = (req, res) => {
  var sorgu = "SELECT firma.firma_adi, firma.firma_ID, ogrenci.ogrenci_ID, ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad FROM ((staj_raporlar INNER JOIN firma ON staj_raporlar.firma_ID = firma.firma_ID) INNER JOIN ogrenci ON staj_raporlar.ogrenci_ID = ogrenci.ogrenci_ID) WHERE ogrenci.ogrenci_ID = 1";
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
      //console.log(results)
      if (results == '') {
        res.redirect('./internshipsNotebook')
      }
      else {
        res.status(200).render("reportAdd", {
          page_name: "reportAdd",
          results: results
        });
      }
  });

};

exports.getReportEditPage = (req, res) => {
  const staj_defteri_ID =  req.params.staj_defteri_ID
  
  var sorgu = "SELECT ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad, firma.firma_adi, staj_defteri.tarih, staj_defteri.staj_defteri_ID, staj_defteri.yapilan_is, staj_defteri.aciklama FROM ((staj_defteri INNER JOIN ogrenci ON staj_defteri.ogrenci_ID = ogrenci.ogrenci_ID) INNER JOIN firma ON staj_defteri.firma_ID = firma.firma_ID) WHERE staj_defteri_ID="+staj_defteri_ID;
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
   
    res.status(200).render("reportEdit", {
      page_name: "reportEdit",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });

};

exports.getResultPage = (req, res) => {
  var sorgu ="SELECT firma.firma_adi, basvurular.tarih_araligi, gecerlilik.durum FROM (((gecerlilik INNER JOIN staj_raporlar ON gecerlilik.staj_raporlar_ID = staj_raporlar.staj_raporlar_ID) INNER JOIN basvurular ON staj_raporlar.staj_basvuru_ID = basvurular.basvuru_ID) INNER JOIN firma ON basvurular.firma_ID = firma.firma_ID) WHERE gecerlilik.ogrenci_ID = 1";
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
   
    res.status(200).render("result", {
      page_name: "result",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.sendUpdateProfile = (req, res) => {
  //console.log(req.body)
  //console.log("girdi")

  var sorgu = "UPDATE `ogrenci` SET `ogrenci_TC`='"+req.body.TC+"', "+"`e_mail`='"+req.body.Mail+"', "+"`telefon`='"+req.body.Tel+"', "+"`dogum_yeri`='"+req.body.Dogum_yeri+"', "+"`dogum_tarihi`='"+req.body.dogum_tarihi+"', "+"`adres`='"+req.body.Adres+"', "+"`ehliyet`='"+req.body.Ehliyet_Durum+"', "+"`cinsiyet`='"+req.body.Cinsiyet+"' "+" WHERE ogrenci_ID=1";
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
  
  });

  // res.redirect('/student')
  };

  exports.sendUpdateProject = (req, res) => {
    //console.log(req.body)
    var sorgu = "UPDATE `ogrenci` SET `proje_adi`='"+req.body.proje+"', "+"`proje_aciklamasi`='"+req.body.proje_aciklama+"', "+"`sertifika`='"+req.body.sertifika+"', "+"`sertifika_aciklamasi`='"+req.body.sertifika_aciklama+"', "+"`staj_tecrube`='"+req.body.staj+"', "+"`seminer`='"+req.body.seminer+"' "+" WHERE ogrenci_ID=1";
    baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(results)
    
    });
    //res.redirect('/student')
    };

exports.getParticipationPage = (req, res) => {

  var sorgu = "SELECT * FROM katilim_belgesi WHERE ogrenci_ID=1 ";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
   
    res.status(200).render("participation", {
      page_name: "participation",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });
};

exports.getCompanyInformationPage = (req, res) => {
  const id =  req.params.id
  //console.log(req.params)
  // var sorgu = "SELECT firma.firma_ID, firma.firma_adi, firma.lokasyon, firma.kurulus_tarihi, firma.personel_sayisi, basvurular.calisma_alani, basvurular.gereksinim, basvurular.kontenjan FROM firma INNER JOIN basvurular ON firma.firma_ID = basvurular.firma_ID WHERE firma.firma_ID="+id;
  var sorgu = "SELECT firma_ID,firma_adi, lokasyon, kurulus_tarihi, personel_sayisi FROM firma WHERE firma_ID="+id;// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    var sorgu2 = "SELECT * FROM `basvurular` WHERE firma_ID="+id;
    baglanti.query(sorgu2,function(err, result){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(result)
      res.status(200).render("companyInformation", {
        page_name: "companyInformation",
        results : results,
        result: result,
        ogrenci: 1,
        id: req.params.id
      });
    });
    //console.log("Veritabanı oluşturuldu!");
  });
};


exports.getApply = (req, res) => {
  const firma =  req.params.firma
  const basvuru =  req.params.basvuru
  const ogrenci =  req.params.ogrenci
  // INSERT INTO `staj_basvuru`(`basvuru_ID`, `firma_ID`, `ogrenci_ID`, `durumu`) VALUES ('5','2','1','Bekleniyor')
  var sorgu = "INSERT INTO `staj_basvuru`(`basvuru_ID`, `firma_ID`, `ogrenci_ID`, `durumu`) VALUES ('"+basvuru+"','"+firma+"','"+ogrenci+"','Bekleniyor...')"; // Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.redirect('/student/expectedappeal')
    //console.log("Veritabanı oluşturuldu!");
  });
};

exports.getDelete = (req, res) => {
  const basvuru_ID =  req.params.basvuru_ID
  //console.log(basvuru_ID)
  var sorgu = "UPDATE `staj_basvuru` SET `durumu`= 'Reddedilmiş' WHERE staj_basvuru_ID="+basvuru_ID;
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.redirect('/student/rejectedAppeal')
    //console.log("Veritabanı oluşturuldu!");
  });
};

exports.getApprove = (req, res) => {
  const basvuru_ID =  req.params.basvuru_ID
  const firma_ID =  req.params.firma_ID
  const ogrenci_ID =  req.params.ogrenci_ID

  var sorgu = "UPDATE `staj_basvuru` SET `durumu`= 'Kesinleştirildi' WHERE staj_basvuru_ID="+basvuru_ID;
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    var sorgu2 = "INSERT INTO `staj_raporlar`(`staj_basvuru_ID`, `firma_ID`, `ogrenci_ID`) VALUES ('"+basvuru_ID+"','"+firma_ID+"','"+ogrenci_ID+"')";
    baglanti.query(sorgu2,function(err, result){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(result)
      res.redirect('/student/approvedAppeal')
    });
  });
};

exports.sendReport = (req, res) => {
  const ID =  req.params.ID
  //console.log(ID)
  //console.log(req.body)
  var sorgu = "INSERT INTO `staj_defteri`(`tarih`, `yapilan_is`, `firma_ID`, `ogrenci_ID`, `aciklama`) VALUES ('"+req.body.tarih+"','"+req.body.konu+"','"+req.body.firma_ID+"','"+ID+"','"+req.body.aciklama+"')"; // Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
  });

  //res.redirect('/student')
  };

  exports.getDeleteReport = (req, res) => {
    const staj_defteri_ID =  req.params.staj_defteri_ID
    //console.log(basvuru_ID)
    var sorgu = "DELETE FROM `staj_defteri` WHERE staj_defteri_ID="+staj_defteri_ID;
    baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(results)
      res.redirect('/student/internshipsNotebook')
      //console.log("Veritabanı oluşturuldu!");
    });
  };

  exports.sendUpdateReport = (req, res) => {
    const staj_defteri_ID =  req.params.staj_defteri_ID
    //console.log(req.body)
    //console.log(staj_defteri_ID)

  
    var sorgu = "UPDATE `staj_defteri` SET `tarih`='"+req.body.tarih+"', "+"`yapilan_is`='"+req.body.yapilan_is+"', "+"`aciklama`='"+req.body.aciklama+"' "+" WHERE staj_defteri_ID="+staj_defteri_ID;
    baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(results)
    
    });
  
    // res.redirect('/student')
    };
