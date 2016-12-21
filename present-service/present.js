const sentencer = require('sentencer');

// export this function as get
module.exports.get = function(req, res) {
  console.log('Returning cool present');

  const present = sentencer.make("{{ an_adjective }} {{ adjective }} {{ noun }}");

  res.json({
    "present": present
  });
}
