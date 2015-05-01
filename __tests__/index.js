import tape from "tape"

import Metalsmith from "metalsmith"
import md from "../src"

tape("metalsmith-md", t => {
  new Metalsmith(__dirname)
    .use(
      md()
    )
    .use(files => {
      t.equal(files["index.md"].contents.toString(), `<h1 id="test">test</h1>\n`, "should transform md to html")
      t.end()
    })
    .build(err => {if (err) {throw err}})
})
