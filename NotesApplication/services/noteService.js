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

class Service{
    constructor(){}

    addNoteToDb(note, callback){
        db.insert(note, function(err, newDoc){
            if(callback){
                callback(err, newDoc);
            }
        });
    }

    getAllNotes(callback) {
        db.find({}, function (err, docs) {
            callback( err, docs);
        });
    }


    getNote(id, callback){
        db.findOne({ _id: id }, function (err, doc) {
            callback( err, doc);
        });
    }

    deleteNote(id, callback){
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }
}

module.exports = {Note, Service};
