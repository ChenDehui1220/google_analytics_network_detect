/**
 * 
 */

/* global $ */

'use strict';

$(function() {

	$('li').each(function() {
		var a = $(this).find('a');
		var debugUrl = a.attr('href');

		$.getJSON(debugUrl, function(e) {
			console.log(e);
			console.log(e.hitParsingResult);
			if (e.hitParsingResult !== undefined) {
					if (e.hitParsingResult[0].valid) {
						a.append('    <font color="green">(valid)</font>');
					} else {
						a.append('    <font color="red">(invalid)</font>');
					}
			}
		});
	});
});