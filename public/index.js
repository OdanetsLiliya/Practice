const postsJson = [];
modul =
  (function () {
    function compareByDate(photoPostA, photoPostB) {
      return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    }

    function validTypeOfArray(array) {
      if (Array.isArray(array)) {
        return array.every(item => typeof (item) === 'string');
      }
      return false;
    }

    const getPhotoPosts = function (skip, top, filterConfig, posts) {
      posts.reverse();
      size = posts.length;
      if (typeof (skip) !== 'number' || typeof (top) !== 'number') {
        return [];
      }
      console.log(posts);
      console.log(filterConfig);
      if (filterConfig && Object.getOwnPropertyNames(filterConfig).length !== 0) {
        if (filterConfig.author === '' && (filterConfig.createdAt[0] == null || filterConfig.createdAt[1] == null
        || filterConfig.createdAt[2] == null) && JSON.stringify(filterConfig.hashtags) == '[""]') {
          return [];
        }
        if (filterConfig.author && filterConfig.author !== '') {
          posts = posts.filter(item => item.author === filterConfig.author);
        }
        if (filterConfig.createdAt[0] != null && filterConfig.createdAt[1] != null
           && filterConfig.createdAt[2] != null) {
          // const date = new Date(filterConfig.createdAt);
          posts = posts.filter((item) => {
            const itemDate = new Date(item.createdAt);
            console.log(itemDate.getMonth());
            console.log(itemDate.getFullYear());
            console.log(itemDate.getDate());
            return itemDate.getFullYear() == filterConfig.createdAt[0] &&
            Number(itemDate.getMonth()) + 1 == filterConfig.createdAt[1] &&
            itemDate.getDate() == filterConfig.createdAt[2];
          });
        }
        if (filterConfig.hashtags && JSON.stringify(filterConfig.hashtags) !== '[""]') {
          posts = posts.filter((postItem) => {
            if (typeof (postItem.hashtags) === 'undefined') {
              return false;
            }
            return filterConfig.hashtags.every(item => postItem.hashtags.includes(item));
          });
        }
      }
      posts = posts.slice(skip, skip + top);
      return posts;
    };

    const getPhotoPost = function (id, posts) {
      if (posts) {
        return posts.find(item => item.id == id);
      }
    };

    const validatePhotoPost = function (photoPost, statusOfValidation) {
      if (!photoPost) {
        return false;
      }
      if (((statusOfValidation && !photoPost.description) || (photoPost.description &&
          typeof (photoPost.description) === 'string' &&
          photoPost.description.length <= 200)) &&
          ((statusOfValidation && !photoPost.photoLink) ||
            (photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink.length !== 0)) &&
          (typeof (photoPost.hashtags) === 'undefined' || validTypeOfArray(photoPost.hashtags)) &&
          (statusOfValidation ||
            (photoPost.id /* && postsJson.findIndex(item => item.id === photoPost.id) === -1  && */
            /* typeof (photoPost.id) === 'string' */ &&
              photoPost.createdAt /* && photoPost.createdAt instanceof Date */ &&
              typeof (photoPost.author) === 'string' && photoPost.author.length !== 0 &&
              (typeof (photoPost.likes) === 'undefined' || validTypeOfArray(photoPost.likes))
            ))) {
        return true;
      }
      return false;
    };

    const addLike = function (id, name, posts) {
      const post = getPhotoPost(id, posts);
      post.likes.push(name);
      return posts;
    };

    const addPhotoPost = function (posts, photoPost) {
      if (validatePhotoPost(photoPost)) {
        posts.push(photoPost);
      }
      return posts;
    };

    const editPhotoPost = function (id, photoPost, posts) {
      const photopostToChange = getPhotoPost(id, posts);
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
      return posts;
    };

    const removePhotoPost = function (posts, id) {
      /* return requests.getRequest('server/data/data.json').then((posts) => {
        posts.splice(posts.findIndex(item => item.id == id), 1);
        return requests.postRequest('./changeData', posts);
      }); */
      posts.splice(posts.findIndex(item => item.id === id), 1);
      return posts;
    };

    return {
      getPhotoPost,
      addLike,
      getPhotoPosts,
      addPhotoPost,
      editPhotoPost,
      removePhotoPost,
    };
  }());

module.exports = modul;
