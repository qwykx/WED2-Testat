const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

class Note{

    constructor(title, beschreibung, wichtigkeit, fertigBis, erledigt){
        this.title = title;
        this.beschreibung = beschreibung;
        this.wichttigkeit = wichtigkeit;
        this.fertigBis = fertigBis;
        this.erledigt = erledigt;
    }
}

class noteService{
    constructor(){}

    addNoteToDb(note){
        db.insert(note);
    }

    getAllNotes() {
        db.find({});
    }


    getNote(id){
        db.findOne({ _id: id });
    }

    deleteNote(id){
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true});
    }
}

module.exports = {Note, noteService};
