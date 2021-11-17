<?php

/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package sixheads
 */

$thumbnail = get_post_thumbnail_id();
$imageUrl = wp_get_attachment_url($thumbnail, 'full');
$imageSrc = aq_resize($imageUrl, 640, 440,  true, true, true);

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('posts__item'); ?>>
	<div class="posts__img">
		<a href="<?php the_permalink(); ?>">
			<?php if ($imageSrc) : ?>
				<img src="<?php echo $imageSrc; ?>" alt="<?php the_title(); ?>">
			<?php else : ?>
				<img src="<?php bloginfo('template_directory'); ?>/img/fallback-img.png" alt="<?php the_title(); ?>">
			<?php endif; ?>
		</a>
	</div>
	<div class=" posts__content">
		<?php the_title('<h2 class="posts__title heading"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>'); ?>
		<?php the_excerpt(); ?>
	</div><!-- .posts__content -->
</article><!-- #post-<?php the_ID(); ?> -->
