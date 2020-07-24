import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';


export default class PaperController extends Controller {
  note;
  @alias ('model.notes') notes;

  @action
  addNote() {
    let id = this.get('model.id')
    this.store.findRecord('paper', id).then((paper)=> {
      this.notes.push(this.note)
      paper.set('notes', this.notes)
      paper.save()
      this.set('note', '');
    });
  }
}
