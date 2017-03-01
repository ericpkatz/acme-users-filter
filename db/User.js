const _conn = require('./_conn');
const User = _conn.define('user', {
  firstName: _conn.Sequelize.STRING,
  lastName: _conn.Sequelize.STRING,
  email: _conn.Sequelize.STRING,
  lat: _conn.Sequelize.DECIMAL,
  lng: _conn.Sequelize.DECIMAL
}, {
  classMethods: {
    findUsersByFirstLetterOfLastName: function(letter){
      const query = { };
      if(letter){
        query.where = {
            lastName: { $like: `${letter}%` }
          };
      }
      return this.findAll(query);
    },
    generateUserMap: function(){
      return this.findAll()
        .then( users => {
          return users.reduce((memo, user)=> {
            const initial = user.lastName.slice(0, 1);
            memo[initial] = typeof memo[initial] !== 'undefined' ? memo[initial] : 0;
            memo[initial]++;
            return memo;
          }, {});
      });
    }
  }
});

module.exports = User;

