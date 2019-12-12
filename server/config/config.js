// PORT
process.env.PORT = process.env.PORT || 3000;

// ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// DB
let urlDB;

// if (process.env.NODE_ENV == 'dev') {
urlDB = 'mongodb://localhost:27017/cafe';
// } else {
//     urlDB = 'mongodb+srv://mlopez:arcadia1399@cluster0-bjhpm.mongodb.net/cafe';
// }

process.env.URL_DB = urlDB;

// JWT
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED ||  'este-es-el-seed-desarrollo';