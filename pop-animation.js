let popupVisible = true;
const letters = document.querySelectorAll('.heading-letter');
let random;
const popup = document.querySelector('.login_pop-right')

if(popupVisible === true){
    letters.forEach(()=>{ 
        setInterval(function(){   
            if(popupVisible === true){
            changecolor();}
        }, 2000);
    });
};

function changecolor()
{
        random = Math.floor((Math.random()*5));
        letters[random].classList.add("animated-letter");
        setInterval(() => {
            letters[random].classList.remove("animated-letter");
        }, 2000);
};
// bo tu trzeba foreach
document.querySelectorAll('.Sign_in_btn').forEach(e =>{
    e.addEventListener('click', ()=>{
    popupVisible = false;
    });
})