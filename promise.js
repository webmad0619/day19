// this requires mongoose so we can work with mongo
const mongoose = require('mongoose');
// here we connect to the database named exampleApp through mongoose
mongoose.connect('mongodb://localhost/exampleApp');

// here we define a mongoose model which will work with the Students collection in the exampleApp db
// remember we say Student but internally mongoose pluralises the collection name and adds an 's' at the end
// here we define that every insertion in the Students collection will have this structure { firstname: String }
// if you wanted to insert data with a different structure it will simply not do it
// if you wanted to insert data with firstname and age you would have to use { firstname: String, age: Number }
// remember that in 'let Student' Student is the way you work with the db and it is a mongoose model
let Student = mongoose.model('Student', { firstname: String });
let City = mongoose.model('City', { name: String });

// here we define 2 promises, one for inserting many cities and another for inserting many students
// here we make 2 'agreements': we will insert multiple students and multiple cities
// and then the Promise.all will be resolved through a .then() statement
// remember any promise has two resolution types: either resolved (.then()) or rejected (.catch())
let promise1 = Student.insertMany([{ firstname: 'Alice' }, { firstname: 'Bob' }]);
let promise2 = City.insertMany([{ name: 'Madrid' }, { name: 'Barcelona' }, { name: 'Paris' }]);

// operations in sequence, the last res.json is triggered only when both insertions have concluded
/*
Student
    .insertMany([{ firstname: 'Alice' }, { firstname: 'Bob' }])
    .then((resolution) => {
        City
            .insertMany([{ name: 'Madrid' }, { name: 'Barcelona' }, { name: 'Paris' }])
            .then((resolution2) => {
                res.json({end: true, resolution, resolution2})
            })
    })
*/

// here you pass both pre-created promises and these will be ran in parallel
// please note you pass here the promises as an Array
Promise.all([promise1, promise2])
    // if both promises (promise1 and promise2) ended ok then the .then() statement of the Promise.all will be called
  // remember values will be an array containing the info of the promise1 in the first position
  // and the info of the promise2 in the second position
  .then(values => {
    console.log("students and cities have been inserted");
    console.log(values);
    /*
    [ [ { _id: 5a4e462048841e65562c465a, firstname: 'Alice', __v: 0 },
      { _id: 5a4e462048841e65562c465b, firstname: 'Bob', __v: 0 } ],
    [ { _id: 5a4e462048841e65562c465c, name: 'Madrid', __v: 0 },
      { _id: 5a4e462048841e65562c465d, name: 'Barcelona', __v: 0 },
      { _id: 5a4e462048841e65562c465e, name: 'Paris', __v: 0 } ] ]
    */
    mongoose.connection.close();
  })
  .catch(err => console.error(err));