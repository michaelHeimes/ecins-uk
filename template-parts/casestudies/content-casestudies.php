<?php

/**
 * Template part for displaying single case study content
 *
 * @package sixheads
 */

$thumbnail = get_post_thumbnail_id();
$imageUrl = wp_get_attachment_url($thumbnail, 'full');
$imageSrc = aq_resize($imageUrl, 1280,  false, true, true);

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post__item'); ?>>
  <header class="post__header module-spacing--after">
    <div class="wrapper--inner">
      <h2 class="post-subtitle">Case Study</h2>
      <?php the_title('<h1 class="post__title page-title--post">', '</h1>'); ?>
    </div>
  </header>
  <div class="wrapper--inner post__content-wrapper">

    <div class="post__main">
      <div class="post__img">
        <a href="<?php the_permalink(); ?>">
          <img src="<?php echo $imageSrc; ?>" alt="">
        </a>
      </div>
      <div class="post__content entry-content">
        <?php the_content(); ?>
      </div>
    </div>

    <?php get_template_part('template-parts/casestudies/casestudies-sidebar'); ?>
  </div>
</article><!-- #post-<?php the_ID(); ?> -->
