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
			var errorEle = $("#formError");
			var invalidFields = [];
			var valid = true;

			// perform any validation resets here...
			name.css("background-color", "#fff");
			email.css("background-color", "#fff");
			subject.css("background-color", "#fff");
			message.css("background-color", "#fff");
			errorEle.css("display", "none");

			if (name.val() === "") {
				// the name is empty, do things to tell the user here
				name.css("background-color", "#faa");
				invalidFields.push("Name");
				// mark this form submission as not valid.
				valid = false;
			}

			if (!validateEmail(email.val())) {
				// the email is invalid, do things to tell the user here
				email.css("background-color", "#faa");
				invalidFields.push("Email");

				// mark this form submission as not valid.
				valid = false;
			}

			if (subject.val() === "") {
				// the subject is empty, do things to tell the user here
				subject.css("background-color", "#faa");
				invalidFields.push("Subject");

				// mark this form submission as not valid.
				valid = false;
			}

			if (message.val() === "") {
				// the message is empty, do things to tell the user here
				message.css("background-color", "#faa");
				invalidFields.push("Message");

				// mark this form submission as not valid.
				valid = false;
			}

			if (valid) {
				// all validations passed. Get and send the form.
				console.log("email sent!");

				var emailForm = $("#emailForm");
				// actually send the email.
				emailForm.submit();

				// reset the form
				name.val("");
				email.val("");
				subject.val("Hi there!");
				message.val("");

				// show the email sent modal.
				$("#myModal").modal();

				// close the modal after 2 seconds.
				setTimeout(function(){
					$("#myModal .modal-header button").click();
				}, 3000);
			} else {
				// The form is not valid.
				errorEle.css("display", "block");
				errorEle.text("The following fields are invalid: "+invalidFields.join(", "));
			}
		});
	}

});