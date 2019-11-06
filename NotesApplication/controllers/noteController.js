import {noteStore} from '../services/noteStore'
import {Note} from '../services/noteStore'

export class NoteController {
    async setSessionParameters(session, query){
        if(query.sorting){
            session.sortOrder = session.sorting === query.sorting ? session.sortOrder * -1 : 1;
            session.sorting = query.sorting;
        }
        if(query.showFinished){
            session.showFinished = query.showFinished;
        }
        if(query.styleSwitcher){
            session.style = query.styleSwitcher;
        }
        if(session.sorting === undefined){
            session.sorting = 'dueDate';
            session.sortOrder = 1;
        }
        if(session.showFinished === undefined){
            session.showFinished = 'true';
        }
    }
    getFormattedDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }
    async all(req, res) {
        const result = await noteStore.all(req.session.sorting, req.session.sortOrder, req.session.showFinished);

            res.format({
                'text/html': function(){
                    res.render("index", {
                        notes: result,
                        sortBy:req.session.sorting,
                        showFinished:req.session.showFinished,
                        sortOrder: req.session.sortOrder,
                        styleSwitch: req.session.style
                    });
                },
                'application/json': function(){
                    res.send({});
                }
            });
    }

    async showCreate(req, res) {
        res.render("createNote", {
            styleSwitch: req.session.style
        });
    }

    async createNote(req, res){
        let note = new Note(req.body.title, req.body.beschreibung, req.body.wichtigkeit, req.body.fertigBis, this.getFormattedDate());
        if(req.body.erledigt !== undefined) {
            note.state = 'FINISHED';
            await noteStore.add(note);
        }
        await noteStore.add(note);
        res.redirect('/');
    }

    async editNote(req, res) {
        const note = await noteStore.get(req.params.id);
        await res.render("editNote", {
            note: note,
            styleSwitch: req.session.style
        });
    }

    async updateNote(req, res) {
        let note = new Note(req.body.title, req.body.beschreibung, req.body.wichtigkeit, req.body.fertigBis, this.getFormattedDate(), "unknown");
        if(req.body.erledigt !== undefined) {
            note.state = 'FINISHED';
            await noteStore.update(req.params.id, note);
        }
        await noteStore.update(req.params.id, note);
        res.redirect('/');
    }

    async deleteNote(req, res) {
        await res.render("index", await noteStore.delete(req.params.id));
    }
}
export const noteController = new NoteController();
