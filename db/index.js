const _conn = require('./_conn');

const User = require('./User');
const faker = require('faker');

const sync = ()=> _conn.sync({ force: true });

const generateSeedData = (random)=>{
  if(random){
    let results = [];
    while(results.length < 100){
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude()
      };
      results.push({
        firstName: user.firstName,
        lastName: user.lastName,
        lat: user.lat,
        lng: user.lng,
        email: `${user.firstName}.${user.lastName}@example.com`.toLowerCase()
      });
    }
    return results;
  }
  else{
    return [
      {
        firstName: 'eric',
        lastName: 'prof',
        email: 'prof@example.com'
      },
      {
        firstName: 'mitch',
        lastName: 'student',
        email: 'mitch@example.com'
      }
    ];
  }
}

const seed = (random = true)=> {
  return sync()
    .then( ()=> generateSeedData(random).map( userData => User.create(userData)));
};

module.exports = {
  sync,
  seed,
  models: {
    User
  }
};
