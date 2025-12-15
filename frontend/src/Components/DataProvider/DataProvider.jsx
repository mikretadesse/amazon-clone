import { createContext, useReducer } from "react";
import { reducer, initialState } from "../../Pages/Utility/Reducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //array destructuring
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
