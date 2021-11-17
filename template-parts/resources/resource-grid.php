<?php

$resource_types = get_terms( 'resource-type', array(
	'hide_empty' => true,
) );

$get_types = array();

foreach ( $resource_types as $type ) {
	$get_types[] = $type->term_id;
}

$get_resources = new WP_Query( array(
	'post_type'      => array( 'resource' ),
	'posts_per_page' => -1,
	'tax_query'      => array(
		array(
			'taxonomy' => 'resource-type',
			'terms'    => $get_types,
			'field'    => 'term_id',
			'operator' => 'IN',
		),
	),
) );

$sorted_resources = [];

if ( $get_resources->have_posts() ) {
	while ( $get_resources->have_posts() ) {
		$get_resources->the_post();

		foreach ( $resource_types as $type ) {
			if ( has_term( $type->term_id, 'resource-type', get_the_ID() ) ) {
				if ( ! array_key_exists( $type->name, $sorted_resources ) ) {
					$sorted_resources[ $type->name ] = array();
				}

				$sorted_resources[ $type->name ][] = $post;
			}
		}
	}

	wp_reset_postdata();
}

$resource_grid_classes = array( 'content-grid' );

if ( is_front_page() || is_home() ) {
	$resource_grid_classes[] = 'front-page';
}
?>
<div class="<?php echo implode( ' ', $resource_grid_classes ); ?>">
	<div class="content-grid--inner">
		<div class="content-grid--filters-toggle">
			<button type="button" class="btn secondary">Filter Resources</button>
		</div>
		<div class="content-grid--filters">
			<div class="filter-box resource-type" data-filter="resource-type">
				<div class="filter-title">Filter</div>
				<div class="filter-values">
					<?php foreach ( $resource_types as $type ) { ?>
						<div class="filter-checkbox">
							<input type="checkbox" value="<?php echo $type->term_id; ?>" id="filter-resource-type-<?php echo $type->slug; ?>">
							<label for="filter-resource-type-<?php echo $type->slug; ?>">
								<?php echo $type->name; ?>
							</label>
						</div>
					<?php } ?>

				</div>
			</div>
		</div>
		<div class="content-grid--results">
			<?php foreach ( $sorted_resources as $tax_name => $resources ) { ?>
				<div class="results">
					<div class="results--title">
						<?php echo $tax_name; ?>
					</div>

					<?php
						
					$default_cover_image = get_field('resources_default_cover_image', 'option');
					
						
					foreach ( $resources as $resource ) {
						$permalink      = get_the_permalink( $resource->ID );
						$thumbnail_id   = $default_cover_image; // default thumbnail image.
						$resource_title = get_field( 'hero_title', $resource->ID );
						$excerpt        = strip_tags( $resource->post_content );
						$gated_form     = get_field('resource_gravity_form', $resource->ID);
						$embedded_form     = get_field('embedded_form', $resource->ID);
						
						if (get_field('resource_file', $resource->ID) && !$gated_form) {
							$resource_file = get_field('resource_file', $resource->ID);
							$permalink     = $resource_file ? wp_get_attachment_url($resource_file) : '#';
						}

						if (get_field('resource_file', $resource->ID) && get_field('embedded_form', $resource->ID) ) {
							$resource_file = get_field('resource_file', $resource->ID);
							$permalink      = get_the_permalink( $resource->ID );							
						}

						if (get_field('resource_cover_image', $resource->ID)) {
							$thumbnail_id = get_field('resource_cover_image', $resource->ID);
						}						


						if ( has_post_thumbnail( $resource->ID ) ) {
							$thumbnail_id = get_post_thumbnail_id( $resource->ID );
						}

						if ( empty( $resource_title ) ) {
							$resource_title = get_the_title( $resource->ID );
						}

						if ( strlen( $excerpt ) > 150 ) {
							$excerpt = trim( substr( $excerpt, 0, 150 ) ) . '...';
						}
						
						
						?>
						<a href="<?php echo $permalink; ?>" class="content-card">
							<div class="content-card--box">
								<div class="content-card--image">
									<?php echo wp_get_attachment_image( $thumbnail_id, 'resource_card', false, array( 'alt' => $resource_title ) ); ?>
								</div>
								<div class="content-card--title">
									<?php echo $resource_title; ?>
								</div>
								<?php /*
								<div class="content-card--desc">
									<?php echo wpautop( $excerpt ); ?>
								</div>
								*/ ?>
								<div class="content-card--link">
									<span>Read More</span>
								</div>
							</div>
						</a>

					<?php } ?>

				</div>
			<?php } ?>
		</div>

		<?php
		/*
		/**
		 * Fix Pagination with $GLOBALS['wp_query'] = {custom_query}
		 *
		 * @see get_the_posts_pagination use $GLOBALS['wp_query']
		 * https://developer.wordpress.org/reference/functions/get_the_posts_pagination/#source-code
		 *
		 * /
		$_wp_query = $GLOBALS[ 'wp_query' ];
		$GLOBALS[ 'wp_query' ] = $the_posts;

		the_posts_pagination();

		$GLOBALS[ 'wp_query' ] = $_wp_query;
		unset( $_wp_query );
		*/
		?>
	</div>
</div>