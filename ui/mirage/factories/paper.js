import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  displayName() {
    return faker.commerce.productName();
  },
  url() {
    return 'https://download.clojure.org/papers/clojure-hopl-iv-final.pdf';
  },
  source() {
    return faker.internet.url();
  },
  tags() {
    return [faker.commerce.productAdjective()];
  },
  lastOpened() {
    return faker.date.recent();
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  }
});
