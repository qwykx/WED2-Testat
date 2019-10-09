
const qs = require('qs');
const noteService = require('../services/noteService');


function index(req, res){

   const note = new noteService.Note("test","test",5,"21.08.2019",true);
   const service = new noteService.Service();
   service.addNoteToDb(note, ()=>{
       console.log("succes");
   });
   service.getAllNotes(function (err,docs){ console.log(docs)
   });
    res.render('index');
}
function showCreate(req, res){
    res.render('createNote')

}


module.exports = {index,showCreate};
