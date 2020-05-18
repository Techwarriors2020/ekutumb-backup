import React from 'react';
import Kutumb from 'kutumb-style';
import RegistrationModule from '../src/modules/registration/container';
function App() {
  console.log('kutumb css' + Kutumb);
  return (
    <div className="App">
     
      <RegistrationModule/>
     </div>
  );
}

export default App;
