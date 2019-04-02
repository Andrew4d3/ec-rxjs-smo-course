// Subscribing Observable to Subjects, and then subjects to observers, can be very tedious
// That's the reason we have the method "Multicast"
const connectableObservable = Rx.Observable.interval(1000)
  .take(5)
  .multicast(new Rx.ReplaySubject(100)); // Here we use the subject (replay, behaviour, async, etc) we want to use

// Hi again Observer A!
const observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};


// And the following line is equivalent to do: observable.subscribe(subject);
connectableObservable.connect();
// And the line is equivalent to do: subject.subscribe(observerA);
connectableObservable.subscribe(observerA);

const observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

setTimeout(function () {
  connectableObservable.subscribe(observerB); // The same: subject.subscribe(observerB);
}, 2000);
