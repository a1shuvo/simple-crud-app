const Users = () => {
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    console.log(newUser);
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
