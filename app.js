global.view_directory = __dirname + '/views';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Promise = require('bluebird');
var config = require('config');
var methodOverride = require('method-override');
var _ = require('lodash');
var dispatcher = require('./mappingRouteWithView');
// var User = require('./models/userModel');
// require('./config/passport')(passport);
var readModuleDir = require('./registerRoute');
var fs = require('fs');
var app = express();
app.set('trust proxy', 1); // trust first proxy


app.use(session({
    secret: 'meow meow',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2628000000,
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(function (req, res, next) {
    res.locals.message = req.flash();
    delete req.flash();
    next();
});
//app.use('/posts', posts);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', __dirname + "/views");
app.set('view engine', 'twig');
// app.use(readModuleDir(__dirname+'/modules','frontend',app));
// app.use('/admin',readModuleDir(__dirname+'/modules','backend',app))
app.use(dispatcher);
readModuleDir.setup(app);

Promise.all([
    readModuleDir.init(),
    new Promise(function(fulfill,reject){
    mongoose.connect('mongodb://localhost/test');
    mongoose.connection.on('error',function(){
        reject("connect DB error");
    });

    fulfill(null);
    })
]).then(function(){
    console.log("Created Route!!");
    console.log("Connected to DB !!");
    // This section is optional and can be used to configure twig.
    app.set('twig options', {
        strict_variables: false
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error/404', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.render('error/500', {
            message: err.message,
            error: {}
        });
    });

    app.listen(3000, function () {
        console.log("Listening at port 3000");
    })

}).catch(function(err){
    console.log(err);
})


//module.exports = app;