<?php

/**
 * Video Banner module
 *
 * @package      sixheads
 **/

// $video = 'https://res.cloudinary.com/sixheads/video/upload/v1614059844/ecins-video_tyqxiq.mp4';
$video = get_sub_field('video_link');
$poster = get_sub_field('video_poster');
?>

<div class="video-bg">
  <video src="<?php echo $video; ?>" playsinline muted loop autoplay poster="<?php echo $poster; ?>"></video>
  <div class="wrapper video-banner__container">
    <div class="video-banner__btns">
      <?php get_template_part('template-parts/demo-or-ebook/demo-ebook-cta'); ?>
    </div>
  </div>
</div>
