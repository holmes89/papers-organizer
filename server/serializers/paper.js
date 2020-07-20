'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('papers', {
  attributes: ['displayName', 'url', 'source', 'tags', 'notes', 'createdAt', 'updatedAt'],
  keyForAttribute: 'camelCase'
});
