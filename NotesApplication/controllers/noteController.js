import {noteStore} from '../services/noteStore'
import {Note} from '../services/noteStore'

export class NoteController {

    showIndex(req, res) {
        res.render("index");
    };

    showCreate(req, res) {
        res.render("createNote");
    };

    async createNote(req, res){
        let note = new Note(req.body.title, req.body.beschreibung, req.body.wichtigkeit, req.body.fertigBis, req.body.erledigt);
        await res.render("index", await noteStore.add(note));
    };
}
export const noteController = new NoteController();
