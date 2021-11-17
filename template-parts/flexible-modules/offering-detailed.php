<?php

/**
 * Offering Detailed module
 *
 * @package sixheads
 **/
$spacing = get_sub_field('spacing');
?>

<?php if (have_rows('offerings')) : ?>
  <div class="offering-detailed module-spacing--<?php echo $spacing; ?>">
    <div class="wrapper--inner">
      <?php while (have_rows('offerings')) : the_row(); ?>
        <article class="offering-detailed__item">
          <svg class="icon icon__offerings">
            <use xlink:href="#icon-<?php the_sub_field('icon'); ?>"></use>
          </svg>
          <h3 class="heading"><?php the_sub_field('title'); ?></h3>
          <div class="offering-detailed__details">
            <?php the_sub_field('details'); ?>
          </div>
        </article>
      <?php endwhile; ?>
    </div>
  </div>
<?php endif; ?>
