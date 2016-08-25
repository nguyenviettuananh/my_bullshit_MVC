var userController = require('./controller');

module.exports = {
    '/users' : {
        method : "get",
        controller : userController.listUsers,
        checkAuthenticate : false
    },
    '/user/:id' : {
        method : 'get',
        controller : userController.userDetail,
        checkAuthenticate : false
    }
};