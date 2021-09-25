const util = require('util')
const nodemailer = require("nodemailer");
const express = require('express')
const app = express()
const urlencodedParser = express.urlencoded({ extended: false });
const mysql = require('mysql');
const params = {
    host: "localhost",
    port: '3306', //3306  
    user: "root",
    database: "email", //m toxa
    password: "NTI20201106_sqsw33179", //NTI20201106_sqsw33179
}
try {
    let email = null
    let code = null
    let connection = mysql.createConnection(params);
    const query = util.promisify(connection.query).bind(connection);
    async function ExQueary(query1) {
        const rows = await query(query1);
        console.log(rows);
        return rows
    }

    app.use(express.urlencoded({
        extended: true
      }));

      app.use(express.json());

    app.use(express.static(__dirname + '/static'));

    app.get("/", function (request, response) {
        try {
            response.sendFile(__dirname + "/static/index.html");
        }
        catch {
            console.log(e)
        }
    });

    app.post("/confirm", urlencodedParser, async function (request, response) {
        response.send({
            email: request.body.email,
            code: request.body.check
          })
          if(email==request.body.email)
          {
              try{
              let query2 = "INSERT INTO email (email) VALUES ('"+ email +"')"
              await ExQueary(query2)
              console.log('записали в базу данных')
              }
              catch {
                  console.log('почта уже есть')
              }
          }
          else {console.log('послали')}
        })
    app.post("/register", urlencodedParser, function (request, response) {
        try{
        response.send({
            email: request.body.email,
            code: request.body.code
          })
          console.log(request.body.email)
          console.log(request.body.code)
          email = request.body.email
          if(email==null)
          {
            console.log('пустой маил')
          }
          else {
            code = request.body.code
            var transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                  user: 'findo3184@gmail.com',
                  pass: 'i33a05an'
              }
              });
              transporter.sendMail({
                  from: 'findo3184@gmail.com',
                    to: email,
                    subject: 'Подтверждение почты',
                    html: '<h1>Код для подтверждения почты: </h1>' +'<h1>'+ code + '</h1>'
                  });
          }
        }
        catch {
            console.log(e)
        }
    })










}
catch (e) {
    console.log('ОШИБКА ' + e)
    let connection = mysql.createConnection(params);
    const query = util.promisify(connection.query).bind(connection);
}


app.listen(3000)