/**
* @Author: Layne Faler <laynefaler>
* @Date:   10-10-2016
* @Email:  laynefaler@gmail.com
* @Last modified by:   laynefaler
* @Last modified time: 11-10-2016
*/

var ncp = require('ncp').ncp;
var path = require('path');
var jsonfile = require('jsonfile');


var CreateCommand = function(name) {
  var ProjectName = name;

  var newProject = function() {
    var workDir = process.cwd();
    if (name === undefined || name === '' || name === null) {
      console.log("Name your project, it's not a choice");
      throw new Error('pirate create Name');
    }

    console.log("Raiding your project " + name);

    var src = path.join(__dirname, '..', '..', 'project', 'temp');
    var dest = path.join(workDir, name);

    var file = './' + name + '/package.json';

    var obj = {
      'name': ProjectName,
      'private': true,
      'scripts': {
        'start': 'meteor run'
      },
      'dependencies' : {
        "babel-runtime": "^6.18.0",
        "jquery": "^3.1.1",
        "meteor-node-stubs": "~0.2.0",
        "react": "^15.3.2",
        "react-dom": "^15.3.2",
        "react-redux": "^4.4.5",
        "react-router": "^2.8.1",
        "redux": "^3.6.0"
      }
    };

    // copy project to new directory
    ncp(src, dest, function (err) {
       if (err) {
         return console.error(err);
       }
       console.log('Your rum is brewing ...');

       // create package.json
       jsonfile.writeFile(file, obj, {spaces: 2}, function (er) {
         // should be null
       });

       console.log("Your rum is ready to go!");
    });

  };
  return {
    handle: newProject
  }
};

module.exports = CreateCommand;
