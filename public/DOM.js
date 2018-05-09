const DOM = (function () {
  let user = JSON.parse(window.localStorage.getItem('user'));
  let start = 0;
  let end = 10;
  let link;
  const fordate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const content = document.createElement('div');
  content.className = 'content';
  const logIn = document.createElement('button');
  logIn.className = 'prime';
  logIn.innerHTML = 'Войти';
  const container = document.createElement('div');
  const hello = document.createElement('font');
  const aut = document.createElement('div');
  aut.className = 'user';
  document.body.appendChild(container);
  document.body.appendChild(content);
  const more = document.createElement('button');
  more.className = 'more';
  more.innerHTML = 'Загрузить еще';

  // кнопка загрузить еще
  more.onclick = function () {
    end += 10;
    start += 10;
    const makeRequestmore = async () => {
      DOM.showPosts();
      await Controller.getLength(end);
    };

    makeRequestmore().catch(() => {
      content.removeChild(content.lastElementChild);
    });
  };

  // Авторизация
  logIn.onclick = function () {
    const form = document.createElement('div');
    form.className = 'content_aut';
    document.body.appendChild(form);
    form.style.display = 'block';
    const aut_form = document.createElement('div');
    aut_form.className = 'aut_form';
    form.appendChild(aut_form);
    const name = document.createElement('div');
    name.className = 'name';
    name.innerHTML = 'Авторизация на сайте';
    aut_form.appendChild(name);

    const font1 = document.createElement('font');
    font1.className = 'aut_font';
    font1.innerHTML = '  Логин ';
    aut_form.appendChild(font1);
    const input1 = document.createElement('input');
    input1.className = 'log';
    input1.id = 'input_login';
    aut_form.appendChild(input1);
    const p = document.createElement('font');
    p.innerHTML = '<br><br>';
    aut_form.appendChild(p);

    const font2 = document.createElement('font');
    font2.className = 'aut_font';
    font2.innerHTML = 'Пароль';
    aut_form.appendChild(font2);
    const input2 = document.createElement('input');
    input2.className = 'log';
    input2.id = 'input_password';
    aut_form.appendChild(input2);
    const p1 = document.createElement('font');
    p1.innerHTML = '<br><br>';
    aut_form.appendChild(p1);

    const cancel = document.createElement('button');
    cancel.className = 'prime';
    cancel.innerHTML = 'Отмена';
    aut_form.appendChild(cancel);
    cancel.onclick = function () {
      form.parentNode.removeChild(form);
      user = null;
      form.style.display = 'none';
    };

    const okay = document.createElement('button');
    okay.className = 'prime_right';
    okay.innerHTML = 'ОК';
    aut_form.appendChild(okay);
    okay.onclick = function () {
      const user_login = document.getElementById('input_login');
      const password = document.getElementById('input_password');
      DOM.clearFilter();
      if (password.value && user_login.value) {
        if (Сlients.validateUser(user_login.value, password.value)) {
          user = user_login.value;
          window.localStorage.setItem('user', JSON.stringify(user));
          form.style.display = 'none';
          form.parentNode.removeChild(form);
        } else {
          alert('Введены неверные данные!');
          document.getElementById('input_password').value = null;
        }
        content.innerHTML = '';
        aut.innerHTML = '';
        DOM.show();
      } else {
        alert('Вы что-то не ввели:(');
      }
    };
  };

  // Фильтр
  const OK = document.getElementById('filter_OK');
  OK.onclick = function () {
    let data_start;
    let data_end;
    let mass_hashtags;
    if (document.getElementById('input_start').value === '') {
      data_start = null;
    } else {
      data_start = document.getElementById('input_start').value + 'T00:00:00';
    }
    if (document.getElementById('input_end').value === '') {
      data_end = '2100-01-01T00:00:00';
    } else {
      data_end = document.getElementById('input_end').value + 'T23:59:59';
    }
    if (document.getElementById('input_hashtags').value !== '') {
      mass_hashtags = document.getElementById('input_hashtags').value.split(', ');
    }
    if (document.getElementById('input_start').value !== '' || document.getElementById('input_end').value !== '' || document.getElementById('input_author').value !== '' || document.getElementById('input_hashtags').value !== '') {
      content.innerHTML = '';

      const makeRequestfilter = async () => {
        const some_posts = await Controller.getPhotoPosts(start, end, {
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

      makeRequestfilter().catch(() => {
        const sorry = document.createElement('font');
        sorry.className = 'hello';
        sorry.innerHTML = '<br><br><br><br>Извините, мы не нашли таких фотопостов. Проверьте введенные данные:)<br><br><br><br>';
        content.appendChild(sorry);
      });
    }
  };

  const cancell = document.getElementById('filter_cancel');
  cancell.onclick = function () {
    content.innerHTML = '';
    DOM.clearFilter();
    start = 0;
    end = 10;
    DOM.showPosts();
  };

  // кнопка добавления фотопоста
  const add = document.createElement('button');
  add.className = 'prime';
  add.innerHTML = 'Добавить фото';
  add.onclick = function () {
    const form_add = document.createElement('div');
    form_add.className = 'content_add';
    form_add.style.display = 'block';
    document.body.appendChild(form_add);

    const addpost = document.createElement('div');
    addpost.className = 'edit_form';
    form_add.appendChild(addpost);
    const name = document.createElement('div');
    name.className = 'name';
    name.innerHTML = 'Добавить/редактировать фото';
    addpost.appendChild(name);

    const photoUser = document.createElement('img');
    photoUser.src = 'images/authorized_user.jpg';
    addpost.appendChild(photoUser);
    const newfont = document.createElement('font');
    newfont.className = 'username';
    newfont.innerHTML = user;
    addpost.appendChild(newfont);

    const obl = document.createElement('div');
    obl.className = 'obl';
    obl.innerHTML = 'Выберите фото для нового фотопоста';
    addpost.appendChild(obl);
    const pic = document.createElement('img');
    pic.src = 'images/icon.png';
    obl.appendChild(pic);
    const b = document.createElement('font');
    b.innerHTML = '<br>';
    obl.appendChild(b);
    const inp = document.createElement('input');
    inp.type = 'file';

    let textFile;
    inp.onchange = function () {
      const fileList = this.files;
      textFile = fileList[0];
      const makeRequestpic = async () => {
        link = await Controller.loadFile(textFile);
      };
      makeRequestpic();
    };

    inp.id = 'photopost_link';
    obl.appendChild(inp);

    const desc = document.createElement('input');
    desc.className = 'inputs';
    desc.id = 'photopost_desc';
    desc.placeholder = 'Добавьте краткое описание к фото (до 200 символов)';
    addpost.appendChild(desc);

    const hash = document.createElement('input');
    hash.className = 'inputs';
    hash.id = 'photopost_hash';
    hash.placeholder = 'Добавьте список хэштегов к фото через запятую (необязательное поле)';
    addpost.appendChild(hash);
    const p = document.createElement('font');
    p.innerHTML = '<br><br><br>';
    addpost.appendChild(p);

    const cancel = document.createElement('button');
    cancel.className = 'prime';
    cancel.innerHTML = 'Отмена';
    addpost.appendChild(cancel);
    cancel.onclick = function () {
      form_add.parentNode.removeChild(form_add);
      form_add.style.display = 'none';
    };

    let mass;
    const add_okay = document.createElement('button');
    add_okay.className = 'prime_right';
    add_okay.innerHTML = 'ОК';
    addpost.appendChild(add_okay);

    // добавление фотопоста
    add_okay.onclick = function () {
      let last_id = content.firstElementChild.id;
      last_id += 1;
      mass = document.getElementById('photopost_hash').value.split(', ');
      const makeRequestadd = async () => {
        await Controller.addPhotoPost({
          id: last_id + '',
          description: document.getElementById('photopost_desc').value,
          createdAt: new Date(),
          author: user,
          photoLink: link,
          hashTags: mass,
          likes: []
        });
        form_add.parentNode.removeChild(form_add);
        form_add.style.display = 'none';
        content.innerHTML = '';
        start = 0;
        end = 10;
        DOM.showPosts();
      };

      makeRequestadd().catch(() => {
        alert('Проверьте введенные данные');
      });
    };
  };

  // кнопка выхода
  const exit = document.createElement('button');
  exit.className = 'prime';
  exit.innerHTML = 'Выйти';
  exit.onclick = function () {
    user = null;
    window.localStorage.setItem('user', JSON.stringify(user));
    content.innerHTML = '';
    aut.innerHTML = '';
    DOM.clearFilter();
    DOM.show();
  };

  return {
    autorizing: function () {
      if (user !== null && user !== '') {
        const photoUser = document.createElement('img');
        photoUser.className = 'main_photo';
        aut.appendChild(photoUser);
        const newfont = document.createElement('font');
        newfont.className = 'username';
        newfont.innerHTML = user;
        aut.appendChild(newfont);
        aut.appendChild(add);
        const p = document.createElement('font');
        p.innerHTML = '<br>';
        aut.appendChild(p);
        aut.appendChild(exit);
        container.appendChild(aut);
      } else {
        hello.className = 'hello';
        hello.innerHTML = 'Добро пожаловать!';
        aut.appendChild(hello);
        const p = document.createElement('div');
        p.innerHTML = '<br><br>';
        aut.appendChild(p);
        aut.appendChild(logIn);
        container.appendChild(aut);
      }
    },
    doPhotopost: function (photoPost) {
      const post = document.createElement('div');
      post.className = 'post';
      post.id = photoPost.id;
      const photoUser = document.createElement('img');
      if (photoPost.author !== user) {
        photoUser.className = 'photo';
        photoUser.src = 'images/user.jpg';
        post.appendChild(photoUser);
      } else {
        photoUser.className = 'photo';
        photoUser.src = 'images/authorized_user.jpg';
        post.appendChild(photoUser);
      }
      const newfont = document.createElement('font');
      newfont.className = 'username';
      newfont.innerHTML = photoPost.author;
      post.appendChild(newfont);
      if (photoPost.author === user) {
        const instr = document.createElement('div');
        instr.className = 'instruments';
        const edit = document.createElement('font');
        edit.id = 'edit' + post.id;
        edit.innerHTML = 'Редактировать';
        instr.appendChild(edit);
        const editpic = document.createElement('img');
        editpic.src = 'images/edit.png';
        edit.appendChild(editpic);

        const dodelete = document.createElement('font');
        dodelete.innerHTML = 'Удалить';
        dodelete.id = 'del' + post.id;

        const desc = document.createElement('input');
        desc.className = 'inputs';
        desc.id = 'photopost_desc';

        const hash = document.createElement('input');
        hash.className = 'inputs';
        hash.id = 'photopost_hash';

        // кнопка редактирования
        edit.onclick = function () {
          let photoID = '';
          for (let i = 3; i < edit.id.length; i++) {
            photoID += dodelete.id.charAt(i);
          }
          const form_add = document.createElement('div');
          form_add.className = 'content_add';
          form_add.style.display = 'block';
          document.body.appendChild(form_add);

          const editpost = document.createElement('div');
          editpost.className = 'edit_form';
          form_add.appendChild(editpost);
          const name = document.createElement('div');
          name.className = 'name';
          name.innerHTML = 'Добавить/редактировать фото';
          editpost.appendChild(name);

          const photoUseredit = document.createElement('img');
          photoUseredit.src = 'images/authorized_user.jpg';
          editpost.appendChild(photoUseredit);
          const font = document.createElement('font');
          font.className = 'username';
          font.innerHTML = user;
          editpost.appendChild(newfont);

          const obl = document.createElement('div');
          obl.className = 'obl_edit';
          obl.innerHTML = 'Выберите файл, если вы хотите изменить старое фото';
          editpost.appendChild(obl);
          const pic = document.createElement('img');

          const makeRequestdo = async () => {
            const indexxx = await Controller.findIndex(photoID);
            const photopost = await Controller.findPost(indexxx);
            pic.src = 'images/' + photopost.photoLink;
            desc.value = photopost.description;
            for (let i = 0; i < photopost.hashTags.length - 1; i++) {
              hash.value += photopost.hashTags[i] + ', ';
            }
            hash.value += photopost.hashTags[photopost.hashTags.length - 1];
          };

          makeRequestdo();

          pic.className = 'photo_edit';
          obl.appendChild(pic);
          const b = document.createElement('font');
          b.innerHTML = '<br>';
          obl.appendChild(b);
          const inp = document.createElement('input');
          inp.type = 'file';
          inp.id = 'photopost_link';
          let textFile;
          inp.onchange = function () {
            const fileList = this.files;
            textFile = fileList[0];
            const makeRequestload = async () => {
              link = await Controller.loadFile(textFile);
            };
            makeRequestload();
          };

          obl.appendChild(inp);

          editpost.appendChild(desc);
          editpost.appendChild(hash);

          const p = document.createElement('font');
          p.innerHTML = '<br><br>';
          editpost.appendChild(p);

          const cancel = document.createElement('button');
          cancel.className = 'prime';
          cancel.innerHTML = 'Отмена';
          editpost.appendChild(cancel);
          cancel.onclick = function () {
            form_add.parentNode.removeChild(form_add);
            form_add.style.display = 'none';
          };

          const okay = document.createElement('button');
          okay.className = 'prime_right';
          okay.innerHTML = 'ОК';
          editpost.appendChild(okay);

          // редактируем
          okay.onclick = function () {
            const descrip = document.getElementById('photopost_desc').value;
            const hasht = document.getElementById('photopost_hash').value.split(', ');

            const makeRequestedit = async () => {
              if (descrip) {
                if (document.getElementById('photopost_link').value) {
                  await Controller.editPhotoPost(photoID, {
                    description: descrip,
                    photoLink: link,
                    hashTags: hasht
                  });
                } else {
                  await Controller.editPhotoPost(photoID, {
                    description: descrip,
                    hashTags: hasht
                  });
                }
                form_add.parentNode.removeChild(form_add);
                form_add.style.display = 'none';
              } else {
                alert('Проверьте введенные данные');
              }
            };
            makeRequestedit();

            const makeRequestedit2 = async () => {
              const phpost = JSON.parse(await Controller.getPhotoPost(photoID));
              DOM.editPhotoPost(photoID, phpost);
            };
            makeRequestedit2();
          };
          DOM.clearFilter();
        };

        instr.appendChild(edit);
        const p = document.createElement('font');
        p.innerHTML = '<br>';
        instr.appendChild(p);

        // кнопка удаления
        instr.appendChild(dodelete);
        const deletepic = document.createElement('img');
        deletepic.src = 'images/delete.png';
        dodelete.appendChild(deletepic);
        dodelete.onclick = function () {
          const form_delete = document.createElement('div');
          form_delete.className = 'content_aut';
          document.body.appendChild(form_delete);
          form_delete.style.display = 'block';

          const cont = document.createElement('div');
          cont.className = 'aut_form';
          form_delete.appendChild(cont);
          const name = document.createElement('div');
          name.className = 'name';
          name.innerHTML = 'Вы действительно хотите удалить данный фотопост?';
          cont.appendChild(name);

          const cancel = document.createElement('button');
          cancel.className = 'prime';
          cancel.innerHTML = 'Нет';
          cont.appendChild(cancel);
          cancel.onclick = function () {
            form_delete.parentNode.removeChild(form_delete);
            form_delete.style.display = 'none';
          };

          const delete_okay = document.createElement('button');
          delete_okay.className = 'prime_right';
          delete_okay.innerHTML = 'Да';
          cont.appendChild(delete_okay);

          delete_okay.onclick = function () {
            let str = '';
            for (let i = 3; i < dodelete.id.length; i++) {
              str += dodelete.id.charAt(i);
            }
            const makeRequestdelete = async () => {
              await Controller.removePhotoPost(str);
              form_delete.parentNode.removeChild(form_delete);
              form_delete.style.display = 'none';
              DOM.removePhotoPost(str);
            };

            makeRequestdelete().catch(() => {
              alert('чето ошибочка');
            });
          };
        };

        instr.appendChild(dodelete);
        post.appendChild(instr);
      }

      const date = document.createElement('div');
      date.className = 'date';
      const d = new Date(photoPost.createdAt);
      date.innerHTML = d.toLocaleString('en-US', fordate);
      post.appendChild(date);
      const photo = document.createElement('img');
      photo.src = 'images/' + photoPost.photoLink;
      photo.alt = 'photo';
      photo.className = 'photoLink';
      post.appendChild(photo);
      const button_like = document.createElement('button');
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
          } else {
            button_like.className = 'like';
            button_like.innerHTML = photoPost.likes.length + '<br>likes';
          }
        } else { button_like.innerHTML = photoPost.likes.length + '<br>likes'; }
      } else {
        button_like.innerHTML = '0<br>likes';
      }
      post.appendChild(button_like);
      button_like.onclick = function () {
        if (user) {
          let str = '';
          for (let i = 4; i < button_like.id.length; i++) {
            str += button_like.id.charAt(i);
          }

          const makeRequestlike = async () => {
            const this_post = JSON.parse(await Controller.getPhotoPost(str));
            const q = await Controller.putlike(this_post, user);
            button_like.innerHTML = q + '<br>likes';
            const found = this_post.likes.find(element => element === user);
            if (found) {
              button_like.className = 'like';
            } else {
              button_like.className = 'pressed_like';
            }
          };

          makeRequestlike().catch(() => {
            alert('ошибочка');
          });
        }
      };
      const desc = document.createElement('div');
      desc.className = 'description';
      desc.innerHTML = '<b>' + photoPost.author + '</b>' + ': ' + photoPost.description + '<br>';
      post.appendChild(desc);
      const hash = document.createElement('div');
      hash.className = 'hashtag';
      if (photoPost.hashTags && photoPost.hashTags[0] !== '') {
        for (let i = 0; i < photoPost.hashTags.length; i++) {
          hash.innerHTML += '#' + photoPost.hashTags[i] + ' ';
        }
        desc.appendChild(hash);
      }
      return post;
    },
    showTape: function (photoPosts, st, en) {
      if (en !== undefined && st !== undefined) {
        for (let i = 0; i < (en - st) && i < photoPosts.length; i++) {
          content.appendChild(DOM.doPhotopost(photoPosts[i]));
        }
        content.appendChild(more);
      }
    },
    addPhotoPost: function (photoPost) {
      content.insertBefore(DOM.doPhotopost(photoPost), content.firstElementChild);
      content.removeChild(content.lastElementChild);
      content.removeChild(content.lastElementChild);
      content.appendChild(more);
    },
    removePhotoPost: function (id) {
      const del = document.getElementById(id);
      content.removeChild(del);
      content.removeChild(content.lastElementChild);

      const makeRequestremove = async () => {
        let index = await Controller.findIndex(content.lastElementChild.id);
        index++;
        const photopost = await Controller.findPost(index);
        content.appendChild(DOM.doPhotopost(photopost));

        await Controller.getLength(end);
        content.appendChild(more);
      };

      makeRequestremove().catch(() => {
      });
    },
    editPhotoPost: function (id, photoPost) {
      content.replaceChild(DOM.doPhotopost(photoPost), document.getElementById(id));
    },
    showPosts: function () {
      const makeRequestshow = async () => {
        const some_posts = await Controller.getPhotoPosts(start, end);
        DOM.showTape(some_posts, start, end);
      };
      makeRequestshow();
    },
    clearFilter: function () {
      document.getElementById('input_author').value = '';
      document.getElementById('input_start').value = '';
      document.getElementById('input_end').value = '';
      document.getElementById('input_hashtags').value = '';
    },
    show: function () {
      DOM.autorizing(user);
      DOM.showPosts();
    }
  };
}());

DOM.show();
