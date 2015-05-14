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

## Advanced usage

If you need to customize more stuff from the renderer, you might
want to use options passed to marked available as `this.options.__metalsmith`
in marked & marked renderer methods :

```js
__metalsmith: {
  ...options, // previous options are passed if you need those
  metalsmith, // just in case :)
  __filename: file, // filename is added so you can rebase url
},
```

Here is an example of advanced marked configuration that use `__filename` to
make absolute urls. This can be convenient if you want a solid rss feed that
use full absolute urls.

```js
import path from "path"

import Metalsmith from "metalsmith"
import md from "metalsmith-md"

import marked from "marked"

function rebaseUrl(baseHref, currentPath, uri) {
  // don't touch non relative uri
  if (
    // skip absolute url
    uri.indexOf("/") === 0 ||
    // datauris
    uri.indexOf("data:") === 0 ||
    // internal links
    // uri.indexOf("#") === 0 ||
    // protocol based
    /^[a-z]+:\/\//.test(uri)
  ) {
    return uri
  }
  else {
    // make it absolute
    return baseHref + path.normalize(path.join(currentPath, uri))
  }
}

const renderer = new marked.Renderer()
renderer.link = function(href, title, text) {

  // DON'T PLAY WITH US OK ?
  // (this came from original marked source code and should remain I think)
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, "")
        .toLowerCase()
    }
    catch (e) {
      return ""
    }

    if (
      prot.indexOf("javascript:") === 0 ||
      prot.indexOf("vbscript:") === 0
    ) {
      return ""
    }
  }

  // HERE IS SOME REBASE
  return `<a href="${
    rebaseUrl(
      this.options.__metalsmith.baseHref,
      path.dirname(this.options.__metalsmith.__filename),
      href
    )
  }" ${title ? ` title="${title}"` : ``}>${text}</a>`
}

renderer.image = function(href, title, text) {
  // HERE IS SOME REBASE
  return (
    `<img src="${
      rebaseUrl(
        this.options.__metalsmith.baseHref,
        path.dirname(this.options.__metalsmith.__filename),
        href
      )
    }" alt="${text}"` +
    `${title ? ` title="${title}"` : ``}` +
    `${this.options.xhtml ? "/>" : ">"}`
  )
}

// here we define global marked options in order to use our rendering method
marked.setOptions({
  renderer: renderer,
})

new Metalsmith("./")
  .use(
    md({
      // this is passed to marked
      baseHref: "http://nickname.github.io/",
    })
  )
  .build(err => {if (err) {throw err}})
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
