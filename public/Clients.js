let Сlients = (function() {
  let client = [
    {
      login: 'sealjuli',
      password: '1111'
    },
    {
      login: 'lera',
      password: '2125'
    },
    {
      login: 'Mr. Snow',
      password: '8995'
    },
    {
      login: 'Иванов Иван',
      password: '8995'
    },
    {
      login: 'Lenka',
      password: '5559'
    }
  ];
  return { 

  validateUser: function (login, password) {
    if (login !== "") {
        let found = client.find(function(element) {
            return element.login === login;
        });
        if (found) {
          if (found.password === password) {
            return true;
        }
        else
          return false;
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