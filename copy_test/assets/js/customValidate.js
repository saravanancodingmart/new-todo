$(document).ready(function(){
	$('#form-signup').validate({
	rules:
	{
		name:
		{
			required:true
		},
		email:
		{
			required:true,
			email:true
		},
		password:
		{
			required: true,
			minlength: 6
		},
		confirmation:{
			required: true,
			equalTo:'#npassword',
			minlength:6	
		}

	},		
	success: function(element)	
	{
			element.text('OK!').addClass('valid')
	}
	});	
});