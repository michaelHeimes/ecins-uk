<?php

/**
 * Template part for displaying offcanvas navigation on mobile.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package sixheads
 */

?>

<nav id="site-navigation--mob" class="main-navigation--mob pushy pushy-right" data-focus=".menu-toggle--close">
  <div class="pushy-content">
    <button id="nav-toggle--close" class="menu-btn menu-toggle menu-toggle--close">
      <span class="screen-reader-text">Close</span>
      <svg class="icon icon__close">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>

    <?php
    wp_nav_menu(array(
      'theme_location' => 'mobile',
      'menu_id'        => 'primary-menu--mob',
      'menu_class'     => 'primary-menu--mob',
      'container'       => false
    ));
    ?>

    <div class="offcanvas-search">
      <?php get_search_form(); ?>
    </div>

    <div class="offcanvas-cta">
      <?php get_template_part('template-parts/navigation/client-login'); ?>
      <?php get_template_part('template-parts/demo-or-ebook/demo-ebook-cta'); ?>
    </div>
  </div>
</nav><!-- #site-navigation -->
