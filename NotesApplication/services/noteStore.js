import Datastore from 'nedb-promise';

export class Note {
    constructor(title, beschreibung, wichtigkeit, fertigBis, erstelltAm) {
        this.title = title;
        this.beschreibung = beschreibung;
        this.wichtigkeit = wichtigkeit;
        this.fertigBis = fertigBis;
        this.erstelltAm = erstelltAm;
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
            var result = await this.db.find({$not: {$or: [{state: 'FINISHED'}, {state:'DELETED'}]}});
            if(sort === 'dueDate'){
                if(sortOrder === 1) {
                    result.sort(this.compareByFinishDate);
                    return result
                }
                else{
                    result.sort(this.compareByFinishDateDecrease);
                    return result
                }
            }
            else if(sort === 'createdDate'){
                if(sortOrder === 1){
                    result.sort(this.compareByCreateDate);
                    return result
                }
                else{
                    result.sort(this.compareByCreateDateDecrease);
                    return result
                }
            }

            else if(sort === 'importance'){
                if(sortOrder === 1){
                    result.sort(this.compareByImportance);
                    return result
                }
                else{
                    result.sort(this.compareByImportanceDecrease);
                    return result
                }
            }

            return result;
        }
        else{
            var result = await this.db.find({$not: {state:'DELETED'}});

            if(sort === 'dueDate'){
                if(sortOrder === 1) {
                    result.sort(this.compareByFinishDate);
                    return result
                }
                else{
                    result.sort(this.compareByFinishDateDecrease);
                    return result
                }
            }

            else if(sort === 'createdDate'){
                if(sortOrder === 1){
                    result.sort(this.compareByCreateDate);
                    return result
                }
                else{
                    result.sort(this.compareByCreateDateDecrease);
                    return result
                }
            }
            else if(sort === 'importance'){
                if(sortOrder === 1){
                    result.sort(this.compareByImportance);
                    return result
                }
                else{
                    result.sort(this.compareByImportanceDecrease);
                    return result
                }
            }
            return result
        }

    }
    compareByFinishDate( a, b ) {
            if ( a.fertigBis < b.fertigBis){
                return -1;
            }
            if ( a.fertigBis> b.fertigBis ){
                return 1;
            }
            return 0;
        }
    compareByFinishDateDecrease( a, b ) {
        if ( a.fertigBis < b.fertigBis){
            return 1;
        }
        if ( a.fertigBis> b.fertigBis ){
            return -1;
        }
        return 0;
    }
    compareByCreateDate( a, b ) {
            if ( a.erstelltAm < b.erstelltAm){
                return -1;
            }
            if ( a.erstelltAm> b.erstelltAm ){
                return 1;
            }
            return 0;
        }
    compareByCreateDateDecrease( a, b ) {
        if ( a.erstelltAm < b.erstelltAm){
            return 1;
        }
        if ( a.erstelltAm> b.erstelltAm ){
            return -1;
        }
        return 0;
    }
        compareByImportance( a, b ) {
        if ( a.wichtigkeit < b.wichtigkeit){
            return 1;
        }
        if ( a.wichtigkeit> b.wichtigkeit ){
            return -1;
        }
        return 0;
    }
    compareByImportanceDecrease( a, b ) {
        if ( a.wichtigkeit < b.wichtigkeit){
            return -1;
        }
        if ( a.wichtigkeit> b.wichtigkeit ){
            return 1;
        }
        return 0;
    }
}

export const noteStore = new NoteStore();
