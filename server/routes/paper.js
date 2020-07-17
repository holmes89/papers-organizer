var express = require('express');
var router = express.Router();
var logger = require('morgan');

let Serializer = require('../serializers/paper')
let JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var JSONAPIError = require('jsonapi-serializer').Error;

let Deserializer = new JSONAPIDeserializer()

/* GET papers listing. */
router.get('/', (req, res, next) => {
  let papers = [
    {
      id: "abc",
      displayName: "Paper 1",
      url: "some path",
      source: "another path",
      tags: ["awesome", "javascript"],
      notes: [
        {
          page: 1,
          content: "I made a note"
        },
        {
          page: 1,
          content: "I made another note"
        },
        {
          page: 2,
          content: "Second page note"
        }
      ]
    },
    {
      id: "def",
      displayName: "Paper 2",
      url: "some path",
      source: "another path",
      tags: ["awesome", "javascript"],
      notes: [
        {
          page: 1,
          content: "I made a note"
        },
        {
          page: 1,
          content: "I made another note"
        },
        {
          page: 2,
          content: "Second page note"
        }
      ]
    }
  ]
  var jsonapi = Serializer.serialize(papers);
  res.send(jsonapi);
});

/* GET single paper. */
router.get('/:id', (req, res, next) => {
  let paper =   {
      id: req.params["id"],
      displayName: "Paper 1",
      url: "some path",
      source: "another path",
      tags: ["awesome", "javascript"],
      notes: [
        {
          page: 1,
          content: "I made a note"
        },
        {
          page: 1,
          content: "I made another note"
        },
        {
          page: 2,
          content: "Second page note"
        }
      ]
    }
  var jsonapi = Serializer.serialize(paper);
  res.send(jsonapi);
});

/* POST single paper. */
router.post('/', (req, res, next) => {
  try{
    Deserializer.deserialize(req.body, async (err, paper) => {
      if (err) {
        console.log(err)
        throw new Error("unable to parse request")
      }
      paper.id = "abc"
      return paper
    }).then((entity) => {
      var jsonapi = Serializer.serialize(entity);
      res.status(201).send(jsonapi);
    }).catch( e => res.status(500).send(new JSONAPIError({
              code: '500',
              title: 'Internal Error',
              detail: 'I need to change this'
    })))
  } catch (err) {
    console.log(err)
    res.status(500).send(new JSONAPIError({
              code: '500',
              title: 'Internal Error',
              detail: 'I need to change this'}))
  }

});

/* POST single paper. */
router.patch('/:id', (req, res, next) => {
  const id = req.params['id']
  try{
    Deserializer.deserialize(req.body, async (err, paper) => {
      if (err) {
        console.log(err)
        throw new Error("unable to parse request")
      }
      paper.id = id
      return paper
    }).then((entity) => {
      var jsonapi = Serializer.serialize(entity);
      res.status(201).send(jsonapi);
    }).catch( e => res.status(500).send(new JSONAPIError({
              code: '500',
              title: 'Internal Error',
              detail: 'I need to change this'
    })))
  } catch (err) {
    console.log(err)
    res.status(500).send(new JSONAPIError({
              code: '500',
              title: 'Internal Error',
              detail: 'I need to change this'}))
  }
});

module.exports = router;
