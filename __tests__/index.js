import tape from "tape"

import Metalsmith from "metalsmith"
import md from "../src"
import markdownIt from "markdown-it"

tape("metalsmith-md", t => {
  new Metalsmith(__dirname)
    .use(
      md()
    )
    .use(files => {
      t.equal(
        files["index.md"].contents.toString(),
        `<h1>test</h1>\n<p>&lt;a&gt;b&lt;/a&gt;</p>\n`,
        "should transform md to html"
      )
      t.end()
    })
    .build(err => {
      if (err) {
        throw err
      }
    })
})

tape("metalsmith-md options", t => {
  new Metalsmith(__dirname)
    .use(
      md({
        pattern: /index\.md$/,
        markdownIt: markdownIt({
          html: true,
        }),
      })
    )
    .use(files => {
      t.equal(
        files["index.md"].contents.toString(),
        `<h1>test</h1>\n<p><a>b</a></p>\n`,
        "should works with custom instance"
      )
      t.equal(
        files["test.md"].contents.toString(),
        `# no\n`,
        "should allow to filter using pattern option"
      )
      t.end()
    })
    .build(err => {
      if (err) {
        throw err
      }
    })
})
