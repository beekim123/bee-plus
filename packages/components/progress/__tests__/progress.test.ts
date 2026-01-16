import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BeeProgress from '../src/progress.vue'

describe('BeeProgress', () => {
    it('renders percentage text correctly', () => {
        const wrapper = mount(BeeProgress, {
            props: { percentage: 50, animated: false }
        })
        // Disable animation to ensure immediate render of value
        expect(wrapper.text()).toContain('50%')
        expect(wrapper.find('.bee-progress-bar__outer').exists()).toBe(true)
    })

    it('renders status correctly', () => {
        const wrapper = mount(BeeProgress, {
            props: { percentage: 100, status: 'success', animated: false }
        })
        expect(wrapper.classes()).toContain('is-success')
        expect(wrapper.find('.bee-icon-check').exists()).toBe(true)
    })

    it('renders circle progress', () => {
        const wrapper = mount(BeeProgress, {
            props: { type: 'circle', percentage: 20, animated: false }
        })
        expect(wrapper.find('.bee-progress-circle').exists()).toBe(true)
        expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('custom color function', () => {
        const colorFunc = (p: number) => p < 50 ? 'red' : 'green'
        const wrapper = mount(BeeProgress, {
            props: { percentage: 60, color: colorFunc, animated: false }
        })
        const innerBar = wrapper.find('.bee-progress-bar__inner')
        // Check if background-color style is present and correct
        // Note: style attribute formatting might vary, so we check content
        const style = innerBar.attributes('style')
        expect(style).toContain('background-color: green')
    })
})
