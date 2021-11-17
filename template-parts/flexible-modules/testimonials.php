<?php

/**
 * Testimonials module
 *
 * @package sixheads
 **/
$showTestimonials = get_sub_field('show_testimonials');
$spacing = get_sub_field('spacing');
?>

<?php
if ($showTestimonials) { ?>
  <div class="testimonials module-spacing--<?php echo $spacing; ?>">
    <?php get_template_part('template-parts/testimonials/testimonial-content'); ?>
  </div>
<?php } ?>
