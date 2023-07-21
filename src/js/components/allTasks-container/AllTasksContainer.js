export default class AllTasksContainer {
    constructor(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        this.element = element;
        this.tasks = [];
    }
}