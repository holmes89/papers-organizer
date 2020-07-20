/* globals expect it */
const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const paperRoutes = require('../routes/paper');
const Paper = require('../models/paper');


/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('paper ', () => {

  it('should be able to fetch all papers', async done => {
    const newPapers = [new Paper({
      displayName: 'test',
      url: 'url',
      source: 'source',
      tags: ['tag'],
      notes: [{ page: 1, content: "content"}]
    }), new Paper({
      displayName: 'test again',
      url: 'url',
      source: 'source',
      tags: ['tag'],
      notes: [{ page: 1, content: "content"}]
    }) ];

    for (newPaper of newPapers){
        await newPaper.save()
    }
    const res = await request.get('/papers/')

    expect(res.status).toEqual(200)
    expect(res.body.data).toHaveLength(2)

    done()
  })

  it('should be able to get a paper', async done => {
    const newPaper = new Paper({
      displayName: 'test',
      url: 'url',
      source: 'source',
      tags: ['tag'],
      notes: [{ page: 1, content: "content"}]
     });
    let paper = await newPaper.save()
    const res = await request.get('/papers/'+paper.id)

    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(paper.id)
    expect(res.body.data.attributes.displayName).toEqual('test')

    done()
  })

  it('should be able to create paper', async done => {
    const res = await request.post('/papers/')
      .send({
        data: {
          type: 'papers',
          attributes: {
            displayName: 'something',
            url: 'asdfasd',
            source: 'asbase',
            tags: ['another'],
            notes: [{ page: 1, content: "content"}]
          }
        }
      })
    expect(res.status).toEqual(201)
    expect(res.body.data.id).toBeTruthy()
    expect(res.body.data.type).toEqual('papers')
    expect(res.body.data.attributes).toBeTruthy()
    done()
  })

  it('should be able to update a paper', async done => {
    const newPaper = new Paper({
      displayName: 'test',
      url: 'url',
      source: 'source',
      tags: ['tag'],
      notes: [{ page: 1, content: "content"}]
     });
    let paper = await newPaper.save()
    const res = await request.patch('/papers/'+paper.id)
      .send({
        data: {
          type: 'papers',
          attributes: {
            displayName: 'changed',
          }
        }
      })

    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(paper.id)
    expect(res.body.data.attributes.displayName).toEqual('changed')

    let verification = await Paper.findById(paper.id)
    expect(verification.displayName).toEqual('changed')
    done()
  })

})
