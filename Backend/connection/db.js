const mysql = require("mysql");

 const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"testuser"
});
con.connect((err)=>{
    if(err){
        console.warn("error");
    }else{
        console.warn("connected")
    }
});

module.exports = con;