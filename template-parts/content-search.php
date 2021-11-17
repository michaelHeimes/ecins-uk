<?php

/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package sixheads
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('search__item'); ?>>
	<?php the_title('<h2 class="search__title heading"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>'); ?>
	<?php the_excerpt(); ?>
</article><!-- #post-<?php the_ID(); ?> -->
