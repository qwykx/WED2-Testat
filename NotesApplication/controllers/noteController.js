import {noteStore} from '../services/noteStore'
import {Note} from '../services/noteStore'

export class NoteController {
    getFormattedDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    async showIndex(req, res) {

        try {
            const result = await noteStore.all();
            res.render("index", {data: result});
        } catch (error) {
            console.error(`Controller Error-Message: ${error}`);
        }
    }

    showCreate(req, res) {
        res.render("createNote");
    }

    async createNote(req, res){
        let note = new Note(req.body.title, req.body.beschreibung, req.body.wichtigkeit, req.body.fertigBis, this.getFormattedDate(), req.body.erledigt);
        await noteStore.add(note);
        res.redirect('/');
    }

    async editNote(req, res) {
        await res.render("editNote", await noteStore.get(req.params.id));
    }

    async updateNote(req, res) {
        let note = new Note(req.body.title, req.body.beschreibung, req.body.wichtigkeit, req.body.fertigBis, this.getFormattedDate(), req.body.erledigt);
        await noteStore.update(req.params.id, note)
        res.redirect('/');
    }

    async deleteNote(req, res) {
        await res.render("index", await noteStore.delete(req.params.id));
    }

    async showSortedByDate(req, res){

        try {
            const result = await noteStore.getSortedByDate();
            res.render("index", {data: result});
        } catch (error) {
            console.error(`Controller Error-Message: ${error}`);
        }

    }

    async showSortedByCreateDate(req, res){

        try {
            const result = await noteStore.getSortedByCreateDate();
            res.render("index", {data: result});
        } catch (error) {
            console.error(`Controller Error-Message: ${error}`);
        }

    }

    async showSortedByRating(req, res){

        try {
            const result = await noteStore.getSortedByRating();
            res.render("index", {data: result});
        } catch (error) {
            console.error(`Controller Error-Message: ${error}`);
        }

    }

    async showNotFinished(req, res) {
        try {
            res.render("index", {data: await noteStore.getNotFinished()});
        } catch (error) {
            console.error(`Controller Error-Message: ${error}`);
        }
    }

}
export const noteController = new NoteController();
