import { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import client from '../../lib/apolloClient';

const GET_ITEM = gql`
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $name: String!) {
    updateItem(id: $id, name: $name) {
      id
      name
    }
  }
`;

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_ITEM, { client,variables: { id } });
  const [updateItem] = useMutation(UPDATE_ITEM,{client});
  const [name, setName] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.getItem.name);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem({ variables: { id, name } });
    router.push('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
