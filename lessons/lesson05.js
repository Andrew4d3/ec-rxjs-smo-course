// First argument is how many values I want to remember to be replayed
// The second argument is optional and it's the window's size where values are going to be remembered
// For example a windows size of 250 will remember all the values within the last 250 ms
const subject = new Rx.ReplaySubject(100, 250);
           // new Rx.BehaviorSubject(0);

// Observer A as usual
var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

// Subscribed to our replayer subject
subject.subscribe(observerA);
console.log('observerA subscribed');
// Defining the observer B
var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

// Manipulationg the subject
setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
setTimeout(() => subject.complete(), 350);

/*
----1---2---3--|
  ..1...2...3...
                 1,2,3|
*/

// Subscribing the second objerver to the subject after 400 ms...
// so that we can see how the replayer behaves
setTimeout(function () {
  subject.subscribe(observerB);
  console.log('observerB subscribed');
}, 400);


/*
The obsever B will only receive the values 2 and 3, since they were generated within the last 250 ms
*/
