const fs = require('fs');
let PhotoPortal = (function() {
let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'), function (key, value) {
  if (key == 'createdAt') 
    return new Date(value);
    return value;
});
return { 
  getPhotoPosts: function (skip, top, filterConfig) {
    let copy = photoPosts;
    copy = photoPosts.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
    if (skip < 0 || !skip)
      skip = 0;
    if (!top)
      top = 10;
    if (!filterConfig)
    {
      return copy.slice(skip, skip+top);
    }
    else
    {
      filterConfig = JSON.parse(filterConfig);
      if ((filterConfig.author !== undefined) && (filterConfig.author !== "") && (typeof filterConfig.author === "string")) {
        copy = copy.filter(function(a) {
          return a.author === filterConfig.author;
        });
      }
      let st = new Date(filterConfig.start);
      filterConfig.start = st;
      let en = new Date(filterConfig.end);
      filterConfig.end = en;
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
      if ((filterConfig.hashTags !== undefined) && (filterConfig.hashTags.length !== 0) && (filterConfig.hashTags instanceof Array)) {
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
    if (id) {
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
    let da = new Date(photoPost.createdAt);
    photoPost.createdAt = da;
    if (photoPost) {
      if (photoPost.id !== "") {
        let foundIndex = photoPosts.findIndex(function(element) {
          return element.id === photoPost.id;
        });
        if (foundIndex === -1) {
          if ((photoPost.description !== "") && (photoPost.description.length < 200)) {
            if (photoPost.photoLink !== "") {
              if (photoPost.likes.length === 0) {
                return true;
              }                
            }
          }
        }
      }
    }
   return false;
  },

  addPost: function(photoPost) {
    if (PhotoPortal.validatePhotoPost(photoPost)) 
    {
      photoPosts.push(photoPost);
      photoPosts.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
      fs.writeFileSync('./server/data/posts.json',JSON.stringify(photoPosts));
      return true;
    }
    else 
      return false;
  },

  editPhotoPost: function(id, photoPost) {
    if (id && photoPost) {
      let foundIndex = photoPosts.findIndex(function(element) {
        return element.id === id;
      });
      if (foundIndex !== -1) {
        let post = photoPosts[foundIndex];
        if (photoPost.description) {
          if ((photoPost.description !== "") && (photoPost.description.length < 200)) {
            photoPosts[foundIndex].description = photoPost.description;
          }
          else 
            return false;
        }
        if (photoPost.photoLink) {
          if (photoPost.photoLink !== "") {
            photoPosts[foundIndex].photoLink = photoPost.photoLink;
          }
          else
          {
            photoPosts[foundIndex] = post;
            return false;
          }
        }
        if (photoPost.hashTags) {
          if (photoPost.hashTags.length !== 0) {
            photoPosts[foundIndex].hashTags = photoPost.hashTags;
          }
          else 
          {
            photoPosts[foundIndex] = post;
            return false;
          }
        }
        fs.writeFileSync('./server/data/posts.json',JSON.stringify(photoPosts));
        return true;
      }
      else return false;
    }
    else return false;
  },

  removePhotoPost: function(id) {
    let foundIndex = photoPosts.findIndex(function(element) {
        return element.id === id;
    });
    if (foundIndex !== -1) {
      photoPosts.splice(foundIndex, 1);
      fs.writeFileSync('./server/data/posts.json',JSON.stringify(photoPosts));
      return true;
    }
    else
      return false;
  },

  getLength: function() {
      return photoPosts.length;
  },

  putlike: function (photoPost, user) {
    if (photoPost.likes.length == 0) {
      photoPost.likes.push(user); 
    }
    else {
      let bool = false;
      for (let i = 0; i < photoPost.likes.length; i++) {
        if (photoPost.likes[i] === user) {
          bool = true;
        }
      }
      if (bool) {
        photoPost.likes.splice(photoPost.likes.indexOf(user), 1);
      }
      else {
        photoPost.likes.push(user);
      }
    }
    fs.writeFileSync('./server/data/posts.json',JSON.stringify(photoPosts)); 
    return photoPost.likes.length;
  }

}
})();

module.exports = PhotoPortal;