import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './style.css';

export default class SectionUI extends Plugin {

	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add('section', () => {
			const button = new ButtonView();

			button.label = 'New Section';
			button.tooltip = true;
			button.withText = true;

			this.listenTo(button, 'execute', () => {
				editor.execute('addSection');
			});

			return button;
		});


		console.log("SectionUI initialized...")
	}
}
