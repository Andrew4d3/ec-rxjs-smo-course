/* There's a way to avoid the step of connecting to the shared observable. Using refCount */
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x) || displayInPreview('source ' + x))
  .multicast(new Rx.Subject())
  .refCount(); // Using this method, we omit connecting to the observable

/*
  How does it work?
  It will connect automatically to the observable, once the number of subscribers change
*/

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};

var subA = shared.subscribe(observerA); // Here the numbers of subscribers change from 0 to 1. So it will perform a "connect" internally

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

var subB;
setTimeout(function () {
  subB = shared.subscribe(observerB); // 1 => 2, still greater than 0
}, 2000);

setTimeout(function () {
  subA.unsubscribe(); // 2 => 1 still greater than 0, so it will remain connected
  console.log('unsubscribed A') || displayInPreview('unsubscribed A');
}, 5000);

setTimeout(function () {
  subB.unsubscribe(); // 1 => 0 (stop) Now it's zero! so the connection will stop, and thus, the shared observable will stop listening to events
  console.log('unsubscribed B') || displayInPreview('unsubscribed B');
}, 7000);


/*
  As you can see, here we don't have a "main subscriber" which we can use to unsubsribe to the shared observable.
  So we need to unsubscribe to each subscription we have made.
*/
