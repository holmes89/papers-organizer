import Route from '@ember/routing/route';

export default class PapersRoute extends Route {
  model() {
    return this.store.findAll('paper');
  }
}
