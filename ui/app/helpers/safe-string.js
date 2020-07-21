import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function safeString(params/*, hash*/) {
  return htmlSafe(params);
});
