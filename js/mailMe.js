$("document").ready(function() {
		
	$("#submit").on("click", function() {
		
		// get values
		var name = $("#name").val();
		var email = $("#email").val();
		var message = $("#message").val();
		var antiSpam = $("#human").val();
		
		var validName, validEmail, validMessage, human;
		
		// validate entries
		if (name.trim() === "") {
			$("#name_validation").html("This field is required!").css("display", "block");
			validName = false;
		} else {
			$("#name_validation").css("display", "none");
			validName = true;
		}
		
		if (email.trim() === "") {
			$("#email_validation").html("This field is required.").css("display", "block");
			validEmail = false;
		} else if (email.trim() !== "" && !$.email_validation(email)) {
			$("#email_validation").html("Something is wrong with your email address!").css("display", "block");
			validEmail = false;
		} else {
			$("#email_validation").css("display", "none");
			validEmail = true;
		}
		
		if (message.trim() === "") {
			$("#message_validation").html("You cannot send empty message!").css("display", "block");
			validMessage = false;
		} else {
			$("#message_validation").css("display", "none");
			validMessage = true;
		}
		
		if (antiSpam !== "13") {
			$("#antiSpam_validation").html("You are not a human!").css("display", "block");
			human = false;
		} else {
			$("#antiSpam_validation").css("display", "none");
			human = true;
		}
		
		if (validEmail && validName && validMessage && human) {
			
			// send json
			$.ajax ({
				type: "POST",
				url: "../mailMe.php",
				data: {
					name: $("#name").val(),
					email: $("#email").val(),
					body: $("#message").val(),
				},
				dataType: "json",
				success: function(response) {
					console.log("usao");
					var message = "Hi " + response.name + ". Your message was sent. I will contact you as soon as possible.";
					$("#afterSubmit").html(message);
					$("#afterSubmit").css("display", "block");
					$("#name, #email, #message, #human").val("");
				},
				error: function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);
					var message = "Hi, Your message could not be sent and received.";
					$("#afterSubmit").html(message);
 				}
				
			});	
		}

	});	
	
	$.email_validation = function(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}	
	
			
});