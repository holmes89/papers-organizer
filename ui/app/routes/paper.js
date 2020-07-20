import Route from '@ember/routing/route';

export default class PaperRoute extends Route {
  model(params) {
    return this.store.findRecord('paper', params.paper_id);
  }
}
