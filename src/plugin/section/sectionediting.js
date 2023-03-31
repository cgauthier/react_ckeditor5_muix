
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import SectionCommand from './sectioncommand';
import EmitterMixin from '@ckeditor/ckeditor5-utils/src/emittermixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';
import UpcastWriter from '@ckeditor/ckeditor5-engine/src/view/upcastwriter';
// import UpcastWriter from '@ckeditor/ckeditor5-core/'
//import EventInfo from '@ckeditor/ckeditor5-utils'


export default class SectionEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        console.log( 'SectionEditing#init() got called' );
        this.editor.commands.add(
            'addSection', new SectionCommand(this.editor)
        );

        this._defineSchema();
        this._defineConverters();                                              // ADDED

       const writer = new UpcastWriter( this.editor.editing.view.document );

        this.editor.plugins.get( 'ClipboardPipeline' ).on( 'inputTransformation', ( evt, data ) => {
//            debugger;
            // if ( data.content.childCount == 1 && isUrlText( data.content.getChild( 0 ) ) ) {
            //     const linkUrl = data.content.getChild( 0 ).data;
            //
            //     data.content = writer.createDocumentFragment( [
            //         writer.createElement(
            //             'a',
            //             { href: linkUrl },
            //             [ writer.createText( linkUrl ) ]
            //         )
            //     ] );
            // }
        } );

        this.editor.editing.view.document.on( 'clipboardInput', ( evt, data ) => {
//            debugger;
            const dataTransfer = data.dataTransfer;
            const textContent = dataTransfer.getData( 'application/text' );

            this.fire('testEvent');
        } );

        this.on('testEvent', (eventInfo, data) => {
 //           debugger;
//           alert("Got a testEvent");
        });

    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'ksection', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            isSelectable: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',

            allowAttributes: [ 'kid' ]
        } );

        // schema.register( 'ksectionMeta', {
        //     // Cannot be split or left by the caret.
        //     isLimit: true,
        //
        //     allowIn: 'ksection',
        //
        //     allowContentOf: '$root'
        // } );

        schema.register( 'ksectionTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'ksection',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'ksectionDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'ksection',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'ksectionDescription' ) && childDefinition.name === 'ksection' ) {
                return false;
            }
        } );

    }

    _defineConverters() {                                                      // MODIFIED
        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: ( viewElement, { writer: modelWriter } ) => {
                const section = modelWriter.createElement( 'ksection', { kid: viewElement.getAttribute('data-kid') } );

                return section;
            },
            view: {
                name: 'section',
                classes: 'k-section'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'ksection',
            view: {
                name: 'section',
                classes: 'k-section'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'ksection',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'k-section', 'data-kid': modelElement.getAttribute('kid') } );

                return toWidget( section, viewWriter, { label: 'ksection widget' } );
            }
        } );

        // <simpleBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'ksectionTitle',
            view: {
                name: 'h1',
                classes: 'k-section-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'ksectionTitle',
            view: {
                name: 'h1',
                classes: 'k-section-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'ksectionTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'h1', { class: 'k-section-title' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'ksectionDescription',
            view: {
                name: 'div',
                classes: 'k-section-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'ksectionDescription',
            view: {
                name: 'div',
                classes: 'k-section-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'ksectionDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'k-section-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}

mix( SectionEditing, EmitterMixin );
