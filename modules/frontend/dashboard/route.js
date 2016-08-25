var dashboardFrontEndController = require('./controller');

module.exports = {
    '/' : {
        method : "get",
        controller : dashboardFrontEndController.index,
        checkAuthenticate : false
    }
};