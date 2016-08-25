'use strict';
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var pathName = path.join(__dirname,'modules');
var adminPrefix = "/admin";
var listRoute = {};
var readBackEndRoute = function(dirname){
    return new Promise(function(fulfill,reject){
        var foldersName = fs.readdirSync(dirname);
        var listRoute = [];
        var a = foldersName.map(function(folder){
            return registerBackEndRoute(dirname + '/' + folder);
        })
        fulfill(a)
    })
}

var readFrontEndRoute = function(dirname){
    return new Promise(function(fulfill,reject){
        var foldersName = fs.readdirSync(dirname);
        var listRoute = [];
        var a = foldersName.map(function(folder){
            return registerBackEndRoute(dirname + '/' + folder);
        })
        fulfill(a)
    })
}


function registerFrontEndRoute(moduleName){
        var files = fs.readdirSync(moduleName);
        if(files.indexOf('route.js') !== -1){
            var route = require(path.join(moduleName,'route.js'));
            return route
        }
}

function registerBackEndRoute(moduleName){
        var files = fs.readdirSync(moduleName);
        if(files.indexOf('route.js') !== -1){
            var route = require(path.join(moduleName,'route.js'));
            return route
        }
}
exports.init = function() {
    return Promise.all([
        readBackEndRoute(pathName+"/frontend"),
        readFrontEndRoute(pathName+"/backend")
    ]).then(function(results){
        listRoute.frontend = results[0];
        listRoute.backend = results[1];
        Object.keys(listRoute).forEach(function(key){
            if(key == "backend"){
                listRoute[key].map(function(val){
                    Object.keys(val).forEach(function(key1){
                        if(val[key1].checkAuthenticate){
                            if(/get/.test(val[key1].method)){
                                app.get(adminPrefix + key1,isLoggedIn,val[key1].controller)
                            }
                            if(/post/.test(val[key1].method)){
                                app.post(adminPrefix + key1,isLoggedIn,val[key1].controller)
                            }
                        } else {
                            if(/get/.test(val[key1].method)){
                                app.get(adminPrefix + key1,val[key1].controller)
                            }
                            if(/post/.test(val[key1].method)){
                                app.post(adminPrefix + key1,val[key1].controller)
                            }
                        }
                    })
                })
            }
            if(key == "frontend"){
                listRoute[key].map(function(val){
                    listRoute[key].map(function(val){
                        Object.keys(val).forEach(function(key1){
                            if(val[key1].checkAuthenticate){
                                if(/get/.test(val[key1].method)){
                                    app.get(key1,isLoggedIn,val[key1].controller)
                                }
                                if(/post/.test(val[key1].method)){
                                    app.post(key1,isLoggedIn,val[key1].controller)
                                }
                            } else {
                                if(/get/.test(val[key1].method)){
                                    app.get(key1,val[key1].controller)
                                }
                                if(/post/.test(val[key1].method)){
                                    app.post(key1,val[key1].controller)
                                }
                            }
                        })
                    })
                })
            }
        })
    }).catch(function(err){
        console.log(err);
    });
};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();

    return res.redirect('/')
}



var app = {};
exports.setup = function(_app) {
    app = _app;
};