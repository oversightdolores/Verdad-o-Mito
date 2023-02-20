
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = require('./src/app.js');
const { conn } = require('./src/db.js');

/* 
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (user) => {
  console.log('A user connected', user);
  // implementa aquí la lógica para manejar las conexiones de los usuarios
}); */

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  app.listen(5174, () => {
    console.log(`%s listening at 5174`); // eslint-disable-line no-console
  });
});
