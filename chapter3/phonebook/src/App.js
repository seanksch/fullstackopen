import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ nameFilter, setNameFilter }) => {

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          filter shown with a <input value={nameFilter} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage }) => {

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    // console.log("names", names)
    const newPerson = { name: newName, number: newNumber }
    const newMessage = () => {
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    if (names.includes(newName)) {
      console.log(`${newName} is already added to phonebook`)
      // alert(`${newName} is already added to phonebook`)

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        // const changedPerson = {...newPerson, id: oldPerson.id} //no need to add in id
        personService.update(oldPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : newPerson))
            setNewName('')
            setNewNumber('')
            newMessage()
          })
      }

    } else {
      // setPersons(persons.concat({ name: newName, number: newNumber }))
      personService.create(newPerson)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          newMessage()
        })
    }
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ persons, nameFilter, setPersons, setMessage, setMessageType }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />)}
    </div>
  )
}

const Person = ({ person, persons, setPersons, setMessage, setMessageType }) => {

  const deleteId = person.id

  const clickHandler = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(deleteId)
        .then(response => {
          setPersons(persons.filter(person => person.id !== deleteId))
          // console.log(response.data) //empty
        })
        .catch(error => {
          setMessageType('error')
          setMessage(`Information of ${person.name} has aleady been removed from server`)
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
    }
  }

  return (
    <div>{person.name} {person.number} <button type="submit" onClick={clickHandler}>delete</button></div>
  )
}

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  if (messageType==='error'){
    return <div className='messageError'>{message}</div>
  } else {
    return <div className='message'>{message}</div>
  }

  

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    console.log('get persons')
    personService.getAll()
      .then(response => {
        console.log('persons promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />
    </div>
  )
}

export default App