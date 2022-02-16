
/*sendemail.js
a javascript file that will allow user to send a form from the front end to the back end server
the form will contain the client full name and email for contect.

displayFormContenets - recives a form and parsing the full name and email from the form. 
function reset the form and send the command to the server.

sendCommandToServer - function using a fech command in order to make a post request . 
sending the server the client full name and email. the fech command waits for the server anwser and then
sending the user an alert with email status (send/failed)

 */

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    displayFormContents(formElement);
});

function displayFormContents(form) 
{
    let command = {};
    const inputElements = document.querySelectorAll('.formclass input');
    inputElements.forEach(formValue => {
        if(formValue.type != 'submit')
        command[formValue.name] = formValue.value;
    });

    form.reset();
    sendFetchCommand(command, 'email');
}


function sendFetchCommand(command, purpose) {
    const url = `http://localhost:3000/${purpose}`;
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
        text => alert(text)
      );
}
