import { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  // Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    // Create user in the DB
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data after creating user in the DB", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("User added successfully!");
          e.target.reset();
        }
      });
  };

  // Delete User
  const handleDeleteUser = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUser = users.filter((user) => user._id !== id);
          setUsers(remainingUser);
        }
      });
  };
  return (
    <div>
      <h3>Users: {users.length}</h3>
      {/* Add User */}
      <div>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" />
          <br />
          <input type="submit" value="Add User" />
        </form>

        {/* View Users */}
        <div>
          {users.map((user) => (
            <p key={user._id}>
              {user.name} : {user.email}{" "}
              <Link to={`/users/${user._id}`}>Details</Link>
              {" | "}
              <Link to={`/update/${user._id}`}>Edit</Link>
              {" | "}
              <button onClick={() => handleDeleteUser(user._id)}>x</button>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
