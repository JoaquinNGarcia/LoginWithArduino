const express = require("express");
const socketIo = require("socket.io");
const app = express();
//la biblioteca necesita http
//hay que pasarle el modulo del servidor, que lo tiene app
const server = require("http").createServer(app);
//listen  es un modulo del socket que le pasas un servidor para que escuche ahi
const io = socketIo.listen(server);
const cron = require("node-cron");

const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.status(200).send("Hello World!");
})

server.listen(3030, () => {
  console.log("server on port http://localhost:3030", 3030);
});

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM3", { baudRate: 9600 });
//const parser = port.pipe(new Readline({ delimiter: "\n" }));
var parser = new Readline();
port.pipe(parser);

// Read the port data
parser.on("open", () => {
  console.log("serial port open");
});
parser.on("data", data => {
  //console.log(JSON.parse(data).Temperatura);
  //console.log(JSON.parse(data).Humedad);
  //console.log(JSON.parse(data).Viento);
  try {
    io.emit("arduinodata", JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
});

port.on("err", function(err) {
  console.log(err.message);
});

io.on("descargar", contenido => {
  console.log("descargó");
  fs.writeFile("informacion.txt", contenido, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Se guardo el archivo");
  });
});

// Configuramos el horario de ENCENDIDO de luces //
//min, hr
cron.schedule("04 15 * * *", function() {
  port.write("LED91\n", err => {
    if (err) {
      return console.log("Error intentando escribir en puerto: ", err.message);
    }
    console.log("PRENDIENDO LED VERDE POR HORARIO");
  });
});
// Configuramos el horario de APAGADO de luces //
//minutos, horas
cron.schedule("09 15 * * *", function() {
  port.write("LED90\n", err => {
    if (err) {
      return console.log("Error intentando escribir en puerto: ", err.message);
    }
    console.log("APAGANDO LED VERDE POR HORARIO");
  });
});

io.on("connection", function(socket) {
  socket.on("sendemail", function(sensor) {
    /*let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mail_prueba@gmail.com', // email que se usa para enviar el correo
        pass: '' //contraseña de ese email
      }
    });
    let mailOptions = {
      from: '"usuario prueba" <mail_prueba@gmail.com>', //quien lo envio
      to: 'mail_prueba@gmail.com', //a quien lo envio
      subject: 'alerta', //el asunto
      text: `el sensor ${sensor} ha pasado los limites` //el contenido del mail
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
      res.render("index");
    });*/
    let transporter = nodeMailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: "SSLv3"
      },
      //secure: true,
      auth: {
        user: "finalarqav1@outlook.com", // email que se usa para enviar el correo
        pass: "Final123" //contraseña de ese email
      }
    });
    let mailOptions = {
      from: '"usuario prueba" <finalarqav1@outlook.com>', //quien lo envio
      to: "usuario_prueba@gmail.com", //a quien lo envio
      subject: "alerta", //el asunto
      text: `el sensor ${sensor} ha pasado los limites` //el contenido del mail
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
      res.render("index");
    });
  });
});
