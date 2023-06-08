import { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const GET_LOCATIONS = gql`
    query GetUsers($page: Int, $limit: Int, $userId: ID) {
      users(page: $page, limit: $limit) {
        id
        firstName
        lastName
        password
        email
      }
      user(id: $userId) {
        id
        firstName
        lastName
        password
        email
      }
    }
  `;
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_LOCATIONS, {
    variables: { page, limit: 5, userId: '648022d1b036233015ef7dc3' },
  });

  const ADD_USER = gql`
    mutation Mutation($input: CreateUserInput!) {
      registerUser(input: $input) {
        id
        firstName
        lastName
        email
        password
      }
    }
  `;
  const [addUser, { data: addRes, loading: addLoading, error: addError }] = useMutation(ADD_USER);
  const handleNext = () => {
    fetchMore({
      variables: {
        page: page + 1,
      },
    });
    setPage(page + 1);
  };
  const handlePrev = () => {
    fetchMore({
      variables: {
        page: page - 1,
      },
    });
    setPage(page - 1);
  };
  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await addUser({
      variables: {
        input: {
          firstName: 'Mia',
          lastName: 'UIUX',
          email: '40up@gmail.com',
          password: 'sdfsdfsdkfj;sdjf',
        },
      },
    });
    refetch();
  };

  if (loading || addLoading) return <p>Loading...</p>;
  if (error || addError) return <p>Error : {error?.message || addError?.message}</p>;

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
      <div style={{ display: 'flex' }}>
        {data.users.map(({ firstName, lastName }: { firstName: string; lastName: string }) => (
          <div key={firstName} style={{ margin: '8px' }}>
            <h3>{firstName}</h3>
            <p>{lastName}</p>
          </div>
        ))}
      </div>
      <br />
      <div>email: {data.user.email}</div>
      <div>password: {data.user.password}</div>
      <button disabled={page === 1} onClick={handlePrev}>
        Prev Page
      </button>
      <button onClick={handleNext}>Next Page</button>
      <button onClick={handleAdd}>Add User</button>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
