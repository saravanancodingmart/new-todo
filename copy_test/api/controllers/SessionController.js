/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt= require('bcrypt');

module.exports = {
	
new : function(req,res){

	res.view('session/new');

},
create: function(req,res,next)
{

	if(!req.param('email') || !req.param('password')) {


		var usernamePasswordRequiredError =[{name: 'usernamePasswordRequired',message:'you must enter both username and password.'}]

		req.session.flash={
			err:usernamePasswordRequiredError
		}
		res.redirect('/session/new');
		return;
	}	

Customer.findOneByEmail(req.param('email'), function foundUser(err, customer){

	if (err) return next(customer);

	if(!customer){
		var noAccountError=[{name:'noAccount', message: 'The email address'+req.param('email')+'not found'}]
		req.session.flash={
			err:noAccountError
		}
		res.redirect('/session/new');
		return;
	}
	
bcrypt.compare(req.param('password'),customer.encryptedPassword,function(err,valid){
	if(err) return next(err);

	if(!valid)
	{
		var usernamePasswordMismatchError =[{name:'usernamePasswordMismatch',message:'Invalid Username and password combination.'}]
		req.session.flash={
			err:usernamePasswordMismatchError
		}
		res.redirect('/session/new');
		return;
	}

	req.session.authenticated=true;
	req.session.Customer=customer;
	res.redirect('todo/new/');
	});
});
},

	destroy: function(req,res,next){
		req.session.destroy();
		res.redirect('/');
	}




};

