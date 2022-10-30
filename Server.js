const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const res = require('express/lib/response');

/*
    Credits:
    w3school - for the email backend
    form, severside idea - david morgolis.
*/

var Main_Array = [];

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Create frontend
app.use(express.static(path.join(__dirname, 'public')));

// Login to our Email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xxxxxxx',
      pass: 'yyyyyyyy'
    }
  });

/*
  Reading the Database file and pushing the data into our global main array.
*/
fs.readFile('db_users.json', (err, data) => {
    if (err) throw err;
    let usersJson = JSON.parse(data);
    usersJson.users.forEach(function (entry) {
        Main_Array.push(entry);
    });
});

app.post('/email', function (req, res) {
    /*
        Backend sending mail 
        works with nodemailer. frontend sending a form to the backend and the backend 
        send email to our mail with information from the form in the frontend.
        function will send a alert to the user in the frontend.
    */
    const command = req.body;
    let alert;
    let mailOptions = {
        from: 'archiproject1234@gmail.com',
        to: 'archiproject1234@gmail.com',
        subject: `התקבל אמייל מ${command.firstname}`,
        text: `שם:${command.firstname}\nשם משפחה:${command.lastname}\nאמייל לחזרה:${command.email}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            alert = 'האמייל לא נשלח נסה במועד מאוחר יותר';
        } else {
            alert = 'האמייל נשלח בהצלחה !';
        }
        res.send(alert);
      }); 
});

app.post('/loggin', function (req, res) 
{
    /*
        Backend Login
        function recives form from the frontend and matches the form username, password with our database
        if log in is sucssesfull the backend returns to the frontend of the user that the login was sucssesfull 
        and redirect to the main page
        if log in is failed a message will appear in the front-end that one of the options(password or name) is wrong
     */
    const command = req.body;
    const updatedTable = executeCommand(command);
    res.send(updatedTable);
});


app.listen(3000, function () 
{
    console.log("Server side is Live");
    console.log("Watch Frontend at http://localhost:3000/");    
});

function executeCommand(command) 
{
    /*
        function getting a command which is username and password from the frontend 
        the function loops through all the users inside the database and searching if the 
        username and password matching to one of the users inside the database
        function will return the username status (logged = 1) and his name.
    */
    const { userName, userPassword } = command;
    let logged = 0, fullname = 'none';
    for (let i = 0; i < Main_Array.length; i++) 
    {
        if (userName == Main_Array[i].username) 
        {
            if (userPassword == Main_Array[i].password)
                logged = 1;
                fullname = Main_Array[i].firstname + ' ' + Main_Array[i].lastname;
        }
    }
    return { logged,  fullname};
}


