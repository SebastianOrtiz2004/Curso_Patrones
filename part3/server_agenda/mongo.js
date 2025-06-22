const mongoose = require("mongoose");

const params = process.argv;

if (params.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = params[2];
const name = params[3];
const number = params[4];

const url = `mongodb+srv://rndmid:${password}@cluster0.rmonq6z.mongodb.net/agenda?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (params.length === 3) {
  Contact.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
  return;
}

const contact = new Contact({
  name: name,
  number: number,
});

contact.save().then((result) => {
  console.log(`Added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});
