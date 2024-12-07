//import React from 'react';
import Card from '../Components/Card';
import { useGlobalContext } from '../Components/utils/global.context';

const Home = () => {
  const { state } = useGlobalContext();
  
  return (
    <div className="contenedor">
      {state.data.map(dentist => (
        <Card key={dentist.id} dentist={dentist} />
      ))}
    </div>
  );
};
export default Home;