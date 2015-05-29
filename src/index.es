import markdown from "markdown-it"

export default (options) => {
  options = {
    pattern: /\.(txt|md|markdown)$/,
    markdownIt: markdown(),
    ...options,
  }

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {

      // only transform markdown files
      if (!options.pattern.test(file)) {
        return
      }

      files[file].contents = new Buffer(
        options.markdownIt.render(files[file].contents.toString())
      )
    })
  }
}
