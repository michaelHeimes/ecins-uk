<?php

/**
 * CTA module
 *
 * @package sixheads
 **/
$title = get_sub_field('cta_title');
$button = get_sub_field('cta_button');
$link = get_sub_field('cta_link');
$spacing = get_sub_field('spacing');
?>
<div class="cta module-spacing--<?php echo $spacing; ?>">
  <div class="wrapper--inner">
    <p class="cta__title"><?php echo esc_html($title); ?></p>
    <p class="cta__btn"><a class="btn" href="<?php echo esc_url($link); ?>"><?php echo esc_html($button); ?></a></p>
  </div>
</div>
