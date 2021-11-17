<?php

/**
 * Template part for displaying single case study content
 *
 * @package sixheads
 */

$thumbnail = get_post_thumbnail_id();
$imageUrl = wp_get_attachment_url($thumbnail, 'full');
$imageSrc = aq_resize($imageUrl, 1280,  false, true, true);

$resource_gravity_form                     = get_field('resource_gravity_form');
$resource_gravity_form_display_title       = get_field('resource_gravity_form_display_title');
$resource_gravity_form_display_description = get_field('resource_gravity_form_display_description');
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post__item'); ?>>
  <header class="post__header module-spacing--after">
    <div class="wrapper--inner">
      <?php the_title('<h1 class="post__title page-title--post">', '</h1>'); ?>
    </div>
  </header>
  <div class="wrapper--inner post__content-wrapper">

    <div class="post__main">
	    
	    <?php if ($resource_gravity_form):
		    
		    	the_content();
		    
				gravity_form(
					$resource_gravity_form,
					$resource_gravity_form_display_title,
					$resource_gravity_form_display_description,
					false, // display inactive
					null, // field values
					false, // ajax
					0, // tab index
					true // echo
				);
			
		else:?>
	    
	    
		      <div class="post__img">
		        <a href="<?php the_permalink(); ?>">
		          <img src="<?php echo $imageSrc; ?>" alt="">
		        </a>
		      </div>
		      <div class="post__content entry-content">
		        <?php the_content(); ?>
		      </div>
		    </div>
		    
		<?php endif;?>

    <?php get_template_part('template-parts/casestudies/casestudies-sidebar'); ?>
  </div>
</article><!-- #post-<?php the_ID(); ?> -->
