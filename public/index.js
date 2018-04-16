let postsJson = [];
window.modul =
  (function () {
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

    getPhotoPosts = function (skip, top, filterConfig) {
      return requests.getRequest("server/data/data.json")
        .then(function (posts) {
          posts.reverse();
          size = posts.length;
          if (typeof (skip) !== 'number' || typeof (top) !== 'number') {
            return [];
          }
          if (filterConfig) {
            if (filterConfig.author && (typeof (filterConfig.author) !== 'string' || filterConfig.author.length === 0) ||
              filterConfig.createdAt && !filterConfig.createdAt instanceof Date ||
              filterConfig.hashtags && !validTypeOfArray(filterConfig.hashtags)) {
              return [];
            }
            if (filterConfig.author && filterConfig.author != "") {
              posts = posts.filter(function (item) {
                return item.author === filterConfig.author;
              });
            }
            if (filterConfig.createdAt && filterConfig.createdAt != "Invalid Date") {
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
        });
    };

    let getPhotoPost = function (id, posts) {
      //let posts = requests.getRequest('server/data/data.json');
      if (posts) {
        return posts.find(item => item.id === id);
      }
    };

    let addLike = function (id, name) {
      return requests.getRequest('server/data/data.json').then(function (posts) {
        let post = getPhotoPost(id, posts);
        post.likes.push(name);
        return requests.postRequest('./changeData', posts);
      });
    };

    let addPhotoPost = function (photoPost) {
      return new Promise(function (resolve, reject) {
        if (validatePhotoPost(photoPost)) {
          return requests.postRequest('./sendPost', photoPost);
        }
        reject(false);
      });
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
          (photoPost.id && postsJson.findIndex(item => item.id === photoPost.id) === -1 &&
            typeof (photoPost.id) === 'string' &&
            photoPost.createdAt && photoPost.createdAt instanceof Date &&
            typeof (photoPost.author) === 'string' && photoPost.author.length !== 0 &&
            (typeof (photoPost.likes) === 'undefined' || validTypeOfArray(photoPost.likes))
          ))) {
        return true;
      }
      return false;
    };

    let editPhotoPost = function (id, photoPost) {
      return requests.getRequest('server/data/data.json').then(function (posts) {
        let photopostToChange = getPhotoPost(id, posts);
        if (typeof (photopostToChange) === 'undefined' || !validatePhotoPost(photoPost, 'changes')) {
          return false;
        } else {
          if (photoPost.description) {
            photopostToChange.description = photoPost.description;
          }
          if (photoPost.photoLink) {
            photopostToChange.photoLink = photoPost.photoLink;
          }
          if (photoPost.hashtags) {
            photopostToChange.hashtags = photoPost.hashtags;
          }
          return requests.postRequest('./changeData', posts);
        }
      });
    };

    let removePhotoPost = function (id) {
      return requests.getRequest('server/data/data.json').then(function (posts) {
        posts.splice(posts.findIndex(item => item.id == id), 1);
        return requests.postRequest('./changeData', posts);
      });
    }

    return {
      getPhotoPost,
      addLike,
      getPhotoPosts,
      addPhotoPost,
      editPhotoPost,
      removePhotoPost
    }
  })();