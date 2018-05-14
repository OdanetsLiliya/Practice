let filterConfig = null;
let user = null;
// const photoPosts = postsJson;
let size;
window.dom = (function () {
  document.querySelector('.load-more-button').style.visibility = 'hidden';
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
    if (photoPost.author === user) {
      buttonAdd.className = 'button add';
      buttonDel.className = 'button delete';
    }
    if (user == null) {
      buttonArea.style.visibility = 'hidden';
    }
    buttonHeart.className = 'heart-shape';
    if (photoPost.likes/* .length != 0 */ && user != null && photoPost.likes.findIndex(item =>
      user === item) !== -1) {
      buttonHeart.className = 'heart-shape red';
      buttonHeart.style.backgroundColor = 'red';
    }
    buttonArea.append(buttonAdd, buttonDel, buttonHeart);
    nickAndDate.className = 'flex-box';
    nickName.className = 'text-type-comic';
    nickName.innerHTML = photoPost.author;
    date.className = 'text-type-comic';
    const myDate = new Date(photoPost.createdAt);
    date.innerHTML = `${('0' + myDate.getDate()).slice(-2)}.${
      ('0' + (myDate.getMonth() + 1)).slice(-2)}.${
      myDate.getFullYear()}`;
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
    return requests.postRequest('./addPost', null, null, photoPost)
      .catch(err => console.log('Error in add: ' + err));
  };
  const getPhotoPost = function (id) {
    return requests.getRequest('./getPost', id)
      .catch(err => console.log('Error in getPost: ' + err));
  };
  const editPhotoPost = function (id, photoPost) {
    return requests.putRequest('./editPost', id, photoPost)
      .catch(err => console.log('Error in edit: ' + err));
  };
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
    editPhotoPost,
    getPhotoPost,
    makePhotoPost,
    removePhotoPost,
    deleteAllPosts,
  };
}());
function showPhotoPosts(skip, top) {
  return requests.postRequest('./getPosts', skip, top + 1, filterConfig)
    .then((posts) => {
      posts = JSON.parse(posts);
      const loadMoreBttn = document.querySelector('.load-more-button');
      if (posts.length > 10) {
        loadMoreBttn.style.visibility = 'visible';
        posts.pop();
      } else {
        document.querySelector('.load-more-button').style.visibility = 'hidden';
      }
      posts.forEach((item) => {
        document.querySelector('.lent').insertBefore(dom.makePhotoPost(item), loadMoreBttn);
      });
    })
    .catch(err => console.log('Error in show: ' + err));
}

/* function addPhotoPost(photoPost) {
  if (user != null) {
    if (modul.addPhotoPost(photoPost)) {
      dom.addPhotoPost(photoPost);
      return true;
    }
  }
  return false;
} */
/* function editPhotoPost(id, photoPost) {
    if (modul.editPhotoPost(id, photoPost)) {
        return true;
    }
    return false;
} */
function removePhotoPost(id) {
  return requests.deleteRequest('./deletePost', id)
    .then(() => new Promise((succeed, fail) => {
      if (dom.removePhotoPost(id)) {
        const { length } = document.getElementsByClassName('post');
        succeed(length);
      } else {
        fail(new Error('Post was not deleted from dom'));
      }
    }))
    .then(length => showPhotoPosts(length, 1))
    .catch(err => console.log('Error in removePhotoPost(): ' + err));
}
function eventForLoadMore() {
  document.querySelector('.load-more-button').addEventListener('click', () => {
    const { length } = document.getElementsByClassName('post');
    showPhotoPosts(length, 10)
      // .then((response) => {
      //   if (response <= length + 10) {
      //     document.querySelector('.load-more-button').style.visibility = 'hidden';
      //   }
      // });
      .catch(err => console.log('Error in loadMore: ' + err));
  });
}
window.nextId = (() => {
  let id = 1;
  return () => id++;
})();
