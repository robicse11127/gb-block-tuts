<?php
/**
 * Enqueue scripts and styles.
 *
 * @since Anfco 1.0
 *
 * @return void
 */
function prefix_sticky_header_load_scripts() {
	wp_register_script( 'prefix-sticky-header', PREFIX_PLUGIN_URL . '/src/blocks/sticky-header/sticky-header.js', array(), wp_rand(), true );

	if ( has_block( 'prefix-blocks/sticky-header' ) ) {
		wp_enqueue_script( 'prefix-sticky-header' );
	}
}
add_action( 'wp_enqueue_scripts', 'prefix_sticky_header_load_scripts' );

function register_sticky_header_block() {
    register_block_type(
        PREFIX_PLUGIN_PATH . '/build/blocks/sticky-header',
        [
            // 'render_callback' => 'render_sticky_header_callback'
        ]
    );
}
add_action( 'init', 'register_sticky_header_block' );

/**
 * Render Callback Function.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered Html.
 */
function render_sticky_header_callback( $attributes = [] ) {
    return 'Sticky Header block rendred';
}