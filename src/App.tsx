import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const GET_LOCATIONS = gql`
    query GetSearchResults {
      search(contains: "") {
        __typename
        ... on Book {
          title
        }
        ... on Author {
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <div>src/App.tsx</div> and save to test HMR
        </p>
      </div>
      <div>
        {data.search.map(({ title, name }: { title: string; name: string }) => (
          <div key={name}>
            <h3>{name}</h3>
            <p>{title}</p>
            <br />
          </div>
        ))}
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
