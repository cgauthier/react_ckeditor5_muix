import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class Save extends Plugin {
    init() {
        const editor = this.editor;
        const commentsRepository = editor.plugins.get( 'CommentsRepository' );

        editor.ui.componentFactory.add('save', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set({
                label: 'Save',
                withText: true
            });

            //Execute a callback function when the button is clicked
            button.on('execute', () => {
                const editorData = editor.data.get();
                const commentThreadsData = commentsRepository.getCommentThreads( {
                    skipNotAttached: true,
                    skipEmpty: true,
                    toJSON: true
                } );
                console.log(editorData);
                console.log( "Comment Data: " );
                console.log(commentThreadsData);

                fetch("http://localhost:8080/v1/manual/1/policy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/html"
                    },
                    body: editorData
                }).then((response) => response.json())
                    .then((data) => {
                        console.log("Response data:");
                        console.log(data);
                    });

            });

            return button;
        });
    }
}

export default Save;
