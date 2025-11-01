import { mount } from '@vue/test-utils'
import RequestForm from '@/components/RequestForm.vue'

describe('RequestForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RequestForm)
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="date"][name="startDate"]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"][name="endDate"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="reason"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('validates required fields', async () => {
    await wrapper.find('input[type="date"][name="startDate"]').setValue('')
    await wrapper.find('input[type="date"][name="endDate"]').setValue('')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.error-startDate').exists()).toBe(true)
    expect(wrapper.find('.error-endDate').exists()).toBe(true)
  })

  it('submits the form with valid data', async () => {
    await wrapper.find('input[type="date"][name="startDate"]').setValue('2023-01-01')
    await wrapper.find('input[type="date"][name="endDate"]').setValue('2023-01-10')
    await wrapper.find('textarea[name="reason"]').setValue('Family vacation')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit[0]).toEqual([{ 
      startDate: '2023-01-01', 
      endDate: '2023-01-10', 
      reason: 'Family vacation' 
    }])
  })
})