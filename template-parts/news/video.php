<?php

/**
 * Video module news
 *
 * @package sixheads
 **/
$video = get_field('video_news', 'option');
?>

<?php if ($video) : ?>
  <div class="video module-spacing--both">
    <div class="wrapper--narrow">
      <div class="embed-container">
        <?php echo $video; ?>
      </div>
    </div>
  </div>
<?php endif; ?>
