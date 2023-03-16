import React, { useEffect, useState } from "react"

const UserForm = props => {
    const [user, setUser] = useState(props.currentUser)


    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    return (
        <form onSubmit={event => {
            event.preventDefault()
            if (props.edit) {
                props.update(user.id, user)
            } else {
                props.add(user)
            }
        }}>
            <label htmlFor="Email">Email</label>
            <input type="email" name="email"
                value={user.email}
                onChange={handleInputChange} />
            {!props.errors.email || (<strong>{props.errors.email}</strong>)}
            <label htmlFor="Name">Name</label>
            <input type="text" name="name"
                value={user.name}
                onChange={handleInputChange} />
            <button type="submit" disabled={!user.email || !user.name}>{props.edit ? 'Update' : 'Add'}</button>
            <button type="button" disabled={!props.edit && !user.email && !user.name} onClick={() => props.cancel()}>{props.edit ? "Cancel" : "Reset"}</button>
        </form>
    )
}

export default UserForm