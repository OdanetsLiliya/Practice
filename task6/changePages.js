let headerButton = document.querySelector(".log-button");
let main = document.querySelector(".site-content");
let nickName = document.querySelector("h2");
let addThePostHeader = document.querySelector(".add-the-post");
let currentPage = "main";
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
            <div class='input-area'>\
                <input class='filter-input' type='text' placeholder='name' />\
                <input class='filter-input' type='text' placeholder='date' />\
                <input class='filter-input' type='text' placeholder='hashtags' />\
            </div>\
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
             <p3 class='text-type-comic'>Date:00.00.0000</p3>\
         </div>\
         <button class='button send-button' type='button' onclick='sendPost()'></button>\
     </form>";
function changePage(htmlInfo) {
    main.innerHTML = htmlInfo;
    addListeners();
}

function addListeners() {
    if (currentPage == 'main') {
        headerButton.addEventListener('click', function () {
            if (headerButton.textContent === 'log in') {
                currentPage = 'log in';
                changePage(logInPageHtml);
                headerButton.style.visibility = 'hidden';
            } else if (headerButton.textContent === 'log out') {
                user = null;
                headerButton.textContent = "log in";
                document.querySelector('h2.text-type-comic').textContent = '';
                showPhotoPosts(0, 10);
            }
        });
    }
    else if (currentPage == 'log in') {
        document.querySelector('h1.text-type-mistral').addEventListener('click', function () {
            currentPage = 'main';
            changePage(mainPageHtml);
            showPhotoPosts(0, 10);
            kek();
            lol();
            headerButton.style.visibility = '';
        });
    }
}

showPhotoPosts(0, 10);
kek();
lol();
addListeners();

function logIn() {
    let form = document.querySelector("form");
    if (users.find(item => item.name === form.elements[0].value && item.password === form.elements[1].value)) {
        headerButton.textContent = "log out";
        nickName.textContent = form.elements[0].value;
        user = form.elements[0].value;
        changePage(mainPageHtml);
        showPhotoPosts(0, 10);
        kek();
        lol();
        currentPage = 'main';
        headerButton.style.visibility = '';
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
    changePage(addThePostHtml);
});

function sendPost() {
    let form = document.querySelector("form");
    let img = document.querySelector("img");
    let hashs;
    let idOfPost;
    if (form.elements[2].value != null) {
        hashs = form.elements[2].value.split(/(?=#)/g);
    }
    do {
        idOfPost = Math.floor(Math.random() * (1000 - 1)) + 1;
    } while (localStorage.getItem(String(idOfPost)) != null);
    idOfPost = String(idOfPost);
    alert(img.src);
    let photoPost = {
        id: idOfPost,
        author: /*nickName.textContent*/"lili",
        createdAt: new Date(),
        photoLink: img.src,
        description: form.elements[1].value,
        hashtags: hashs
    };
    alert(modul.addPhotoPost(photoPost));
    // let event = new Event("click");
    // headerButton.dispatchEvent(event);
    // headerButton.textContent = "log out";
};

function kek() {
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
            alert(item.closest(".post").id);
            sendPost(item.closest(".post").id);
        };
    });

}