let headerButton = document.querySelector(".log-button");
let main = document.querySelector(".site-content");
let nickName = document.querySelector("h2");
let addThePostHeader = document.querySelector(".add-the-post");
addThePostHeader.style.visibility = "hidden";
let currentPage = "main";
let idOfEditPost;
let logInPageHtml = " <form class='log-in'>\
        <h3 class='text-type-mistral'>Log in</h3>\
        <p3 class='text-type-comic'>name:</p3>\
        <input class='filter-input' type='text' style='min-width:250px;' />\
        <p3 class='text-type-comic'>password:</p3>\
        <input class='filter-input' type='password' style='min-width:250px;' />\
        <button class='log-in-button button text-type-comic' type='button' onclick='logIn()'>log in</button>\
        </form>";
let mainPageHtml = " <div class='filter-area'>\
        <p3 class='text-type-comic'>search</p3>\
        <div class='flex-box' style='justify-content:space-around;'>\
            <form class='input-area'>\
                <input class='filter-input' type='text' placeholder='name' />\
                <input class='filter-input' type='text' placeholder='date' />\
                <input class='filter-input' type='text' placeholder='hashtags' />\
            </form>\
            <button class='button search'></button>\
        </div>\
    </div>\
    <div class='lent'>\
        <button class='load-more-button text-button' type='button'>load more</button>\
    </div>\
    <div class='filter-area'> </div>";
let addThePostHtml = "    <form class='add-the-post-form'>\
         <div class='DD-area'  onchange='showFileName()'>\
             <label>\
                 <img src=''>\
                 <input class='file-input' type='file' multiple accept='image/*'  />\
                 </label>\
         </div>\
         <div class='text-hashtags-date'>\
             <p3 class='text-type-comic'>Add some text:</p3>\
             <textarea class='textarea-input' type='text' maxlength='400' rows='6'></textarea>\
             <p3 class='text-type-comic'>Add some hashtags:</p3>\
             <textarea class='textarea-input' type='text' maxlength='20' rows='3'></textarea>\
             <p3 class='text-type-comic'></p3>\
         </div>\
         <button class='button send-button' type='button' onclick='sendPost()'></button>\
     </form>";
let editThePostHtml = "    <form class='add-the-post-form'>\
             <img src='' class='edit-img'>\
         <div class='text-hashtags-date'>\
         <p3 class='text-type-comic'>Change text:</p3>\
         <textarea class='textarea-input' type='text' maxlength='400' rows='6'></textarea>\
         <p3 class='text-type-comic'>Change hashtags:</p3>\
         <textarea class='textarea-input' type='text' maxlength='20' rows='3'></textarea>\
         </div>\
     <button class='button save-button' type='button' onclick='savePost()'></button>\
 </form>";

function changePage(htmlInfo) {
    main.innerHTML = htmlInfo;
    //addListeners();
};

function addListeners() {
    //if (currentPage == 'main') {
    // headerButton.addEventListener('click', function () {
    if (headerButton.textContent === 'log in') {
        currentPage = 'log in';
        changePage(logInPageHtml);
        headerButton.style.visibility = 'hidden';
        addThePostHeader.style.visibility = 'hidden';
    } else if (headerButton.textContent === 'log out') {
        user = null;
        currentPage = 'main';
        addThePostHeader.style.visibility = 'hidden';
        headerButton.textContent = "log in";
        document.querySelector('h2.text-type-comic').textContent = '';
        // showPhotoPosts(0, 10);
    }
    //});
    //}
    //else if (currentPage == 'log in' || currentPage == 'add the post' || currentPage == 'edit post') {
    /*document.querySelector('h1.text-type-mistral').addEventListener('click', function () {
        
    });*/
    //}
};
function homePage() {
    currentPage = 'main';
    filterConfig = null;
    changePage(mainPageHtml);
    showPhotoPosts(0, 10);
    eventsForLent();
    eventForLoadMore();
    headerButton.style.visibility = '';
}
showPhotoPosts(0, 10);
eventsForLent();
eventForLoadMore();
//addListeners();

