<?php

/**
 * Client Login button
 *
 * @package      sixheads
 **/

?>

<?php if (get_field('client_login_button', 'option')) : ?>
  <div class="client-login">
    <a class="btn btn--green client-login__btn" href="<?php esc_url(the_field('client_login_button', 'option')); ?>" target="_blank" rel="noopener nofollow">Login</a>
  </div>
<?php endif; ?>
