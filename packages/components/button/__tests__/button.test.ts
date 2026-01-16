import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BeeButton from '../src/button.vue'

describe('BeeButton', () => {
    it('renders correctly', () => {
        const wrapper = mount(BeeButton, {
            slots: {
                default: 'Hello World'
            }
        })
        expect(wrapper.text()).toContain('Hello World')
        expect(wrapper.classes()).toContain('bee-button')
    })

    it('renders types correctly', () => {
        const types = ['primary', 'success', 'warning', 'danger', 'info']
        types.forEach(type => {
            const wrapper = mount(BeeButton, {
                props: { type }
            })
            expect(wrapper.classes()).toContain(`bee-button--${type}`)
        })
    })

    it('handles click event', async () => {
        const wrapper = mount(BeeButton)
        await wrapper.trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')
    })

    it('disabled button should not emit click', async () => {
        const wrapper = mount(BeeButton, {
            props: { disabled: true }
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
        expect(wrapper.classes()).toContain('is-disabled')
    })
})
