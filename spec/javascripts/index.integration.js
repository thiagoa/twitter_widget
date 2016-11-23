import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const context = require.context('.', true, /integration\/.+\.spec\.js$/);

context.keys().forEach(context);

module.exports = context;
