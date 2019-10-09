import Datastore from 'nedb-promise';

export class Note {
    constructor(title, beschreibung, wichtigkeit, fertigBis, erledigt) {
        this.title = title;
        this.beschreibung = beschreibung;
        this.wichtigkeit = wichtigkeit;
        this.fertigBis = fertigBis;
        this.erledigt = erledigt;
    }
}

export class NoteStore{
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(note){
        return await db.insert(note);
    }

    async edit(id, note) {
        await this.db.update({_id: id}, note);
        return await this.get(id);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"erledigt": true}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}

export const noteStore = new NoteStore();
