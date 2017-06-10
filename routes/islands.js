/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	if (req.session.login) {
		const islandCollection = db.collection('islands');
		islandCollection.find({}, {}).toArray(function(err, islands) {
			res.locals.data = req.session.data;
			res.locals.islands = islands;

			res.render('islands/index');
		});
	} else {
		res.redirect('/account/login');
	}
});

router.get('/create', function(req, res) {
	if (req.session.login) {
		const userCollection = db.collection('users');
		userCollection.find({}, {}).toArray(function(err, users) {
			res.locals.data = req.session.data;
			res.locals.users = users;

			res.render('islands/create');
		});
	} else {
		res.redirect('/account/login');
	}
});

router.post('/create', function(req, res) {
	const islandCollection = db.collection('islands');
	const name = req.body.name;
	const description = req.body.description;
	const senior = req.body.senior;
	const juniors = req.body.juniors;

	const islandData = {
		name: name,
		description: description,
		senior: senior,
		juniors: [juniors]
	};
	islandCollection.save(islandData, (err, result) => {
		if (err) return console.log(err);
		res.redirect('/islands');
	});
});

router.get('/edit/:id', function(req, res) {
	const islandName = req.params.id;
	const islandCollection = db.collection('islands');
	const userCollection = db.collection('users');

	islandCollection.findOne({
		name: islandName
	}, function(err, island) {
		if (err) return console.log(err);

		userCollection.find({}, {}).toArray(function(err, users) {
			// add property of selected to array of users
			island.juniors.forEach(function(junior) {
				users.map(function(user) {
					if (user.username == junior && user.type !== "senior") {
						user.selected = true;
					} else if (user.selected !== true) {
						user.selected = false;
					}
				});
			});

			// add property of selected to senior that is selected
			users.map(function(user) {
				if (user.username === island.senior) {
					user.selected = true;
				}
			});
			island.users = users;
			res.locals.island = island;
			res.render('islands/edit');
		});
	});
});

router.post('/edit/:id', function(req, res) {
	const islandName = req.params.id;
	const islandCollection = db.collection('islands');
	const name = req.body.name;
	const description = req.body.description;
	const senior = req.body.senior;
	const juniors = req.body.juniors;

	const updateData = {
		name: name,
		description: description,
		senior: senior,
		juniors: juniors
	};

	islandCollection.findOne({
		name: islandName
	}, function(err, island) {
		islandCollection.updateOne(island, {
			$set: updateData
		}, (error, result) => {
			if (err) return console.log(err);
			res.redirect('/islands');
		});
	});
});

module.exports = router;
