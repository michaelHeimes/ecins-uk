<?php

/**
 * Team module
 *
 * @package sixheads
 **/
$title = get_sub_field('title');
$spacing = get_sub_field('spacing');
?>

<?php if (have_rows('team_members')) : ?>
  <div class="team module-spacing--<?php echo $spacing; ?>">
    <div class="wrapper--inner">
      <?php if ($title) : ?>
        <h2 class="section-title team__title"><?php echo $title; ?></h2>
      <?php endif; ?>
      <?php while (have_rows('team_members')) : the_row();
        $name = get_sub_field('name');
        $position = get_sub_field('position');
        $linkedin = get_sub_field('linkedin');
        $bio = get_sub_field('bio');
        $image = get_sub_field('portrait');
        $imageAlt = $image['alt'];
        $imageUrl = aq_resize($image['url'], 680, 750, true, true, true);

      ?>
        <article class="team__item">
          <div class="team__img">
            <img src="<?php echo $imageUrl; ?>" alt="<?php echo $imageAlt; ?>">
          </div>
          <div class="team__content">
            <h3 class="heading team__name"><?php echo $name; ?></h3>
            <p class="team__position"><?php echo $position; ?></p>
            <p class="team__bio">
              <?php echo $bio; ?>
            </p>
            <?php if ($linkedin) : ?>
              <p class="team__linkedin">
                <a href="<?php echo $linkedin; ?>">
                  <svg class="icon icon_linkedin">
                    <use xlink:href="#icon-linkedin"></use>
                  </svg> LinkedIn</a>
              </p>
            <?php endif; ?>
          </div>
        </article>
      <?php endwhile; ?>
    </div>
  </div>
<?php endif; ?>
