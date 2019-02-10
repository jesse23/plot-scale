/**
 * Test module
 */

// Module
import * as App from '../src/app.js';
import * as assert from 'assert';

// Suite
describe('Basic Mapping Requirement', function () {
  
    // Test
    it('Example Test', function () {
        assert.equal(App.getEventName(), '_test');
    });
});
