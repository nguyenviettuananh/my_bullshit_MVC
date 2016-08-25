var postController = require('./controller');

module.exports = {
    '/posts' : {
        method : "get",
        controller : postController.listPost,
        checkAuthenticate : false
    },
    '/posts/:id' : {
        method : 'get',
        controller : postController.postDetail,
        checkAuthenticate : true
    }
};