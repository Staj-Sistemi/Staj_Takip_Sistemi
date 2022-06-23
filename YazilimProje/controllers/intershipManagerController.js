var mysql = require("mysql");

var baglanti = mysql.createConnection({//Bağlantı bilgilerini tanımlama
  host:"localhost",
  user:"root",
  pass:"",
  database:"staj_takip"
});

exports.getintershipManagerPage = (req, res) => {
  res.status(200).render("intershipManager", {
    page_name: "intershipManager",
  });
};

exports.getStudentListPage = (req, res) => {
  var sorgu =  "SELECT ogrenci.ogrenci_ID, ogrenci.ogrenci_ad, ogrenci.ogrenci_soyad, fakulte.fakulte_adi ,bolumler.bolum, ogrenci.sinif FROM ((ogrenci INNER JOIN fakulte ON ogrenci.fakulte_ID = fakulte.fakulte_ID) INNER JOIN bolumler ON ogrenci.bolum_ID = bolumler.bolum_ID )";// Sorgu
   baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)

    res.status(200).render("studentList", {
      page_name: "studentList",
      results: results
    });
  });
};

exports.getapprovedIntershipPage = (req, res) => {
  res.status(200).render("approvedIntership", {
    page_name: "approvedIntership",
  });
};

exports.getcompanyListPage = (req, res) => {
  var sorgu =  "SELECT firma.firma_ID, firma.durum, firma.firma_adi, firma.lokasyon, firma.iletisim ,sektor.sektor, calisma_alanlar.calisma_alan FROM ((firma INNER JOIN sektor ON firma.sektor_ID = sektor.sektor_ID) INNER JOIN calisma_alanlar ON firma.calisma_alan_ID = calisma_alanlar.calisma_alan_ID )";// Sorgu  "SELECT firma_ID,firma_adi, lokasyon, iletisim FROM firma ";
 
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)

    res.status(200).render("companyList", {
      page_name: "companyList",
      results: results
    });
  });
   
    //console.log("Veritabanı oluşturuldu!");
};

exports.getStudentAddPage = (req, res) => {

  var sorgu = "SELECT * FROM bolumler";// Sorgu
  var sorgu2 = "SELECT * FROM okul";// Sorgu
  var sorgu3 = "SELECT * FROM fakulte";// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)

    baglanti.query(sorgu2,function(err, result2){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(result)
      baglanti.query(sorgu3,function(err, result3){//Sorguyu çalıştırma
        if(err) throw err;
        res.status(200).render("studentAdd", {
          page_name: "studentAdd",
          results : results,
          result2: result2,
          result3 : result3
        });      
      });
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.getstudentEditPage = (req, res) => {
  const ID =  req.params.ID

  var sorgu = "SELECT * FROM ogrenci WHERE ogrenci_ID="+ID;// Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
   
    res.status(200).render("studentEdit", {
      page_name: "studentEdit",
      results: results
    });
    //console.log("Veritabanı oluşturuldu!");
  });


};

exports.getstudentIntershipPage = (req, res) => {
  res.status(200).render("studentIntership", {
    page_name: "studentIntership",
  });
};

exports.getintershipInformationPage = (req, res) => {
  res.status(200).render("intershipInformation", {
    page_name: "intershipInformation",
  });
};

exports.getApprove = (req, res) => {
  const firma_ID =  req.params.firma_ID

  var sorgu = "UPDATE `firma` SET `durum`= 'Onaylı' WHERE firma_ID="+firma_ID;
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;

    res.redirect('/intershipManager/companyList')
  });
};

exports.getDelete = (req, res) => {
  const firma_ID =  req.params.firma_ID

  var sorgu = "UPDATE `firma` SET `durum`= 'Onaysız' WHERE firma_ID="+firma_ID;
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;

    res.redirect('/intershipManager/companyList')
  });
};


exports.addStudent = (req, res) => {
  //console.log(req.body)
  //console.log("girdi")

  var sorgu = "INSERT INTO `ogrenci`(`ogrenci_ad`, `ogrenci_soyad`, `okul_ID`, `ogrenci_sifre`, `fakulte_ID`, `bolum_ID`, `sinif`, `egitim_seviyesi`, `ortalama`, `ogrenci_numara`) VALUES ('"+req.body.ad+"','"+req.body.soyad+"','"+req.body.okul_ID+"','123123','"+req.body.fakulte_ID+"','"+req.body.bolum_ID+"','"+req.body.sınıf+"','"+req.body.seviye+"','"+req.body.ortalama+"','"+req.body.numara+"')"; // Sorgu
  baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
    if(err) throw err;
    //console.log(results)
    res.redirect('/intershipManager/studentList')
    //console.log("Veritabanı oluşturuldu!");
  });
  };


  exports.sendStudent = (req, res) => {
    const ogrenci_ID =  req.params.ogrenci_ID
    //console.log(ogrenci_ID)
    //console.log(req.body)
    //console.log("girdi")

    var sorgu = "UPDATE `ogrenci` SET `ogrenci_ad`='"+req.body.ad+"', "+"`ogrenci_soyad`='"+req.body.soyad+"', "+"`sinif`='"+req.body.sınıf+"', "+"`ortalama`='"+req.body.ortalama+"', "+"`egitim_seviyesi`='"+req.body.seviye+"', "+"`ogrenci_numara`='"+req.body.numara+"'"+" WHERE ogrenci_ID="+ogrenci_ID;
    baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
      if(err) throw err;
      //console.log(results)
      res.redirect('/intershipManager/studentList')
    });

    };

    exports.deleteStudent = (req, res) => {
      const ogrenci_ID =  req.params.ogrenci_ID
      //console.log(ogrenci_ID)
      //console.log(req.body)
      //console.log("girdi")
  
      var sorgu = "DELETE FROM `ogrenci` WHERE ogrenci_ID="+ogrenci_ID;
      baglanti.query(sorgu,function(err, results){//Sorguyu çalıştırma
        if(err) throw err;
        //console.log(results)
        res.redirect('/intershipManager/studentList')
        //console.log("Veritabanı oluşturuldu!");
      });
  
      };
