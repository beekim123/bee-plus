import Installer from './defaults'

export * from '@bee-plus/components'
export * from '@bee-plus/utils'
import '@bee-plus/theme-chalk/index.scss' // Import global styles

export const install = Installer.install
export default Installer
