<?php

/**
 * Page Intro news
 *
 * @package      sixheads
 **/

$intro = get_field('page_intro_news', 'option');
?>

<div class="page-intro wrapper--inner module-spacing--both">
  <?php echo $intro; ?>
</div>
