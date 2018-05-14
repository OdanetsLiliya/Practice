const headerButton = document.querySelector('.log-button');
const main = document.querySelector('.site-content');
const nickName = document.querySelector('h2');
const addThePostHeader = document.querySelector('.add-the-post');
addThePostHeader.style.visibility = 'hidden';
let currentPage = 'main';
let idOfEditPost;
const logInPageHtml = " <form class='log-in'>\
        <h3 class='text-type-mistral'>Log in</h3>\
        <p3 class='text-type-comic'>name:</p3>\
        <input class='filter-input' type='text' style='min-width:250px;' />\
        <p3 class='text-type-comic'>password:</p3>\
        <input class='filter-input' type='password' style='min-width:250px;' />\
        <button class='log-in-button button text-type-comic' type='button' onclick='logIn()'>log in</button>\
        </form>";
const mainPageHtml = " <div class='filter-area'>\
        <p3 class='text-type-comic'>search</p3>\
        <div class='flex-box' style='justify-content:space-around;'>\
            <form class='input-area'>\
                <input class='filter-input' type='text' placeholder='name' />\
                <input class='filter-input' type='text' placeholder='DD.MM.YYYY' />\
                <input class='filter-input' type='text' placeholder='#tag#tag' />\
            </form>\
            <button class='button search'></button>\
        </div>\
    </div>\
    <div class='lent'>\
        <button class='load-more-button text-button' type='button'>load more</button>\
    </div>\
    <div class='filter-area'> </div>";
const addThePostHtml = "<form class='add-the-post-form'>\
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
         <button class='buttonS send-button' type='button' onclick='sendPost()'></button>\
     </form>";
const editThePostHtml = "    <form class='add-the-post-form'>\
             <img src='' class='edit-img'>\
         <div class='text-hashtags-date'>\
         <p3 class='text-type-comic'>Change text:</p3>\
         <textarea class='textarea-input' type='text' maxlength='400' rows='6'></textarea>\
         <p3 class='text-type-comic'>Change hashtags:</p3>\
         <textarea class='textarea-input' type='text' maxlength='20' rows='3'></textarea>\
         </div>\
     <button class='buttonS save-button' type='button' onclick='savePost()'></button>\
 </form>";

function changePage(htmlInfo) {
  main.innerHTML = htmlInfo;
}

