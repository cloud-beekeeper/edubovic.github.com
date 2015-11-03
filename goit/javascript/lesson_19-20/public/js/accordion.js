$(document).ready(function() {
	var active = 'accordion__title_active';

	function close_accordion_section() {
		$('.accordion__title').removeClass(active);
		$('.accordion__content').slideUp(300).removeClass('open');
	}

	$('.accordion__title').click(function(e) {
		var target, currentAttrValue = $(this).attr('href');
		target = ($(e.target).is('span')) ? $(e.target).parent() : $(e.target);

		if(target.is('.'.concat(active))) {
			close_accordion_section();
		} else {
			close_accordion_section();
			$(this).addClass(active);
			$('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
		}

		e.preventDefault();
	});
});