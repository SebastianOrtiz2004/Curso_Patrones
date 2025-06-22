const PersonForm = ({ person, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add a new contact</h2>
      <div>
        name: <input value={person.newName} onChange={(e) => person.setNewName(e.target.value)} />
        number: <input value={person.newNumber} onChange={(e) => person.setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}
 export default PersonForm;