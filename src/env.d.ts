/// <reference types="vite/client" />

import { DefineComponent } from 'vue'
import { Store } from 'vuex'
import { State } from './store/state'

declare module '*.vue' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}