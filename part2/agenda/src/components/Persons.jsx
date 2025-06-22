const Persons = ({ persons, handleDelete }) => {
  if (!persons || persons.length === 0) return <p>No persons to display</p>;

  return (
    <div>
      {persons.map(person => (
        <div key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Persons;