export class Note {
    constructor (title = '', content = '', tags = [], color = 'white', id = new Date().getTime()) {
        this.title = title,
        this.content = content,
        this.tags = tags,
        this.color = color
        this.id = id
    }

    async validate () {
        let error = null
        if (typeof (this.title) !== 'string') {
            error = 'Title is not a string'
        } else if (typeof (this.content) !== 'string') {
            error = 'Content is not a string'
        } else if (!Array.isArray(this.tags)) {
            error = 'Tags is not an Array'
        } else if (typeof (this.color) === 'string') {
            error = 'Color is not an String'
        } else if (typeof (this.id) === 'number') {
            error = 'Id is not a number'
        }

        if (error) {
            return {
                error: true,
                message: error
            }
        }

        return {
            error: false
        }
    }
}

