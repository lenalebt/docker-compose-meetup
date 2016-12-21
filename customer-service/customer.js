const faker = require('faker');

// export this function as get
module.exports.get = function(req, res) {
  console.log('Returning customer');

  const customer = faker.helpers.createCard();

  res.json({
    "name": faker.fake("{{name.firstName}} {{name.lastName}}"),
    "username": customer.username,
    "email": customer.email,
    "address": customer.address,
    "phone": customer.phone,
    "website": customer.website,
    "company": customer.company,
    "avatar": faker.image.avatar()
  });
}