function logIn() {
    let form = document.querySelector("form");
    if (users.find(item => item.name === form.elements[0].value && item.password === form.elements[1].value)) {
        headerButton.textContent = "log out";
        nickName.textContent = form.elements[0].value;
        user = form.elements[0].value;
        currentPage = 'main';
        changePage(mainPageHtml);
        showPhotoPosts(0, 10);
        eventsForLent();
        eventForLoadMore();
        // addListeners();
        headerButton.style.visibility = '';
        addThePostHeader.style.visibility = 'visible';
        addThePostHeader.style.opacity = 100;
    } else {
        alert('wrong name or password');
    }
}
function showFileName() {
    let fr = new FileReader();
    let filterInput = document.querySelector(".file-input");
    let image = document.querySelector('img');
    fr.addEventListener('load', function () {
        image.src = fr.result;
    }, false);
    if (filterInput.files[0]) {
        fr.readAsDataURL(filterInput.files[0]);
    }
}
addThePostHeader.addEventListener('click', function () {
    let main = document.querySelector(".site-content");
    let date = new Date();
    let dateFormat = ('0' + date.getDate()).slice(-2) + '.' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '.' +
        date.getFullYear();
    currentPage = "add the post";
    changePage(addThePostHtml);
    document.querySelectorAll('p3')[2].textContent = dateFormat;
    addThePostHeader.style.visibility = 'hidden';
    headerButton.style.visibility = 'hidden';
});

function sendPost() {
    let form = document.querySelector("form");
    let img = document.querySelector("img");
    let hashs;
    let idOfPost;
    headerButton.textContent = 'log out';
    if (form.elements[2].value != null) {
        hashs = form.elements[2].value.split(/(?=#)/g);
    }
    do {
        idOfPost = Math.floor(Math.random() * (1000 - 1)) + 1;
    } while (localStorage.getItem(String(idOfPost)) != null);
    idOfPost = JSON.stringify(idOfPost);
    let photoPost = {
        id: idOfPost,
        author: nickName.textContent,
        createdAt: new Date(),
        photoLink: img.src,
        description: form.elements[1].value,
        hashtags: hashs
    };
    modul.addPhotoPost(photoPost);
    addThePostHeader.style.visibility = 'visible';
    headerButton.style.visibility = 'visible';
    currentPage = 'main';
    changePage(mainPageHtml);
    showPhotoPosts(0, 10);
    eventsForLent();
    eventForLoadMore();
    // addListeners();
};
function savePost() {
    let form = document.querySelector("form");
    if (form.elements[1].value != null) {
        hashs = form.elements[1].value.split(/(?=#)/g);
    }
    alert(form.elements[0].value);
    alert(hashs[0]);
    editPhotoPost(JSON.stringify(idOfEditPost), {
        description: form.elements[0].value,
        hashtags: hashs
    });
    currentPage = 'main';
    addThePostHeader.style.visibility = 'visible';
    headerButton.style.visibility = 'visible';
    changePage(mainPageHtml);
    showPhotoPosts(0, 10);
    eventsForLent();
    eventForLoadMore();
    // addListeners();
}
function eventsForLent() {
    [].forEach.call(document.getElementsByClassName("delete"), function (item) {
        item.onclick = function () {
            alert(item.closest(".post").id);
            removePhotoPost(item.closest(".post").id);
        };
    });
    [].forEach.call(document.querySelectorAll(".heart-shape"), function (item) {
        item.onclick = function () {
            alert(item.closest(".post").id);
        };
    });
    [].forEach.call(document.querySelectorAll(".add"), function (item) {
        item.onclick = function () {
            idOfEditPost = item.closest(".post").id;
            currentPage = 'edit post';
            addThePostHeader.style.visibility = 'hidden';
            headerButton.style.visibility = 'hidden';
            changePage(editThePostHtml);
            document.querySelector('img').src = modul.getPhotoPost(JSON.stringify(idOfEditPost)).photoLink;
        };
    });
    document.querySelector(".search").addEventListener('click', function () {
        form = document.querySelector('form');
        let date = form.elements[1].value.split('.');
        filterConfig = {
            author: form.elements[0].value,
            createdAt: new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10)),
            hashtags: form.elements[2].value.split(/(?=#)/g)
        }
        showPhotoPosts(0, 10);
    });
}