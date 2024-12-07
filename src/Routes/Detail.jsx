import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextGlobal } from "../Components/utils/global.context.jsx";

const Detail = () => {
  const { state } = useContext(ContextGlobal);
  const { id } = useParams();
  const [dentist, setDentist] = useState(null);

  useEffect(() => {
    const fetchDentist = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      setDentist(data);
    };
    fetchDentist();
  }, [id]);

  return (
    <div className={`table ${state.theme}`}>
      {dentist && (
        <>
          <h1>Detail Dentist id {dentist.id}</h1>
          <p>Name: {dentist.name}</p>
          <p>Email: {dentist.email}</p>
          <p>Phone: {dentist.phone}</p>
          <p>Website: {dentist.website}</p>
        </>
      )}
    </div>
  );
};

export default Detail;