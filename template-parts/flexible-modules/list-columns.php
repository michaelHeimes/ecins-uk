<?php

/**
 * List Columns module
 *
 * @package sixheads
 **/
$title = get_sub_field('list_columns_title');
$intro = get_sub_field('list_columns_intro');
$listPrimary = get_sub_field('list_primary');
$listSecondary = get_sub_field('list_secondary');
$spacing = get_sub_field('spacing');
$listStyle = get_sub_field('list_style');
?>
<div class="list-columns module-spacing--<?php echo $spacing; ?>">
  <div class="wrapper">
    <?php if (!empty($title)) : ?>
      <h2 class="list-columns__title section-title"><?php echo esc_html($title); ?></h2>
    <?php endif; ?>
    <?php if (!empty($intro)) : ?>
      <p class="list-columns__intro"><?php echo esc_html($intro); ?></p>
    <?php endif; ?>

    <div class="list-columns__cols">
      <div class="list-columns__list list-columns__style--<?php echo $listStyle; ?>">
        <?php echo $listPrimary; ?>
      </div>
      <div class="list-columns__list list-columns__style--<?php echo $listStyle; ?>">
        <?php echo $listSecondary; ?>
      </div>
    </div>
  </div>
</div>
