'use strict';

var assert = require('assert');
var path = require('path');
var exec = require('child_process').exec;
var execOptions = {
  cwd: path.join(__dirname, '..')
};

describe('Default options', function () {

  function checkTaskOutput(taskName, expected, done) {
    exec('grunt ' + taskName, execOptions, function(error, stdout) {
      assert.equal(
        stdout.indexOf(expected) > -1,
        true
      );
      done();
    });
  }

  var noErrors = 'Done, without errors.';

  it('should execute without errors', function (done) {
    checkTaskOutput('validateJsonLocales:default_options', noErrors, done);
  });

  it('should fail because a translation is empty', function (done) {
    checkTaskOutput('validateJsonLocales:default_options_empty_translation', 'Key [common.goodbye]', done);
  });

  it('should fail because a translation is missing', function (done) {
    checkTaskOutput('validateJsonLocales:default_options_missing_translation', 'Missing key: common.goodbye', done);
  });

  it('should execute without errors: missing key allowed', function (done) {
    checkTaskOutput('validateJsonLocales:allow_missing', noErrors, done);
  });

  it('should execute without errors: empty key allowed', function (done) {
    checkTaskOutput('validateJsonLocales:allow_empty', noErrors, done);
  });

  it('should execute without errors: no validation', function (done) {
    checkTaskOutput('validateJsonLocales:no_validate_same_keys', noErrors, done);
  });

  it('should fail because a translation is treated as empty', function (done) {
    checkTaskOutput('validateJsonLocales:treat_as_empty', 'Key [common.goodbye] is treated as empty value', done);
  });

});
