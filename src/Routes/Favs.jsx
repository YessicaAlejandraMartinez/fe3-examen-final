//import { useContext } from "react";
import Card from "../Components/Card";
import { useGlobalContext } from "../Components/utils/global.context";

const Favs = () => {
  const { getFavorites, removeFavorite } = useGlobalContext();
  const favorites = getFavorites();

  const handleRemoveFavorite = (dentist) => {
    removeFavorite(dentist);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {favorites.map((dentist) => (
        <Card
          key={dentist.id}
          dentist={dentist}
          isFavorite
          onRemoveFavorite={handleRemoveFavorite}
        />
      ))}
    </div>
  );
};
export default Favs;