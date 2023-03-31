/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

 import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
 import SectionEditing from './sectionediting';
 import SectionUI from './sectionui';
 
 export default class Section extends Plugin {
     static get requires() {
         return [ SectionEditing, SectionUI ];
     }
 }
