import { useMemo, useState } from 'react'
import UserForm from './components/form/UserForm'
import UserTable from './components/table/UserTable'
import { v4 as uuidv4 } from 'uuid'

import './App.css'

const App = () => {
  const userData = [
    {
      id: "a88300f8-b99c-4f85-9969-f86ca38acfb1",
      email: "aaa@email.com",
      name: "aaa"
    },
    {
      id: "32114e81-c7d8-492f-b1d8-ec7388df679c",
      email: "bbb@email.com",
      name: "bbb"
    },
    {
      id: "c80f5fd0-952e-4170-b228-733e2dcc3f84",
      email: "ccc@email.com",
      name: "ccc"
    },
  ]

  const initialUser = useMemo(() => ({
    id: '',
    email: '',
    name: ''
  }), [])

  const [users, setUsers] = useState(userData)
  const [edit, setEdit] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialUser)

  const initialErrors = {
    email: null,
    name: null
  }

  const [errors, setErrors] = useState(initialErrors)

  const editUser = (user) => {
    setErrors(initialErrors)
    setEdit(true)
    setCurrentUser(user)
  }

  const cancelEdit = () => {
    setErrors(initialErrors)
    setEdit(false)
    setCurrentUser(initialUser)
  }

  const updateUser = (id, updateUser) => {
    if (!takenEmail(updateUser)) {
      setUsers(users.map((user) => (user.id === id ? updateUser : user)))
      cancelEdit()
    } else {
      setCurrentUser(updateUser)
    }
  }

  const takenEmail = (input) => {
    const taken = users.some((user) => {
      return user.email === input.email && user.id !== input.id
    })

    if (!taken) {
      setErrors(initialErrors)
      return false
    }

    setErrors({ ...errors, email: "Email has been taken!" })
    return true
  }

  const addUser = (user) => {
    if (!takenEmail(user)) {
      user.id = uuidv4()
      setUsers([...users, user])
      cancelEdit()
    } else {
      setCurrentUser(user)
    }
  }

  const deleteUser = (id) => {
    const result = window.confirm('Are you sure you want to delete this item?')
    if (result) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  return (
    <div className="container">
      <h1>Example Hardcode CRUD</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{edit ? "Edit User" : "Add User"}</h2>
            <UserForm
              currentUser={currentUser}
              cancel={cancelEdit}
              update={updateUser}
              add={addUser}
              edit={edit}
              errors={errors} />
          </div>
        </div>
        <div className="flex-large">
          <UserTable
            users={users}
            edit={editUser}
            delete={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App
