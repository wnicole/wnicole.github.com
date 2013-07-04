$(function() {
	
	// util functions
	function validateEmail(email) { 
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	} 
	
	
	var ele = $("#sticker");
	var screenWidth = $(document).width();
	if (ele.length > 0 && screenWidth > 767) {
		// if we found the element and the screen is wide enough
		ele.sticky({topSpacing: 60});
	}
	
	ele = $("#sendEmailBtn");
	if (ele.length > 0) {
		ele.click(function(){
			// this function will run when the send email button is clicked
			
			// get the required fields to check if they are valid.
			var name = $("#nameInput");
			var email = $("#emailInput");
			var subject = $("#subjectInput");
			var message = $("#messageInput");
			var valid = true;
			
			// perform any validation resets here...
			// $("#invalidName").hide();
			
			if (name.val() === "") {
				// the name is empty, do things to tell the user here
				// $("#invalidName").show();
				console.log("The name is missing!");
				
				// mark this form submission as not valid.
				valid = false;
			}
			
			if (email.val() === "") {
				// the email is empty, do things to tell the user here
				console.log("The email is missing!");
				
				// mark this form submission as not valid.
				valid = false;
			}
			
			if (!validateEmail(email.val())) {
				// the email is invalid, do things to tell the user here
				console.log("The email is invalid!");

				// mark this form submission as not valid.
				valid = false;
			}
			
			if (subject.val() === "") {
				// the subject is empty, do things to tell the user here
				console.log("The subject is missing!");
				
				// mark this form submission as not valid.
				valid = false;
			}
			
			if (message.val() === "") {
				// the message is empty, do things to tell the user here
				console.log("The message is missing!");
				
				// mark this form submission as not valid.
				valid = false;
			}
			
			if (valid) {			
				// all validations passed. Get and send the form.
				console.log("email sent!");
				
				// hide the form and show the thank you message.
				var emailForm = $("#emailForm");
				// actually send the email.
				//emailForm.submit();
				
				// reset the form
				name.val("");
				email.val("");
				subject.val("Hi there!");
				message.val("");
				
				// show the email sent modal.
				$("#myModal").modal();
			}
		});
	}
	
});