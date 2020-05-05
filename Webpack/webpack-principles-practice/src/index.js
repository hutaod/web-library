import createHeading from './heading'
import md from './about.md'
const heading = createHeading(md)

document.body.appendChild(heading)
