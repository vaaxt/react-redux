import Header from "../src/components/header";
import Footer from "../src/components/footer";
import Home from "./pages/home";
import { useSelector } from 'react-redux'; 

function App(){
  const message = useSelector(state => state.ui.message);

  return(
    <>
      <Header/>
      
      <div style={{textAlign: 'center', padding: '20px'}}>
        <h2>{message}</h2>
      </div>
      
      <Home />
      <Footer />
    </>
  )
}

export default App;