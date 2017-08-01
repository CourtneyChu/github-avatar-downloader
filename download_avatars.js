var request = require('request');
var GITHUB_USER = "CourtneyChu";
var GITHUB_TOKEN = "584633432f7a860f774f7985496713f559c5d124";



function getRepoContributors(repoOwner, repoName, cb) {
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

var t = {
  url: requestURL,
  headers: {
    'User-Agent': 'CourtneyChu'
  }
};

request(t, function(err, response, body) {
  if (err) throw err;
  console.log('Response Status Code:', response.statusCode)
  var parsed = JSON.parse(body);
  cb(err, parsed);
  })

};








getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  result.forEach(function(item) {
    console.log(item.avatar_url);
  });


});