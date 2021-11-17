<?php

/**
 * Template Name: Home
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

        // get_template_part('template-parts/content', 'page');
        get_template_part('template-parts/flexible-modules/flexible-modules');

      endwhile; // End of the loop.
      ?>
    </article><!-- #post-<?php the_ID(); ?> -->
  </main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
