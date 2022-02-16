/*
Cards.js
  Inserting the cards inside the index.html with javascript only.
  cards will be inserted and will be styled with the style.css 
*/


/*
  function arrow createDiv 
  function recives a new element, classname of the element, and a parent( if needed)
  function will create a new element inside the DOM and give it the classname from the arguments
  function will also add the cardElement as a child of the cardAppend.
*/
const createDiv = (cardElement, className, cardAppend) => {
    cardElement = document.createElement('div');
    cardElement.className = className;
    
    if(cardAppend)
    {
        cardAppend.appendChild(cardElement);
    }
    return cardElement;
}

function Main()
{
  /*
    Main function:
    function creates all the cards with javascript as every card have a front,back data
    each card will have his own information, and on a click even will be able to see the back of card.
    example:
    [card front] -> on click -> [card back]
  */
    const cards_front = [
      "ביקורת וראיית חשבון",
       "מס הכנסה ומס שבח",
       "הערכת שווי פירמות",
       "לווי ויעוץ עסקי", 
      "לווי ברכישת והקמת עסקים",
       "חוות דעת בסיכסוכים משפטיים"
      ];
    const cards_back = [
      "השירות כולל רואה חשבון באינטרנט כגון ביקורת ועריכת דוחות כספיים לעצמאים",
       "תכנון ויעוץ בנושאי מס ישראלי ובינלאומי, תוך ניצול הידע והניסיון הרבים שנצברו אצלנו וחידושי החקיקה",
       " ניתוחי דוחות כספיים של פירמות לצורך מכירה מלאה, חלקית או מיזוג וכן הערכת שווי עסקים של בני זוג לצורך איזון משאבים במסגרת הסכמי ממון וגירושין. ",
       " ייעוץ לעסק בפיתוח העסקי שלו תוך יצירת תהליכים שיביאו לשיפור הביצועים שלו וצמיחה מתמשכת.",
       " אם אתם מתכננים להקים עסק חדש, נסייע לכם בכל תהליך הקמתו מגיבוש הרעיון העסקי ועד שלב פתיחת העסק והניהול השוטף.",
       "יש לנו ניסיון רב והצלחות רבות בטיפול בבעיות סבוכות מול רשויות המס, אנחנו יודעים כיצד לגשת ולתקוף כל בעיה – תהיה מסובכת ככל שתהיה."];
    const cards_icons = ["fa-chart-line", "fa-file-invoice-dollar", "fa-calculator", "fa-hands-helping", "fa-balance-scale-right", "fa-file-invoice-dollar"];
    
    const grid_cards = document.querySelector('.grid'); 
    for(let i = 0; i < cards_front.length;  i++ )
    {
      let cardElement, cardInnerElement,cardFrontElement,cardBackElement;
  
      cardElement = createDiv(cardElement, 'flip-card', grid_cards);
      cardInnerElement = createDiv(cardInnerElement, 'flip-card-inner', cardElement);
        
      cardElement.onclick = function(e)
      { 
        cardInnerElement.classList.toggle("is-flipped");
      };
  
      cardFrontElement = createDiv(cardFrontElement, 'flip-card-front', cardInnerElement); 
      cardFrontElement.innerHTML = `<i class="fas ${cards_icons[i]} fa-3x"></i><h4>${cards_front[i]}</h4>`;
  
      cardBackElement = createDiv(cardBackElement, 'flip-card-back', cardInnerElement);
      cardBackElement.innerHTML = `<br><br><p>${cards_back[i]}</p>`;
    }
}

Main();