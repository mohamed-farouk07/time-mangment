import { mount } from '@vue/test-utils';
import TaskBoard from '../components/TaskBoard.vue';
import EditModal from '../components/EditModal.vue';
describe('TaskBoard.vue', () => {
  let wrapper;

  const tasksMock = {
    todo: [
      { title: 'Task 1', description: 'Description 1', status: 'todo' },
    ],
    progress: [],
    done: []
  };

  beforeEach(() => {
    wrapper = mount(TaskBoard, {
      props: {
        tasks: tasksMock,
      },
    });
  });

  it('renders task lists correctly', () => {
    const todoTask = wrapper.find('.col-md-4:nth-child(1) ul li');
    expect(todoTask.text()).toContain('1. Task 1: Description 1');
  });

  it('removes task from "To-Do" list when remove button is clicked', async () => {
    const removeButton = wrapper.find('.col-md-4:nth-child(1) ul li button.btn-danger');
    await removeButton.trigger('click');

    expect(wrapper.props().tasks.todo).toHaveLength(0);
  });

  it('opens the edit modal when edit button is clicked', async () => {
    const editButton = wrapper.find('.col-md-4:nth-child(1) ul li button.btn-warning');
    await editButton.trigger('click');

    expect(wrapper.findComponent(EditModal).exists()).toBe(true);
  });

  it('updates the task when edit modal is submitted', async () => {
    const editButton = wrapper.find('.col-md-4:nth-child(1) ul li button.btn-warning');
    await editButton.trigger('click');

    const modal = wrapper.findComponent(EditModal);
    const updatedTask = { title: 'Updated Task', description: 'Updated Description', status: 'todo' };

    await modal.vm.$emit('update-task', updatedTask);
    
    expect(wrapper.props().tasks.todo[0].title).toBe('Updated Task');
    expect(wrapper.props().tasks.todo[0].description).toBe('Updated Description');
  });

  it('moves task to "In Progress" when status is changed in the edit modal', async () => {
    const editButton = wrapper.find('.col-md-4:nth-child(1) ul li button.btn-warning');
    await editButton.trigger('click');

    const modal = wrapper.findComponent(EditModal);
    const updatedTask = { title: 'Updated Task', description: 'Updated Description', status: 'progress' };

    await modal.vm.$emit('update-task', updatedTask);

    expect(wrapper.props().tasks.todo).toHaveLength(0);
    expect(wrapper.props().tasks.progress).toHaveLength(1);
  });
});
