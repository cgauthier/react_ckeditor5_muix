
let appData = {
    userId: 'user-1'
};

export default class CommentsIntegration {
    constructor( editor ) {
        this.editor = editor;
    }

    static get requires() {
        return [ 'CommentsRepository' ];
    }

    init() {
        const usersPlugin = this.editor.plugins.get( 'Users' );
//        const commentsRepositoryPlugin = this.editor.plugins.get( 'CommentsRepository' );
        fetch("http://localhost:8080/v1/users/getAll")
            .then((response) => response.json())
            .then((data) => {
                // Load the users data.
                for ( const user of data.users ) {
                    usersPlugin.addUser( user );
                }

                // Set the current user.
                usersPlugin.defineMe( appData.userId );
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        // Load the comment threads data.
        // for ( const commentThread of appData.commentThreads ) {
        //     commentsRepositoryPlugin.addCommentThread( commentThread );
        // }
    }
}