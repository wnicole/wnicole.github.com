$(function() {

	// util functions
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function desaturate(img, amount, w, h) {
		var canvas = document.createElement("canvas");
		var width = w || img.width;
		var height = h || img.height;
		canvas.width = width;
		canvas.height = height;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		// pixelData becomes a huge array holding Uint8's.
		// There are 4 Uint8's per pixel (rgba) and all values are [0 - 255]
		var imageData = ctx.getImageData(0, 0, width, height);
		var pixelData = imageData.data;

		var idx;

		var getPixelIdx = function(x, y) {
			return (y * width + x) * 4;
		};

		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				idx = getPixelIdx(x, y);
				var r = pixelData[idx];
				var g = pixelData[idx + 1];
				var b = pixelData[idx + 2];

				var max = Math.max(r, g, b);
				var min = Math.max(r, g, b);
				var mid = (max + min) / 2;

				r += (mid - r) * amount;
				g += (mid - g) * amount;
				b += (mid - b) * amount;

				pixelData[idx] = r;
				pixelData[idx + 1] = g;
				pixelData[idx + 2] = b;
			}
		}

		ctx.putImageData(imageData, 0, 0);

		var newImg = new Image();
		newImg.className = "desaturated coverHide";
		newImg.src = canvas.toDataURL();
		return newImg;
	}

	$(window).load(function() {
		if ($(window).width() > 760 && document.body.style.webkitFilter === undefined) {
			var $coverImages = $(".coverImage");

			var processImage = function(idx) {
				var $curImage = $coverImages.eq(idx);
				if ($curImage.length > 0) {
					var $newImg = $(desaturate($curImage[0], 0.85, 500, 333));
					$newImg.insertBefore($curImage);

					setTimeout(function() {
						$newImg.removeClass("coverHide");
					}, 100);

					setTimeout(function() {
						processImage(idx + 1);
					}, 20);
				}
			};

			processImage(0);
		}
	});

	function debounce(fn, time) {
		var lastTimeout;
		return function() {
			if (lastTimeout) {
				clearTimeout(lastTimeout);
			}
			lastTimeout = setTimeout(fn, time);
		};
	}

	var stickerEle = $("#sticker");

	var isSticky = false;
	var handleSticky = function() {
		if ($(document).width() > 767) {
			if (!isSticky) {
				stickerEle.sticky({topSpacing: 60, bottomSpacing: 200});
				stickerEle.updateStick();
				isSticky = true;
			}

			stickerEle.css("max-width", 0.2292817679558011 * stickerEle.closest(".content").width() + "px");
		} else {
			stickerEle.unstick();
			isSticky = false;
			stickerEle.css("max-width", "100%");
		}
	};

	if (stickerEle.length > 0) {
		handleSticky();
		$(window).resize(debounce(handleSticky, 50));
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
