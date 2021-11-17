<?php

/**
 * Contact Form
 *
 * @package      sixheads
 **/
$title = get_field('form_title');
$intro = get_field('form_intro');
?>

<div class="contact-form module-spacing--before">
  <div class="wrapper--narrow">
    <h2 class="section-title"><?php echo $title; ?></h2>
    <p class="contact-form__intro"><?php echo $intro; ?></p>

    <div id="form--contact">
      <?php gravity_form(1, false, false, false, '', true, 12); ?>
    </div>
  </div>
</div>
