import Model, { attr } from '@ember-data/model';

export default class PaperModel extends Model {
  @attr('string') displayName;
  @attr('string') url;
  @attr('string') source;
  @attr tags;
  @attr notes;
  @attr('date') lastOpened;
  @attr('date') createdAt;
  @attr('date') updatedAt;
}
