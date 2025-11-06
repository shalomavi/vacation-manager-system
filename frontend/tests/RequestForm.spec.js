import { mount } from '@vue/test-utils'
import RequestForm from '@/components/RequestForm.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import * as api from '@/services/api'
import flushPromises from 'flush-promises'

vi.mock('@/services/api', () => ({
  submitVacationRequest: vi.fn(() => Promise.resolve({ id: 1, status: 'pending' })),
}))

describe('RequestForm.vue', () => {
  let wrapper
  let userStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    userStore = useUserStore()
    userStore.user = { id: 123, name: 'Test User' }

    wrapper = mount(RequestForm, {
      global: {
        plugins: [pinia],
      },
    })
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[name="startDate"]').exists()).toBe(true)
    expect(wrapper.find('input[name="endDate"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="reason"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  });
  it('validates required fields', async () => {
    await wrapper.find('input[type="date"][name="startDate"]').setValue('')
    await wrapper.find('input[type="date"][name="endDate"]').setValue('')
    await wrapper.find('form').trigger('submit.prevent')

  })

  it('submits the form with valid data', async () => {
    await wrapper.find('input[name="startDate"]').setValue('2023-01-01')
    await wrapper.find('input[name="endDate"]').setValue('2023-01-10')
    await wrapper.find('textarea[name="reason"]').setValue('Family vacation')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.emitted()['request-submitted']).toBeTruthy()
    const payload = wrapper.emitted()['request-submitted'][0][0]

    expect(payload).toMatchObject({ id: 1, status: 'pending' })
    expect(api.submitVacationRequest).toHaveBeenCalledWith({
      user_id: 123,
      user_name: 'Test User',
      start_date: '2023-01-01',
      end_date: '2023-01-10',
      reason: 'Family vacation',
    })
  })
})
