/*
 * grunt-validate-json-locales
 * https://github.com/seventy-three/grunt-validate-json-locales
 *
 * Copyright (c) 2016 Florian Sey
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    validateJsonLocales: {
      default_options: {
        src: [
          'test/fixtures/ok/en.json', 
          'test/fixtures/ok/fr.json'
        ]
      },
      default_options_empty_translation: {
        src: [
          'test/fixtures/empty/en.json', 
          'test/fixtures/empty/fr.json'
        ]
      },
      default_options_missing_translation: {
        src: [
          'test/fixtures/missing/en.json', 
          'test/fixtures/missing/fr.json'
        ]
      },
      allow_missing: {
        options: {
          allowMissingKeys: true,
          allowedMissingKeys: ['goodbye']
        },
        src: [
          'test/fixtures/missing/en.json', 
          'test/fixtures/missing/fr.json'
        ]
      },
      allow_empty: {
        options: {
          allowEmptyTranslations: true,
          allowedEmptyTranslations: ['goodbye']
        },
        src: [
          'test/fixtures/empty/en.json', 
          'test/fixtures/empty/fr.json'
        ]
      },
      no_validate_same_keys: {
        options: {
          validateSameKeys: false
        },
        src: [
          'test/fixtures/missing/en.json', 
          'test/fixtures/missing/fr.json'
        ]
      },
      treat_as_empty: {
        options: {
          treatAsEmptyRegExp: '^_.+_$'
        },
        src: [
          'test/fixtures/emptyre/en.json', 
          'test/fixtures/emptyre/fr.json'
        ]
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

};
