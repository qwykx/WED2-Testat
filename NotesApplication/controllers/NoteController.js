const qs = require('qs');


function index(req, res){
    res.render('index');
}
function showCreate(req, res){
    res.render('createNote')

}


module.exports = {index,showCreate};
