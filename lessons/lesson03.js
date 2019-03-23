// Since the subject is both - an observable and an observer, we can drop the
// main obserbable and handle the subject directly
const subject = new Rx.Subject();

// Here we are defining our first observer
const observerA = {
  next: function (x) {
    console.log('A next ' + x);
  },
  error: function (err) {
    console.log('A error ' + err);
  },
  complete: function () {
    console.log('A done');
  },
};

// And the second one ...
const observerB = {
  next: function (x) {
    console.log('B next ' + x);
  },
  error: function (err) {
    console.log('B error ' + err);
  },
  complete: function () {
    console.log('B done');
  },
};

// Let's add our observers defined
subject.subscribe(observerA);
// And this is gonna be added 2 seconds after
setTimeout(function () {
  subject.subscribe(observerB);
}, 2000);

// And now let's control our subject using the next method as if it were an observable

subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
  subject.next(4);
  subject.next(5);
}, 2000)

/*
We have to be careful in doing this though.
When doing reactive programming, we want to "react" to things, not to control them.
So by controlling the events we send, it could lead to some unexpected behaviours
SO be sure of what you're doing when controlling the low API of an observable/subject
*/
