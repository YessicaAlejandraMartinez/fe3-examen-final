import React, { createContext, useReducer, useEffect, useMemo } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  data: []
};

export const ContextGlobal = createContext(undefined);

const ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_DENTISTS: 'SET_DENTISTS',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE'
};

const globalReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.TOGGLE_THEME: {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    }
    
    case ACTIONS.SET_DENTISTS: {
      return { ...state, data: action.payload };
    }
    
    case ACTIONS.ADD_FAVORITE: {
      const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      const isDuplicate = currentFavorites.some(fav => fav.id === action.payload.id);
      
      if (!isDuplicate) {
        const updatedFavorites = [...currentFavorites, action.payload];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { ...state };
      }
      return state;
    }
    
    case ACTIONS.REMOVE_FAVORITE: {
      const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updatedFavorites = currentFavorites.filter(
        fav => fav.id !== action.payload.id
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { ...state };
    }
    
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(globalReducer, initialState);


  const fetchDentists = useMemo(() => async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({ 
        type: ACTIONS.SET_DENTISTS, 
        payload: response.data 
      });
    } catch (error) {
      console.error('Error fetching dentists:', error);
    }
  }, []);

  useEffect(() => {
    fetchDentists();
  }, [fetchDentists]);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    toggleTheme: () => dispatch({ type: ACTIONS.TOGGLE_THEME }),
    addFavorite: (dentist) => dispatch({ 
      type: ACTIONS.ADD_FAVORITE, 
      payload: dentist 
    }),
    removeFavorite: (dentist) => dispatch({ 
      type: ACTIONS.REMOVE_FAVORITE, 
      payload: dentist 
    }),

    getFavorites: () => JSON.parse(localStorage.getItem('favorites') || '[]')
  }), [state]);

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(ContextGlobal);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a ContextProvider');
  }
  return context;
};

ContextProvider.propTypes = { 
  children: PropTypes.node.isRequired 
};
export default ContextProvider;