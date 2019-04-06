/* What if we want to stop the execution of a shared observable? */
var connectableObservable = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x)) // We are doing this to know if the observable still emits events
  .multicast(new Rx.Subject());

var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

var sub = connectableObservable.connect(); // The connect method also returns a subscriber which we can unsubscribe to the shared observable

var subA = connectableObservable.subscribe(observerA); 

var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

var subB;
setTimeout(function () {
  subB = connectableObservable.subscribe(observerB);
}, 2000);

setTimeout(function () {
  sub.unsubscribe(); // Here we are unsubscribing to the shared observable, so it will stop emiting events. (You won't see the "source" logs anymore)
  console.log('unsubscribed shared execution');
}, 5000);
