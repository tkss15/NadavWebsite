/*login.js
a javascript file that will allow user to send a form from the front end to the back end server
the form will contain the client username and password.

getFormElemenetsValue - gets a form and elementName. Function returning the value inside the argument of elementName.

displayFormContenets - recives a form and parsing the username and password from the form. 
function reset the form and send the command to the server.

sendCommandToServer - function using a fech command in order to make a post request . 
sending the server the client username, password. the fech command waits for the server anwser and then
 parsing the anwser

 handle_response - after the command was recived from the server if the user logged in we save the client 
 log in status and name inside a cookie.
 if not informing the username in his mistake

 setCookie - function gets name, value, days the function will save the data for the amount of days recive
 inside the user browser.
 */


function getFormElementValue(form, elementName) {
    return form.elements[elementName].value;
}
  
  
function displayFormContents(form) {
    const userName = getFormElementValue(form, "username");
    const userPassword = getFormElementValue(form, "password");
    
    const command = {
        userName,
        userPassword,
    }
    form.reset();
    sendCommandToServer(command);
}
  
function sendCommandToServer(command) {
    const url = "http://localhost:3000/loggin";
    fetch(url,
        {
            method: 'post',
            body: JSON.stringify(command),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then(
            response => response.text()
        ).then(
        text => handle_response(text)
      );
}
function handle_response(text) {
    var obj = JSON.parse(text);
    console.log(obj)
    if(obj.logged)
    {
      setCookie('logged',obj.logged,7);
      setCookie('name',obj.fullname,7);
      window.location.href = "../../index.html";
    }
    else
    {
      document.getElementById("FailPassword").innerHTML = "<p>שם או סיסמה שגויים</p>";
      document.getElementById("FailPassword").style.color = 'red';
    }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}