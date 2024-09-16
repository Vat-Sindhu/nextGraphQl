import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';
import { useRouter } from 'next/router';

const CREATE_ITEM = gql`
  mutation CreateItem($name: String!) {
    createItem(name: $name) {
      id
      name
    }
  }
`;

export default function Create() {
  const [name, setName] = useState('');
  const [createItem] = useMutation(CREATE_ITEM,{ client });
  const router = useRouter();

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    console.log(name,"****")
    await createItem({ variables: { name } });
    router.push('/');
    }
    catch(error){
        console.log(error,"create")
    }
  };

  return (
    <div>
      <h1>Create New Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
