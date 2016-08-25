module.exports = {
    listPost : function(req,res){
        res.frontend.render('index')
    },

    postDetail : function(req,res){
        res.frontend.render('index',{
            id : req.params.id
        })
    }
};
