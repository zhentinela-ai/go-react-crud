import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([
    {
      _id: "62f4f02dc82538635c2da44b",
      name: "maria",
    },
  ]);

  const API = import.meta.env.VITE_API || "http://localhost:4000";

  useEffect(() => {
    async function loadUsers() {
      // const response = await fetch(import.meta.env.VITE_API + "/users");
      const response = await fetch(API + "/users");
      const data = await response.json();
      if (data.users) setUsers(data.users);
      console.log(API);
    }
    loadUsers();
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button
        onClick={async () => {
          const response = await fetch("/users");
          const data = await response.json();
          console.log(data);
        }}
      >
        Obtener datos
      </button>
      <br />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Coloca tu username"
          onChange={(e) => setName(e.target.value)}
        />
        <button>Guardar</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
