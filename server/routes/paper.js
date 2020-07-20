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
router.get('/', async (req, res, next) => {
  try {
    let papers = await Paper.find()
    var jsonapi = Serializer.serialize(papers.map( p => p.transform()));
    res.send(jsonapi)
  } catch(e){
    console.log(e)
    res.status(500).send(internalError)
  }
});

/* GET single paper. */
router.get('/:id', async (req, res, next) => {
  try{
    let paper = await Paper.findById(req.params.id)
    if (!paper) {
      return res.status(404).send( new JSONAPIError({
                code: '404',
                title: 'Paper not found',
                detail: 'paper with id does not exist'
      }));
    }
    var jsonapi = Serializer.serialize(paper.transform());
    res.send(jsonapi)
  } catch(e) {
    console.log(e)
    res.status(500).send(internalError)
  }
});

/* POST single paper. */
router.post('/', async (req, res, next) => {
  try {
    let paper = await Deserializer.deserialize(req.body)
    paper = await Paper.create(paper)
    var jsonapi = Serializer.serialize(paper.transform());
    return res.status(201).send(jsonapi)
  } catch(e) {
    console.log(e)
    res.status(500).send(internalError)
  }
});

/* Update single paper. */
router.patch('/:id', async (req, res, next) => {
  try{
    let paper = await Deserializer.deserialize(req.body)
    let now = new Date();
    let updateValues = { "$set": {
      displayName: paper.displayName,
      url: paper.url,
      source: paper.source,
      tags: paper.tags,
      notes: paper.notes,
      updatedAt: now.getTime()
    }}
    paper = await Paper.findByIdAndUpdate(req.params.id, updateValues, {new: true})
    var jsonapi = Serializer.serialize(paper.transform());
    return res.send(jsonapi)
  } catch (err) {
      console.log(err)
      res.status(500).send(internalError)
  }
});

module.exports = router;
