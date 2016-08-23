
'use strict';

const vm = require('vm'),
      //jsdom = require('jsdom'),
      config = require('../config'),
      path = require('path'),
      app = require('express')(),
      port = config.port || 3004,
      env  = process.env.NODE_ENV || 'development';

app.set('view engine', 'pug');
app.set('view cache', (env == 'production'));

let scripts = [
  path.resolve('node_modules/webcomponents.js/webcomponents.js')
];

app.route('/*').get((req, res, next) => {
  vm.runInNewContext(`
    'use strict';
    let jsdom = require('jsdom');
    jsdom.env('', scripts, (err, window) => {
      if (err) {
        return res.json(err);
      }
      //console.log(window.WebComponents);
      window.close();
      res.send('ok');
    });
  `, {
    console: console,
    //jsdom: jsdom,
    require: require,
    scripts: scripts,
    res: res
  });
});

app.listen(port);
console.log('Listening on port ' + port);
