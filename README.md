# metalsmith-md [![Travis Build Status](https://travis-ci.org/MoOx/metalsmith-md.svg)](https://travis-ci.org/MoOx/metalsmith-md)

> Metalsmith plugin to transform markdown to html

This plugin do not rename `.md` files to `.html`.
Please use [metalsmith-rename](https://github.com/MoOx/metalsmith-rename) for this.

## Installation

```console
$ npm install metalsmith-md
```

## Usage

```js
import Metalsmith from "metalsmith"
import md from "metalsmith-md"

import marked from "marked"
import hljs from "highlight.js"

marked.setOptions({
  gfm: true,
  tables: true,
  smartypants: true,
  highlight: (code, language) => {
    code = code.trim()
    // language is recognized by highlight.js
    if (hljs.getLanguage(language)) {
      return hljs.highlight(language, code).value
    }
    // fallback to auto
    return hljs.highlightAuto(code).value
  },
})

new Metalsmith("./")
  .use(
    md({
      marked,
    })
  )
  .build(err => {if (err) {throw err}})
```

### Options

#### `test` (default: `/\.(txt|md|markdown)$/`)

Allow you to specify which files should be parsed as md

#### marked (default: marked)

Allow you to specify your marked instance.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
