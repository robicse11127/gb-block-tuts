import { registerBlockType } from '@wordpress/blocks';
import {
    InnerBlocks,
    useBlockProps,
    RichText,
    MediaUpload,
    InspectorControls,
 } from '@wordpress/block-editor';
import { Button, ToggleControl, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import './editor.css';
import './style.css';

const TEMPLATE = [
    [ 'core/heading', { level: 2, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit' } ],
    [ 'core/paragraph', { content: 'Lorem ipsum dolor sit amet labore cras venenatis.' } ],
];

const ALLOWED_BLOCKS = [
    'core/heading',
    'core/paragraph',
];

registerBlockType( metadata.name, {

    edit: ( { attributes, setAttributes } ) => {
        const {
            headerContent,
            image,
            footerContent,
            overlay,
        } = attributes;

        let overlayClass = '';

        if ( true === overlay ) {
            overlayClass = 'overlay';
        }

        return(
            <>
                <InspectorControls>
                    <PanelBody>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Overlay', 'gb-block-tuts' ) }
                                checked={ overlay }
                                onChange={ () => setAttributes( { overlay: ! overlay } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div { ...useBlockProps() }>
                    <section className="sy8-margin-bottom-xl">
                        <div className="sy8-container sy8-max-width-sm">
                            <article className="sy8-article sy8-text-component">
                                <RichText
                                    tagName="p"
                                    value={ headerContent }
                                    allowedFormats={ [ 'core/bold', 'core/italic' ] }
                                    onChange={ ( headerContent ) => setAttributes( { headerContent } ) }
                                    placeholder={ __( 'Add your content here', 'gb-block-tuts' ) }
                                />
                            </article>
                        </div>
                    </section>
                    <section className="sticky-hero sticky-hero--scale sy8-margin-bottom-xl js-sticky-hero">
                                <MediaUpload
                                    onSelect={ ( media ) => setAttributes( { image: media.sizes.full.url } ) }
                                    allowedTypes={ [ 'image' ] }
                                    value={ image }
                                    render={ ( { open } ) => (
                                        <Button
                                            onClick={ open }
                                            className="components-button is-secondary is-large"
                                            icon="upload">
                                            Upload Image
                                        </Button>
                                    ) }
                                />
                        { '' !== image &&
                            <div className={ `sticky-hero__media ${overlayClass}` } style={{backgroundImage: 'url(' + image +')'}} aria-hidden="true" />
                        }
                        <div className="sticky-hero__content">
                            <div className="sy8-container sy8-max-width-sm sy8-text-component">
                                <InnerBlocks
                                    template={ TEMPLATE }
                                    allowedBlocks={ ALLOWED_BLOCKS }
                                    templateLock="all"
                                />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="sy8-container sy8-max-width-sm">
                            <article className="sy8-article sy8-text-component">
                                <RichText
                                    tagName="p"
                                    value={ footerContent }
                                    allowedFormats={ [ 'core/bold', 'core/italic' ] }
                                    onChange={ ( footerContent ) => setAttributes( { footerContent } ) }
                                    placeholder={ __( 'Add your content here', 'gb-block-tuts' ) }
                                />
                            </article>
                        </div>
                    </section>
                </div>
            </>
        )
    },
    save: ( { attributes } ) => {
        const {
            headerContent,
            image,
            footerContent,
            overlay,
        } = attributes;

        let overlayClass = '';
        
        if ( true === overlay ) {
            overlayClass = 'overlay';
        }

        return(
            <div { ...useBlockProps.save() }>
               <section className="sy8-margin-bottom-xl">
                    <div className="sy8-container sy8-max-width-sm">
                        <article className="sy8-article sy8-text-component">
                            <RichText.Content tagName='p' value={ headerContent } />
                        </article>
                    </div>
                    </section>
                    <section className="sticky-hero sticky-hero--scale sy8-margin-bottom-xl js-sticky-hero">
                    { '' !== image &&
                        <div className={ `sticky-hero__media ${overlayClass}` }  style={{backgroundImage: 'url('+image+')'}} aria-hidden="true" />
                    }
                    <div className="sticky-hero__content">
                        <div className="sy8-container sy8-max-width-sm sy8-text-component">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                    </section>
                    <section>
                    <div className="sy8-container sy8-max-width-sm">
                        <article className="sy8-article sy8-text-component">
                            <RichText.Content tagName='p' value={ footerContent } />
                        </article>
                    </div>
                </section>
            </div>
        )
    }
} );