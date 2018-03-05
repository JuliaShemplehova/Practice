var PhotoPortal = (function() {
 var photoPosts = [
    {
    id: '1',
    descriprion: 'Нулевой',
    createdAt: new Date('2018-02-21T23:00:00'),
    author: 'Lenka',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '2',
    descriprion: 'Первый',
    createdAt: new Date('2017-02-01T23:00:00'),
    author: 'Lenka',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '3',
    descriprion: 'Второй',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '4',
    descriprion: 'Третий',
    createdAt: new Date('2018-03-24T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '5',
    descriprion: 'Четвертый',
    createdAt: new Date('2018-03-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '6',
    descriprion: 'Пятый',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '7',
    descriprion: 'Шестой',
    createdAt: new Date('2018-03-25T23:00:00'),
    author: 'Mr. Snow',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '8',
    descriprion: 'Седьмой',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '9',
    descriprion: 'Mr. Snow',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '10',
    descriprion: 'Девятый',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '11',
    descriprion: 'Десятый',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '12',
    descriprion: 'Одиннадцатый',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '13',
    descriprion: 'Двенадцатый',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '14',
    descriprion: 'Тринидцатый',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Mr. Snow',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '15',
    descriprion: '144',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Mr. Snow',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '16',
    descriprion: '155',
    createdAt: new Date('2018-02-26T23:00:00'),
    author: 'Lenka',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '17',
    descriprion: '166',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '18',
    descriprion: '177',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Lenka',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '19',
    descriprion: '188',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   },
   {
    id: '20',
    descriprion: '199',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags: ['hastag1', 'hastag2', 'hashtag3'],
    likes: ['sealjuli', 'natasha', 'kirill99', 'jess']
   }
 ];
return { 
  getPhotoPosts: function (skip, top, filterConfig) {
    var copy = photoPosts;
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
          var len = filterConfig.hashTags.length;
          var kol = 0;
          if (len === a.hashTags.length) {
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < len; j++) {
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
        var found = photoPosts.find(function(element) {
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
        var foundIndex = photoPosts.findIndex(function(element) {
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
      return true;
    }
    else 
      return false;
  },

  editPhotoPost: function(id, photoPost) {
    if (id !== undefined  && photoPost !== undefined) {
      var foundIndex = photoPosts.findIndex(function(element) {
        return element.id === id;
      });
      if (foundIndex !== -1) {
        var post = photoPosts[foundIndex];
        if (photoPost.descriprion !== undefined) {
          if ((photoPost.descriprion !== "") && (typeof photoPost.descriprion === "string") && (photoPost.descriprion.length < 200)) {
            photoPosts[foundIndex].descriprion = photoPost.descriprion;
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
    if (id !== undefined) {
    var foundIndex = photoPosts.findIndex(function(element) {
        return element.id === id;
    });
    if (foundIndex !== -1) {
      photoPosts.splice(foundIndex, 1);
      return true;
    }
    else
      return false;
    }
    else {
      return false;
    }
  }
}
})();