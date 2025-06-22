import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService
      .getAllPersons()
      .then((personsInitial) => {
        setPersons(personsInitial);
      })
      .catch((error) => {
        console.error("Error fetching persons:", error.response.data.error);
        return [];
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService
        .deletePerson(id)
        .then(() => {
          setMessage("Person deleted successfully");
          setIsError(false);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting person:", error.response.data.error);
          setMessage(
            "Failed to delete person, information has already been removed from server",
          );
          setIsError(true);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personExists.number = newNumber;
        personService
          .updatedPerson(personExists.id, personExists)
          .then((updatedPerson) => {
            setMessage(`Updated ${updatedPerson.name}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setIsError(false);
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : updatedPerson,
              ),
            );
          })
          .catch((error) => {
            console.error("Error updating person:", error.response.data.error);
            setMessage(
              `Failed to update ${personExists.name}, information has already been removed from server`,
            );
            setIsError(true);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== personExists.id));
          });
      }
      return;
    }

    personService
      .createPerson(personObject)
      .then((returnedPerson) => {
        setMessage(`Added ${returnedPerson.name}`);
        setIsError(false);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
      })
      .catch((error) => {
        console.error("Error creating person:", error.response.data.error);
        setMessage(`Failed to add ${newName}. Please try again.`);
        setIsError(true);
      });

    setNewName("");
    setNewNumber("");
  };

  const personsFiltered = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter filterValue={filter} setFilter={setFilter} />
      <PersonForm
        onSubmit={handleSubmit}
        person={{ newName, newNumber, setNewName, setNewNumber }}
      />
      <Persons persons={personsFiltered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

