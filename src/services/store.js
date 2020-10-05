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
            
            return notes;
          
        }

        this.set('notes', '[]');

        return [];
    },

    set(name, value) {
        localStorage.setItem(name, value)
    },

    getTags () {
        return JSON.parse(localStorage.getItem('tags')) || []
    },
    
    addTag (tag) {
        const tags = this.getTags()

        tags.push(tag)

        localStorage.setItem('tags', JSON.stringify(tags))
    },
    setTags (tags) {
        localStorage.setItem('tags', JSON.stringify(tags))
    }
}