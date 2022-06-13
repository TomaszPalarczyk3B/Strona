// alert
const alert = document.querySelector('.alert_pop');
function shownUnsupportedAlert(){
    alert.classList.remove('hidden');
    setTimeout(hideAlert, 4000);

    function hideAlert() {
        alert.classList.add('hidden');
    };
};
    //  > Unsupported elements:
    const unsupported = document.querySelectorAll('[data-unsupported]');
    const unsupportedPostIco = document.querySelectorAll('.post-ico');

    unsupportedPostIco.forEach(e =>{
        e.addEventListener('click', ()=>{
            shownUnsupportedAlert()
        });
    });

    unsupported.forEach(e =>{
        e.addEventListener('click', ()=>{
            shownUnsupportedAlert()
        });
    });

// reaction
let heartsBTN = document.querySelectorAll('.heart_btn')
let heartsCounterInner = document.querySelectorAll('.heart_counter')
let heartPostCounter = {};

heartsBTN.forEach((e, index)=>{
    heartPostCounter[index] = 0
    e.addEventListener('click', ()=>{
        e.querySelector('.fa-heart').classList.toggle('liked');
        if(heartPostCounter[index] == 0){
            heartPostCounter[index] = 1
            heartsCounterInner[index].innerHTML = Number(heartsCounterInner[index].innerHTML) + heartPostCounter[index];
        }
        else if(heartPostCounter[index] == 1){
            heartPostCounter[index] = 0;
            heartsCounterInner[index].innerHTML = Number(heartsCounterInner[index].innerHTML) - 1;
        };
    });
});

//searchbar
let searchbarValue;
const searchBTN = document.querySelector('.main_nav_searchbar_icon')
const searchbar = document.querySelector('[data-searchbar="searchbar"]')
let posts = document.querySelectorAll('.social_content_container');
let postsDescriptions = document.querySelectorAll("[data-postdesc='desc']")
let desc = [];

postsDescriptions.forEach((e, index) =>{
    desc[index] = e.textContent.toLocaleLowerCase()
    searchbar.addEventListener('input', (e)=>{
        searchbarValue = e.target.value.toLocaleLowerCase();
        if(desc[index].includes(searchbarValue)){
            console.log('znaleziono')
            posts[index].classList.remove('hidden');
        }
        else {
            posts[index].classList.add('hidden')
            console.log('brak!')
        };
    });
});

//hamburger 
const hamburgerMenu = document.querySelector('.hamburger_menu');
const hamburgerList = document.querySelector('.hamburger_menu_wrapper');
let showfriendCounter = 1;

hamburgerMenu.addEventListener('click', ()=>{
    hamburgerList.classList.toggle('hidden')
    hamburgerList.querySelector('.show_friends').addEventListener('click', ()=>{
        if(showfriendCounter == 1){
        document.querySelector('.Friend_list').style = "display: flex;"
        showfriendCounter = 0}
        else{
            document.querySelector('.Friend_list').style = "display: none;"
            showfriendCounter = 1;
        }
    });
});

// friends
const friendLiTemplate = document.querySelector('[data-friend="template"]');
const friendLiList = document.querySelector('.Friend_list')
let usernameUser;

fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data =>{
    data.forEach(user => {
        const newFriend = friendLiTemplate.content.cloneNode(true).children[0] //dla kazdego z userow tworzymy nowy template
        let usernameUser = newFriend.querySelector('#usernameFriend');
        usernameUser.textContent = user.name;
        friendLiList.append(newFriend)
    });
});


// == messenger
    const messengerCloseBTN = document.querySelector('.close_messenger_btn');
    const messengerGui = document.querySelector('.opened_messenger');

    messengerCloseBTN.addEventListener('click', ()=> {
        messengerGui.classList.toggle('hidden');
    });

    let userInputValue = document.querySelector('.messenger_chat_box');
    const messengerSendBTN = document.querySelector('.messenger_chat_box_btn');
    const userNewMessageTemplate = document.querySelector('[data-messenger="usermessage"]');
    const receiveNewMessageTemplate = document.querySelector('[data-messenger="message"]');
    const messengerContainer = document.querySelector('.chat_container');
    let messageContent;
    let newMessageRespond;

    function createUserMessage(){
        messageContent = userInputValue.value;
        const newMessage = userNewMessageTemplate.content.cloneNode(true).children[0]
        newMessage.querySelector('[data-messenger="contentUser"]').textContent = messageContent
        messengerContainer.append(newMessage);
    }

    function createBotMessage(){
        newMessageRespond = receiveNewMessageTemplate.content.cloneNode(true).children[0];
        newMessageRespond.querySelector('[data-messenger="content"]').textContent = botRespondValue;
        messengerContainer.append(newMessageRespond);
    }

    messengerSendBTN.addEventListener('click', ()=>{
        createUserMessage()
    });

// > BOT AI

