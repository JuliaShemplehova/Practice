let Controller = (function() {
	return {
		getPhotoPosts: function(start, end, filter) {
            return new Promise(function (resolve, reject) {
                let xml = new XMLHttpRequest();
                let posts, res;
                if (filter) {
                	res = JSON.stringify({
                		skip: String(start),
                        top: String(end),
                        filterConfig: JSON.stringify(filter)
                	});
                }
                else {
                	res = JSON.stringify({
                        skip: String(start),
                        top: String(end)
                    });
                }
                xml.open("POST", "http://localhost:3000/getPosts", true);
                xml.setRequestHeader('Content-Type', 'application/json');

                xml.onload = function() {
                    if (xml.status == 200) {
                        posts = JSON.parse(xml.responseText);
                        resolve(posts);
                    } 
                    else {
                    	reject();
                    }
                };
                xml.send(res);
            });
        },

        getPhotoPost: function(id) {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		xml.open("GET", "http://localhost:3000/getPost/" + id, true);

        		xml.onload = function() {
        			if (xml.status == 200) {
        				resolve(xml.responseText);
        			}
        			else {
        				reject();
        			}
        		};
        		xml.send(null);
        	});
        },

        findIndex: function (id) {
            return new Promise(function (resolve, reject) {
                let xml = new XMLHttpRequest(), ind;
                xml.open("GET", ("http://localhost:3000/findIndex/" + id), true);
                xml.onload = function() {
                    if (xml.status == 200) {
                        ind = JSON.parse(xml.responseText);
                        resolve(ind);
                    }
                    else {
                    	reject();
                    }
                };
                xml.send(null);
            });
        },

        findPost: function (ind) {
            return new Promise(function (resolve, reject) {
                let xml = new XMLHttpRequest();
                xml.open("GET", ("http://localhost:3000/findPost/" + ind), true);
                xml.onload = function () {
                    if (xml.status == 200) {
                        let post = JSON.parse(xml.responseText);
                        resolve(post);
                    }
                    else {
                    	reject();
                    }
                };
                xml.send(null);
            });
        },

        addPhotoPost: function(photoPost) {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		let post = JSON.stringify(photoPost);
                xml.open("POST", "http://localhost:3000/addPost", true);
                xml.setRequestHeader('Content-Type', 'application/json');

                xml.onload = function() {
                	if (xml.status == 200) {
        				resolve(photoPost);
        			}
        			else {
        				reject();
        			}
                };
                xml.send(post);
        	});
        },

        editPhotoPost: function(id, photoPost) {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		let res = JSON.stringify(photoPost);
        		xml.open("PUT", "http://localhost:3000/editPost/" + id, true); 
        		xml.setRequestHeader('Content-Type', 'application/json');

        		xml.onload = function() {
        			if (xml.status == 200) {
        				resolve();
        			}
        			else {
        				reject();
        			}
        		};
        		xml.send(res);
        	});
        },

        removePhotoPost: function(id) {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		xml.open("DELETE", "http://localhost:3000/deletePost/" + id, true); 

                xml.onload = function() {
                    if (xml.status == 200) {
                        resolve();
                    }
                    else {
                    	reject();
                    }
                };
                xml.send(null);
        	});
        },

        getLength: function(end) {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		xml.open("GET", "http://localhost:3000/getSize", true);

        		xml.onload = function() {
        			if (xml.status == 200) {
        				if (Number(xml.responseText) > end) {
               				resolve();
        				}
               			else {
               				reject();
               			}
        			}
        			else {
        				reject();
        			}
        		};
        		xml.send(null);
        	});
        },

        loadFile: function (file) {
            return new Promise(function (resolve, reject) {
                let form = new FormData();
                form.append('file', file);
                let xml = new XMLHttpRequest();
                xml.open('POST', '/uploadImage', true);

                xml.onload = function () {
                    if (xml.status == 200) {
                        resolve(file.name);
                    }
                    else {
                        reject();
                    }
                };
                xml.send(form);
            });
        },

        putlike: function (photoPost, user) {
            return new Promise(function (resolve, reject) {
                let xml = new XMLHttpRequest();
                xml.open("GET", "http://localhost:3000/putLike?id=" + photoPost.id + "&user=" + user, true);

                xml.onload = function() {
                    if (xml.status == 200) {
                        resolve(xml.responseText);
                    }
                    else {
                    	reject();
                    }
                };
                xml.send(null);
            });
        },

        loginUser: function(username, password) {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		let message = JSON.stringify({
        			username: username,
        			password: password
        		});
        		xml.open("POST", "http://localhost:3000/login", true);
        		xml.setRequestHeader('Content-Type', 'application/json');

        		xml.onload = function() {
        			if (xml.status == 200) {
        				resolve(xml.responseText);
        			}
        			else {
        				reject();
        			}
        		};
        		xml.send(message);
        	});
        },

        getUser: function() {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		xml.open("GET", "http://localhost:3000/login", true);

        		xml.onload = function() {
        			if (xml.status == 200) {
        				resolve(xml.responseText);
        			}
        			else {
        				reject();
        			}
        		};
        		xml.send();
        	});
        },

        logoutUser: function() {
        	return new Promise(function (resolve, reject) {
        		let xml = new XMLHttpRequest();
        		xml.open("GET", "http://localhost:3000/logout", true);

        		xml.onload = function() {
        			if (xml.status == 200) {
        				resolve(xml.responseText);
        			}
        			else {
        				reject();
        			}
        		};
        		xml.send();
        	});
        }

   	}
}());

