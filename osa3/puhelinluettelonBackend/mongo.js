const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Password argument missing");
  process.exit(1);
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log(
    `Expected either 1 or 3 arguments, but found ${
      process.argv.length - 2
    } arguments`
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ohinkinen:${password}@hyfullstackcluster.u4ltu2x.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=HYFullstackCluster`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({})
    .then((result) => {
      if (result.length) {
        result.forEach((person) => {
          console.log(person);
        });
      } else {
        console.log("The phonebook is empty");
      }
      mongoose.connection.close();
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} ${result.number} to phonebook`);
      mongoose.connection.close();
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}
