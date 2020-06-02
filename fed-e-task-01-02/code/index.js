const fp = require('lodash/fp');
const cars = [
    {name:'Ferrari FF', horsepower: 660,dollar_value:700000,in_stock:true},
    {name:'Spyker C12 Zagato', horsepower: 650,dollar_value:648000,in_stock:false},
    {name:'Jaguar XKR-S', horsepower: 550,dollar_value:132000,in_stock:false},
    {name:'Audi R8', horsepower: 525,dollar_value:114200,in_stock:false},
    {name:'Aston Martin One-77', horsepower: 750,dollar_value:1850000,in_stock:true},
    {name:'Pagani Huayra', horsepower: 700,dollar_value:1300000,in_stock:true},
]
// let isLastInStock = function(cars) {
//     let last_car = fp.last(cars)
//     return fp.prop('in_stock', last_car)
// }
// console.log(isLastInStock(cars))
// const i = fp.flowRight(fp.prop('in_stock'), fp.last)
// console.log(i(cars))
// const firstName = fp.flowRight(fp.prop('name'), fp.first)
// console.log(firstName(cars))
// let _average = function(xs) {
//     return fp.reduce(fp.add, 0, xs) / xs.length
// }
// let averageDollarValue = function(cars) {
//     let dollar_values = fp.map(function(car) {
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_values)
// }
// console.log(averageDollarValue(cars))
// const average = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
// console.log(average(cars))
// let _underscore = fp.replace(/\W+/g, '_')
// const sanitizeNames = fp.flowRight(_underscore, fp.toLower, fp.prop('name'))

// console.log(fp.map(sanitizeNames, cars))
class Maybe {
    static of (x) {
        return new Maybe(x)
    }
    isNothing () {
        return this._value === null || this._value === undefined
    }
    constructor (x) {
        this._value = x
    }
    map (fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(arr => fp.map(fp.add(1), arr))
let xs = Maybe.of(['do', 'ray', 'me', 'fa', 'so'])
let ex2 = xs.map(arr => fp.first(arr))
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = {id: 2, name: 'Albert'}
let ex3 = safeProp('name', user).map(x => fp.first(x))
let ex4 = n => Maybe.of(n).map(x => parseInt(x))._value
console.log(ex4(3.1))