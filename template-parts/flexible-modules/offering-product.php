<?php

/**
 * Offering Product module
 *
 * @package sixheads
 **/
$spacing = get_sub_field('spacing');
?>

<?php if (have_rows('offerings')) : ?>
  <div class="offering-product module-spacing--<?php echo $spacing; ?>">
    <div class="wrapper--inner">
      <?php while (have_rows('offerings')) : the_row();
        $title = get_sub_field('title');
        $icon = get_sub_field('icon');
        $content = get_sub_field('details');
        $image = get_sub_field('image');
        $imageUrl = aq_resize($image['url'], 670, 510, true, true, true);
      ?>
        <article class="offering-product__item">
          <div class="offering-product__img">
            <img src="<?php echo $imageUrl; ?>" alt="">
          </div>

          <div class="offering-product__content">
            <div class="offering-product__header">
              <svg class="icon icon__offerings">
                <use xlink:href="#icon-<?php echo $icon; ?>"></use>
              </svg>
              <h3 class="heading"><?php echo $title; ?></h3>
            </div>
            <p class="offering-product__details">
              <?php echo $content; ?>
            </p>
          </div>
        </article>
      <?php endwhile; ?>
    </div>
  </div>
<?php endif; ?>
