import {studioTheme, ThemeProvider, usePrefersDark} from '@sanity/ui'
import {WithContext} from './examples'

export default function App() {
  const prefersDark = usePrefersDark()
  const scheme = prefersDark ? 'dark' : 'light'

  return (
    <ThemeProvider theme={studioTheme} scheme={scheme}>
      <WithContext />
    </ThemeProvider>
  )
}
