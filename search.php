<?php

/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package sixheads
 */

get_header();
?>

<section id="primary" class="content-area">
	<main id="main" class="site-main wrapper--inner module-spacing--after">

		<?php if (have_posts()) : ?>

			<header class="page-header simple-banner module-spacing--both">
				<h1 class="page-title page-title--alt ">
					<?php
					/* translators: %s: search query. */
					printf(esc_html__('Search Results for: %s', 'sixheads'), '<span>' . get_search_query() . '</span>');
					?>
				</h1>
			</header><!-- .page-header -->

		<?php
			/* Start the Loop */
			while (have_posts()) :
				the_post();

				/**
				 * Run the loop for the search to output the results.
				 * If you want to overload this in a child theme then include a file
				 * called content-search.php and that will be used instead.
				 */
				get_template_part('template-parts/content', 'search');

			endwhile;

			$args = array(
				'prev_text'          => 'Previous results',
				'next_text'          => 'Next results',
				'screen_reader_text' => 'Post navigation'
			);
			the_posts_navigation($args);

		else :

			get_template_part('template-parts/content', 'none');

		endif;
		?>

	</main><!-- #main -->
</section><!-- #primary -->

<?php
get_footer('simple');
