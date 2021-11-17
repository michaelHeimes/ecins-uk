<?php

/**
 * Template part for displaying social navigation.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package sixheads
 */

?>

<?php if (have_rows('socials', 'options')) : ?>
  <nav class="nav-socials">
    <ul>
      <?php while (have_rows('socials', 'options')) : the_row();
        $network = get_sub_field('socials_network');
        $value = $network['value'];
        $label = $network['label'];
        $url = get_sub_field('socials_link');
      ?>
        <li>
          <a href="<?php echo $url; ?>" target="_blank" rel="noopener nofollow">
            <span class="screen-reader-text"><?php echo $label; ?></span>
            <svg class="icon icon__<?php echo $value; ?>">
              <use xlink:href="#icon-<?php echo $value; ?>"></use>
            </svg>
          </a>
        </li>
      <?php endwhile; ?>
    </ul>
  </nav>
<?php endif; ?>
