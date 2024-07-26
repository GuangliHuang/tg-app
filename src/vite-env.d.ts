/// <reference types="vite/client" />

declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponet<{}, {}, any>
    export default component
}
