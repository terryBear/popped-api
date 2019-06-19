var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp('postgres://postgres:R00T@admin@localhost:5432/centbee');

/* LIST MOVIES */
router.get('/', (req, res, next) => {
  var sql = 'SELECT * FROM public.movies;';
  db.any(sql).then( (data) => res.send(data) ).catch( (error) => {
    console.log(error);
    res.send(error.message)
  } );
});

/* GET MOVIE BY ID */
router.get('/:id', (req, res, next) => {
  var params = req.params.id;
  var sql = `SELECT id, title, language, image, restriction, created, updated, description FROM public.movies WHERE id = ${params};`
  db.any(sql).then( (data) => res.send(data) ).catch( (error) => {
    console.log(error);
    res.send(error.message)
  } );
});

/* CREATE MOVIE */
router.post('/', (req, res, next) => {
  var p = req.body;
  var sql = `INSERT INTO public.movies(id, title, language, image, restriction, created, updated, description) VALUES (DEFAULT, '${p.title}', '${p.language}', '${p.image}', '${p.restriction}', 'now()', 'now()', '${p.description}');`;
  db.any(sql).then( (data) => res.send(data) ).catch( (error) => res.send(error.message) );
});

/* UPDATE MOVIE BY ID */
router.put('/:id', (req, res, next) => {
  var p = req.body;
  var i = req.params.id;
  var sql = `UPDATE public.movies SET id=${i}, title='${p.title}', language='${p.language}', image='${p.image}', restriction='${p.restriction}', updated='now()', description='${p.description}' WHERE id=${i}`;
  db.any(sql).then( (data) => res.send(data) ).catch( (error) => res.send(error.message) );
});

/* DELETE MOVIE BY ID */
router.delete('/:id', (req, res, next) => {
  var i = req.params.id;
  var sql = `DELETE FROM public.movies WHERE id=${i};`;
  db.any(sql).then( (data) => res.send(data) ).catch( (error) => res.send(error.message) );
});

/* SEARCH A MOVIE TITLE */
router.post('/:search', (req, res, next) => {
  var p = req.params.search;
  var sql = `SELECT id, title, language, image, restriction, created, updated, description FROM public.movies WHERE title LIKE '%${p}%' OR language  LIKE '%${p}%' OR image LIKE '%${p}%' OR restriction LIKE '%${p}%' OR description LIKE '%${p}%';`;
  db.any(sql).then( (data) => res.send(data) ).catch( (error) => res.send(error.message) );
});

module.exports = router;