messengerSendBTN.addEventListener('click', ()=>{
    if(messageContent.toLocaleLowerCase() === "hej" 
    || messageContent.toLocaleLowerCase() === "siemanko"
    || messageContent.toLocaleLowerCase() === "czesc"
    || messageContent.toLocaleLowerCase() === "witam"
    || messageContent.toLocaleLowerCase() === "dzien dobry"
    || messageContent.toLocaleLowerCase() === "hejka"
    || messageContent.toLocaleLowerCase() === "siemka"
    || messageContent.toLocaleLowerCase() === "siema"
    || messageContent.toLocaleLowerCase() === "hey"
    || messageContent.toLocaleLowerCase() === "siemua"
    ){
        botRespondValue = "Cześć, w czym mogę pomóc?";
        createBotMessage()
    }

    else if(messageContent.toLocaleLowerCase() === "ile jest postow" 
    || messageContent.toLocaleLowerCase() === "ilosc postow"
    || messageContent.toLocaleLowerCase() === "numer postow"
    || messageContent.toLocaleLowerCase() === "liczba postow"
    || messageContent.toLocaleLowerCase() === "jaka jest liczba postow?"
    || messageContent.toLocaleLowerCase() === "jaka jest liczba postow"
    || messageContent.toLocaleLowerCase() === "liczba postow?"
    ){
        botRespondValue = "Aktualna liczba postow na witrynie to " + posts.length + "!";
        createBotMessage()
    }

    else {
        botRespondValue = "Nie znam takiego polecenia. Mozesz do mnie napisac: ilosc postow; siemka. Pamietaj, ze nie obsluguje polskich znakow!";
        createBotMessage()
    }
});

// comments

// function addCommentCounterValue(){
//     let counterElement = document.querySelectorAll('.comments_counter')[postIndex];
//     let counter = 0;
//     counter++;
//     counterElement.innerHTML = counter;
// }

let closeCommentsSection = document.querySelectorAll('.closeComments');
let commentsBTN = document.querySelectorAll('.comments_btn');
const commentsSection = document.querySelector('.comments_section');
const commentsWrapperTemplate = document.querySelector('[data-comments="commentsWrapperContent"]');
const commentTemplate = document.querySelector('[data-comments="commenttemplate"]');
let commentsPostBTN;
let newCommentSection;

let element;
let postIndex;

commentsBTN.forEach(() => {
    newCommentSection = commentsWrapperTemplate.content.cloneNode(true).children[0];
    commentsSection.append(newCommentSection)    
});

commentsBTN.forEach((e, index) =>{
    let postIndex = index;
    e.addEventListener('click', ()=>{
        let commentsGui = document.querySelectorAll('.comments_container');
        console.log(postIndex);
        console.log(commentsGui[postIndex]);
        commentsSection.classList.remove('hidden');
        commentsGui[postIndex].classList.remove('hidden');

        commentsPostBTN = commentsGui[postIndex].querySelector('.comments_btn_add');
        commentsPostBTN.addEventListener('click', ()=>{
            commentValue = commentsGui[postIndex].querySelector('.comments_input').value;
            const newComment = commentTemplate.content.cloneNode(true).children[0];
            newComment.querySelector('.comment_content').textContent = commentValue;
            commentsGui[postIndex].querySelector('.comments_wrapper').append(newComment);

            let counterElement = document.querySelectorAll('.comments_counter')[postIndex];
            let counter = commentsGui[postIndex].querySelectorAll('.comment').length;
            console.log(counter)
            counterElement.innerHTML = counter;
        });

        closeCommentsSection = document.querySelectorAll('.closeComments');
        closeCommentsSection.forEach(e =>{
            e.addEventListener('click', ()=>{
            commentsSection.classList.add('hidden');
            commentsGui[postIndex].classList.add('hidden');
            commentsGui = 0; //aby zapobiec duplikacji komentarzy
            });
        });
    });
});

// create post

const creatorPost = document.querySelector('.create_post_section');
const createPostBTN = document.querySelector('[data-post="createpost"]');
const postTemplate = document.querySelector('[data-post="create"]');
const postvalueTitle = document.querySelector('.input_title');
const postvalueDesc = document.querySelector('.input_desc');
const publishPostBTN = document.querySelector('.add_post');
const closePostCreator = document.querySelector('.close_post_creator');
let valueDesc;
let valueTitle;

createPostBTN.addEventListener('click', ()=>{
    creatorPost.classList.remove('hidden');
});

closePostCreator.addEventListener('click', ()=>{
    creatorPost.classList.add('hidden');
});

function reloadVariables(){
    heartsBTN = document.querySelectorAll('.heart_btn');
    heartsCounterInner = document.querySelectorAll('.heart_counter');
    posts = document.querySelectorAll('.social_content_container');
    postsDescriptions = document.querySelectorAll("[data-postdesc='desc']");
    commentsBTN = document.querySelectorAll('.comments_btn');
}

publishPostBTN.addEventListener('click', ()=>{
    valueTitle = postvalueTitle.value
    valueDesc = postvalueDesc.value
    const newpost = postTemplate.content.cloneNode(true).children[0];
    newpost.querySelector('[data-post="title"]').textContent = valueTitle;
    newpost.querySelector('[data-postdesc="desc"]').textContent = valueDesc;
    document.querySelector('.posts-wrapper').append(newpost);
    heartsCounterInner = document.querySelectorAll('.heart_counter')
});
