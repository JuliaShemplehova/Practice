"use strict";
let DOM = (function() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let start = 0, end = 10, link;
    const fordate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    let content = document.createElement('div');
    content.className = 'content';    
    let logIn = document.createElement('button');
    logIn.className = 'prime';
    logIn.innerHTML = 'Войти';
    let container = document.createElement('div');
    let hello = document.createElement('font');
    let aut = document.createElement('div');
    aut.className = 'user';
    document.body.appendChild(container);
    document.body.appendChild(content);
    let more = document.createElement('button');
    more.className = 'more';
    more.innerHTML = 'Загрузить еще';

    //кнопка загрузить еще
    more.onclick = function() { 
        end += 10;
        start += 10;
        let makeRequest = async(start, end) => {
            DOM.showPosts();
            await Controller.getLength(end);
        };

        makeRequest(start, end).catch(reject => {
            content.removeChild(content.lastElementChild);
        });
    };

    //Авторизация
    logIn.onclick = function() {
        let form = document.createElement('div');
        form.className = 'content_aut';
        document.body.appendChild(form);
        form.style.display = "block";
        let aut_form = document.createElement('div');
        aut_form.className = 'aut_form';
        form.appendChild(aut_form);
        let name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = 'Авторизация на сайте';
        aut_form.appendChild(name);

        let font1 = document.createElement('font');
        font1.className = 'aut_font';
        font1.innerHTML = "  Логин ";
        aut_form.appendChild(font1);
        let input1 = document.createElement('input');
        input1.className = 'log';
        input1.id = 'input_login';
        aut_form.appendChild(input1);
        let p = document.createElement('font');
        p.innerHTML = '<br><br>';
        aut_form.appendChild(p);

        let font2 = document.createElement('font');
        font2.className = 'aut_font';
        font2.innerHTML = "Пароль";
        aut_form.appendChild(font2);
        let input2 = document.createElement('input');
        input2.className = 'log';
        input2.id = 'input_password';
        aut_form.appendChild(input2);
        let p1 = document.createElement('font');
        p1.innerHTML = '<br><br>';
        aut_form.appendChild(p1);

        let cancel = document.createElement('button');
        cancel.className = 'prime';
        cancel.innerHTML = 'Отмена';
        aut_form.appendChild(cancel);
        cancel.onclick = function() { 
            form.parentNode.removeChild(form);
            user = null;
            form.style.display = "none";
        };
       
        let okay = document.createElement('button');
        okay.className = 'prime_right';
        okay.innerHTML = 'ОК';
        aut_form.appendChild(okay);
        okay.onclick = function() { 
            let user_login = document.getElementById('input_login');    
            let password = document.getElementById('input_password'); 
            DOM.clearFilter();
            if (password.value && user_login.value) {
                if (Сlients.validateUser(user_login.value, password.value)) {
                user = user_login.value;
                window.localStorage.setItem("user", JSON.stringify(user));
                form.style.display = "none";
                form.parentNode.removeChild(form);  
                }
                else {
                    alert("Введены неверные данные!");
                    document.getElementById('input_password').value = null;
                }     
                content.innerHTML = "";
                aut.innerHTML = "";
                DOM.show();
            }
            else {
                alert("Вы что-то не ввели:(");
            }
        };              
    };

   //Фильтр
    let OK = document.getElementById('filter_OK');
    OK.onclick = function() {
        let data_start, data_end, mass_hashtags;
        if (document.getElementById('input_start').value === "" ) {
            data_start  = null;
        }
        else {
            data_start = document.getElementById('input_start').value + 'T00:00:00';
        }
        if (document.getElementById('input_end').value === "" ) {
            data_end  = '2100-01-01T00:00:00';
        }
        else {
            data_end = document.getElementById('input_end').value + 'T23:59:59';
        }
        if (document.getElementById('input_hashtags').value !== "") {
            mass_hashtags = document.getElementById('input_hashtags').value.split(', ');
        } 
        if(document.getElementById('input_start').value !== "" || document.getElementById('input_end').value !== "" || document.getElementById('input_author').value !== "" || document.getElementById('input_hashtags').value !== "") {
            content.innerHTML = "";

            let makeRequest = async() => {
                let some_posts = await Controller.getPhotoPosts(start, end, {
                    author: document.getElementById('input_author').value,
                    start: new Date(data_start), 
                    end: new Date(data_end),
                    hashTags: mass_hashtags
                });

                DOM.showTape(some_posts, start, end);  
                if (some_posts.length <= 10) {
                    content.removeChild(content.lastElementChild);
                }
            };

            makeRequest().catch(reject => {
                let sorry = document.createElement('font');
                sorry.className = 'hello';
                sorry.innerHTML = '<br><br><br><br>Извините, мы не нашли таких фотопостов. Проверьте введенные данные:)<br><br><br><br>';
                content.appendChild(sorry);
            });
        }
    }

    let cancell = document.getElementById('filter_cancel');
    cancell.onclick = function() {
        content.innerHTML = "";
        DOM.clearFilter();
        start = 0;
        end = 10;
        DOM.showPosts();
    }

    //кнопка добавления фотопоста
    let add = document.createElement('button');
    add.className = 'prime';
    add.innerHTML = 'Добавить фото';
    add.onclick = function() {
        let form_add = document.createElement('div');
        form_add.className = 'content_add';
        form_add.style.display = "block";
        document.body.appendChild(form_add);

        let post = document.createElement('div');
        post.className = 'edit_form';
        form_add.appendChild(post);
        let name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = 'Добавить/редактировать фото';
        post.appendChild(name);

        let photoUser = document.createElement('img');
        photoUser.src = 'images/authorized_user.jpg';
        post.appendChild(photoUser);
        let newfont = document.createElement('font');
        newfont.className = 'username';
        newfont.innerHTML = user;
        post.appendChild(newfont);

        let obl = document.createElement('div');
        obl.className = 'obl';
        obl.innerHTML = 'Выберите фото для нового фотопоста'
        post.appendChild(obl);
        let pic = document.createElement('img');
        pic.src = 'images/icon.png';
        obl.appendChild(pic);
        let b = document.createElement('font');
        b.innerHTML = '<br>';
        obl.appendChild(b);
        let inp = document.createElement('input');
        inp.type = 'file';

        let textFile;
        inp.onchange = function() {
            let fileList = this.files;
            textFile = fileList[0];
            let makeRequest = async() => {
                link = await Controller.loadFile(textFile);
            };
            makeRequest();
        };
        
        inp.id = 'photopost_link';
        obl.appendChild(inp);

        let desc = document.createElement('input');
        desc.className = 'inputs';
        desc.id = 'photopost_desc'
        desc.placeholder = 'Добавьте краткое описание к фото (до 200 символов)';
        post.appendChild(desc);

        let hash = document.createElement('input');
        hash.className = 'inputs';
        hash.id = 'photopost_hash';
        hash.placeholder = 'Добавьте список хэштегов к фото через запятую (необязательное поле)';
        post.appendChild(hash);
        let p = document.createElement('font');
        p.innerHTML = '<br><br><br>';
        post.appendChild(p);

        let cancel = document.createElement('button');
        cancel.className = 'prime';
        cancel.innerHTML = 'Отмена';
        post.appendChild(cancel);
        cancel.onclick = function() { 
            form_add.parentNode.removeChild(form_add);
            form_add.style.display = "none";
        };

        let mass;
        let add_okay = document.createElement('button');
        add_okay.className = 'prime_right';
        add_okay.innerHTML = 'ОК';
        post.appendChild(add_okay);

        //добавление фотопоста
        add_okay.onclick = function() { 
            let last_id = content.firstElementChild.id;
            last_id++;
            mass = document.getElementById('photopost_hash').value.split(', ');
            let str = document.getElementById('photopost_link').value.split('fakepath')[1];
                let makeRequest = async() => {
                   await Controller.addPhotoPost({ 
                        id: last_id + "",
                        description: document.getElementById('photopost_desc').value,
                        createdAt: new Date(), 
                        author: user,
                        photoLink: link,
                        hashTags: mass,
                        likes: []
                    });
                    form_add.parentNode.removeChild(form_add);
                    form_add.style.display = "none";
                    content.innerHTML = "";
                    start = 0;
                    end = 10;
                    DOM.showPosts();
                };

                makeRequest().catch(reject => {
                    alert("Проверьте введенные данные");
                });
        };        
    };

    //кнопка выхода
    let exit = document.createElement('button');
    exit.className = 'prime';
    exit.innerHTML = 'Выйти';
    exit.onclick = function() {
        user = null;
        window.localStorage.setItem("user", JSON.stringify(user));
        content.innerHTML = "";
        aut.innerHTML = "";
        DOM.clearFilter();
        DOM.show();
    };

    return {
        autorizing: function(user) {
            if (user !== null && user !== "") {
                let photoUser = document.createElement('img');
                photoUser.className = 'main_photo';
                aut.appendChild(photoUser);
                let newfont = document.createElement('font');
                newfont.className = 'username';
                newfont.innerHTML = user;
                aut.appendChild(newfont);
                aut.appendChild(add);
                let p = document.createElement('font');
                p.innerHTML = '<br>';
                aut.appendChild(p);
                aut.appendChild(exit);
                container.appendChild(aut);   
            }
            else {
                hello.className = 'hello';
                hello.innerHTML = 'Добро пожаловать!';
                aut.appendChild(hello);
                let p = document.createElement('div');
                p.innerHTML = '<br><br>';
                aut.appendChild(p);
                aut.appendChild(logIn);
                container.appendChild(aut);
            }
        },
        doPhotopost: function(photoPost) {
            let post = document.createElement('div');
            post.className = 'post';
            post.id = photoPost.id;
            let photoUser = document.createElement('img');
            if (photoPost.author !== user) {
                photoUser.className = 'photo';
                photoUser.src = 'images/user.jpg'; 
                post.appendChild(photoUser);
            }
            else {
                photoUser.className = 'photo';
                photoUser.src = 'images/authorized_user.jpg'; 
                post.appendChild(photoUser);
            } 
            let newfont = document.createElement('font');
            newfont.className = 'username';
            newfont.innerHTML = photoPost.author;
            post.appendChild(newfont);
            if (photoPost.author === user) {
                let instr = document.createElement('div');
                instr.className = 'instruments';
                let edit = document.createElement('font');
                edit.id = 'edit' + post.id;
                edit.innerHTML = 'Редактировать';
                instr.appendChild(edit);
                let editpic = document.createElement('img');
                editpic.src = 'images/edit.png';
                edit.appendChild(editpic);

                //кнопка редактирования
                edit.onclick = function() {
                    let photoID = "";
                    for (let i = 3; i < edit.id.length; i++) {
                        photoID += dodelete.id.charAt(i);
                    }
                    let form_add = document.createElement('div');
                    form_add.className = 'content_add';
                    form_add.style.display = "block";
                    document.body.appendChild(form_add);

                    let post = document.createElement('div');
                    post.className = 'edit_form';
                    form_add.appendChild(post);
                    let name = document.createElement('div');
                    name.className = 'name';
                    name.innerHTML = 'Добавить/редактировать фото';
                    post.appendChild(name);

                    let photoUser = document.createElement('img');
                    photoUser.src = 'images/authorized_user.jpg';
                    post.appendChild(photoUser);
                    let newfont = document.createElement('font');
                    newfont.className = 'username';
                    newfont.innerHTML = user;
                    post.appendChild(newfont);

                    let obl = document.createElement('div');
                    obl.className = 'obl_edit';
                    obl.innerHTML = 'Выберите файл, если вы хотите изменить старое фото'
                    post.appendChild(obl);
                    let pic = document.createElement('img');

                    let makeRequest = async() => {
                        let indexxx = await Controller.findIndex(photoID);
                        let photopost = await Controller.findPost(indexxx); 
                        pic.src  = "images/" + photopost.photoLink; 
                        desc.value = photopost.description;
                        for (let i = 0; i < photopost.hashTags.length-1; i++) {
                            hash.value += photopost.hashTags[i] + ', ';
                        }
                        hash.value += photopost.hashTags[photopost.hashTags.length-1];
                    }; 

                    makeRequest();
                   
                    pic.className = 'photo_edit';
                    obl.appendChild(pic);
                    let b = document.createElement('font');
                    b.innerHTML = '<br>';
                    obl.appendChild(b);
                    let inp = document.createElement('input');
                    inp.type = 'file';
                    inp.id = 'photopost_link';
                    let textFile;
                    let link = "images/";
                    inp.onchange = function() {
                        let fileList = this.files;
                        textFile = fileList[0];
                        let makeRequest = async() => {
                            link = await Controller.loadFile(textFile);
                        };
                        makeRequest();
                    };

                    obl.appendChild(inp);
                    let desc = document.createElement('input');
                    desc.className = 'inputs';
                    desc.id = 'photopost_desc';
                    post.appendChild(desc);

                    let hash = document.createElement('input');
                    hash.className = 'inputs';
                    hash.id = 'photopost_hash';
                    post.appendChild(hash);
                    let p = document.createElement('font');
                    p.innerHTML = '<br><br>';
                    post.appendChild(p);

                    let cancel = document.createElement('button');
                    cancel.className = 'prime';
                    cancel.innerHTML = 'Отмена';
                    post.appendChild(cancel);
                    cancel.onclick = function() { 
                        form_add.parentNode.removeChild(form_add);
                        form_add.style.display = "none";
                    };

                    let okay = document.createElement('button');
                    okay.className = 'prime_right';
                    okay.innerHTML = 'ОК';
                    post.appendChild(okay);

                    //редактируем
                    okay.onclick = function() { 
                        let descrip = document.getElementById('photopost_desc').value;
                        let hasht = document.getElementById('photopost_hash').value.split(', ');

                        let makeRequest = async() => {
                            if (descrip) {
                                if (document.getElementById('photopost_link').value) {
                                    await Controller.editPhotoPost(photoID, {
                                        description: descrip,
                                        photoLink: link,
                                        hashTags: hasht
                                    });
                                }
                                else {
                                    await Controller.editPhotoPost(photoID, {
                                        description: descrip,
                                        hashTags: hasht
                                    });
                                }
                            form_add.parentNode.removeChild(form_add);
                            form_add.style.display = "none";
                            }
                            else {
                                 alert("Проверьте введенные данные");
                             }
                        };
                        makeRequest();
                  
                        let makeRequest2 = async() => {
                            let phpost = JSON.parse(await Controller.getPhotoPost(photoID)); 
                            DOM.editPhotoPost(photoID, phpost);                        
                        }
                        makeRequest2();
                    }
                    DOM.clearFilter();
                }

                instr.appendChild(edit);
                let p = document.createElement('font');
                p.innerHTML = '<br>';
                instr.appendChild(p);

                //кнопка удаления
                let dodelete = document.createElement('font');
                dodelete.innerHTML = 'Удалить';
                dodelete.id = 'del' + post.id;
                instr.appendChild(dodelete);
                let deletepic = document.createElement('img');
                deletepic.src = 'images/delete.png';
                dodelete.appendChild(deletepic);
                dodelete.onclick = function() {
                    let form_delete = document.createElement('div');
                    form_delete.className = 'content_aut';
                    document.body.appendChild(form_delete);
                    form_delete.style.display = "block";

                    let cont = document.createElement('div');
                    cont.className = 'aut_form';
                    form_delete.appendChild(cont);
                    let name = document.createElement('div');
                    name.className = 'name';
                    name.innerHTML = 'Вы действительно хотите удалить данный фотопост?';
                    cont.appendChild(name);

                    let cancel = document.createElement('button');
                    cancel.className = 'prime';
                    cancel.innerHTML = 'Нет';
                    cont.appendChild(cancel);
                    cancel.onclick = function() { 
                        form_delete.parentNode.removeChild(form_delete);
                        form_delete.style.display = "none";
                    };
       
                    let delete_okay = document.createElement('button');
                    delete_okay.className = 'prime_right';
                    delete_okay.innerHTML = 'Да';
                    cont.appendChild(delete_okay);

                    delete_okay.onclick = function() { 
                        let str = "";
                        for (let i = 3; i < dodelete.id.length; i++) {
                            str += dodelete.id.charAt(i);
                        }
                        let makeRequest = async() => {
                            await Controller.removePhotoPost(str);
                            form_delete.parentNode.removeChild(form_delete);
                            form_delete.style.display = "none";
                            DOM.removePhotoPost(str);
                        };

                        makeRequest().catch(reject => {
                            alert("чето ошибочка");
                        });
                    }     
                }

                instr.appendChild(dodelete);
                post.appendChild(instr);
            }

            let date = document.createElement('div');
            date.className = 'date';
            let d = new Date(photoPost.createdAt);
            date.innerHTML = d.toLocaleString("en-US", fordate);
            post.appendChild(date);
            let photo = document.createElement('img');
            photo.src = "images/" + photoPost.photoLink;
            photo.alt = 'photo';
            photo.className = 'photoLink';
            post.appendChild(photo);
            let button_like = document.createElement('button');
            button_like.className = 'like';
            button_like.id = 'like' + post.id;
            let bool = false;
            if (photoPost.likes) {
                if (user) {
                    for (let i = 0; i < photoPost.likes.length; i++) {
                            if (photoPost.likes[i] === user) {
                                bool = true;
                            }
                    }
                    if (bool) {
                        button_like.className = 'pressed_like';
                        button_like.innerHTML = photoPost.likes.length + '<br>likes';
                    }
                    else {
                        button_like.className = 'like';
                        button_like.innerHTML = photoPost.likes.length + '<br>likes';
                    }
                }
                else
                    button_like.innerHTML = photoPost.likes.length + '<br>likes';
            }
            else {
                button_like.innerHTML = '0<br>likes';
            }
            post.appendChild(button_like);
            button_like.onclick = function() {
                if (user) {
                    let str = "";
                    for (let i = 4; i < button_like.id.length; i++) {
                        str += button_like.id.charAt(i);
                    }
                    
                    let makeRequest = async() => {
                        let this_post = JSON.parse(await Controller.getPhotoPost(str));
                        let q = await Controller.putlike(this_post, user);
                        button_like.innerHTML = q + '<br>likes';
                        let found = this_post.likes.find(function(element) {
                            return element === user;
                        });
                        if (found) {
                            button_like.className = 'like';
                        }
                        else {
                            button_like.className = 'pressed_like';
                        }  
                    };

                    makeRequest().catch(reject => {
                        alert("ошибочка");
                    });
                }
            };
            let desc = document.createElement('div');
            desc.className = 'description';
            desc.innerHTML = '<b>' + photoPost.author + '</b>' + ': ' + photoPost.description + '<br>';
            post.appendChild(desc);
            let hash = document.createElement('div');
            hash.className = 'hashtag';
            if (photoPost.hashTags && photoPost.hashTags[0] !== "") {  
                for (let i = 0; i < photoPost.hashTags.length; i++) {
                    hash.innerHTML += '#' + photoPost.hashTags[i] + ' ';
                }
                desc.appendChild(hash);  
            }
            return post;
        },
        showTape: function(photoPosts, start, end) {
            if (end !== undefined && start !== undefined) {
                for (let i = 0; i < (end - start) && i < photoPosts.length; i++) {
                    content.appendChild(DOM.doPhotopost(photoPosts[i]));
                }
                content.appendChild(more);
            }
        },
        addPhotoPost: function(photoPost) {
            content.insertBefore(DOM.doPhotopost(photoPost), content.firstElementChild);
            content.removeChild(content.lastElementChild);
            content.removeChild(content.lastElementChild);
            content.appendChild(more);
        },
        removePhotoPost: function(id) {
            let del = document.getElementById(id);
            content.removeChild(del);
            content.removeChild(content.lastElementChild);
                        
            let makeRequest = async() => {
                let index = await Controller.findIndex(content.lastElementChild.id);
                index++;
                let photopost = await Controller.findPost(index);
                content.appendChild(DOM.doPhotopost(photopost));
               
                await Controller.getLength(end);
                content.appendChild(more);              
            };

            makeRequest().catch(reject => {
            });
        },
        editPhotoPost: function(id, photoPost) {
           content.replaceChild(DOM.doPhotopost(photoPost), document.getElementById(id));
        },
        showPosts: function() {
            let makeRequest = async() => {
                let some_posts = await Controller.getPhotoPosts(start, end);
                DOM.showTape(some_posts, start, end);          
            };
            makeRequest();
        },
        clearFilter: function() {
            document.getElementById('input_author').value = "";
            document.getElementById('input_start').value = "";
            document.getElementById('input_end').value = "";
            document.getElementById('input_hashtags').value = "";
        },
        show: function() {
            DOM.autorizing(user);
            DOM.showPosts();            
        }
    };
}());

DOM.show();