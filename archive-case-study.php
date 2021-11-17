<?php

/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package sixheads
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main">

		<?php if (have_posts()) :

			get_template_part('template-parts/casestudies/hero-banner');
			get_template_part('template-parts/casestudies/page-intro');
			get_template_part('template-parts/casestudies/video');

		?>

			<div class="wrapper--inner">
			<?php
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
				'prev_text'          => 'Previous Case Studies',
				'next_text'          => 'Next Case Studies',
				'screen_reader_text' => 'Case study navigation'
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
