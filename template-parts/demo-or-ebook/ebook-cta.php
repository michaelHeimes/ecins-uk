<?php

/**
 * eBook CTA
 *
 * @package      sixheads
 **/

$title = get_field('request_ebook_title', 'option');
$content = get_field('request_ebook_intro', 'option');
$image = get_field('request_ebook_cover', 'option');
$imageAlt = $image['alt'];
$imageUrl = aq_resize($image['url'], 210, 295, true, true, true);
?>

<section id="request-ebook" class="ebook-cta module-spacing--none">
  <div class="wrapper--narrow ebook-cta--container">
    <div class="ebook-cta__img">
      <img src="<?php echo $imageUrl; ?>" alt="<?php echo $imageAlt; ?>">
    </div>
    <div class="ebook-cta__content">
      <h3 class="heading ebook-cta__heading"><?php echo $title; ?></h3>
      <?php echo $content; ?>
    </div>
    <div class="ebook-cta__form">
		<?php the_field('request_ebook_form_embed', 'option');?>	    
<!--       <?php gravity_form(4, false, false, false, '', true, 12); ?> -->
    </div>
  </div>
</section>
