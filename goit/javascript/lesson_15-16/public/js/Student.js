function Student() {
    Human.apply(this, arguments);
}

Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Student.prototype.watchTv = function (data) {
    this.placeStudy = data.placeStudy;
    this.grants = data.grants;
};
