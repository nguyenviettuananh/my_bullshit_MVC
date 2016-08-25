var userController = {
    listUsers : function(req,res){
        res.json('listUser')
    },

    userDetail : function(req,res){
        res.json('userDetail' + req.params.id)
    }
};

module.exports = userController;
