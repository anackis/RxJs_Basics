



// PLuck Operator //
// ___________________________________________________
// Example on Marble Diagram: 
// Input---({v:1})--({v:2})--({v:3})-->
// Output--(1)--(2)--(3)-->
// ______________________________________________________________ 

import { of } from "rxjs";

const observable = of(1,2,3,4,5)

const subscription = observable.subscribe({
  next(value) {
    console.log(value)
  },
  complete() {
    console.log('completed')
  }
})
console.log('hello')





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