<?php

/**
 * The template for displaying all single case studies
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package sixheads
 */

get_header();
?>

<div id="primary" class="content-area">
  <main id="main" class="site-main site-main--single">

    <?php
    while (have_posts()) :
      the_post();

      get_template_part('template-parts/casestudies/content-casestudies');

      echo '<div class="wrapper--inner">';
      the_post_navigation();
      echo '</div>';

    endwhile; // End of the loop.
    ?>

  </main><!-- #main -->
</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
