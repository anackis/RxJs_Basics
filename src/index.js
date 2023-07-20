


//----------------------------------------------------------------------------------------------------------//
// exhaustMap Operator //              Do not run if 1 observble already running.
// ___________________________________________
// Example on Marble Diagram:                 \   
// exhaustMap(() => interval(1000))             \       
// Input-----(-)-------(-)------------------->  \      
// Intervall-----------Ignored------>             \      
// Intervall-(0)--(1)--(0)--(1)--->               \                   
// Output----(0)--(1)--(0)--(1)----->              \                 
// _________________________________________________\          

import { fromEvent, take, tap, exhaustMap } from "rxjs";
import { ajax } from 'rxjs/ajax';

const button = document.querySelector('#btn')
const observable = fromEvent(
  button, 'click'
).pipe(
  exhaustMap(() => {                       // Will wait first request completed and then run new one.
    return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
      take(5),
      tap({
        complete() {
          console.log('inner observable has been completed')
        }
      })
    )
  }),
)

const subscription = observable.subscribe({
  next(value) {
    console.log(value)
  },
  complete() {
    console.log('completed')
  }
})
console.log('hello')
//----------------------------------------------------------------------------------------------------------//



// //----------------------------------------------------------------------------------------------------------//
// // concatMap Operator //           Works like switchMap but it allows only 1 observable to be run at the same time. But instead of stopping prev observable, it put a new 1 in the queue
// // ___________________________________________
// // Example on Marble Diagram:                 \   
// // concatMap(() => interval(1000))             \        In this scenario first observable will run forever.
// // Input-----(-)-------(-)------------------->  \      
// // Intervall-----------Queued------>             \      
// // Intervall-(0)--(1)--(0)--(1)--->               \                   
// // Output----(0)--(1)--(0)--(1)----->              \                 
// // _________________________________________________\          

// import { fromEvent, switchMap, interval, take, tap, concatMap } from "rxjs";
// import { ajax } from 'rxjs/ajax';

// const button = document.querySelector('#btn')
// const observable = fromEvent(
//   button, 'click'
// ).pipe(
//   concatMap(() => {                       // Will wait first request completed and then run new one.
//     return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log('inner observable has been completed')
//         }
//       })
//     )
//   }),
//   // take(5)
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
// //----------------------------------------------------------------------------------------------------------//



// //----------------------------------------------------------------------------------------------------------//
// // switchMap Operator //               Will stop running already running observable and run new 1 
// // ___________________________________________
// // Example on Marble Diagram:                 \   
// // switchMap(() => interval(1000))             \        
// // Input-----(-)-------(-)------------------->  \      
// // Intervall-----------(0)--(1)------>           \      
// // Intervall-(0)--(1)|------->                    \                   
// // Output----(0)--(1)--(0)--(1)----->              \                 
// // _________________________________________________\          

// import { fromEvent, switchMap, interval, take, tap } from "rxjs";
// import { ajax } from 'rxjs/ajax';

// const button = document.querySelector('#btn')
// const observable = fromEvent(
//   button, 'click'
// ).pipe(
//   switchMap(() => {
//     return ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1').pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log('inner observable has been completed')
//         }
//       })
//     )
//   }),
//   // take(5)
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
// //----------------------------------------------------------------------------------------------------------//



// //----------------------------------------------------------------------------------------------------------//
// // mergeMap Operator //     
// // ___________________________________________
// // Example on Marble Diagram:                 \   
// // mergeMap(() => interval(1000))              \        
// // Input-----(-)------->                        \      
// // Intervall-(1)--(2)--(3)--(4)--(5)------->     \                   
// // Output----(1)--(2)--(3)--(4)--(5)------->      \                 
// // ________________________________________________\          

// import { fromEvent, mergeMap, interval, take, tap } from "rxjs";
// import { ajax } from 'rxjs/ajax';

// const button = document.querySelector('#btn')
// const observable = fromEvent(
//   button, 'click'
// ).pipe(
//   mergeMap(() => {
//     return interval(1000).pipe(
//       tap(console.log)
//     )
//   }),
//   take(5)
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
// //----------------------------------------------------------------------------------------------------------//



