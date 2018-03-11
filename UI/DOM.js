let DOM = (function() { 
    let user = 'sealjuli';
    let content = document.createElement('div');
    content.className = 'content';
    return {
    	autorizing: function(user) {
    		if (user!==null) {
       			let photoUser = document.createElement('img');
       		    photoUser.className = 'main_photo';
       		    document.body.appendChild(photoUser);
       		    let newfont = document.createElement('font');
       		    newfont.className = 'username';
       		    newfont.innerHTML = user;
       		    document.body.appendChild(newfont);
       		    let container = document.createElement('div');
       		    container.innerHTML = '<div class="user"><br> \
                    <button class="prime">Добавить фото</button><br> \
                    <button class="prime">Выйти<img src="images/exit.png"></button> \
                    </div>';
                document.body.appendChild(container);
    		}
    		else {
    			let hello = document.createElement('font');
       		    hello.className = 'hello';
       		    hello.innerHTML = 'Добро пожаловать!';
       		    document.body.appendChild(hello);
    			let container = document.createElement('div');
       		    container.innerHTML = '<div class="user"><br><br> \
                    <button class="prime">Войти</button> \
                    </div>';
                document.body.appendChild(container);
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
           		edit.innerHTML = 'Редактировать';
           		instr.appendChild(edit);
           		let editpic = document.createElement('img');
           		editpic.src = 'images/edit.png';
           		edit.appendChild(editpic);
           		instr.appendChild(edit);
           		let p = document.createElement('font');
           		p.innerHTML = '<br>';
           		instr.appendChild(p);
           		let dodelete = document.createElement('font');
           		dodelete.innerHTML = 'Удалить';
           		instr.appendChild(dodelete);
           		let deletepic = document.createElement('img');
           		deletepic.src = 'images/delete.png';
           		dodelete.appendChild(deletepic);
           		instr.appendChild(dodelete);
           		post.appendChild(instr);
       		}
            const fordate = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };
            let date = document.createElement('div');
            date.className = 'date';
            date.innerHTML = photoPost.createdAt.toLocaleString("en-US", fordate);
            post.appendChild(date);
            let photo = document.createElement('img');
            photo.src = photoPost.photoLink;
            photo.alt = 'photo';
            photo.className = 'photoLink';
            post.appendChild(photo);
            let like = document.createElement('div');
            let butt = document.createElement('button');
            butt.className = 'like';
            if (photoPost.likes !== undefined) {
            	butt.innerHTML = photoPost.likes.length + '<br>likes';
            }
            else 
            	butt.innerHTML = '0<br>likes';
            
            like.appendChild(butt);
            post.appendChild(like);
            let desc = document.createElement('div');
            desc.className = 'description';
            desc.innerHTML = '<b>' + photoPost.author + '</b>' + ': ' + photoPost.description + '<br>';
            post.appendChild(desc);
            let hash = document.createElement('div');
            hash.className = 'hashtag';
            hash.innerHTML = '#' + photoPost.hashTags;
            desc.appendChild(hash);
    		return post;
    	},
    	showTape: function(photoPosts, start, end) {
            if (end !== undefined && start !== undefined) {
                for (let i = 0; i < (end - start); i++) {
                    if (i < photoPosts.length)
                        content.appendChild(DOM.doPhotopost(photoPosts[i]));
                }
                let butt = document.createElement('button');
                butt.className = 'more';
                butt.innerHTML = 'Загрузить еще';
                content.appendChild(butt);
                document.body.appendChild(content);
            }
        },
        addPhotoPost: function(photoPost) {
        	if (PhotoPortal.addPhotoPost(photoPost) === true) {
        		content.insertBefore(DOM.doPhotopost(photoPost), content.firstElementChild);
        		content.removeChild(content.lastElementChild);
        		content.removeChild(content.lastElementChild);
        		let butt = document.createElement('button');
                butt.className = 'more';
                butt.innerHTML = 'Загрузить еще';
                content.appendChild(butt);
        	}
        },
        removePhotoPost: function(id) {
        	if (PhotoPortal.removePhotoPost(id) === true) {
        		let del = document.getElementById(id);
        		content.removeChild(del);
        		content.insertBefore(DOM.doPhotopost(PhotoPortal.getPhotoPost('19')), content.lastElementChild);
        	}
        },
        editPhotoPost: function(id, photoPost) {
        	if (PhotoPortal.editPhotoPost(id, photoPost) === true) {
        		PhotoPortal.editPhotoPost(id, photoPost);
        		content.replaceChild(DOM.doPhotopost(PhotoPortal.getPhotoPost(id)), document.getElementById(id));
        	}
        },
        show: function() {
            DOM.autorizing(user);
            DOM.showTape(PhotoPortal.getPhotoPosts(0, 10), 0, 10);
            DOM.addPhotoPost({
            id: '21',
            description: '*шутка, что это не новый пост, я его стирала лаской*',
            createdAt: new Date('2018-04-12T09:45:00'),
            author: 'lera',
            photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mustela_nivalis_-British_Wildlife_Centre-4.jpg/1200px-Mustela_nivalis_-British_Wildlife_Centre-4.jpg',
            hashTags: ['happy','hurray']
            });
            DOM.removePhotoPost('10');
            DOM.editPhotoPost('21', {
            id: '21',
            description: '*опаньки*',
            hashTags: ['оп', 'оп']
            });
            DOM.editPhotoPost('21', {
            id: '21',
            description: ''
            });
        }
    };
}());