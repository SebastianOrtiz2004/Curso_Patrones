import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
}

const updatedPerson = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data)
}

export default { getAllPersons, createPerson, deletePerson, updatedPerson }
