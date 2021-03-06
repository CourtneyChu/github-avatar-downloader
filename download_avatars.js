var request = require('request');
var GITHUB_USER = "CourtneyChu";
var GITHUB_TOKEN = "584633432f7a860f774f7985496713f559c5d124";



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var t = {
    url: requestURL,
    headers: {
      'User-Agent': 'CourtneyChu'
    }
  };

  request(t, function(err, response, body) {
    if (err) { throw err; }
    console.log('Response Status Code:', response.statusCode);
    var parsed = JSON.parse(body);
    cb(err, parsed);
  });
}


var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
//  console.log("Errors:", err);
//  console.log("Result:", result);
  result.forEach(function(item) {
    console.log(item.avatar_url);
    downloadImageByURL(item.avatar_url, 'avatars/' + item.login);
  });


});


