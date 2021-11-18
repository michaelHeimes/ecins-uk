<?php

/**
 * Demo & Ebook CTA
 *
 * @package      sixheads
 **/

?>

<p class="request-demo">
  <a href="<?php bloginfo('url'); ?>/products/request-a-demo/" class="btn btn--alt request-demo">Request a demo</a>
</p>

<?php if(!is_front_page()):?>
<p class="request-ebook">
  <a href="#request-ebook" class="btn request-ebook">Download free e-book</a>
</p>
<?php endif;?>
