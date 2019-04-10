/* 
  There's another way to use the multicast utility that doesn't involve publish and refCount methods.
  In this way, we need to define a sandbox function as the second parameter of the multicast call.
  The sandbox function receives as only argument the shared observable we define.
*/

function subjectFactory() {
  return new Rx.Subject(); 
}

var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random()) // Generating a random number
  .multicast(subjectFactory, function selector(shared) { // Here we are receiving the shared observable we want to manipulate
    // Here we start operating the observable
    var sharedDelayed = shared.delay(500); // We delay the shared observable. This is creating like a sort of bifurcation.
    var merged = shared.merge(sharedDelayed); // And merge the original observable with the delayed one
    return merged; // We always need to return a resulting observable
  });

var sub = result.subscribe(x => console.log(x));

/*
  When is this useful?
  Use multicast sandbox function when you require to combine multiple behaviors from one single observable into one.
  In the past example, we wanted to combine the delayed (500ms) observable with the original one.
  This is similar to a "diamond execution"
              _____
  (start)____/     \____(end)
             \_____/
*/
