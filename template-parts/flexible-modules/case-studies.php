<?php

/**
 * Case Studies module
 *
 * @package sixheads
 **/
$title = get_sub_field('section_title');
$spacing = get_sub_field('spacing');
?>


<?php

// fix for Uninitialized string offset: 0
// $posts = get_field('relationship_field_name');
// if( $posts ):

if (get_sub_field('case_studies')) : $posts = get_sub_field('case_studies'); ?>
  <div class="case-studies module-spacing--<?php echo $spacing; ?>">
    <div class="wrapper--inner">
      <h2 class="section-title"><?php echo $title; ?></h2>

      <div class="posts__list">
        <?php foreach ($posts as $post) : // variable must be called $post (IMPORTANT)
        ?>
        <?php setup_postdata($post);

          get_template_part('template-parts/content', get_post_type());

        endforeach; ?>
      </div>
    </div>
  </div>
  <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly
  ?>
<?php endif; ?>
