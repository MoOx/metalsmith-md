import path from "path"

import marked from "marked"

export default (options) => {
  options = {
    test: /\.(txt|md|markdown)$/,
  }

  const markedInstance = options.marked || marked

  return (files, metalsmith, done) => {
    setImmediate(done)

    Object.keys(files).forEach((file) => {

      // only transform markdown files
      if (!options.test.test(path.extname(file))) {
        return
      }

      files[file].contents = new Buffer(
        markedInstance(files[file].contents.toString(), {
          __metalsmith: {
            ...options,
            __filename: file,
            metalsmith,
          },
        })
      )
    })
  }
}
