<?php

/**
 * Page Intro module
 *
 * @package      sixheads
 **/

$intro = get_sub_field('page_intro');
$spacing = get_sub_field('spacing');
?>

<div class="page-intro wrapper--inner module-spacing--<?php echo $spacing; ?>">
  <?php echo $intro; ?>
</div>
