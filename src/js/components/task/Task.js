import './task.css';

export default class Task {
    constructor(value) {
        // const taskEl = document.createElement('span');
        // taskEl.setAttribute('text', value);
        // taskEl.textContent = taskEl.getAttribute('text');
        this.element = `
        <div class="task-container">
            <span class="task">${value}</span>
            <span class="pin"></span>
        </div>
        `;
        this.value = value;
    }
}