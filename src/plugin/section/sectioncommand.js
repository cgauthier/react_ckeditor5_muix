/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Command from '@ckeditor/ckeditor5-core/src/command';


export default class SectionCommand extends Command {
	execute() {
		const doc = this.editor.model.document;
		this.editor.model.change( writer => {
			// Insert <simpleBox>*</simpleBox> at the current selection position
			// in a way that will result in creating a valid model structure.
			this.editor.model.insertContent( createSection( writer ), doc.getRoot() , "end" );
		} );

	}

	refresh() {
		this.isEnabled = true;
	}
}

function createSection( writer ) {
	const now = new Date();
	const section = writer.createElement( 'ksection', { kid: now.toString() } );
	const sectionTitle = writer.createElement( 'ksectionTitle' );
	const sectionDescription = writer.createElement( 'ksectionDescription' );

	writer.append( sectionTitle, section );
	writer.append( sectionDescription, section );

	// There must be at least one paragraph for the description to be editable.
	// See https://github.com/ckeditor/ckeditor5/issues/1464.
	writer.appendElement( 'paragraph', sectionDescription );

	return section;
}
