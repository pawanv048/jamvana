import React, {useContext, useState, useReducer} from 'react';


const DetailsContext = React.createContext();

export const DetailsDataProvider = ({children}) => {
  const [data, setData] = useState([]);
  return (
    <DetailsContext.Provider value={{data, setData}}>
      {children}
    </DetailsContext.Provider>
  );
};

export default () => useContext(DetailsContext);