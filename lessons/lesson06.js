// Async subjects are used if we want to remember the LAST value before the obervable is completed
const subject = new Rx.AsyncSubject();

// Subject
// ReplaySubject: replays many, before or after completion
// BehaviorSubject: replays one, only before completion
// AsyncSubject: replays one, only if completed


// Again Observer A
var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};


subject.subscribe(observerA);
console.log('observerA subscribed');

var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};


setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
setTimeout(() => subject.complete(), 350);
// So in this case, only 3 will be received

/*
----1---2---3--|       
  .............3|
                   3|
*/

// The same here, only 3 will be received, because that's the last value before the Observable hit its end
setTimeout(function () {
  subject.subscribe(observerB);
  console.log('observerB subscribed');
}, 400);
