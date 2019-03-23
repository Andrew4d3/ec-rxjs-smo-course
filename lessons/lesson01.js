// We have this observable
var observable = Rx.Observable.interval(1000).take(5);

// In order to observe the events from the past observable we can define an observer
var observerA = {
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

// And subscribe the obsever to the observable
observable.subscribe(observerA); // create an execution

/*

But what if we want to create a different observer 
observing the same events from one observable?
How can we do?

*/
