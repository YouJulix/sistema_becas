<<<<<<< HEAD
$(document).ready(function() {
	$('select').material_select();
});

$(document).ready(function(){
	$('ul.tabs').tabs();
});
=======

	$(document).ready(function() {
		$('select').material_select();
	});


	  $(document).ready(function(){
	    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	    $('.modal').modal();
	  });

	$('.dropdown-button').dropdown({
		  inDuration: 300,
		  outDuration: 225,
		  constrainWidth: false, // Does not change width of dropdown to that of the activator
		  //hover: true, // Activate on hover
		  gutter: 0, // Spacing from edge
		  belowOrigin: false, // Displays dropdown below the button
		  alignment: 'left', // Displays dropdown with edge aligned to the left of button
		  stopPropagation: false // Stops event propagation
	}
	);
>>>>>>> a54891f7a97107888d60ff73f57c3f3e8bffafa9
