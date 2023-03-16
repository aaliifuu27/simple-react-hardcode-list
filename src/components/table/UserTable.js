import React from "react";

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users && props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>
              <button type="button"
                className="button muted-button"
                onClick={() => props.edit(user)}
              >
                Edit
              </button>
              <button type="button"
                className="button muted-button"
                onClick={() => props.delete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default UserTable;
