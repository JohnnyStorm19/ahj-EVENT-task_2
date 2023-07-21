import Task from "./components/task/Task";
import AllTasksContainer from "./components/allTasks-container/AllTasksContainer";
import PinnedContainer from "./components/pinned-container/PinnedContainer";
import FormWidget from "./components/formWidget/FormWidget";
import { containsText, filterBy } from "./components/filterWidget/filter";

const filterCb = (search, task) => {
    return containsText(task.value, search);
}

export default class AppController {
    constructor() {
        this.formWidget = new FormWidget('form');
        this.pinnedContainer = new PinnedContainer('.pinned-tasks-block');
        this.allTasksContainer = new AllTasksContainer('.all-tasks-block');
        
        this.allTasksContainerEl = this.allTasksContainer.element;
        this.pinnedContainerEl = this.pinnedContainer.element;
        this.formWidgetEl = this.formWidget.element;
        this.pins = null;

        this.onEnter = this.onEnter.bind(this);
        this.onPinClick = this.onPinClick.bind(this);

        this.onInput = this.onInput.bind(this);
        
        this.formWidgetEl.addEventListener('submit', this.onEnter);
        this.formWidgetEl.addEventListener('input', this.onInput);

        this.allTasksContainerEl.addEventListener('click', this.onPinClick);
        this.pinnedContainerEl.addEventListener('click', this.onPinClick);
    }

    onInput(e) {
        const value = e.target.value;
        const res = this.filter(value);
        if (res === undefined) {
            return;
        }
        this.renderByFilter(res);
    }
    filter(text) {
        const filterCallback = filterCb.bind(null, text);
        const res = filterBy(this.allTasksContainer.tasks, filterCallback);
        console.log(res);
        return res;
    }
    onEnter(e) {
        e.preventDefault();
        console.log('Добавляем задачу!');
        const input = this.formWidgetEl.querySelector('[type="text"]');
        this.formWidgetEl.currentTaskText = input.value;
        input.value = '';

        const task = this.createTask(this.formWidgetEl.currentTaskText);
        this.addTask(task, this.allTasksContainer);

        this.renderTasks(this.allTasksContainer);
        
        this.pins = document.querySelectorAll('.pin');
    }
    onPinClick(e) {
        const target = e.target;
        const parent = target.closest('.task-container');
        const taskText = parent.querySelector('.task').textContent;
        const task = this.createTask(taskText);
        if (target.classList.contains('pin') && target.closest('.all-tasks-block')) {
            console.log('ALL TASKS BLOCK');
            this.addTask(task, this.pinnedContainer);
            this.removeTask(task, this.allTasksContainer);
        } else {
            console.log('PINNED TASKS BLOCK');
            this.addTask(task, this.allTasksContainer);
            this.removeTask(task, this.pinnedContainer);
        }
        this.renderTasks(this.pinnedContainer);
        this.renderTasks(this.allTasksContainer);

    }
    createTask(value) {
        const task = new Task(value);
        return task;
    }
    addTask(task, container) {
        container.tasks.push(task);
    }
    renderTasks(container) {
        this.clear(container);
        if (!container.tasks.length) {
            const noTasksSpan = document.createElement('span');
            noTasksSpan.textContent = 'No tasks';
            noTasksSpan.classList.add('no-tasks');
            container.element.insertAdjacentElement('beforeend', noTasksSpan);
        }
        container.tasks.forEach(itemHtml => container.element.insertAdjacentHTML('afterbegin', itemHtml.element));
        if (container === this.pinnedContainer) {
            const pins = this.pinnedContainerEl.querySelectorAll('.pin');
            pins.forEach(pin => pin.textContent = 'v');
        }
    }

    renderByFilter(tasks) {
        this.clear(this.allTasksContainer);
        tasks.forEach(task => this.allTasksContainer.element.insertAdjacentHTML('afterbegin', task.element))
    }

    clear(container) {
        [...container.element.children].forEach(el => el.remove());
    }

    removeTask(task, container) {
        container.tasks = container.tasks.filter(obj => obj.element != task.element);
    }
}