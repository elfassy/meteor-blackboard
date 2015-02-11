

Meteor.startup(function() {

	canvas = $('canvas');
		drawing = false;
		from = '';

	ctx = canvas[0].getContext('2d');
	
	canvas.attr({
		
		width: $(window).width(),
		height: $(window).height()
		
	}).hammer().on('dragstart', function(event) {
		
		drawing = true;
		from = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};
		
	}).on('dragend', function() {
		
		drawing = false;
		
	})
	

	function wipe(ctx) {
		ctx.fillRect(0, 0, canvas.width(), canvas.height());
	}
	
	ctx.strokeStyle = '#ffffff';
	ctx.fillStyle = '#000000';
	
	Meteor.autorun(function() {
		
		wipe(ctx);
		
		Lines.find().forEach(function(line) {
			drawLine(ctx, line.from, line.to);
		});
	});
	
	// Stop iOS from doing the bounce thing with the screen
	document.ontouchmove = function(event){
		event.preventDefault();
	}
});
