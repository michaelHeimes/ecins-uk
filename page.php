<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package sixheads
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

			<?php
			while (have_posts()) :
				the_post();

				get_template_part('template-parts/flexible-modules/flexible-modules');

			endwhile; // End of the loop.
			?>

		</article><!-- #post-<?php the_ID(); ?> -->
	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar();

if (is_page('request-a-demo')) {
	// Request a demo page
	get_footer('simple');
} else {
	//everything else
	get_footer();
}
?>
