var mysql = require("mysql");

var baglanti = mysql.createConnection({//Bağlantı bilgilerini tanımlama
    host:"localhost",
    user:"root",
    pass:"",
    database:"staj_takip"
});

baglanti.connect(function(err){//Bağlantıyı başlatma 
    if(err) throw err;//Bağlantı esnasında hata kontrolü
    /*Bağlantı başarılıysa yapılacaklar*/
    console.log("Bağlantı başarılı!");
  });
  
const express = require("express");
const ejs = require("ejs");
const companyRoute = require("./routes/companyRoute");
const studentRoute = require("./routes/studentRoute");
const intershipManagerRoute = require("./routes/intershipManagerRoute");
const indexRoute = require("./routes/indexRoute");
const app = express();

app.use(express.urlencoded({ extended: true })) // body altındaki verilere erişmek için. Iç içe nesne göndermek için kullanılır.
app.set("view engine", "ejs");
app.use(express.static(__dirname + ""));
app.use("/index", indexRoute);
app.use("/company", companyRoute);
app.use("/intershipmanager", intershipManagerRoute);
app.use("/student", studentRoute);

const port = 5050;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
