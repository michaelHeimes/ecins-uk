<?php

/**
 * The template for displaying the simple footer
 *
 * Removes eBook and Subscribe form
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package sixheads
 */

?>

</div><!-- #content -->

<footer id="colophon" class="footer">
  <div class="wrapper--outer">
    <div class="footer-details">
      <div class="footer__branding">
        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
          <p class="footer__title"><?php bloginfo('name'); ?></p>
        </a>
        <p class="footer__tagline"><?php bloginfo('description'); ?></p>
      </div><!-- .site-branding -->

      <div class="footer__contacts">
        <?php if (have_rows('locations', 'option')) : ?>
          <?php while (have_rows('locations', 'option')) : the_row(); ?>
            <article class="footer__contacts--location">
              <h4><?php the_sub_field('location_title'); ?></h4>
              <p><?php the_sub_field('location_address'); ?></p>
            </article>
          <?php endwhile; ?>
        <?php endif; ?>
        <article class="footer__contacts--direct">
          <h4>Contact</h4>
          <p><a href="mailto:<?php the_field('general_email', 'option'); ?>">send us a message</a></p>
          <p><strong>T:</strong> <?php the_field('general_telephone', 'option'); ?></p>
        </article>
      </div>


    </div>
  </div>

  <div class="footer--secondary wrapper--outer">
    <p class="copyright">&copy; <?php echo date("Y"); ?> <?php bloginfo('name'); ?>. <?php if (get_field('copyright', 'option')) : ?><?php the_field('copyright', 'option'); ?><?php endif; ?>.</p>

    <nav class="footer-navigation">
      <?php
      wp_nav_menu(array(
        'theme_location' => 'footer',
        'menu_class'        => 'footer-menu',
        'container'       => false,
      ));
      ?>
    </nav><!-- .footer-navigation -->

    <div class="footer__social">
      <?php get_template_part('template-parts/navigation/nav-social'); ?>
    </div>
  </div>
</footer><!-- #colophon -->
</div><!-- #page -->
</div><!-- #container -->

<?php wp_footer(); ?>
</body>

</html>
