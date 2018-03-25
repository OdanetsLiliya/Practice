let users = [{
  name: "lili",
  password: "q"
},
{
  name: "ivan",
  password: "1234"
},
{
  name: "alex",
  password: "111111"
}
];
window.modul =
  (function () {

    //photoPosts.sort(compareByDate);

    function compareByDate(photoPostA, photoPostB) {
      return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    }

    function validTypeOfArray(array) {
      if (Array.isArray(array)) {
        return array.every(function (item) {
          return typeof (item) === 'string';
        });
      }
      return false;
    }

    let getPhotoPosts = function (skip, top, filterConfig) {
      let i = 0;
      let posts = Object.keys(localStorage).reduce((posts, k) => {
        posts[i] = JSON.parse(localStorage.getItem(k), function (key, value) {
          if (key == 'createdAt') return new Date(value);
          return value;
        });
        i++;
        return posts;
      }, []);
      if (typeof (skip) !== 'number' || typeof (top) !== 'number') {
        return [];
      }
      if (filterConfig) {
        if (filterConfig.author && (typeof (filterConfig.author) !== 'string' || filterConfig.author.length === 0) ||
          filterConfig.createdAt && !filterConfig.createdAt instanceof Date ||
          filterConfig.hashtags && !validTypeOfArray(filterConfig.hashtags)) {
          return [];
        }
        if (filterConfig.author) {
          posts = posts.filter(function (item) {
            return item.author === filterConfig.author;
          });
        }
        if (filterConfig.createdAt) {
          posts = posts.filter(function (item) {
            return item.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
              item.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
              item.createdAt.getDate() === filterConfig.createdAt.getDate()
          });
        }
        if (filterConfig.hashtags && filterConfig.hashtags != "") {
          posts = posts.filter(function (postItem) {
            if (typeof (postItem.hashtags) === 'undefined') {
              return false;
            }
            return filterConfig.hashtags.every(function (item) {
              return postItem.hashtags.includes(item);
            })
          })
        }
      }
      posts = posts.slice(skip, skip + top);
      return posts;
    };

    let getPhotoPost = function (id) {
      // return photoPosts.find(item => item.id === id);
      return JSON.parse(localStorage.getItem(id));
    };

    let addPhotoPost = function (photoPost) {
      if (validatePhotoPost(photoPost)) {
        //photoPosts.push(photoPost);
        //photoPosts.sort(compareByDate);
        localStorage.setItem(photoPost.id, JSON.stringify(photoPost));
        return true;
      }
      return false;
    };

    let validatePhotoPost = function (photoPost, statusOfValidation) {
      if (!photoPost) {
        return false;
      }
      if ((statusOfValidation && !photoPost.description || photoPost.description &&
        typeof (photoPost.description) === 'string' &&
        photoPost.description.length <= 200) &&
        (statusOfValidation && !photoPost.photoLink ||
          photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink.length !== 0) &&
        (typeof (photoPost.hashtags) === 'undefined' || validTypeOfArray(photoPost.hashtags)) &&
        (statusOfValidation ||
          (photoPost.id && localStorage.getItem(photoPost.id)) === null
          /*findIndex(item => item.id === photoPost.id) === -1*/ &&
          typeof (photoPost.id) === 'string' &&
          photoPost.createdAt && photoPost.createdAt instanceof Date &&
          typeof (photoPost.author) === 'string' && photoPost.author.length !== 0 &&
          (typeof (photoPost.likes) === 'undefined' || validTypeOfArray(photoPost.likes))
        )) {
        return true;
      }
      return false;
    };

    let editPhotoPost = function (id, photoPost) {
      let photopostToChange = this.getPhotoPost(id);
      if (typeof (photopostToChange) === 'undefined' || !validatePhotoPost(photoPost, 'changes')) {
        return false;
      }
      if (photoPost.description) {
        photopostToChange.description = photoPost.description;
      }
      if (photoPost.photoLink) {
        photopostToChange.photoLink = photoPost.photoLink;
      }
      if (photoPost.hashtags) {
        photopostToChange.hashtags = photoPost.hashtags;
      }
      localStorage.setItem(id, JSON.stringify(photopostToChange));
      //photoPosts[photoPosts.findIndex(item => item.id === id)] = photopostToChange;
      return true;
    };

    let removePhotoPost = function (id) {
      //let index = photoPosts.findIndex(item => item.id === id);
      if (localStorage.getItem(id)) {
        localStorage.removeItem(id)
        return true;
      }
      return false;
    }

    return {
      getPhotoPost,
      getPhotoPosts,
      addPhotoPost,
      editPhotoPost,
      removePhotoPost
    }
  })();