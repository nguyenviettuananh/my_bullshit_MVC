var adminController = require('./controller');

module.exports = {
    '/' : {
        method : "get",
        controller : adminController.index,
        checkAuthenticate : false
    },
};