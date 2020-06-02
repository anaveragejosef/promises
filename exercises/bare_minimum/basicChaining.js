/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // Use pluckFirstLine function and pass in readFilePath
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    /* .then((userName) => {
      // Check for errors
      if (!userName) {
        throw new Error ('No username available');
      } else {
        return userName;
        //return promisification.getGitHubProfileAsync(userName);
      }
    }) */
    // Use .then to pass in gitHubProfile function
    .then((userName) => {
      console.log('userName: ', userName);
      return promisification.getGitHubProfileAsync(userName);
    })
    // Use .then to write the response to a file
    .then((profileData) => {
      console.log('Profile Data ', profileData); // object
      console.log('JSON strigify : ', JSON.stringify(profileData)); // json
      // Return JSON response
      // return fs.writeFile(writeFilePath, JSON.stringify(profileData));
      return fs.writeFile(writeFilePath, JSON.stringify(profileData), 'utf8', (err) => {
        if (err) {
          throw new Error ('Cannot write to file: ', err);
        }
      });
    })
    .catch((err) => {
      console.log('Error while running function: ', err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
