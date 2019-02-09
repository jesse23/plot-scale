/**
 * Test module
 */

// Module
import * as Module from '../src/app.js';
import * as assert from 'assert';

// Suite
describe('Module', function () {
  
  // Test
  it('has getter for event name', function () {
    assert.equal(Module.getEventName(), '_test');
  });
});
