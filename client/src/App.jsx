import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(import.meta.env.VITE_API + "/users");
      const data = await response.json();
      setUsers(data.users);
    }
    loadUsers();
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_API + "/users", {
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
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
