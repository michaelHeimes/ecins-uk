<?php

/**
 * Hero Slider module
 *
 * @package      sixheads
 **/

?>
<header class="hero-banner-slider">
	<div class="hb-slider">
	
	<?php if( have_rows('slides') ):?>
		<?php while ( have_rows('slides') ) : the_row();?>	
		
		<?php if( have_rows('single_slide') ):?>
			<?php while ( have_rows('single_slide') ) : the_row();?>	
			
			<div class="hero-banner bg-color-<?php the_sub_field('background_color');?>" style="background-color: <?php the_sub_field('background_color');?>;">
			
			  <div class="wrapper hero-banner__container">
				  <div class="inner">
				  		<div class="half left">
						    <?php if (get_sub_field('hero_copy')) : ?>
						      <div class="page-title hero-banner__title"><?php the_sub_field('hero_copy'); ?></div>
						    <?php else : ?>
						      <h1 class="page-title hero-banner__title"><?php the_title(); ?></h1>
						    <?php endif; ?>
				  		</div>
				  		
				  		<div class="half right">
					   <?php 
						$image = get_sub_field('hero_image');
						if( !empty( $image ) ): ?>
						    <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
						<?php endif; ?>
				  		</div>
					   
				  </div>
				  			    
			  </div>
			  
		    </div>
		
			<?php endwhile;?>
		<?php endif;?>
	
		<?php endwhile;?>
	<?php endif;?>
	
	</div>
	
	
	<?php if( is_front_page() ):?>
	<div class="wrapper hero-banner__container">
	    <div class="hero-banner__btns">
	      <?php get_template_part('template-parts/demo-or-ebook/demo-ebook-cta'); ?>
	    </div>
	</div>
    <?php endif;?>

</header>
