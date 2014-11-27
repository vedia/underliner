/* *******************************

-- Usage --

$(anchor-element).underliner({
	
});

-- Values --


******************************* */

"use strict";
(function($) {
	var bl_underliner = {
		family: new Array(),
		init: function(family, rp) {
			var underliner = family.parameters;
			underliner.duration = parseInt(underliner.duration) >= 0 ? parseInt(underliner.duration) : 200;

			var counter = 0;
			family.element.each(function() {
				if(this.tagName == "A" && $(this).css('display') == 'inline') {
					var $this = $(this);
					var wrapperId = 'underliner-wrapper-' + family.id + '-' + counter++;
					$this.wrap('<span id="' + wrapperId + '" class="underliner-wrapper"></span>');
					var $wrapper = $('#' + wrapperId);
					
					$wrapper.append('<span class="underliner-mask">apologies geological</span>');
					$wrapper.append('<span class="underliner-copier"></span>');
					
					$wrapper.css({
						'font' : $this.css('font'),
						'line-height' : $this.css('line-height'),
						'letter-spacing' : $this.css('letter-spacing'),
						'word-spacing' : $this.css('word-spacing')
					});
					var lineTop = parseInt($wrapper.css('font-size'));
					var lineHeight = parseInt($wrapper.css('line-height'));
					if(lineHeight) {
						lineTop += (lineHeight - lineTop * 1.15) / 2;
					}

					if(underliner.show === true) $('#' + wrapperId + ' .underliner-copier').css({
						'width' : '100%'
					});

					$('#' + wrapperId + ' .underliner-copier').css({
						'background-color' : underliner.color ? underliner.color : $this.css('color'),
						'top' : lineTop + 'px',
						'right' : underliner.direction == 'left' ? 'auto' : 0,
						'left' : underliner.direction == 'right' ? 'auto' : 0,
					});

					setTimeout(function() {
						$('#' + wrapperId + ' .underliner-copier').css({
							'transition' : 'width ' + underliner.duration + 'ms',
							'-webkit-transition' : 'width ' + underliner.duration + 'ms',
							'-o-transition' : 'width ' + underliner.duration + 'ms',
							'-moz-transition' : 'width ' + underliner.duration + 'ms',
							'-ms-transition' : 'width ' + underliner.duration + 'ms'
						});
					}, 100);
	
					var mask = $('#' + wrapperId + ' .underliner-mask')[0];
					var bgc = '#ffffff';
					var dummy = $this.css('background-color');
					var use = dummy.split(')')[0].split(',').length == 4 ? (parseInt(dummy.split(')')[0].split(',')[3]) > 0 ? 1 : 0) : 1;
					if(use) {
						bgc = dummy;
					} else {
						var dummyEl = mask.parentNode;
						while(dummyEl) {
							try {
								dummy = $(dummyEl).css('background-color');
							} catch(e) {
								break;
							}
							
							use = dummy.split(')')[0].split(',').length == 4 ? (parseInt(dummy.split(')')[0].split(',')[3]) > 0 ? 1 : 0) : 1;
							if(use) {
								bgc = dummy;
								break;
							}
							if(dummyEl == dummyEl.parentNode) break;
							dummyEl = dummyEl.parentNode;
						}
					}

					$(mask).css('text-shadow', '.05em 0 0 ' + bgc + ', .1em 0 0 ' + bgc + ', .15em 0 0 ' + bgc + ', -.05em 0 0 ' + bgc + ', -.1em 0 0 ' + bgc + ', -.15em 0 0 ' + bgc);

					$this.addClass('underliner-link');
				}
			});
		}
	}
	
	/* Functions */

	/* End: Functions */
	
	/* Plug-in Start */
	$.fn.underliner = function(parameters) {
		var id = -1;
		var refreshParameters = false;
		for(var i = 0; i < bl_underliner.family.length; i++) {
			var dummy = true;
			for(var x in this) if(this[x] != bl_underliner.family[i].element[x]) dummy = false;
			if(dummy) {
				id = i;
				refreshParameters = true;
				break;
			}
		}
		if(id < 0) {
			bl_underliner.family.push(new Object);
			id = bl_underliner.family.length - 1;
		}

		var prm = $.extend({
			color: '',
			direction: 'center',
			duration: null,
			show: false
		}, parameters);

		bl_underliner.family[id] = {
			id: id,
			element: this,
			parameters: prm
		}
		bl_underliner.init(bl_underliner.family[id], refreshParameters);
	}
	/* End: Plug-in Start */

	/* underliner terminate */
	$.fn.underlinerTerminate = function() {

	}
	/* End: underliner terminate */
})(jQuery);
