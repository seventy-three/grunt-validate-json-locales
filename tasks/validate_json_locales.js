/*
 * grunt-validate-json-locales
 * https://github.com/seventy-three/grunt-validate-json-locales
 *
 * Copyright (c) 2016 Florian Sey
 * Licensed under the MIT license.
 */

'use strict';

var validateJsonLocales = require('validate-json-locales');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  function printReports(reports) {
    if (reports.length) {
      reports.forEach(function(report) {
        grunt.log.error(report.message);
      });
    }
  }

  grunt.registerMultiTask('validateJsonLocales', 'Validate locales files in JSON format with a Grunt task.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      allowMissingKeys: false,
      allowedMissingKeys: [],
      allowEmptyTranslations: false,
      allowedEmptyTranslations: [],
      treatAsEmptyRegExp: null,
      validateSameKeys: true
    });

    var allReports = [];

    // Iterate over all specified file groups.
    this.files.forEach(function(fileGroup) {
      
      var files = fileGroup.src;

      if (options.validateSameKeys) {
        var allowedMissingKeys = options.allowMissingKeys ? options.allowedMissingKeys : [];
        var reports = validateJsonLocales.checkMissingKeys(files, allowedMissingKeys);
        allReports = allReports.concat(reports);
      }

      if (!options.allowEmptyTranslations) {
        files.forEach(function (filepath) {
          grunt.verbose.writeln('Checking missing translations for', filepath);
          var parsedJSON = grunt.file.readJSON(filepath);
          
          var treatAsEmptyRegExp = options.treatAsEmptyRegExp === null ? null : new RegExp(options.treatAsEmptyRegExp);
          var allowedEmptyTranslations = options.allowedEmptyTranslations ? options.allowedEmptyTranslations : [];
          var reports = validateJsonLocales.checkEmptyTranslations(parsedJSON, treatAsEmptyRegExp, allowedEmptyTranslations);
          allReports = allReports.concat(reports);
        });
      }

    });

    printReports(allReports);

    return allReports.length === 0;
  });

};
