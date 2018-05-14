requests = (function () {
  function postRequest(path, skip, top, body) {
    return new Promise(((succeed, fail) => {
      const xhr = new XMLHttpRequest();
      const params = (skip !== null && top !== null) ? 'skip=' + skip + '&top=' + top : null;
      xhr.open('POST', path + (params ? '?' + params : ''), true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          succeed(xhr.responseText);
        } else {
          fail(new Error('Ошибка ' + xhr.status + ': ' + xhr.statusText));
        }
      });
      xhr.send(body ? JSON.stringify(body) : null);
    }));
  }
  function getRequest(path, id) {
    return new Promise(((succeed, fail) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', path + '?id=' + id, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          succeed(xhr.responseText);
        } else {
          fail(new Error('Request failed: ' + xhr.statusText));
        }
      };
      xhr.send();
    }));
  }
  function putRequest(path, idParam, body) {
    return new Promise(((succeed, fail) => {
      const xhr = new XMLHttpRequest();
      const params = 'id=' + idParam;
      xhr.open('PUT', path + '?' + params, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          succeed(xhr.responseText);
        } else {
          fail(new Error('Ошибка ' + xhr.status + ': ' + xhr.statusText));
        }
      });
      xhr.send(body ? JSON.stringify(body) : null);
    }));
  }
  function deleteRequest(path, idParam) {
    return new Promise(((succeed, fail) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', path + '?' + idParam, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          succeed(xhr.responseText);
        } else {
          fail(new Error('Ошибка ' + xhr.status + ': ' + xhr.statusText));
        }
      });
      xhr.send();
    }));
  }
  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
  };
}());
