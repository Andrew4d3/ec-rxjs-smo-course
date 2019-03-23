// Different observers can arrive too late when listening to events
// In such case. It's appropriate to use BehaviourSubjects like this:
const subject = new Rx.BehaviorSubject(0); // 0 indicates the value to initializwe

// Defining our first observer
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


// Subscribing to Observer A
subject.subscribe(observerA);
subject.next(1);
subject.next(2);
subject.next(3);

// And 2 seconds after to observer B
setTimeout(function () {
  console.log("Observer B subscribed!");
  subject.subscribe(observerB);
}, 2000);

/*
The last observer will receive the latest value from the subject,
even thought it was subscribed 2 seconds after and it wasn't there when the value was sent

With behaviours subjects, the observer is able to know the last value sent.

*/
