let photoPosts = [
  {
    id: '1',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23'),
    author: 'lily',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '2',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23'),
    author: 'Иванов Иван',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '3',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '4',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-03-23'),
    author: 'lily',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '5',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-02'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '6',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-20'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '7',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-20'),
    author: 'ivan',
    photoLink: 'https://im0-tub-by.yandex.net/i?id=b10d45533ed1f40e6a29b6f586fb4c04-l&n=13',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '8',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-20'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '9',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-20'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '10',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-01-11'),
    author: 'lily',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '11',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-20'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '12',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-01-11'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '13',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-02-20'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  },
  {
    id: '14',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2017-01-11'),
    author: 'ivan',
    photoLink: 'https://cs1.livemaster.ru/articlefoto/300x225/e/8/f/e8faafd936.jpg',
    hashtags: ['#hashtag', '#summer', '#kek'],
    likes: ['nick_name1', 'nick_name2']
  }
];
window.modul =
  (function () {

    photoPosts.sort(compareByDate);

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
      let posts = photoPosts;
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
            return Date.parse(item.createdAt) === Date.parse(filterConfig.createdAt);
          });
        }

        if (filterConfig.hashtags) {
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
      return photoPosts.find(item => item.id === id);
    };

    let addPhotoPost = function (photoPost) {
      if (validatePhotoPost(photoPost)) {
        photoPosts.push(photoPost);
        photoPosts.sort(compareByDate);
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
          photoPost.id && photoPosts.findIndex(item => item.id === photoPost.id) === -1 &&
          typeof (photoPost.id) === 'string' &&
          photoPost.createdAt && photoPost.createdAt instanceof Date &&
          typeof (photoPost.author) === 'string' && photoPost.author.length !== 0 &&
          (typeof (photoPost.likes) === 'undefined' || validTypeOfArray(photoPost.likes))
        )
      ) {
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
      photoPosts[photoPosts.findIndex(item => item.id === id)] = photopostToChange;
      return true;
    };

    let removePhotoPost = function (id) {
      let index = photoPosts.findIndex(item => item.id === id);
      if (index !== -1) {
        photoPosts.splice(index, 1);
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