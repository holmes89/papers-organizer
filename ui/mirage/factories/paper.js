import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  displayName() {
    return faker.commerce.productName();
  },
  url() {
    return faker.internet.url();
  },
  source() {
    return faker.internet.url();
  },
  tags() {
    return [faker.commerce.productAdjective()];
  },
  createdAt() {
    return faker.date.recent();
  },
  updatedAt() {
    return faker.date.recent();
  }
});
