import { useEffect } from 'react';
import Modal from '../frontend/components/modal/modal'; // Importér din Modal-komponent
import Login from '../frontend/components/login/login.jsx';
import Signup from '../frontend/components/signup/signUp.jsx';
import { Link } from 'react-router-dom';


function LP( ) {


  return (
    <>
     
<Modal openButtonText="Log ind" closeButtonText="Luk her">
 <Login />
</Modal>
<Modal openButtonText="Tilmeld dig" closeButtonText="Luk her">
 <Signup />
</Modal>
<Link to="/dashboard">Tilbage til dashboard</Link>


    </>
  );
}

export default LP;
