import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      const { data } = response;
      setRepositories(data);
    }).catch(err => console.log(err));
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: `https://testeurl:${Date.now()}`,
      title: `Title repository ${Date.now()}`,
      techs: [`Teste 1 ${Date.now()}`, `Teste 1 ${Date.now()}`]
    });

    const { data } = response;
    setRepositories([...repositories, data]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log(response);
    if(response.status === 204) {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      const filteredRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
