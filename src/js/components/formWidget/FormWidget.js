export default class FormWidget {
    constructor(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        this.element = element;
        this.currentTaskText = '';
    }
}