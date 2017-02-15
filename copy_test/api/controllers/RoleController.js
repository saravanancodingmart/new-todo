/**
 * RoleController
 *
 * @description :: Server-side logic for managing Roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req,res)
	{	
		Role.find(function(err,roles)
				{

					if(err) return next(err);
					res.view({
						roles:roles,
					});
				});
	},

	'create': function(req,res,next)
	{
		Role.create( req.params.all(), function roleCreated(err,role) 
		{
			// body...
			if(err)
			{
				console.log(err);
				req.session.flash={
					err: err
				}
			}
			else{
				req.session.Role=role;
				res.redirect('/role/new/');
			}
		});
	},
};

