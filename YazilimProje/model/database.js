var mysql = require("mysql");

var baglanti = mysql.createConnection({//Bağlantı bilgilerini tanımlama
    host:"localhost",
    user:"root",
    pass:"",
    database:"staj_takip"
});

baglanti.connect(function(err){//Bağlantıyı başlatma 
    if(err) {
       
        console.log('Bağlantı hatası');
    }
    console.log("Bağlantı başarılı!");
   
    });