// //----------------------------------------------------------------------------------------------------------//
// // Flattening Operators //               

// import { fromEvent, map } from "rxjs";
// import { ajax } from 'rxjs/ajax';
// // ajax is for initiating https requests 

// const button = document.querySelector('#btn')
// const observable = fromEvent(
//   button, 'click'
//   // document.querySelector('#btn'), 'click'
// ).pipe(
//   map(() => {
//     return ajax.getJSON(
//       'https://jsonplaceholder.typicode.com/todos/1'
//     )
//   })
// )

// const subscription = observable.subscribe({
//   next(value) {                                   
//     value.subscribe(console.log)                  // We will recive response of the second obsevble 
//   },
//   // next(value) {
//   //   console.log(value)
//   // },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
// //----------------------------------------------------------------------------------------------------------//



//----------------------------------------------------------------------------------------------------------//
// Tap Operator //                Used to be used for debugging
// ___________________________________________
// Example on Marble Diagram:                 \   
// tap(console.log)                            \        
// Input--(1)--(2)--(3)--(4)--(5)------->       \                        
// Output-(1)--(2)--(3)--(4)--(5)------->       \                 
// _______________________________________________\
// import { interval, reduce, take, tap } from "rxjs";

// const observable = interval(500).pipe(
//   take(5),
//   // tap(console.log),                         // Will show every step of compiling reducer. Good for debuging.
//   tap({
//     next(val) {
//       console.log(val)
//     }
//   }), 
//   reduce(
//     (acc, val) => acc + val,
//     0
//   )
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
//----------------------------------------------------------------------------------------------------------//



//----------------------------------------------------------------------------------------------------------//
// Take Operator //
// ___________________________________________
// Example on Marble Diagram:                 \   
// take(5)                                     \        
// Input--(1)--(2)--(3)--(4)--(5)--(6)-->       \                        
// Output-(1)--(2)--(3)--(4)--(5)|------->       \                 
// _______________________________________________\
// import { interval, reduce, take, scan } from "rxjs";

// const observable = interval(500).pipe(
//   take(5),
//   scan(
//     (acc, val) => acc + val,
//     0
//   )
//   // reduce(
//   //   (acc, val) => acc + val,
//   //   0
//   // )
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
//----------------------------------------------------------------------------------------------------------//



//----------------------------------------------------------------------------------------------------------//
// Reduce Operator //
// _________________________________________
// Example on Marble Diagram:              \   
// reduce(                                  \
//   (acc, value) => acc + value,            \
//   0                                        \
// )                                           \        
// Input---(1)--(2)--(3)---->                   \                        
// Output------------(6)-->                      \                 
// _______________________________________________\
// import { of, reduce } from "rxjs";

// const observable = of(1,2,3,4,5).pipe(
//   reduce(
//     (acc, val) => acc + val,
//     0
//   )
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
//----------------------------------------------------------------------------------------------------------//



//----------------------------------------------------------------------------------------------------------//
// Filter Operator //
// ____________________________________________
// Example on Marble Diagram:                 \   
// filter(value => value > 3)                  \        
// Input---(1)--(2)--(3)--(4)--(5)-->           \                        
// Output-----------------(4)--(5)-->            \                 
// _______________________________________________\
// import { map, fromEvent, filter } from "rxjs";

// const observable = fromEvent(
//   document, 'keydown'
// ).pipe(
//   map(event => {
//     event.code === 'Space' ? event.code : null     // Shorter version.
//   })
//   // map(event => event.code),
//   // filter(code => code === 'Space')  // Will allow only space to be consoled.
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
//----------------------------------------------------------------------------------------------------------//



//----------------------------------------------------------------------------------------------------------//
// FromEvent Operator //

// import { map, fromEvent } from "rxjs";

// const observable = fromEvent(
//   document, 'keydown'
// ).pipe(
//   map(event => event.code)
// )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
//----------------------------------------------------------------------------------------------------------//



