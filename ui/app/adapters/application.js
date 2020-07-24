import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'ui/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host= ENV.apiEndpoint;
  namespace = "api";
}
