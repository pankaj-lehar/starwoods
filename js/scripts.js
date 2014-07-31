$(function() {
	$('#cardsCarousel').carousel({
		interval: 10000
	})

	$('#cardsCarousel').on('slid.bs.carousel', function() {
		//alert("slid");
	});

	/* Financing calculator */
	$('#loandetail-form').submit(function(){
		amt = parseFloat($('#loan-amount').val());
		rate = parseFloat($('#interest-rate').val());
		months = parseInt($('#months').val());
		if(amt > 0 && rate > 0 && months > 0) {
			var r = ( rate * .01 ) / 12;
			var price = ( amt * r ) / ( 1 - ( 1 / (EXP( 1 + r, months ) ) ) );
	        $('.payment-info span').html('$ ' + price.toFixed(2));
	    }
		return false;
	});

	function EXP(a,b) {
	    var t = 1;
	    for(x = 1; x <= b; x++) { 
	        t = t * a;
	    }
	    ret = t;
	    return(t);
	}
});