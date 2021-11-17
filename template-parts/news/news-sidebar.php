<?php

/**
 * Template part for displaying single post news sidebar
 *
 * @package sixheads
 */

?>

<aside class="post__sidebar">
  <h3 class="heading">Recent News</h3>
  <?php
  // the query
  $args = array(
    'post_type'              => 'post',
    'posts_per_page'         => '6',
  );

  $recentPosts = new WP_Query($args); ?>

  <?php if ($recentPosts->have_posts()) : ?>
    <ul>
      <!-- the loop -->
      <?php while ($recentPosts->have_posts()) : $recentPosts->the_post(); ?>
        <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
      <?php endwhile; ?>
      <!-- end of the loop -->
    </ul>
    <p class="post__back-btn"><a href="<?php bloginfo('url'); ?>/news/"><svg class="icon icon__menu">
          <use xlink:href="#icon-chevron-left"></use>
        </svg>Back to news</a></p>
    <?php wp_reset_postdata(); ?>

  <?php else : ?>
    <p><?php _e('No recent news.'); ?></p>
  <?php endif; ?>
</aside>
