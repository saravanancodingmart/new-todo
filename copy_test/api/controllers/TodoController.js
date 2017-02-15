/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new : function(req,res)
	{
			Todo.find(function(err,todos)
				{

					if(err) return next(err);
					res.view({
						todos:todos,
					});
				});
	},

	create: function(req,res,next)
	{
		Todo.create( req.params.all(), function todoCreated(err,todo) 
		{

			console.log(todo);
			// body...
			if(!err)
			{
				req.session.todo=todo;
				return res.redirect('todo/new');
			}
		});
	},

	update: function(req,res,next){
			Todo.findOne(req.param('id'),function foundTodo (err,todo) {
				if (err) return next(err);
				if (!todo) return next('User doesn\'t exit.');
			Todo.update(req.param('id'),req.params.all(),function todoUpdated(err){
				if (err) return next(err);
			});
			res.redirect('/todo/new');	
			});mon
	},

	edit: function(req,res,next){

		Todo.findOne(req.param('id'),function foundTodo (err,todo) {

			if (err) return next(err);
			if (!todo) return next();
			res.view({
				todo:todo
			});
		});
	},

	destroy: function(req,res,next){

		Todo.findOne(req.param('id'),function foundTodo (err,todo) {

			if (err) return next(err);
			if (!todo) return next('User doesn\'t exit.');

		Todo.destroy(req.param('id'),function todoDestroyed (err,todo) {

			if (err) return next(err);
		});
			res.redirect('/todo/new');
		});
	}

};

