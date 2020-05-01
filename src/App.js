import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const res = await api.post('repositories', {
        url: "https://github.com/lucasncamargo",
        title: "Challange 02 - React.js",
        techs: ["React", "Node.js"],
      });
      setRepositories([...repositories, res.data]);
    } catch {
      alert('Não foi possível adicionar o repositório...');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch {
      alert('Não foi possível excluir o repositório...');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
