document.addEventListener('DOMContentLoaded', function () {

    var dataHuman = {
        name: 'Ion',
        age: 5,
        sex: 'm',
        height: 10,
        weight: 20
    };
    var worker = new Worker(dataHuman);
    worker.work({
        salary: 10,
        placeWork: 'google'
    });

    var student = new Student(dataHuman);
    student.watchTv({
        placeStudy: 'odesa',
        grants: 15
    });

    console.log('worker.name => ', worker.name);
    console.log('student.name => ', student.name);
});
