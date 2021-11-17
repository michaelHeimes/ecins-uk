<?php

/**
 * Locations
 *
 * @package      sixheads
 **/

?>


<?php if (have_rows('locations', 'option')) : ?>
  <div class="offering-detailed module-spacing--both">
    <div class="wrapper--inner">
      <?php while (have_rows('locations', 'option')) : the_row(); ?>
        <article class="location__item">
          <div class="location__content">
            <h3 class="section-title location__title"><?php the_sub_field('location_title'); ?></h3>
            <p><?php the_sub_field('location_address'); ?></p>
            <p>Tel: <?php the_sub_field('location_telephone'); ?></p>

            <?php if (get_sub_field('location_additional_details')) : ?>
              <p class="location__additionals"><?php the_sub_field('location_additional_details'); ?></p>
            <?php endif; ?>
          </div>

          <?php
          $location = get_sub_field('location_map');
          if ($location) : ?>
            <div class="location__map">
              <div class="acf-map" data-zoom="16">
                <div class="marker" data-lat="<?php echo esc_attr($location['lat']); ?>" data-lng="<?php echo esc_attr($location['lng']); ?>"></div>
              </div>
            </div>

          <?php endif; ?>
        </article>

      <?php endwhile; ?>
    </div>
  </div>
  <?php get_template_part('template-parts/maps/google-map'); ?>
<?php endif; ?>
