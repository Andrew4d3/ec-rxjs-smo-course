// We define an Observable like before
const observable = Rx.Observable.interval(1000).take(5);

// And now the difference is we define a subject,
// which is a kind of hybrid between and observer and observable
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

// Instead of subscribing to one of the observable, we subscribe to the subject previously defined.
// This subject is going to be our "bridge observer" where we can subscribe to any single observer
observable.subscribe(subject);

// Let's start adding our observers defined
subject.subscribe(observerA);
// And this is gonna be added 2 seconds after
setTimeout(function () {
  subject.subscribe(observerB);
}, 2000);
