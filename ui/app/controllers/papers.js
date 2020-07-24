import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PapersController extends Controller {
  modalActive = false;
  displayName;
  source;

  @action
  toggleModal() {
    this.toggleProperty('modalActive');
  }

  @action
  addPaper() {
    this.store.createRecord('paper', {
      displayName: this.displayName,
      source: this.source,
      url: this.source
    }).save();
    this.set('displayName', '');
    this.set('source', '');
    this.toggleProperty('modalActive');
  }
}
