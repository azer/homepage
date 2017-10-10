const fs = require("fs")
const qa = require("cli-qa")()
const slugify = require("to-slug")
const formatDate = require("format-date")

qa.ask('{bold}{white}Title:{reset}')
qa.ask('{bold}{white}Description:{reset}')
qa.ask('{bold}{white}Date:{reset}')
qa.ask('{bold}{white}Image:{reset}')

qa.start(answers => {
  const date = new Date(answers.date)
  const slug = slugify(answers.title)
  const filename = `posts/${formatDate('{year}-{month}-{day}', date)}-${slug}.md`
  const frontmatter = `---
title: ${answers.title}
desc: ${answers.description}
image: ${answers.image}
date: "${date.toISOString()}"
path: "/journal/${slug}"
---
`
  fs.writeFile(filename, frontmatter, error => {
    if (error) throw error
    console.log('Done! Created ' + filename)
  })
})
