import React, { useState } from 'react';
import Modal from '../frontend/components/modal/modal'; // Importér din Modal-komponent
import Login from '../frontend/components/login/login.jsx';
import Signup from '../frontend/components/signup/signUp.jsx';

function LP() {
 

  return (
    <div>
     
<Modal openButtonText="Log ind" closeButtonText="Luk her">
 <Login />
</Modal>
<Modal openButtonText="Tilmeld dig" closeButtonText="Luk her">
 <Signup />
</Modal>


    </div>
  );
}

export default LP;
