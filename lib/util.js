var fs    = require('fs');
var path  = require('path');

var pk_name = 'package.json';


module.exports = {
  modify_pk : modify_pk,
};


//
// rcb -- Function(package_obj)
//
function modify_pk(rcb) {
  var dir = process.cwd();
  var pkfile = path.join(dir, pk_name);

  fs.readFile(pkfile, 'utf8', function(err, data) {
    console.log('Read \t#', pkfile);
    if (err) return fail(err);
    var pkobj = JSON.parse(data);

    console.log('Process \t#');
    try {
      rcb(pkobj);

      data = JSON.stringify(pkobj, null, 4);
      fs.writeFile(pkfile, data, function(err) {
        if (err) {
          fail(err);
        } else {
          console.log('Save success\t#');
        }
      });
    } catch(err) {
      fail(err);
    }
  });
}


function fail(err) {
  console.log('Fail\t#', err.message, err.stack);
  process.exit(1);
}