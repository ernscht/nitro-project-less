# Nitro Config

Since Version 2 nitro uses [node-config](https://www.npmjs.com/package/config) for project configuration. 

By default TODO...

## Assets Configuration

You can configure the include order of your assets by defining patterns in `config/default/assets.js`.

```js
const config = {
   assets: {
        'app.css': [
            '!assets/css/somefile.*',
            'assets/css/cssreset.css',
            'assets/css/*.*',
            'patterns/**/css/*.*',
            'patterns/**/css/modifier/*.*',
        ],
        'app.js': [
            '!assets/js/somefile.js',
            'assets/vendor/jquery/dist/jquery.min.js',
            'assets/vendor/terrific/dist/terrific.min.js',
            'assets/js/*.js',
            'patterns/**/js/*.js',
            'patterns/**/js/decorator/*.js',
        ],
   },
};
```

### Pattern

The matching patterns follow the standard node glob patterns.  
Glob patterns are similar to regular expression but simplified. They are used by several shells.  
You should always try to keep the patterns simple. Usually you only need the asterisks `*` `**` and the exclamation mark `!` for negation.

You can read more on the standard [node glob patterns](https://github.com/isaacs/node-glob#glob-primer).

### Special Pattern Prefixes

* You can negate a pattern by starting with an exclamation mark `!`.
  `!` = exclude pattern
* Define all your dependencies for the compiling-process with the `+` prefix
  `+` = exclude file but prepend it to every compile call for files with the same file extension.

The order of these special patterns does not matter.

### Examples

* `"!patterns/*/test*"`         Exclude all patterns starting with `test`
* `"!**/*-test.*"`              Exclude all filenames ending with `-test`.
* `"+assets/css/mixins.less"`   Exclude `assets/css/mixins.less` but prepend to every compile call of every .less file

### Other asset files

You can configure as many different assets as you wish.

```
    'brand.css': [
        'assets/css/reset.css',
        ...
```

## Code

### Compatibility

`code.compatibility.browserslist` (Array)

### Validation

`code.validation.eslint.live` (Boolean)

`code.validation.htmllint.live` (Boolean)

`code.validation.jsonSchema.live` (Boolean)

also logMissingSchemaAsError & logMissingSchemaAsWarning 

`code.validation.stylelint.live` (Boolean)

## Nitro

Under the node `nitro`, following properties could be configured:

### Patterns

`nitro.patterns`

### Mode

`nitro.mode.livereload`

`nitro.mode.minified`

`nitro.mode.offline`

### Watch

`watch.partials`

`watch.throttle.base`

`watch.throttle.cache`
