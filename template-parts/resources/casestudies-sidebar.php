<?php

/**
 * Template part for displaying single case study sidebar
 *
 * @package sixheads
 */

?>

<aside class="post__sidebar">
  <h3 class="heading">Recent Case Resources</h3>
  <?php
  // the query
  $args = array(
    'post_type'              => 'resource',
    'posts_per_page'         => '6',
  );

  $recentCaseStudies = new WP_Query($args); ?>

  <?php if ($recentCaseStudies->have_posts()) : ?>
    <ul>
      <!-- the loop -->
      <?php while ($recentCaseStudies->have_posts()) : $recentCaseStudies->the_post(); ?>
        <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
      <?php endwhile; ?>
      <!-- end of the loop -->
    </ul>

    <p class="post__back-btn"><a href="<?php bloginfo('url'); ?>/case-studies/"><svg class="icon icon__menu">
          <use xlink:href="#icon-chevron-left"></use>
        </svg> Back to case studies</a></p>
    <?php wp_reset_postdata(); ?>

  <?php else : ?>
    <p><?php _e('No recent case studies.'); ?></p>
  <?php endif; ?>
</aside>
