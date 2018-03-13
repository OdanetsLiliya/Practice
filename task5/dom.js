let user = 'lily';
let filterConfig = { author: 'lilil' };
let loadMoreButton = document.querySelector('.load-more-button');
let lent = document.querySelector('.lent');

window.dom = (function () {
    loadMoreButton.style.visibility = 'hidden';
    let userName = document.querySelector('h2');
    let logButton = document.querySelector('.log-button');
    if (user != null) {
        logButton.innerHTML = 'log out';
        userName.innerHTML = user;
    } else {
        logButton.innerHTML = 'log in';
        document.querySelector('.add-the-post').style.visibility = 'hidden';
        userName.style.visibility = 'hidden';
    }
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
        lent.insertBefore(makePhotoPost(photoPost), lent.children[0]);
    }
    let getPhotoPosts = function (skip = 0, top = 10, filterConfig) {
        let photoPosts = modul.getPhotoPosts(skip, top, filterConfig);
        photoPosts.forEach(item => { lent.insertBefore(makePhotoPost(item), loadMoreButton) });
    }
    let editPhotoPost = function (id, photoPost) {
        let post = document.getElementById(id);
        if (post) {
            lent.replaceChild(makePhotoPost(modul.getPhotoPost(id)), post);
            return true;
        }
        return false;
    }
    let removePhotoPost = function (id) {
        let post = document.getElementById(id);
        if (post) {
            lent.removeChild(post);
            return true;
        }
        return false;
    }
    let deleteAllPosts = function () {
        let items = document.getElementsByClassName('post');
        items = Array.prototype.slice.call(items);
        items.forEach(function (item) {
            lent.removeChild(document.getElementById(item.id));
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
    posts = modul.getPhotoPosts(0, photoPosts.length, filterConfig).length;
    //if (posts === 0) {
    //    lent.innerHTML = 'No such posts';
    //}
    if (skip + top >= posts) {
        loadMoreButton.style.visibility = 'hidden';
    } else {
        loadMoreButton.style.visibility = 'visible';
    }
}
function addPhotoPost(photoPost, skip, top) {
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
                loadMoreButton.style.visibility = 'hidden';
            }
        }
        return true;
    }
    //}
    return false;
}
loadMoreButton.addEventListener('click', function () {
    let length = document.getElementsByClassName('post').length;
    let posts = modul.getPhotoPosts(0, photoPosts.length, filterConfig);
    if (posts.length > length) {
        dom.getPhotoPosts(length, 10, filterConfig);
        if (posts.length <= length + 10) {
            loadMoreButton.style.visibility = 'hidden';
        }
    }
});
