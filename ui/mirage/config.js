export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced

  this.get('/papers')
  this.get('/papers/:id')
  this.post('papers/')
  this.patch('papers/:id')
}
