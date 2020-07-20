const express = require('express');
const router = express.Router();
const logger = require('morgan');
const Paper = require('../models/paper')

let Serializer = require('../serializers/paper')
let JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const JSONAPIError = require('jsonapi-serializer').Error;

const Deserializer = new JSONAPIDeserializer({keyForAttribute: 'camelCase'})

const internalError = new JSONAPIError({
          code: '500',
          title: 'Internal Error',
          detail: 'I need to change this'
})

/* GET papers listing. */
router.get('/', (req, res, next) => {
  Paper.find().then((papers) => {
      var jsonapi = Serializer.serialize(papers.map( p => p.transform()));
      res.send(jsonapi)
  }).catch( e => res.status(500).send(internalError))
});

/* GET single paper. */
router.get('/:id', (req, res, next) => {
  Paper.findById(req.params.id).then((paper) => {
      if (!paper) {
        return res.status(404).send( new JSONAPIError({
                  code: '404',
                  title: 'Paper not found',
                  detail: 'paper with id does not exist'
        }));
      }
      var jsonapi = Serializer.serialize(paper.transform());
      res.send(jsonapi)
  }).catch( e => {
    console.log(e)
    res.status(500).send(internalError)
  })
});

/* POST single paper. */
router.post('/', (req, res, next) => {
  try{
    Deserializer.deserialize(req.body, async (err, paper) => {
      if (err) {
        console.log(err)
        throw new Error("unable to parse request")
      }
      Paper.create(paper, (err, p) => {
        if (err) {
          console.log("insert error")
          console.log(err)
          return res.status(500).send(internalError)
        }
        var jsonapi = Serializer.serialize(p.transform());
        return res.status(201).send(jsonapi)
      })
    }).catch( e => {
      console.log("serialize error")
      console.log(err)
      res.status(500).send(internalError)})
  } catch (err) {
    console.log("global error")
    console.log(err)
    res.status(500).send(internalError)
  }
});

/* Update single paper. */
router.patch('/:id', (req, res, next) => {
  try{
    Deserializer.deserialize(req.body, async (err, paper) => {
      if (err) {
        console.log(err)
        throw new Error("unable to parse request")
      }
      let now = new Date();
      let updateValues = { "$set": {
        displayName: paper.displayName,
        url: paper.url,
        source: paper.source,
        tags: paper.tags,
        notes: paper.notes,
        updatedAt: now.getTime()
      }}
      Paper.findByIdAndUpdate(req.params.id, updateValues, {new: true}, (err, p) => {
        if (err) {
          console.log("insert error")
          console.log(err)
          return res.status(500).send(internalError)
        }
        var jsonapi = Serializer.serialize(p.transform());
        return res.status(201).send(jsonapi)
      })
    }).catch( e => {
      console.log("serialize error")
      console.log(err)
      res.status(500).send(internalError)})
  } catch (err) {
    console.log("global error")
    console.log(err)
    res.status(500).send(internalError)
  }
});

module.exports = router;
