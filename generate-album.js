const album = require("flickr-photoset-info")
const fs = require("fs")
const key = process.env.KEY

if (!key) throw new Error('API Key needed.')

console.log('Generating posts/photos.json...')
album('72157686569836570', { key: key }, (err, photos) => {
  if (err) throw err
  fs.writeFile('./posts/photos.json', JSON.stringify(photos.map(photo)), err => {
    if (err) throw err
    console.log('Done!')
  })
})

function photo (props) {
  return {
    path: '/photo/' + props.id,
    title: props.title,
    sizes: {
      xxlarge: size(props.sizes.large2048),
      xlarge: size(props.sizes.large1600),
      large: size(props.sizes.large),
      medium: size(props.sizes.medium800),
      small: size(props.sizes.small320)
    }
  }
}

function size (props) {
  return {
    url: props.source,
    width: props.width,
    height: props.height
  }
}
