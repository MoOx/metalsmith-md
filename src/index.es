import path from "path"

import markdown from "markdown-it"

export default (options) => {
  options = {
    test: /\.(txt|md|markdown)$/,
    markdownIt: markdown(),
    ...options,
  }

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {

      // only transform markdown files
      if (!options.test.test(path.extname(file))) {
        return
      }

      files[file].contents = new Buffer(
        options.markdownIt.render(files[file].contents.toString())
      )
    })
  }
}
