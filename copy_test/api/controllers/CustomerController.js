/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

	'new': function(req,res)
	{	
		res.view();
	},

	create: function(req,res,next)
	{
		Customer.create( req.params.all(), function customerCreated(err,customer) 
		{
			// body...
			if(err)
			{
				console.log(err);
				req.session.flash={
					err: err
				}

				return res.redirect('customer/new');
			}
			else{
				req.session.authenticated=true;
				req.session.Customer=customer;
				res.redirect('/customer/show/'+customer.id);
			}
		});
	},

	show: function(req,res,next){
		
		Customer.findOne(req.param('id'),function foundUser (err,customer) {

			if (err) return next(err);
			if (!customer) return next('User doesn\'t exit.');

			Role.find(function(err,roles)
				{
					if(err) return next(err);
					res.view({
						roles:roles,
						customer:customer
					});
				});
		});
	},

	index: function(req,res,next){

		Customer.find(function(err,customers)
		{
			if(err) return next(err);
			res.view({
				customers:customers
			});
		});
	},

	edit: function(req,res,next){

		Customer.findOne(req.param('id'),function foundUser (err,customer) {

			if (err) return next(err);
			if (!customer) return next();
			Role.find(function(err,roles)
				{
					if(err) return next(err);
					res.view({
						roles:roles,
						customer:customer
					});
				});
		});
	},

	update: function(req,res,next){

			Customer.update(req.param('id'),req.params.all(),function customerUpdated(err,customer){


				console.log(req.param('role'));
				if(err) {
					return res.redirect('/customer/edit/'+req.param('id'));
				} 
				if(req.session.Customer.name==req.param('name')&&req.param('role')=='User'){
				req.session.Customer.role='User';
				}
				res.redirect('/customer/show/'+req.param('id'));
			});
	},

	destroy: function(req,res,next){

			Customer.findOne(req.param('id'),function foundUser (err,customer) {

			if (err) return next(err);
			if (!customer) return next('User doesn\'t exit.');

			Customer.destroy(req.param('id'),function userDestroyed (err,customer) {

			if (err) return next(err);
		});
			res.redirect('/customer');
		});
	}
}

