let filterConfig = null;
let user = null;
window.dom = (function () {
    document.querySelector('.load-more-button').style.visibility = 'hidden';
    let userName = document.querySelector('h2');
    let logButton = document.querySelector('.log-button');
    let makePhotoPost = function (photoPost) {
        let post = document.createElement('div');
        let image = document.createElement('img');
        let buttonArea = document.createElement('div');
        let buttonAdd = document.createElement('div');
        let buttonDel = document.createElement('div');
        let buttonHeart = document.createElement('div');
        let nickAndDate = document.createElement('div');
        let nickName = document.createElement('p3');
        let date = document.createElement('p3');
        let tags = document.createElement('p3');
        let imgAndButtons = document.createElement('div');
        let description = document.createElement('p4');
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
        if (photoPost.likes.length != 0 && user != null && photoPost.likes.findIndex((item) =>
            user === JSON.parse(item)) != -1) {
            buttonHeart.className = 'heart-shape red';
            buttonHeart.style.backgroundColor = 'red';
        }
        buttonArea.append(buttonAdd, buttonDel, buttonHeart);
        nickAndDate.className = 'flex-box';
        nickName.className = 'text-type-comic';
        nickName.innerHTML = photoPost.author;
        date.className = 'text-type-comic';
        date.innerHTML = ('0' + photoPost.createdAt.getDate()).slice(-2) + '.' +
            ('0' + (photoPost.createdAt.getMonth() + 1)).slice(-2) + '.' +
            photoPost.createdAt.getFullYear();
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
    }
    let addPhotoPost = function (photoPost) {
        let lent = document.querySelector('.lent');
        lent.insertBefore(makePhotoPost(photoPost), lent.children[0]);
    }
    let getPhotoPosts = function (skip = 0, top = 10, filterConfig) {
        let photoPosts = modul.getPhotoPosts(skip, top, filterConfig);
        photoPosts.forEach(item => { document.querySelector('.lent').insertBefore(makePhotoPost(item), document.querySelector('.load-more-button')) });
    }
    let editPhotoPost = function (id, photoPost) {
        let post = document.getElementById(id);
        if (post) {
            document.querySelector('.lent').replaceChild(makePhotoPost(modul.getPhotoPost(id)), post);
            return true;
        }
        return false;
    }
    let removePhotoPost = function (id) {
        let post = document.getElementById(JSON.parse(id));
        if (post) {
            document.querySelector('.lent').removeChild(post);
            return true;
        }
        return false;
    }
    let deleteAllPosts = function () {
        let items = document.getElementsByClassName('post');
        items = Array.prototype.slice.call(items);
        items.forEach(function (item) {
            document.querySelector('.lent').removeChild(document.getElementById(item.id));
        });
        return true;
    }
    return {
        addPhotoPost,
        getPhotoPosts,
        editPhotoPost,
        removePhotoPost,
        deleteAllPosts
    }
})();
function showPhotoPosts(skip, top) {
    dom.deleteAllPosts();
    dom.getPhotoPosts(skip, top, filterConfig);
    posts = modul.getPhotoPosts(0, localStorage.length, filterConfig).length;
    //if (posts === 0) {
    //    lent.innerHTML = 'No such posts';
    //}
    if (skip + top >= posts) {
        document.querySelector('.load-more-button').style.visibility = 'hidden';
    } else {
        document.querySelector('.load-more-button').style.visibility = 'visible';
    }
}
function addPhotoPost(photoPost) {
    if (user != null) {
        if (modul.addPhotoPost(photoPost)) {
            dom.addPhotoPost(photoPost);
            // dom.deleteAllPosts();
            // showPhotoPosts(skip, top, filterConfig);
            return true;
        }
    }
    return false;
}
function editPhotoPost(id, photoPost) {
    //if (modul.getPhotoPost(id).author === user) {
    if (modul.editPhotoPost(id, photoPost)) {
        dom.editPhotoPost(id, photoPost);
        return true;
    }
    //}
    return false;
}
function removePhotoPost(id) {
    //if (modul.getPhotoPost(id).author == user) {
    if (modul.removePhotoPost(id)) {
        if (dom.removePhotoPost(id)) {
            let length = document.getElementsByClassName('post').length;
            let posts = modul.getPhotoPosts(0, photoPosts.length, filterConfig);
            if (length < posts.length && length < 10) {
                dom.addPhotoPost(posts[length]);
            }
            if (length + 1 >= posts.length) {
                document.querySelector('.load-more-button').style.visibility = 'hidden';
            }
        }
        return true;
    }
    //}
    return false;
}
function eventForLoadMore() {
    document.querySelector('.load-more-button').addEventListener('click', function () {
        let length = document.getElementsByClassName('post').length;
        let posts = modul.getPhotoPosts(0, localStorage.length, filterConfig);
        if (posts.length > length) {
            dom.getPhotoPosts(length, 10, filterConfig);
            if (posts.length <= length + 10) {
                document.querySelector('.load-more-button').style.visibility = 'hidden';
            }
        }
    });
}