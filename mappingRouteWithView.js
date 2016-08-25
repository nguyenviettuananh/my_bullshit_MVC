let frontendViewDir = __dirname + "/views/frontend";
let backEndViewDir = __dirname + "/views/backend";

var fs = require('fs');
var _ = require('lodash');
module.exports = function (req, res, next) {
    var originalRender = res.render;
    res.backend = {}, res.frontend = {};
    var route = req.url.split('/');
    route.shift();
    if(route.indexOf('admin') !== -1){
        var listBackEndView = fs.readdirSync(backEndViewDir);
        if(route[1]){
            if(listBackEndView.indexOf(route[1])!== -1){
                res.backend.render = function(view,options,callback){
                    return originalRender.call(this,"backend/"+route[1] + '/' + view,options,callback)
                }
            } else {
                res.redirect('/admin')
            }
        } else {
            res.backend.render = function(view,options,callback){
                return originalRender.call(this,"backend/dashboard/" + view, options, callback)
            }
        }
    } else {
        var listFrontEndView = fs.readdirSync(frontendViewDir);
        if(route[0]){
            if(listFrontEndView.indexOf(route[1] !== -1)){
                res.frontend.render = function(view,options,callback){
                    return originalRender.call(this,'frontend/' + route[0] + '/' + view,options,callback)
                }
            } else {
                res.redirect('/')
            }
        } else {
            res.frontend.render = function(view,options,callback){
                return originalRender.call(this,'frontend/dashboard/' + view,options,callback)
            }
        }
    }

    next()
}