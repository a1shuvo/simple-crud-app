import { use } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  console.log(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    console.log(newUser);

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
          alert("User added successfully!");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      {/* Add User */}
      <div>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" />
          <br />
          <input type="submit" value="Add User" />
        </form>
      </div>
    </div>
  );
};

export default Users;
