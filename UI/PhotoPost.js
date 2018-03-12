let PhotoPortal = (function() {
  let photoPosts = [
    {
    id: '1',
    description: 'Нулевой',
    createdAt: new Date('2018-02-12T23:00:00'),
    author: 'Lenka',
    photoLink: 'images/photo.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '2',
    description: 'Первый',
    createdAt: new Date('2017-02-01T23:00:00'),
    author: 'Lenka',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '3',
    description: 'Второй',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '4',
    description: 'Урааа, победа!!!',
    createdAt: new Date('2018-03-24T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99']
   },
   {
    id: '5',
    description: 'Енотик',
    createdAt: new Date('2018-03-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://www.bugaga.ru/uploads/posts/2016-08/1471555196_subbota-25.jpg',
    hashTags: ['hastag1', 'hastag2'],
   },
   {
    id: '6',
    description: 'Красота',
    createdAt: new Date('2018-02-22T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://bestcube.space/wp-content/uploads/0Jrvgf38V8.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '7',
    description: 'Какая кисонька!!',
    createdAt: new Date('2018-03-25T23:00:00'),
    author: 'Mr. Snow',
    photoLink: 'https://i.ytimg.com/vi/GcEJweSktko/maxresdefault.jpg',
    hashTags: ['cat', 'cats', 'mur'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '8',
    description: 'Седьмой',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '9',
    description: 'от так от',
    createdAt: new Date('2018-02-19T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '10',
    description: 'Девятый',
    createdAt: new Date('2018-02-18T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '11',
    description: 'ору',
    createdAt: new Date('2018-02-21T23:00:00'),
    author: 'sealjuli',
    photoLink: 'http://hronika.info/uploads/posts/2015-06/1434033585_prikol7.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '12',
    description: 'Одиннадцатый',
    createdAt: new Date('2018-02-16T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '13',
    description: 'Двенадцатый',
    createdAt: new Date('2018-02-15T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '14',
    description: 'Тринидцатый',
    createdAt: new Date('2018-02-14T23:00:00'),
    author: 'Mr. Snow',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '15',
    description: '144',
    createdAt: new Date('2018-02-13T23:00:00'),
    author: 'Mr. Snow',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '16',
    description: 'ох если бы, мне нужно делать Уп',
    createdAt: new Date('2018-04-12T23:00:00'),
    author: 'sealjuli',
    photoLink: 'http://trinixy.ru/pics5/20180119/kartinki_01.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '17',
    description: '166',
    createdAt: new Date('2018-02-10T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '18',
    description: '177',
    createdAt: new Date('2018-02-09T23:00:00'),
    author: 'Lenka',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '19',
    description: '188',
    createdAt: new Date('2018-02-08T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '20',
    description: '199',
    createdAt: new Date('2018-02-17T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   }
  ];
  let deletePhotoPosts = [];
return { 
  getPhotoPosts: function (skip, top, filterConfig) {
    let copy = photoPosts;
    copy = photoPosts.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
    if (skip < 0 || skip === undefined)
      skip = 0;
    if (top === undefined)
      top = 10;
    if (filterConfig === undefined)
    {
      return copy.slice(skip, skip+top);
    }
    else
    {
      if ((filterConfig.author !== undefined) && (filterConfig.author !== "") && (typeof filterConfig.author === "string")) {
        copy = copy.filter(function(a) {
          return a.author === filterConfig.author;
        });
      }
      if ((filterConfig.start !== undefined) && (filterConfig.start !== "") && (filterConfig.start instanceof Date) && ((filterConfig.end === undefined) || (filterConfig.end === "") || (!filterConfig.end instanceof Date))) {
        copy = copy.filter(function(a) {
          return (a.createdAt - filterConfig.start >= 0); 
        });
      }
      if ((filterConfig.end !== undefined) && (filterConfig.end !== "") && (filterConfig.end instanceof Date) && ((filterConfig.start === undefined) || (filterConfig.start === "") || (!filterConfig.start instanceof Date))) {
        copy = copy.filter(function(a) {
          return (filterConfig.end - a.createdAt >= 0); 
        });
      }
      if ((filterConfig.start !== undefined) && (filterConfig.start !== "") && (filterConfig.start instanceof Date)) {
        if ((filterConfig.end !== undefined) && (filterConfig.end !== "") && (filterConfig.end instanceof Date)) {
          copy = copy.filter(function(a) {
            return ((a.createdAt - filterConfig.start >= 0) && (filterConfig.end - a.createdAt >= 0)); 
          });
        }
      }
      if ((filterConfig.hashTags !== undefined) && (filterConfig.hashTags.length !== 0)) {
        copy = copy.filter(function(a) {
          let len = filterConfig.hashTags.length;
          let kol = 0;
          if (len === a.hashTags.length) {
            for (let i = 0; i < len; i++) {
              for (let j = 0; j < len; j++) {
                if (a.hashTags[i] === filterConfig.hashTags[j]) {
                  kol++;
                }
              }
            }
          }
          else 
            return false;
          if (kol === len)
            return true;
          else 
            return false;
        });
      }
      return copy.slice(skip, skip+top);
    }
  },

  getPhotoPost: function (id) {
    if (id !== undefined) {
        let found = photoPosts.find(function(element) {
            return element.id === id;
        });
         return found;
    }
    else {
      return undefined;
    }
  },
  
  validatePhotoPost: function(photoPost) {
    if (photoPost !== undefined) {
      if ((photoPost.id !== undefined) && (photoPost.id !== "") && (typeof photoPost.id === "string")) {
        let foundIndex = photoPosts.findIndex(function(element) {
          return element.id === photoPost.id;
        });
      if (foundIndex === -1) {
        if ((photoPost.description !== undefined) && (photoPost.description !== "") && (typeof photoPost.description === "string") && (photoPost.description.length < 200)) {
          if ((photoPost.createdAt !== undefined) && (photoPost.creatAt !== "") && (photoPost.createdAt instanceof Date)) {
            if ((photoPost.author !== undefined) && (photoPost.author !== "") && (typeof photoPost.author === "string")) {
              if ((photoPost.photoLink !== undefined) && (photoPost.photoLink !== "") && (typeof photoPost.photoLink === "string")) {
                if (photoPost.likes === undefined) {
                  if (photoPost.hashTags === undefined)
                    return true;
                  else 
                  {
                    if (photoPost.hashTags.length !== 0)
                      return true;
                    else
                      return false;
                  }
                  }
                  else return false;
                }
                else return false;
              }
              else return false;
            }
            else return false;
          }
          else return false;
        }
        else return false;
      }
      else return false;
    }
    else return false;
  },

  addPhotoPost: function(photoPost) {
    if(PhotoPortal.validatePhotoPost(photoPost) === true) {
      photoPosts.push(photoPost);
      photoPosts.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
      return true;
    }
    else 
      return false;
  },

  editPhotoPost: function(id, photoPost) {
    if (id !== undefined  && photoPost !== undefined) {
      let foundIndex = photoPosts.findIndex(function(element) {
        return element.id === id;
      });
      if (foundIndex !== -1) {
        let post = photoPosts[foundIndex];
        if (photoPost.description !== undefined) {
          if ((photoPost.description !== "") && (typeof photoPost.description === "string") && (photoPost.description.length < 200)) {
            photoPosts[foundIndex].description = photoPost.description;
          }
          else return false;
        }
        if (photoPost.photoLink !== undefined) {
          if ((photoPost.photoLink !== "") && (typeof photoPost.photoLink === "string")) {
            photoPosts[foundIndex].photoLink = photoPost.photoLink;
          }
          else
          {
            photoPosts[foundIndex] = post;
            return false;
          }
        }
        if (photoPost.hashTags !== undefined) {
          if (photoPost.hashTags.length !== 0) {
            photoPosts[foundIndex].hashTags = photoPost.hashTags;
          }
          else 
          {
            photoPosts[foundIndex] = post;
            return false;
          }
        }
        return true;
      }
      else return false;
    }
    else return false;
  },

  removePhotoPost: function(id) {
    if (id !== undefined && id !=='' && typeof id === "string") {
    let foundIndex = photoPosts.findIndex(function(element) {
        return element.id === id;
    });
    if (foundIndex !== -1) {
      deletePhotoPosts.push(photoPosts[foundIndex]);
      photoPosts.splice(foundIndex, 1);
      return true;
    }
    else
      return false;
    }
    else {
      return false;
    }
  },

  showDeletePhotoPosts: function() {
    return deletePhotoPosts.slice(0, deletePhotoPosts.length);
  },

  getLength: function () {
      return photoPosts.length;
  }

}
})();