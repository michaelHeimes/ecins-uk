<?php

/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package sixheads
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">

		<?php

		get_template_part('template-parts/news/hero-banner');
		get_template_part('template-parts/news/page-intro');
		get_template_part('template-parts/news/video');

		if (have_posts()) :

			echo '<div class="wrapper--inner">';

			/* Start the Loop */
			while (have_posts()) :
				the_post();

				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				get_template_part('template-parts/content', get_post_type());

			endwhile;

			$args = array(
				'prev_text'          => 'Previous News',
				'next_text'          => 'Next News',
				'screen_reader_text' => 'News navigation'
			);
			the_posts_navigation($args);

		else :

			get_template_part('template-parts/content', 'none');

		endif;

		echo '</div>';
		?>

		<?php get_template_part('template-parts/demo-or-ebook/demo-cta'); ?>
		<?php get_template_part('template-parts/testimonials/testimonial'); ?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
