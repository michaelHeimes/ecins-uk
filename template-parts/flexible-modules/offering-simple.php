<?php

/**
 * Offering Simple (icons) module
 *
 * @package sixheads
 **/
$title = get_sub_field('section_title');
$spacing = get_sub_field('spacing');
$background = get_sub_field('background');
?>

<?php if (have_rows('offerings')) : ?>
  <div class="offering-simple module-spacing--<?php echo $spacing; ?> offering__bg--<?php echo $background; ?>">
    <div class="wrapper--inner">
      <?php if ($title) : ?>
        <h2 class="section-title offering-simple__title"><?php echo $title; ?></h2>
      <?php endif; ?>
      <ul class="offering-simple__list">
        <?php while (have_rows('offerings')) : the_row(); ?>
          <li class="offering-simple__item">
            <svg class="icon icon__offerings">
              <use xlink:href="#icon-<?php the_sub_field('icon'); ?>"></use>
            </svg>
            <h3><?php the_sub_field('title'); ?></h3>
          </li>
        <?php endwhile; ?>
      </ul>
    </div>
  </div>
<?php endif; ?>
