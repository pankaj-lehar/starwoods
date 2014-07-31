$(function() {
  	$js_next_url = null;
  	addInstagramFeed(true);

  	function addInstagramFeed(first_time) {
		$.ajax({
	        url: '../starwood_motors/instagram.php',
	        type: "POST",
	        data: {"js_next_url": $js_next_url},
	        dataType: 'json',
	        success: function (data) {
	        	console.log(first_time);
	        	if (first_time) {
	        		html = '<div class="item active"><div class="row-fluid">';
	        	} else {
	        		html = '<div class="item"><div class="row-fluid">';
	        	}
	        	for(i=0; i<data.imgs.length; i++) {
	        		html += '<div class="col-xs-3">';
	        		html += data.imgs[i];
	        		html += '</div>';
	        	}
	        	html += '</div></div>';
	        	if (first_time) {
	        		$('.instagram-inner').append(html).hide().fadeIn(2000)
	        	} else {
	        		$('.instagram-inner').append(html);
	        	}
				$js_next_url = data.next_url;
				if ($js_next_url != null) {
  					addInstagramFeed(false);
				}
	        }
	    });
	    return;
  	}
});