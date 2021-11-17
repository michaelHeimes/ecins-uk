<?php

/**
 * Latest News module
 *
 * @package sixheads
 **/
$title = get_sub_field('section_title');
$showNews = get_sub_field('show_news');
$spacing = get_sub_field('spacing');
?>

<?php
if ($showNews) { ?>
  <div class="latest-news module-spacing--<?php echo $spacing; ?>">
    <div class="wrapper--inner">
      <h2 class="section-title"><?php echo $title; ?></h2>

      <div class="posts__list">

        <?php
        // the query
        $args = array(
          'post_type'              => 'post',
          'posts_per_page'         => '2',
          // 'orderby'                => 'rand',
        );

        $news = new WP_Query($args); ?>

        <?php if ($news->have_posts()) : ?>

          <!-- the loop -->
          <?php while ($news->have_posts()) : $news->the_post();

            get_template_part('template-parts/content', get_post_type());

          endwhile; ?>
          <!-- end of the loop -->

          <?php wp_reset_postdata(); ?>
        <?php endif; ?>

      </div>
    </div>
  </div>
<?php } ?>
