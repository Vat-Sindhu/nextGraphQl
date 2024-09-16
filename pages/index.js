import { useQuery,useMutation, gql } from '@apollo/client';
import client from '../lib/apolloClient';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_ITEMS,{ client });
  const [deleteItem] = useMutation(DELETE_ITEM,{ client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const handleDelete = async (id) => {
     await deleteItem({ variables: { id } });
    // Optionally refetch data or redirect
  };
 

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.heading}>Items</h1>
        <div className={styles.gridContainer}>
          {data.getItems.map((item) => (
            <div key={item.id} className={styles.gridItem}>
              <h2 className={styles.itemName}>{item.name}</h2>
              <div className={styles.buttonContainer}>
                <button 
                  className={styles.deleteButton} 
                  onClick={() => handleDelete(item.id)}
                >
                  <AiOutlineDelete size={24} />
                </button>
                <Link href={`/edit/${item.id}`}>
                  <AiOutlineEdit size={24} className={styles.editIcon} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link href="/create">Create New Item</Link>
      </div>
    </div>
  );

//   return (
//     <div>
//       <h1>Items</h1>
//       <ul>
//   {data.getItems.map((item) => (
//     <li key={item.id}>
//           {item.name}
//           <button onClick={() => handleDelete(item.id)}>Delete</button>
//           {/* <Link href={`/edit/${item.id}`}>Edit</Link> */}
//   < Link href={`/edit/${item.id}`}>Edit</Link>
//     </li>
//   ))}
// </ul>
//       <Link href="/create">Create New Item</Link>
//     </div>
//   );
}
