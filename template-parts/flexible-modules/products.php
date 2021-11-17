<?php

/**
 * Products module
 *
 * @package      sixheads
 **/

$spacing = get_sub_field('spacing');

if (get_sub_field('products_show') == 'detailed') :

  if (have_rows('products_module', 'option')) : ?>
    <section class="wrapper module-spacing--<?php echo $spacing; ?>">
      <ul class="products-detailed">
        <?php while (have_rows('products_module', 'option')) : the_row(); ?>
          <li>
            <a href="<?php esc_url(the_sub_field('product_link')); ?>">
              <div class="products-detailed__btn products__btn--<?php the_sub_field('product_icon'); ?>">
                <svg class="icon icon__<?php the_sub_field('product_icon'); ?>">
                  <use xlink:href="#icon-<?php the_sub_field('product_icon'); ?>"></use>
                </svg>
                <p class="products-detailed__title">
                  <?php the_sub_field('product_title_short'); ?>
                </p>
              </div>
            </a>
            <p class="products-detailed__overview"><?php the_sub_field('product_overview'); ?></p>
            <p class="products-detailed__more"><a href="<?php esc_url(the_sub_field('product_link')); ?>"><?php esc_url(the_sub_field('product_link_text')); ?></a></p>
          </li>
        <?php endwhile; ?>
      </ul>
    </section>
  <?php endif;

else :

  if (have_rows('products_module', 'option')) : ?>
    <section class="wrapper--narrow">
      <ul class="products-simple">
        <?php while (have_rows('products_module', 'option')) : the_row(); ?>
          <li>
            <a href="<?php esc_url(the_sub_field('product_link')); ?>">
              <div class="products-simple__btn products__btn--<?php the_sub_field('product_icon'); ?>">
                <svg class="icon icon__<?php the_sub_field('product_icon'); ?>">
                  <use xlink:href="#icon-<?php the_sub_field('product_icon'); ?>"></use>
                </svg>
              </div>
              <p class="products-simple__title">
                <?php the_sub_field('product_title'); ?>
              </p>
            </a>
          </li>
        <?php endwhile; ?>
      </ul>
    </section>
<?php endif;
endif;
