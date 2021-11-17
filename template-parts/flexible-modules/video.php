<?php

/**
 * Video module
 *
 * @package sixheads
 **/
$video = get_sub_field('video_embed');
$spacing = get_sub_field('spacing');
?>


<div class="video module-spacing--<?php echo $spacing; ?>">
  <div class="wrapper--narrow">
    <div class="embed-container">
      <?php echo $video; ?>
    </div>
  </div>
</div>
