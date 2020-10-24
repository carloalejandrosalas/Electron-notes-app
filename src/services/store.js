import { Note } from '../models/Note'
export const store = {

    get(name) {
        return localStorage.getItem(name);
    },

    saveNote(note) {

        let notes = this.getNotes();

        note.id = Date.now();

        notes.push(note);

        this.set('notes', JSON.stringify(notes));

    },

    editNote(note) {

        let notes = this.getNotes();

        let idx_note = notes.findIndex( item => item.id == note.id )

        Object.assign(notes[idx_note], note);
        
        this.set('notes', JSON.stringify(notes));

    },

    removeNote(id) {
        let notes = this.getNotes();

        let idx = notes.findIndex( note =>  note.id === id );

        notes.splice(idx, 1);

        this.set('notes', JSON.stringify(notes));

    },

    findNote(id) {
        let notes = this.getNotes();

        return notes.find( note =>  note.id == id );

    },

    getNotes() {

        let notes = JSON.parse(this.get('notes'));

        if(Array.isArray(notes)) {
            
            return notes.map(note => {
                const { title, content, tags, color, id } = note
                return new Note(title, content, tags, color, id)
            });
          
        }

        this.set('notes', '[]');

        return [];
    },

    set(name, value) {
        localStorage.setItem(name, value)
    },

    getTags () {
        const tags = JSON.parse(this.get('tags'))

        if (Array.isArray(tags)) {
            return tags
        }

        return []
    },
    
    addTag (tag) {
        const tags = this.getTags()

        tags.push(tag)

        localStorage.setItem('tags', JSON.stringify(tags))
    },
    setTags (tags) {
        localStorage.setItem('tags', JSON.stringify(tags))
    },
    importNotes (importNotes) {
        const notes = this.getNotes()
        
        const newNotes = notes.concat(importNotes)

        console.log('notes', importNotes)

        this.set('notes', JSON.stringify(newNotes))
    },
    importTags (importTags) {
        const tags = this.getTags()

        const newTags = tags.concat(importTags)

        this.set('tags', JSON.stringify(newTags))
    }
}