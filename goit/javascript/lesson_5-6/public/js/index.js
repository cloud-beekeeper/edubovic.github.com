var GoItStopwatch = (function () {
    function getFormattedToMilliseconds(time){
        var milliseconds = Math.floor((time % 1000) / 1),
            seconds = Math.floor((time/1000) % 60),
            minutes = Math.floor((time/(1000*60)) % 60),
            hours = Math.floor((time/(1000*60*60)) % 24);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return {
            stopwatch: hours + ':' + minutes + ':' + seconds,
            milliseconds: milliseconds
        };
    }

    function GoItStopwatch(element, milliseconds) {
        this.isStart = false;
        this.element = element;
        this.milliseconds = milliseconds;

        if(Number(localStorage.stopwatchBeginingTimestamp) && Number(localStorage.stopwatchRunningTime)){
            this.runningTime = Number(localStorage.stopwatchRunningTime) + new Date().getTime() - Number(localStorage.stopwatchBeginingTimestamp);
            localStorage.stopwatchRunningTime = this.runningTime;
            this.start();
        }
        if(localStorage.stopwatchRunningTime){
            var t = getFormattedToMilliseconds(Number(localStorage.stopwatchRunningTime));
            this.element.innerHTML = t.stopwatch;
            this.milliseconds.innerHTML = t.milliseconds;
        }
        else{
            localStorage.stopwatchRunningTime = 0;
        }
    }

    GoItStopwatch.prototype.start = function (target) {
        var me = this, startTimestamp, runningTime;
        if (!this.isStart) {
            target.innerHTML = 'Pause';
            clearInterval(this.stopwatchInterval);
            startTimestamp = new Date().getTime();
            runningTime = 0;
            localStorage.stopwatchBeginingTimestamp = startTimestamp;

            if(Number(localStorage.stopwatchRunningTime)){
                runningTime = Number(localStorage.stopwatchRunningTime);
            }
            else {
                localStorage.stopwatchRunningTime = 1;
            }
            this.stopwatchInterval = setInterval(function () {
                var stopwatchTime, format;
                stopwatchTime = (new Date().getTime() - startTimestamp + runningTime);
                format = getFormattedToMilliseconds(stopwatchTime);
                me.element.innerHTML = format.stopwatch;
                me.milliseconds.innerHTML = format.milliseconds;
            }, 1);

            this.isStart = true;
        } else {
            target.innerHTML = 'Continue';
            this.isStart = false;
            clearInterval(this.stopwatchInterval);
            if(Number(localStorage.stopwatchBeginingTimestamp)){
                runningTime = Number(localStorage.stopwatchRunningTime) + new Date().getTime() - Number(localStorage.stopwatchBeginingTimestamp);
                localStorage.stopwatchBeginingTimestamp = 0;
                localStorage.stopwatchRunningTime = runningTime;
            }
        }

    };

    GoItStopwatch.prototype.reset = function (target) {
        clearInterval(this.stopwatchInterval);
        var t = getFormattedToMilliseconds(0);
        this.element.innerHTML = t.stopwatch;
        this.milliseconds.innerHTML = t.milliseconds;

        localStorage.stopwatchBeginingTimestamp = 0;
        localStorage.stopwatchRunningTime = 0;
        target.innerHTML = 'Start';
    };

    return GoItStopwatch;
})();

document.addEventListener('DOMContentLoaded', function () {
    var GoApp;
    GoApp = new GoItStopwatch(document.getElementById('stopwatch'), document.getElementById('milliseconds'));

    document.querySelector('#watch-start').addEventListener('click', function (event) {
        GoApp.start(event.target);
    });

    document.querySelector('#watch-clear').addEventListener('click', function () {
        GoApp.reset(document.getElementById('watch-start'));
    });
});
