<?php

/**
 * Page Intro casestudies
 *
 * @package      sixheads
 **/

$intro = get_field('page_intro_casestudies', 'option');
?>

<div class="page-intro wrapper--inner module-spacing--both">
  <?php echo $intro; ?>
</div>
