<?php

/**
 * sixheads functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package sixheads
 */
 
 // Region Cookie Redirects
function my_cookie_redirect() {
		
	$page = 'https://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];	

	if ( ($_COOKIE['domain']) == 'us' && ($_COOKIE['country-nav']) != 'yes' && strpos($page, '?domain=') === false && !is_user_logged_in() ) {
		var_dump($page);
		
		header("Location: https://staging.ecins.com/us/");
		exit;
				
	}

	if ( ($_COOKIE['domain']) == 'au' && ($_COOKIE['country-nav']) != 'yes' && strpos($page, '?domain=') === false && !is_user_logged_in() ) {
		
		header("Location: https://staging.ecins.com/us/");
		exit;
				
	}
   
}
add_action('template_redirect', 'my_cookie_redirect', 1);


if (!function_exists('sixheads_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function sixheads_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on sixheads, use a find and replace
		 * to change 'sixheads' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('sixheads', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');
		// add_image_size( 'hero', 1000, 400, true );
		// add_image_size( 'hero-set-width', 1000 );
		add_image_size( 'resource_card', 160, '', true ); // cropped.

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(array(
			'primary' => esc_html__('Primary', 'sixheads'),
			'mobile' => esc_html__('Mobile', 'sixheads'),
			'footer' => esc_html__('Footer', 'sixheads'),
		));

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));

		// add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/*
		* This theme styles the visual editor to resemble the theme style,
		* specifically font, colors, icons, and column width.
		*/
		// add_editor_style( 'editor-style.css' );
	}
endif;
add_action('after_setup_theme', 'sixheads_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function sixheads_content_width()
{
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters('sixheads_content_width', 800);
}
add_action('after_setup_theme', 'sixheads_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
// function sixheads_widgets_init()
// {
// 	register_sidebar(array(
// 		'name'          => esc_html__('Sidebar', 'sixheads'),
// 		'id'            => 'sidebar-1',
// 		'description'   => esc_html__('Add widgets here.', 'sixheads'),
// 		'before_widget' => '<section id="%1$s" class="widget %2$s">',
// 		'after_widget'  => '</section>',
// 		'before_title'  => '<h2 class="widget-title">',
// 		'after_title'   => '</h2>',
// 	));
// }
// add_action('widgets_init', 'sixheads_widgets_init');

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 */
function sixheads_javascript_detection()
{
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action('wp_head', 'sixheads_javascript_detection', 0);

/**
 * Enqueue scripts and styles.
 */
function sixheads_scripts()
{
	// wp_enqueue_style('sixheads-style', get_stylesheet_uri());
	wp_enqueue_style('sixheads-style', get_template_directory_uri() . '/style.min.css', array(), '20210528');

	wp_deregister_script('jquery');
	wp_register_script('jquery', "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js", false, null, false);
	wp_enqueue_script('jquery');

	// wp_enqueue_script('sixheads-vendor', get_template_directory_uri() . '/js/vendor.js', array(), '', true);
	// wp_enqueue_script('sixheads-main', get_template_directory_uri() . '/js/main.js', array(), '', true);
	wp_enqueue_script('sixheads-grid', get_template_directory_uri() . '/js/content-grid.min.js', array(), '20210528', true);
	wp_enqueue_script('sixheads-vendor', get_template_directory_uri() . '/js/vendor.min.js', array(), '20210528', true);
	wp_register_script( 'ecins_scripts', get_template_directory_uri() . '/js/main.min.js', array( 'jquery' ), filemtime( get_theme_file_path( '/js/main.min.js' ) ), true );
	
	$localized = array(
		'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
		'themeDir' => get_template_directory_uri(),
		'siteUrl'  => get_site_url(),
	);
	wp_localize_script( 'ecins_scripts', 'localized', $localized );
		
	wp_enqueue_script( 'ecins_scripts' );
	
	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'sixheads_scripts');

// Add Webfonts
function add_web_fonts()
{
	wp_enqueue_style('sixheads-google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap', false);
}

add_action('wp_enqueue_scripts', 'add_web_fonts');

/**
 * Excerpts.
 */

// Customize the length of excerpts
add_filter('excerpt_length', 'new_excerpt_length');
function new_excerpt_length($length)
{
	return 30;
}

//* Customize [...] in WordPress excerpts
add_filter('the_excerpt', 'sp_read_more_custom_excerpt');
function sp_read_more_custom_excerpt($text)
{
	if (strpos($text, '[&hellip;]')) {
		$excerpt = str_replace('[&hellip;]', '<a class="more-link" href="' . get_permalink() . '"> more &rarr;</a>', $text);
	} else {
		$excerpt = $text . '<a class="more-link" href="' . get_permalink() . '"> more &rarr;</a>';
	}
	return $excerpt;
}

/*
 * Modify TinyMCE editor to remove H1.
 */
function tiny_mce_remove_unused_formats($init)
{
	// Add block format elements you want to show in dropdown
	$init['block_formats'] = 'Paragraph=p;Heading=h2;Subheading=h3;';
	return $init;
}
add_filter('tiny_mce_before_init', 'tiny_mce_remove_unused_formats');

/**
 * Add AQ Resizer.
 * https://github.com/syamilmj/Aqua-Resizer
 */
require get_template_directory() . '/inc/aq-resizer.php';

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * REST API for Resources.
 */
require get_template_directory() . '/inc/functions-restapi.php';

/**
 * ACF Options setup
 */
if (function_exists('acf_add_options_page')) {

	acf_add_options_page(array(
		'page_title' 	=> 'Site Settings',
		'menu_title'	=> 'Site Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
		'show_in_graphql' => true,
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Products',
		'menu_title'	=> 'Products',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Request Demo',
		'menu_title'	=> 'Request Demo',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'eBook',
		'menu_title'	=> 'eBook',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'News',
		'menu_title'	=> 'News',
		'parent_slug'	=> 'theme-general-settings',
	));
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Resources',
		'menu_title'	=> 'Resources',
		'parent_slug'	=> 'theme-general-settings',
	));
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Case Studies',
		'menu_title'	=> 'Case Studies',
		'parent_slug'	=> 'theme-general-settings',
	));
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Subscribe',
		'menu_title'	=> 'Subscribe',
		'parent_slug'	=> 'theme-general-settings',
	));
}

// Method 2: Setting.
function my_acf_init()
{
	acf_update_setting('google_api_key', 'AIzaSyDxU2zcv3mxpvV2mRvu3f80RnwDMR5BxQk');
}
add_action('acf/init', 'my_acf_init');
