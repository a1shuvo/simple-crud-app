import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Name: {user.email}</p>
    </div>
  );
};

export default UserDetails;
