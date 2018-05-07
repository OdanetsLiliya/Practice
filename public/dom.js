const filterConfig = null;
const user = null;
const photoPosts = postsJson;
let size;
window.dom = (function () {
  document.querySelector('.load-more-button').style.visibility = 'hidden';
  const userName = document.querySelector('h2');
  const logButton = document.querySelector('.log-button');
  const makePhotoPost = function (photoPost) {
    const post = document.createElement('div');
    const image = document.createElement('img');
    const buttonArea = document.createElement('div');
    const buttonAdd = document.createElement('div');
    const buttonDel = document.createElement('div');
    const buttonHeart = document.createElement('div');
    const nickAndDate = document.createElement('div');
    const nickName = document.createElement('p3');
    const date = document.createElement('p3');
    const tags = document.createElement('p3');
    const imgAndButtons = document.createElement('div');
    const description = document.createElement('p4');
    post.className = 'post';
    image.className = 'image';
    image.src = photoPost.photoLink;
    buttonArea.className = 'button-area';
    if (photoPost.author == user) {
      buttonAdd.className = 'button add';
      buttonDel.className = 'button delete';
    }
    if (user == null) {
      buttonArea.style.visibility = 'hidden';
    }
    buttonHeart.className = 'heart-shape';
    if (photoPost.likes/* .length != 0 */ && user != null && photoPost.likes.findIndex(item =>
      user === JSON.parse(item)) != -1) {
      buttonHeart.className = 'heart-shape red';
      buttonHeart.style.backgroundColor = 'red';
    }
    buttonArea.append(buttonAdd, buttonDel, buttonHeart);
    nickAndDate.className = 'flex-box';
    nickName.className = 'text-type-comic';
    nickName.innerHTML = photoPost.author;
    date.className = 'text-type-comic';
    date.innerHTML = `${('0' + photoPost.createdAt.getDate()).slice(-2)}.${
      ('0' + (photoPost.createdAt.getMonth() + 1)).slice(-2)}.${
      photoPost.createdAt.getFullYear()}`;
    tags.className = 'text-type-comic';
    tags.innerHTML = photoPost.hashtags.join(' ');
    imgAndButtons.className = 'flex-box';
    post.id = photoPost.id;
    description.className = 'text-type-comic';
    description.innerHTML = photoPost.description;
    nickAndDate.append(nickName, date);
    imgAndButtons.append(image, buttonArea);
    post.append(nickAndDate, imgAndButtons, description, tags);
    return post;
  };
  const addPhotoPost = function (photoPost) {
    const lent = document.querySelector('.lent');
    lent.insertBefore(makePhotoPost(photoPost), lent.children[0]);
  };
  const getPhotoPosts = function (skip = 0, top = 10, filterConfig) {
    return modul.getPhotoPosts(skip, top, filterConfig)
      .then((posts) => {
        posts.forEach((item) => {
          document
            .querySelector('.lent')
            .insertBefore(makePhotoPost(item), document.querySelector('.load-more-button'));
        });
        return posts.length;
      });
  };
  /* let editPhotoPost = function (id, photoPost) {
         let post = document.getElementById(id);
         if (post) {
             document.querySelector('.lent').replaceChild(makePhotoPost(modul.getPhotoPost(id)), post);
             return true;
         }
         return false;
     } */
  const removePhotoPost = function (id) {
    const post = document.getElementById(JSON.parse(id));
    if (post) {
      document.querySelector('.lent').removeChild(post);
      return true;
    }
    return false;
  };
  const deleteAllPosts = function () {
    let items = document.getElementsByClassName('post');
    items = Array.prototype.slice.call(items);
    items.forEach((item) => {
      document.querySelector('.lent').removeChild(document.getElementById(item.id));
    });
    return true;
  };
  return {
    addPhotoPost,
    getPhotoPosts,
    // editPhotoPost,
    removePhotoPost,
    deleteAllPosts,
  };
}());
function showPhotoPosts(skip, top) {
  dom.deleteAllPosts();
  const length = modul.getPhotoPosts(skip + top, 10, filterConfig);
  return dom.getPhotoPosts(skip, top, filterConfig)
    .then(() => {
      length.then((item) => {
        if (item.length > 0) {
          document.querySelector('.load-more-button').style.visibility = 'visible';
          return true;
        }

        document.querySelector('.load-more-button').style.visibility = 'hidden';
        return false;
      });
    });
}

function addPhotoPost(photoPost) {
  if (user != null) {
    if (modul.addPhotoPost(photoPost)) {
      dom.addPhotoPost(photoPost);
      return true;
    }
  }
  return false;
}
/* function editPhotoPost(id, photoPost) {
    if (modul.editPhotoPost(id, photoPost)) {
        return true;
    }
    return false;
} */
function removePhotoPost(id) {
  modul.removePhotoPost(id).then(() => {
    if (dom.removePhotoPost(id)) {
      const { length } = document.getElementsByClassName('post');
      const posts = modul.getPhotoPosts(0, photoPosts.length, filterConfig);
      if (length < posts.length && length < 10) {
        dom.addPhotoPost(posts[length]);
      }
      if (length + 1 >= posts.length) {
        document.querySelector('.load-more-button').style.visibility = 'hidden';
      }
      return true;
    }
    return false;
  });
}
function eventForLoadMore() {
  document.querySelector('.load-more-button').addEventListener('click', () => {
    const { length } = document.getElementsByClassName('post');
    dom.getPhotoPosts(length, 10, filterConfig)
      .then((response) => {
        if (response <= length + 10) {
          document.querySelector('.load-more-button').style.visibility = 'hidden';
        }
      });
  });
}