function eventsForLent() {
  [].forEach.call(document.getElementsByClassName('delete'), (item) => {
    item.onclick = function () {
      removePhotoPost(item.closest('.post').id);
    };
  });
  [].forEach.call(document.querySelectorAll('.heart-shape'), (item) => {
    item.onclick = function () {
      if (item.style.backgroundColor !== 'red') {
        item.className = 'heart-shape red';
        item.style.backgroundColor = 'red';
        console.log(nickName.textContent);
        requests.putRequest('./editLike', item.closest('.post').id + '&name=' + nickName.textContent, null)
          .catch(err => console.log('Error in getPost/like: ' + err));
        // modul.addLike(item.closest('.post').id, JSON.stringify(nickName.textContent));
      }
    };
  });
  [].forEach.call(document.querySelectorAll('.add'), (item) => {
    item.onclick = function () {
      idOfEditPost = item.closest('.post').id;
      currentPage = 'edit post';
      addThePostHeader.style.visibility = 'hidden';
      headerButton.style.visibility = 'hidden';
      changePage(editThePostHtml);
      dom.getPhotoPost(idOfEditPost).then((post) => {
        post = JSON.parse(post);
        document.querySelector('img').src = post.photoLink;
        document.querySelector('form').elements[0].value = post.description;
        const hashtags = post.hashtags.reduce((res, elem) => res + elem, '');
        document.querySelector('form').elements[1].value = hashtags;
      });
    };
  });
  document.querySelector('.search').addEventListener('click', () => {
    const form = document.querySelector('form');
    const date = form.elements[1].value.split('.');
    filterConfig = {
      author: form.elements[0].value,
      createdAt: [date[2], date[1], date[0]],
      hashtags: form.elements[2].value.split(/(?=#)/g),
    };
    dom.deleteAllPosts();
    showPhotoPosts(0, 10)
      .then(() => {
        eventsForLent();
        eventForLoadMore();
      });
  });
}

function addListeners() {
  if (headerButton.textContent === 'log in') {
    currentPage = 'log in';
    changePage(logInPageHtml);
    headerButton.style.visibility = 'hidden';
    addThePostHeader.style.visibility = 'hidden';
  } else if (headerButton.textContent === 'log out') {
    user = null;
    currentPage = 'main';
    addThePostHeader.style.visibility = 'hidden';
    headerButton.textContent = 'log in';
    document.querySelector('h2.text-type-comic').textContent = '';
    dom.deleteAllPosts();
    showPhotoPosts(0, 10).then(() => {
      eventsForLent();
      eventForLoadMore();
    });
  }
}
function homePage() {
  currentPage = 'main';
  filterConfig = null;
  changePage(mainPageHtml);
  showPhotoPosts(0, 10).then(() => {
    eventsForLent();
    eventForLoadMore();
  });
  headerButton.style.visibility = '';
}

showPhotoPosts(0, 10).then(() => {
  eventsForLent();
  eventForLoadMore();
});


function logIn() {
  const form = document.querySelector('form');
  headerButton.textContent = 'log out';
  nickName.textContent = form.elements[0].value;
  user = form.elements[0].value;
  currentPage = 'main';
  changePage(mainPageHtml);
  showPhotoPosts(0, 10).then(() => {
    eventsForLent();
    eventForLoadMore();
  });
  headerButton.style.visibility = '';
  addThePostHeader.style.visibility = 'visible';
  addThePostHeader.style.opacity = 100;
}
function showFileName() {
  const fr = new FileReader();
  const filterInput = document.querySelector('.file-input');
  const image = document.querySelector('img');
  fr.addEventListener('load', () => {
    image.src = fr.result;
  }, false);
  if (filterInput.files[0]) {
    fr.readAsDataURL(filterInput.files[0]);
  }
}
addThePostHeader.addEventListener('click', () => {
  const date = new Date();
  const dateFormat = `${(`0${date.getDate()}`).slice(-2)}.${
    (`0${date.getMonth() + 1}`).slice(-2)}.${
    date.getFullYear()}`;
  currentPage = 'add the post';
  changePage(addThePostHtml);
  document.querySelectorAll('p3')[2].textContent = dateFormat;
  addThePostHeader.style.visibility = 'hidden';
  headerButton.style.visibility = 'hidden';
});

function sendPost() {
  const form = document.querySelector('form');
  const img = document.querySelector('img');
  let hashs;
  headerButton.textContent = 'log out';
  if (form.elements[2].value != null) {
    hashs = form.elements[2].value.split(/(?=#)/g);
  }
  const idOfPost = window.nextId();
  const photoPost = {
    id: idOfPost,
    author: nickName.textContent,
    createdAt: new Date(),
    photoLink: img.src,
    description: form.elements[1].value,
    hashtags: hashs,
    likes: [],
  };
  dom.addPhotoPost(photoPost)
    .then(() => {
      addThePostHeader.style.visibility = 'visible';
      headerButton.style.visibility = 'visible';
      currentPage = 'main';
      changePage(mainPageHtml);
      filterConfig = null;
      showPhotoPosts(0, 10).then(() => {
        eventsForLent();
        eventForLoadMore();
      });
    });
}
function savePost() {
  const form = document.querySelector('form');
  let hashs;
  if (form.elements[1].value != null) {
    hashs = form.elements[1].value.split(/(?=#)/g);
  }
  const photoPost = {
    description: form.elements[0].value,
    hashtags: hashs,
  };
  /* modul.editPhotoPost(idOfEditPost, {
    description: form.elements[0].value,
    hashtags: hashs,
  }).then(() => { */
  dom.editPhotoPost(idOfEditPost, photoPost)
    .then(() => {
      currentPage = 'main';
      addThePostHeader.style.visibility = 'visible';
      headerButton.style.visibility = 'visible';
      changePage(mainPageHtml);
      filterConfig = null;
      showPhotoPosts(0, 10).then(() => {
        eventsForLent();
        eventForLoadMore();
      });
    });
}

