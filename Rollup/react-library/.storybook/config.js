import { configure } from '@storybook/react'
import '../dist/index.css'

configure(require.context('../docs', true, /\.stories\.js$/), module)
