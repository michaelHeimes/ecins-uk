<?php

/**
 * Rich Text module
 *
 * @package sixheads
 **/

$content = get_sub_field('rich_text');
$spacing = get_sub_field('spacing');

?>

<div class="rich-text entry-content module-spacing--<?php echo $spacing; ?>">
  <div class="wrapper--narrow">
    <?php echo $content; ?>
  </div>
</div>
