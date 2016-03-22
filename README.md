# grunt-validate-json-locales

> Validate locales files in JSON format with a Grunt task.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-validate-json-locales --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-validate-json-locales');
```

## The "validateJsonLocales" task

### Overview
In your project's Gruntfile, add a section named `validateJsonLocales` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  validateJsonLocales: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options
allowMissingKeys: false,
      allowedMissingKeys: [],
      allowEmptyTranslations: false,
      allowedEmptyTranslations: [],
      treatAsEmptyRegExp: null,
      validateSameKeys: true


#### options.allowMissingKeys
Type: `Boolean`
Default value: `false`

Whether missing keys are allowed in locales files or not.  
This flag enables the `allowedMissingKeys` option.

#### options.allowedMissingKeys
Type: `Array`
Default value: `[]`

An array of allowed missing keys. If one of the key in the array matches a missing key in the files it will not be considered as missing.  
Example:  
locale_en.json
```json
{
  "hello": "Hello",
  "goodbye": "Goodbye"
}
```

locale_fr.json
```json
{
  "hello": "Bonjour"
}
```

with `allowedMissingKeys = ['goodbye']` will pass validation.

#### options.allowEmptyTranslations
Type: `Boolean`
Default value: `false`

Whether empty translations are allowed or not.
This flag enables the `allowedEmptyTranslations` and `treatAsEmptyRegExp` options.

#### options.allowedEmptyTranslations
Type: `Array`
Default value: `[]`

An array of allowed empty translation keys.
Example:  
```json
{
  "hello": "Bonjour",
  "goodbye": ""
}
```

with `allowedEmptyTranslations = ['goodbye']` will pass validation.

#### options.treatAsEmptyRegExp
Type: `String`
Default value: `null`

A RegExp pattern that can be interpreted by `new RegExp(treatAsEmptyRegExp)`.
If the pattern matches a translation value (`pattern.test(value) === true`), it will be treated as an empty translation.
Example:  
```json
{
  "hello": "Hello",
  "goodbye": "_MISSING_"
}
```

with `treatAsEmptyRegExp = '^_.+_$'`, the *goodbye* translation will be treated as empty.  

#### options.validateSameKeys
Type: `Boolean`
Default value: `true`

Whether to compare locale files keys with each other or not.
When true the task will fail when files have different keys (missing keys).

### Recommended settings

#### Development

```js
grunt.initConfig({
  dev: {
    options: {
      allowMissingKeys: true,
      allowedMissingKeys: [],
      allowEmptyTranslations: true,
      allowedEmptyTranslations: [],
      treatAsEmptyRegExp: null, // or whatever you consider as empty.
      validateSameKeys: true
    },
    files: ['locales/*.json'],
  },
});
```

#### Production

```js
grunt.initConfig({
  dev: {
    options: {
      allowMissingKeys: false,
      allowedMissingKeys: [],
      allowEmptyTranslations: false,
      allowedEmptyTranslations: [],
      treatAsEmptyRegExp: null, // or whatever you consider as empty.
      validateSameKeys: true
    },
    files: ['locales/*.json'],
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

