const Filter = ({ filterValue, setFilter }) => {
  return (
    <div>
      filter shown with: <input value={filterValue} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

export default Filter;