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

import markdownIt from "markdown-it"
import hljs from "highlight.js"

new Metalsmith("./")
  .use(
    md({
      markdownIt: markdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: (code, lang) => {
          code = code.trim()

          // language is recognized by highlight.js
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, code).value
            } catch (__) {}
          }

          // fallback to auto
          try {
            return hljs.highlightAuto(code).value
          } catch (__) {}

          // use external default escaping
          return ''
        },
      })
        //.use(...)
        //.use(...)
      ,
    })
  )
  .build(err => {if (err) {throw err}})
```

### Options

#### `pattern` (default: `/\.(txt|md|markdown)$/`)

Allow you to specify which files should be parsed as md

#### markdownIt (default: markdownIt())

Allow you to specify your markdown-it instance.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
