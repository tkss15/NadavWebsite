/*navbar.js
creating a component navbar for all the html pages for them to be equal.

setNavbar - creating a dynamic navbar for the client. the navbar changes dynamicly if the user logged in
and on the user currect location

Logout - function will log out the user. the fuction earse the saved cookie from the user browser
getCookie - function will check if a cookie is saved on the user's browser. 
eraseCookie - function will delete a cookie on the user's browser.

elementIcon, Responsive - function will trigger a css effect on the icon(icon will appear only on phone/table screens)
function will also change the navigtion bar to a responsive navigation.
 */
function setNavbar()
{
    let navElem = document.createElement('nav');
    const elementHeader = document.querySelector('header');
    let logo = `<div class="flex">\
                    <a href="/index.html" class="logo">\ 
                        <div class="parallelogram"></div>\
                        <div class="parallelogram"></div>\
                        <div class="parallelogram"></div>\
                        <div class="parallelogram"></div>\
                    </a>\
                    <div>\
                        <h2>נדב שניאור</h2>\
                        <p>רואה חשבון(ועורך דין)</p>\
                    </div>\
                    <div class="icon">\
                        <div class="bar1"></div>\
                        <div class="bar2"></div>\
                        <div class="bar3"></div>\
                    </div>\
                </div>`;
    elementHeader.innerHTML = logo;
    elementHeader.appendChild(navElem);
    let nav_html = `<ul class="navbar-nav">\
                    <li class="navbar-item">\
                        <a class="navbar-link" href="../pages/Aboutus.html">אודות</a>\
                    </li>\
                    <li class="navbar-item">\
                        <div class="dropdown">\
                            <a class="navbar-link" href="javascript:void(0);">תחומי פעילות</a>\
                            <ul class="dropdown-content">\
                                <a href="../pages/Services.html">ביקורת וראיית חשבון</a>\
                                <a href="../pages/Services.html">מס הכנסה ומס שבח</a>\
                                <a href="../pages/Services.html">הערכת שווי פירמות</a>\
                                <a href="../pages/Services.html">יעוץ עיסקי וגיהוץ אשראי</a>\
                                <a href="../pages/Services.html">ליווי ברכישת והקמת עסקים</a>\
                                <a href="../pages/Services.html">חוות דעת בסכסוכים משפטיים</a>\
                            </ul>\
                        </div>\
                    </li>\
                    <li class="navbar-item">\
                        <a class="navbar-link" href="../pages/contect.html">צור קשר</a>\
                    </li>`;
                    if(getCookie('logged'))
                    {
                        nav_html += `<li class="navbar-item">\
                        <div class="settings-user">\
                        <a class="navbar-link" href="javascript:void(0);">ברוך הבא ${getCookie('name')}</a>\
                        <ul class="settings-dropdown">\
                            <a href="../pages/page_upload.html"><i class="fas fa-upload fa-1x"></i> העלאת קבצים</a>\
                            <a href="../pages/page_upload.html"><i class="fas fa-file fa-1x"></i> צפייה בקבצים קיימים</a>\
                            <a href=""><i class="fas fa-comment fa-1x"></i> צאט עם בעל העסק</a>\
                            <a href="javascript:void(0);" onclick="Logout()"><i class="fas fa-door-open fa-1x"></i> התנתק</a>\
                        </ul>\
                        </div>\
                        </li>`;
                    }
                    else
                    {
                        nav_html +=`<li class="navbar-item">\
                        <a id="LoginButton" class="navbar-link" href="../pages/login.html">התחבר</a>\
                        </li>`;
                    }
                    nav_html += '</ul>';
    navElem.innerHTML = nav_html;
}
function Logout()
{
    if(getCookie('logged'))
    {
        eraseCookie('logged');
        eraseCookie('name');
        window.location.href = "../../index.html";
    }
}

setNavbar();

/*Credits to Reddit. */
function eraseCookie(name) {   
 document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

const elementIcon = document.querySelector('.icon');
elementIcon.addEventListener('click', () => {
    elementIcon.classList.toggle('change');
    Responsive()
});

function Responsive()
{
    const elementResponsive = document.querySelector('.navbar-nav');

    elementResponsive.classList.toggle('responsive');
    elementResponsive.style.animation = 'example 1.5s ease';
}