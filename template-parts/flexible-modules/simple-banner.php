<?php

/**
 * Simple Banner module
 *
 * @package      sixheads
 **/

$title = get_sub_field('page_title');
$spacing = get_sub_field('spacing');
?>
<header class="simple-banner module-spacing--<?php echo $spacing; ?>">
  <div class="wrapper--narrow">
    <?php if ($title) : ?>
      <h1 class="page-title page-title--alt"><?php echo $title; ?></h1>
    <?php else : ?>
      <h1 class="page-title page-title--alt"><?php the_title(); ?></h1>
    <?php endif; ?>
  </div>
</header>
