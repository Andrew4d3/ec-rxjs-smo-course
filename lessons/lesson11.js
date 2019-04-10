/*
  So far we have been using one single instance of subject. So once the observable completes, the subject will stop receving events
  But what if we want to receive events again? I mean... like subscribing again?
  For such cases, we need to use a "Subject Factory" function instead a subject instance
*/
function subjectFactory() {
  return new Rx.Subject(); 
}

var shared = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .multicast(subjectFactory) // Now this is a factory function instead of an instance
  .refCount();


/* Everything will go as usual here...  */
var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

var subA = shared.subscribe(observerA); // 0 => 1 It will connect and call the subject factory function for the first time
console.log('subscribed A');

var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

var subB;
setTimeout(function () {
  subB = shared.subscribe(observerB);
  console.log('subscribed B');
}, 2000);

setTimeout(function () {
  subA.unsubscribe();
  console.log('unsubscribed A');
}, 5000);

setTimeout(function () {
  subB.unsubscribe(); // There are 0 subscribers now, so it will disconnect... the first subject is done receiving events
  console.log('unsubscribed B');
}, 7000);


/* But here we are subscribing to the observer A again! */
setTimeout(function () {
  subA = shared.subscribe(observerA); // 0 => 1 (connect) and will call the subject factory function again, receiving a new subject instance which will start receiving events again
  console.log('subscribed A');
}, 8000);


/* It goes as follows... */
// subject: --0--1--2--3--4--5|
//                               A
// subject2:                     --0--1--2--3--4--5|

