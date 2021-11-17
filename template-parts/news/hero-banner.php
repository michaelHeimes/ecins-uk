<?php

/**
 * Hero Banner
 *
 * @package      sixheads
 **/

$title = get_field('hero_title_news', 'option');
$image = get_field('hero_image_news', 'option');
$imageUrl = aq_resize($image['url'], 2000, 600, true, true, true);
?>
<header class="hero-banner" style="background-image: url(<?php echo $imageUrl; ?>);">
  <div class="wrapper hero-banner__container">
    <h1 class="page-title hero-banner__title"><?php echo $title; ?></h1>

    <div class="hero-banner__btns">
      <?php get_template_part('template-parts/demo-or-ebook/demo-ebook-cta'); ?>
    </div>
  </div>
</header>
