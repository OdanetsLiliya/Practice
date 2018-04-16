requests = (function () {

    function postRequest(path, data) {
        return new Promise(function (succeed, fail) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', path, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.addEventListener('load', function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    succeed(xhr.responseText);
                }
                else {
                    fail('Ошибка ' + xhr.status + ': ' + xhr.statusText);
                }
            });
            xhr.send(JSON.stringify(data));
        });
    };
    function getRequest(path) {
        return new Promise(function (succeed, fail) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', path, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function () {
                if (xhr.readyState == 4 /*&& xhr.status == 200*/) {
                    let posts = JSON.parse(xhr.responseText, function (key, value) {
                        if (key == 'createdAt') return new Date(value);
                        return value;
                    });
                    succeed(posts);
                }
                else {
                    fail(new Error('Request failed: ' + xhr.statusText));
                }

            };
            xhr.send();
        });
    };
    return {
        getRequest,
        postRequest
    }
})();
