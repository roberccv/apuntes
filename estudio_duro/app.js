var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var {titulo} = require('./utils/param');
//var titulongo = require('./utils/param');
var indexRouter = require('./routes/index');
var indexLogin = require('./routes/login');
var indexRestricted = require('./routes/restricted');
var indexRegistrarse = require('./routes/registro');
var indexLogout = require('./routes/logout');
var indexAceptaGalletas = require('./routes/aceptaGalletas');

var app = express();
console.log(titulo);
console.log("hola me llamo maria");
app.locals.titulo = titulo;
app.locals.cookieComprobada = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "clave_super_secreta",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/login', indexLogin);
app.use('/restricted', isLoged, indexRestricted);
app.use('/registrarse', indexRegistrarse);
app.use('/logout', indexLogout);
//app.use('/aceptaGalletas', indexAceptaGalletas); Estaba muy bien, pero había que pasarle a todos el estado de la cookie
//mejor desde app que tiene acceso a app.locals y sus amadas variables globales.

app.post('/aceptaGalletas', function(req, res, next){
  req.session.cookieComprobada = true;
  app.locals.cookieComprobada = true;
    if (req.session.user){
        db.user.savecookies(req.session.user.name);
        console.log(db.user);
    }
    res.json({
        haFuncionado: true
    });
} )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
function isLoged(req, res, next){
  if (req.session.user){
    res.locals.username = req.session.user; //variable global a la sesión, como app.locals pero solo del loged
    next();
  }else{
    res.locals.username = ""; //si no lo inicializas como null puede dar error al usarlo en la plantilla
    res.redirect('/');
  }
}
module.exports = app;
