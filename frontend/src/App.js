import {useState} from 'react';
import Navbar from './components/Navbar';
import ItemsData from './components/ItemsData';


function App() {

  const [isClicked,setIsClicked] = useState(false);
  function clicked(){
      setIsClicked(true)
    }
  function disabled(){
    setIsClicked(false)
  }

  return (

    <section>
      <Navbar/>
      <button type="button" onClick={()=>clicked()} className="my-3 btn btn-primary btn-lg ms-4">Add</button>    
      <ItemsData isClicked={isClicked} disabled={disabled}/>
    </section>
  );

}

export default App;