// PLuck Operator //
// ____________________________________________
// Example on Marble Diagram:                  \           
// Input---({v:1})--({v:2})--({v:3})-->         \                        
// Output--(1)--(2)--(3)-->                      \                 
// ________________________________________________
//----------------------------------------------------------------------------------------------------------//



// Pipeable Operators //
// They are functions for transforming, filtering, and combining data. 
// --------------------------------------------------------
// New Solutuin:                                           \
// observable.pipe (                                       \
//   firstOperator(config),                                 \
//   secondOperator(confug)                                  \
// ).subscribe()                                                          \
// -------------------------------------------------------------
// Old Solution:                                                 \       
// const observble = new Observable()                            \
// const operatorFunc = firstOperator(config)                     \   
// const newObservble = operatorFunc(observable)                   \             
// const operatorFuncTwo = secondOperator(config)                   \             
// const newObservbleTwo = operatorFuncTwo(newObservable)            \     
//----------------------------------------------------------------------------------------------------------//

// import { of, map } from "rxjs";

// const observable = of(1,2,3,4,5).pipe(
//   map((value) => `$${value}`)
// )

// // const observable = of(1,2,3,4,5)
// // const numbersWithSymbols = observable.pipe(
// //   map((value) => `$${value}`)
// // )

// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')
//----------------------------------------------------------------------------------------------------------//



// From will loop throw the array and give us -> // 1 // 2 // 3 // 4 // 5 // completed // hello //
// It even can loop throw string. const observable = from('alex')   ->    // a // l // e // x // completed // hello //
// In case of 'from(fetch('https://jsonplaceholder.typicode.com/todos/1'))' we will get response back. // hello // {promise object} // complete //
//----------------------------------------------------------------------------------------------------------//

// import { from } from "rxjs";
// const observable = from(fetch('https://jsonplaceholder.typicode.com/todos/1'))
// // const observable = from('alex')
// // const observable = from([1,2,3,4,5])
// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')



// Of will give us -> // 1 // 2 // 3 // 4 // 5 // completed // hello //
// If we put inside of OF an array it will not loop throw array and just give us -> // [1,2,3,4,5] // completed // hello //
//----------------------------------------------------------------------------------------------------------//

// import { of } from "rxjs";
// const observable = of(1,2,3,4,5)
// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   complete() {
//     console.log('completed')
//   }
// })
// console.log('hello')


// FromEvent have 2 parametrs. Here we are listening for document and 'click' event. As well we need to insubscribe to avoid memory leak.
//----------------------------------------------------------------------------------------------------------//

// import { fromEvent } from "rxjs";
// const observable = fromEvent(
//   document, 'click'
// )
// const subscription = observable.subscribe(
//   console.log
// )


// Timer will run from 0 to 1000 
//----------------------------------------------------------------------------------------------------------//

// import { timer } from "rxjs";
// const observable = timer(0, 1000)
// const subscription = observable.subscribe(
//   console.log
// )


// Interval will run for ever with interval of 1000
//----------------------------------------------------------------------------------------------------------//

// import { interval } from "rxjs";
// const observable = interval(1000)
// const subscription = observable.subscribe(
//   console.log
// )


//----------------------------------------------------------------------------------------------------------//

// import { Observable } from "rxjs";
// const observable = new Observable((subscriber) => {
//   const id = setInterval(() => {
//     subscriber.next('test')
//     console.log('leak')
//   }, 1000)
//   // subscriber.complete()            // Without this observble will run for ever 
//   return () => {
//     clearInterval(id)
//   }
//   // subscriber.next('Hello world')                   // Runs II //
//   // subscriber.error('Error!')            // After Error rest of the code do not run 
//   // subscriber.next('test')
//   // subscriber.complete()                 // After Complete rest of the code do not run       
//   // subscriber.next('next')
// })

// // console.log('before')                              // Runs I //

// const subscription = observable.subscribe({
//   next: (value) => {
//     console.log(`Received ${value}`)
//   },
//   complete: () => {
//     console.log("Completed")
//   },
//   error: (err) => {
//     console.log(err)
//   }
// })

// setTimeout(() => {
//   subscription.unsubscribe()
// }, 4000)

// // console.log('after')                               // Runs III //