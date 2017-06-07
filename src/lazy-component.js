import { inBrowser } from './util'

export default (lazy) => {
    return {
        props: {
            tag: {
                type: String,
                default: 'div'
            }
        },
        render (h) {
            if (this.show === false) {
                return h(this.tag)
            }
            return h(this.tag, null, this.$slots.default)
        },
        data () {
            return {
                state: {
                    loaded: false,
                    rested:false
                },
                rect: {},
                show: false
            }
        },
        mounted () {
            lazy.addLazyBox(this)
            lazy.lazyLoadHandler()
        },
        beforeDestroy () {
            lazy.removeComponent(this)
        },
        methods: {
            getRect () {
                this.rect = this.$el.getBoundingClientRect()
            },
            checkInView () {
                this.getRect()
                return inBrowser &&
                    (this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0) &&
                    (this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0)
            },
            checkIsNear () {
                this.getRect()
                return inBrowser &&
                    (this.rect.top < window.innerHeight * lazy.options.preLoad * 1.5 && this.rect.bottom > 0) &&
                    (this.rect.left < window.innerWidth * lazy.options.preLoad * 1.5 && this.rect.right > 0)
            },
            load () {
                this.show = true
                this.state.loaded = true
                this.$emit('show', this)
            },
            rest () {
                this.state.rested = true
                this.$emit('rest', this)
            },
            unrest () {
                this.state.rested = false
                this.$emit('unrest', this)
            }
        }
    }
}
