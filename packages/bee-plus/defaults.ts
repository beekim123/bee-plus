import * as components from '@bee-plus/components'
import type { App, Plugin } from 'vue'

export default {
    install(app: App) {
        Object.values(components).forEach((component) => {
            if (component && (component as any).install) { // Check if it has install method (added by withInstall)
                app.use(component as any)
            }
        })
    }
} as Plugin
