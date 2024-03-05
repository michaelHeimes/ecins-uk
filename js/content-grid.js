jQuery( function ( $ ) {

	// -----------------------------------------------------------------------------
	//! Toggle filters display on mobile
	// -----------------------------------------------------------------------------

	$( '.content-grid--filters-toggle button' ).on( 'click', function() {
		$( this ).toggleClass( 'is-active' );
		$( '.content-grid--filters' ).slideToggle();
	} );

	// -----------------------------------------------------------------------------
	//! Reset on load
	// -----------------------------------------------------------------------------

	$( '.filter-box input' ).prop( 'checked', false );

	// -----------------------------------------------------------------------------
	//! REST API Controller
	// -----------------------------------------------------------------------------

	function ContentGrid() {
		this.state = {
			type: 'content',
			tax_queries: [],
			init: false,
			paused: false
		};

		/*
		*	INIT
		*/
		this.init = function( args = {} ) {
			var self = this;

			this.state = Object.assign( this.state, args );

			// Bind checkboxes
			this.watchForChanges();
			
			// Check for hash and trigger click on corresponding checkbox
			this.checkHashAndClick();
			
			// Watch for nav click and filter 
			this.navClickHashAndClick();

			// Get initial posts
			// this.getPosts();
		};
		
		
		/*
		 *	Check for hash and trigger click on corresponding checkbox
		 */
		this.checkHashAndClick = function () {
			var self = this;
		
			// Check if the page URL has a hash
			if (window.location.hash) {
				var hashValue = window.location.hash.substr(1); // Remove the '#' from the hash
		
				// Scroll to the element with the specified ID
				var targetElement = document.getElementById('resource-grid');
				
				console.log($(targetElement).offset().top);
						
				// if (targetElement) {
				// 	$('html, body').animate({
				// 		scrollTop: $(targetElement).offset().top
				// 	}, 750);
				// }
		
				$('.filter-box').each(function () {
					$(this).find('input').each(function () {
						var dataType = $(this).data('type');
		
						// Check if the data-type value matches the hash
						if (dataType === hashValue) {
							// Update the URL hash without triggering a page reload
							window.location.href = window.location.href.split('#')[0] + '#' + hashValue;
		
							// Trigger a click on the matched input
							$(this).click();
						}
					});
				});
			}
		};
		
		/*
		 * Check for hash and trigger click on corresponding checkbox and link
		 */
		this.navClickHashAndClick = function () {
			var self = this;
		
			$( '#site-navigation a' ).each( function() {
				$(this).on('click', function() {

					var hashValue = this.hash.substr(1); // Remove the '#' from the hash
					// Find the matching input
					var matchingInput = $('.filter-box input[data-type="' + hashValue + '"]');					
		
					if (matchingInput.length > 0) {
						// Trigger a click on the matched input
						matchingInput.prop('checked', true).trigger('change');
		
						// Scroll to the element with the specified ID
						var targetElement = document.getElementById('resource-grid');
		
						if (targetElement) {
							$('html, body').animate({
								scrollTop: $(targetElement).offset().top
							}, 750);
						}
					}
				});
			});
		};


		/*
		 *	WATCH CHECKBOXES FOR CHANGES
		 */
		this.watchForChanges = function() {
			var self = this;

			// Reset state
			self.state.tax_queries = [];

			$( '.filter-box' ).each( function() {
				$( '.filter-box input' ).on( 'change', function() {
					// var isChecked = $( this ).is( ':checked' ),
					// 	tax       = $( this ).parents( '.filter-box' ).attr( 'data-filter' ),
					// 	id        = $( this ).val();

					// if ( isChecked ) {
					// 	self.state.tax_queries.push( {
					// 		taxonomy: tax,
					// 		term_id: id
					// 	} );
					// }

					// Get posts if not paused
					if ( !self.state.paused ) {
						self.getPosts();
					}
				} );
			} );
		};

		/*
		 *	UPDATE CHECKBOXES
		 */
		this.updateCheckboxes = function() {
			var self = this;

			// Reset state
			self.state.tax_queries = [];

			$( '.filter-box' ).each( function() {
				$( this ).find( 'input' ).each( function() {
					var isChecked = $( this ).is( ':checked' ),
						tax       = $( this ).parents( '.filter-box' ).attr( 'data-filter' ),
						id        = $( this ).val();

					if ( isChecked ) {
						self.state.tax_queries.push( {
							taxonomy: tax,
							term_id: id
						} );
					}
				} );
			} );
		};

		/*
		 *	GET POSTS
		 */
		this.getPosts = function() {
			this.updateCheckboxes();
			
			var self = this,
				url  = localized.siteUrl + '/wp-json/ecins/v2/' + this.state.type,
				args = {
					// per_page: this.state.per_page,
					// orderby: this.state.orderby,
					// order: this.state.order,
					// search: this.state.search,
					// page: this.state.page,
					tax_queries: this.state.tax_queries
				};
				
			// Freeze the grid
			$( '.content-grid--results' ).addClass( 'is-loading' );

			self.state.paused = true;

			// Get posts
			$.get( url, args ).done( function ( data ) {

				data = JSON.parse( data );
				self.state.totalPosts = data.meta.total;
				self.state.totalPages = data.meta.pages;

				self.displayPosts( data.data );
			} );

		};

		/*
		 *	DISPLAY POSTS
		 */
		this.displayPosts = function ( posts ) {
			var self    = this,
				results = '';

			Object.keys( posts ).forEach( ( key ) => {
				var result = '<div class="results"><div class="results--title">' + posts[ key ].title + '</div>';

				Object.keys( posts[ key ] ).forEach( ( k ) => {
					if ( k !== 'title' ) {
						result += ''
							+ ( posts[ key ][ k ].link
								? '<a href="' + posts[ key ][ k ].link + '"'
									+ ( posts[ key ][ k ].target ? ' target="' + posts[ key ][ k ].target + '"' : '' )
									+ ' class="content-card">'
								: '<span class="content-card">' )
								+ '<div class="content-card--box">'
									+ '<div class="content-card--image"><img src="' + posts[ key ][ k ].image + '"></div>'
									+ '<div class="content-card--title">' + posts[ key ][ k ].title + '</div>'
									+ ( posts[ key ][ k ].desc
										? '<div class="content-card--desc">' + posts[ key ][ k ].desc + '</div>'
										: ''
									)
									+ ( posts[ key ][ k ].link
										? '<div class="content-card--link"><span>See More</span></div>'
										: ''
									)
								+ '</div>'
							+ ( posts[ key ][ k ].link
								? '</a>'
								: '</span>'
							);
					}
				} );

				results += result + '</div>';
			} );

			$( '.content-grid--results' ).html( results ).removeClass( 'is-loading' );

			// unpaused grid
			self.state.paused = false;
		};
	}

	if ( $( '.content-grid' ).length ) {
		var args = {};

		if ( $( 'body' ).hasClass( 'page-partners' ) ) {
			args.type = 'partners';
		}
		
		if ( $( 'body' ).hasClass( 'post-type-archive-resource' ) ) {
			args.type = 'resources';
		}

		if ( $( 'body' ).hasClass( 'page-press' ) ) {
			args.type = 'press';
		}

		var Grid = new ContentGrid();
		Grid.init( args );
	}

} );