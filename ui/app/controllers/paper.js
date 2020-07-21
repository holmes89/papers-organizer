import Controller from '@ember/controller';
import { htmlSafe } from '@ember/template';
import Ember from 'ember';


export default class PaperController extends Controller {
  pdfUrl = htmlSafe(this.get('model.url')) + '#pagemode=thumbs&amp;navpanes=0&amp;toolbar=0&amp;statusbar=0&amp;view=FitV'
}
