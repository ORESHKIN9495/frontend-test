const xhr = new XMLHttpRequest();

xhr.responseType = "json";

const post = (url, data) => {
    return new Promise((resolve, reject) => {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.send(JSON.stringify(data));
    });
};

const patch = (url, data) => {
    return new Promise((resolve, reject) => {
        xhr.open("PATCH", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.send(JSON.stringify(data));
    });
};

const del = (url) => {
    return new Promise((resolve, reject) => {
        xhr.open("DELETE", url, true);

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
};

const get = (url) => {
    return new Promise((resolve, reject) => {
        xhr.open("GET", url, true);

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
};

export { del, get, patch, post };
