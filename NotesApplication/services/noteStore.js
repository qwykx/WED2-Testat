import Datastore from 'nedb-promise';

export class Note {
    constructor(title, beschreibung, wichtigkeit, fertigBis, erstelltAm, orderedBy) {
        this.title = title;
        this.beschreibung = beschreibung;
        this.wichtigkeit = wichtigkeit;
        this.fertigBis = fertigBis;
        this.erstelltAm = erstelltAm;
        this.orderedBy = orderedBy;
        this.state = "NEW";
    }
}

export class NoteStore{
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(note){
        return await this.db.insert(note);
    }

    async update(id, note) {
        await this.db.update({_id: id}, note);
        return await this.get(id);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async deleteAll(){
        await this.db.remove({}, { multi: true }, function (err, numRemoved) {

        });
    }

    async all(sort, sortOrder, show) {
        if(show === 'false') {
            return await this.db.find({$not: {$or: [{state: 'FINISHED'}, {state:'DELETED'}]}});
        }
        else{
            return await this.db.find({$not: {state:'DELETED'}});
        }

    }

    async getSortedByDate(){
        let result = await this.db.find({});
        function compare( a, b ) {
            if ( a.fertigBis < b.fertigBis){
                return -1;
            }
            if ( a.fertigBis> b.fertigBis ){
                return 1;
            }
            return 0;
        }
        result.sort( compare );
        return result;
    }

    async getSortedByCreateDate(){
        let result = await this.db.find({});
        function compare( a, b ) {
            if ( a.erstelltAm < b.erstelltAm){
                return -1;
            }
            if ( a.erstelltAm> b.erstelltAm ){
                return 1;
            }
            return 0;
        }
        result.sort( compare );
        return result;
    }

    async getSortedByRating(){

        let result = await this.db.find({});
        function compare( a, b ) {
            if ( a.wichtigkeit < b.wichtigkeit){
                return 1;
            }
            if ( a.wichtigkeit> b.wichtigkeit ){
                return -1;
            }
            return 0;
        }
        result.sort( compare );
        return result;

    }

    async getNotFinished(){
        return await this.db.find({ $not: {erledigt:"on"}});
    }
}

export const noteStore = new NoteStore();
