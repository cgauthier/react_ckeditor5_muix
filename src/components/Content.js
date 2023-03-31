import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './Content.css';

function Content(props) {

    const resizeHandler = (function() {

        var editorDiv, editorContainerDiv, contentDiv;

        return {
            setEditorDiv: function(d) {
                editorDiv = d;
            },
            setEditorContainerDiv: function(d) {
                editorContainerDiv = d;
            },
            setContentDiv: function(d) {
                contentDiv = d;
            },
            calcAndSetMinAndMaxHeightForEditorDiv: function(editorDiv, editorContainerDiv, contentDiv) {
                const eCDivH = editorContainerDiv.offsetHeight;
                const eDivH = editorDiv.offsetHeight;
                const offsetH = eCDivH - eDivH;
                const cDivH = contentDiv.offsetHeight;
                const h = cDivH - offsetH;
                const hStr = `${h}px`;
                const stylesheet = document.styleSheets[0];
                const rule = `.ck-editor__editable { min-height: ${hStr}; max-height: ${hStr}; }`;

                if(stylesheet.cssRules.length) {
                    if(stylesheet.cssRules[0].cssText.indexOf("ck-editor__editable") > -1) {
                        stylesheet.deleteRule(0);
                    }
                }

                stylesheet.insertRule(rule, 0);
            },
            setDivsToResize: function(eDiv, eCDiv, cDiv) {
                this.setEditorDiv(eDiv);
                this.setEditorContainerDiv(eCDiv);
                this.setContentDiv(cDiv);
            },
            getDivsToResize: function() {
                if(editorDiv && editorContainerDiv && contentDiv) {
                    return {
                        editorDiv: editorDiv,
                        editorContainerDiv: editorContainerDiv,
                        contentDiv: contentDiv
                    };
                }
                return null;
            }
        };
    })();

    useEffect(function wrapResizeHandler () {

        const handleResize = function () {

            const rule = `.ck-editor__editable { min-height: 50px; max-height: 50px; height: 50px; }`;
            const stylesheet = document.styleSheets[0];

            if(stylesheet.cssRules.length) {
                if(stylesheet.cssRules[0].cssText.indexOf("ck-editor__editable") > -1) {
                    stylesheet.deleteRule(0);
                    stylesheet.insertRule(rule, 0);
                }
            }

            const getDivsToResize = resizeHandler.getDivsToResize;
            const divs = getDivsToResize();
            if(divs) {
                resizeHandler.calcAndSetMinAndMaxHeightForEditorDiv(divs.editorDiv, divs.editorContainerDiv, divs.contentDiv);
            }
        }

        window.addEventListener('resize', handleResize);

    });

    return (
        <div className="Content">
            <CKEditor
                editor={ ClassicEditor }
                data={props.addData}
                onReady={ (editor) => {
                    console.log( 'Editor is ready to use!', editor );
                    const thisDiv = editor.sourceElement;
                    const contentDiv = thisDiv.parentNode;
                    const editorContainerDiv = thisDiv.nextSibling;
                    const editorDiv = editorContainerDiv.querySelector('div[class~=ck-editor__editable]');
                    resizeHandler.calcAndSetMinAndMaxHeightForEditorDiv(editorDiv, editorContainerDiv, contentDiv);
                    resizeHandler.setDivsToResize(editorDiv, editorContainerDiv, contentDiv);
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </div>
    );
}

export default Content;
