<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package sixheads
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">

<script src='//eu.fw-cdn.com/10069955/50057.js' chat='false'></script>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php get_template_part('template-parts/content', 'sprites'); ?>

	<?php get_template_part('template-parts/navigation/nav-offcanvas'); ?>

	<div class="site-overlay"></div>

	<div id="container">
		<div id="page" class="site">
			<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e('Skip to content', 'sixheads'); ?></a>

			<div class="header-utilities">
				
				<nav>
					<ul class="menu country-nav">
						<li><a href="javascript:;"><span>UK</span><img class="flag" src="<?php echo get_template_directory_uri(); ?>/img/GB-United-Kingdom-Flag-icon.png" /></a></li>
						<li><a href="<?php echo home_url(); ?>/us/?domain=us"><span>US</span><img class="flag" src="<?php echo get_template_directory_uri(); ?>/img/usa.png" /></a></li>
						<li><a href="<?php echo home_url(); ?>/us/?domain=au"><span>AU</span><img class="flag" src="<?php echo get_template_directory_uri(); ?>/img/AU-Australia-Flag-icon.png" /></a></li>
					</ul>
				</nav>
				
				<?php get_template_part('template-parts/search/search-header'); ?>
				<?php get_template_part('template-parts/navigation/client-login'); ?>
			</div>

			<header id="masthead" class="site-header wrapper--outer">
				<div class="site-branding">
					<?php
					if (is_front_page() && is_home()) :
					?>
						<a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
							<h1 class="site-title"><?php bloginfo('name'); ?></h1>
						</a>
					<?php
					else :
					?>
						<a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
							<p class="site-title"><?php bloginfo('name'); ?></p>
						</a>
					<?php endif; ?>
				</div><!-- .site-branding -->

				<button id="nav-toggle--open" class="menu-btn menu-toggle menu-toggle--open">
					<span class="screen-reader-text">Menu</span>
					<svg class="icon icon__menu">
						<use xlink:href="#icon-menu"></use>
					</svg>
				</button>

				<nav id="site-navigation" class="main-navigation">
					<div class="menu-primary-container">
						<?php
						wp_nav_menu(array(
							'theme_location' => 'primary',
							'menu_id'        => 'primary-menu',
							'container'			 => false,
						));
						?>
					</div>
				</nav><!-- #site-navigation -->
			</header><!-- #masthead -->

			<div id="content" class="site-content">
