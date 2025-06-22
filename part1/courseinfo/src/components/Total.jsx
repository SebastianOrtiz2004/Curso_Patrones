const Total = ({ parts }) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p><b>Total of exercises {total}</b></p>
  )
}

export default Total;