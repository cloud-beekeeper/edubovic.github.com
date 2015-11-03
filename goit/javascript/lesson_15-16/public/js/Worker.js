function Worker() {
    Human.apply(this, arguments);
}

Worker.prototype = Object.create(Human.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.work = function (data) {
    this.placeWork = data.placeWork;
    this.salary = data.salary;
};
