import { useEffect, useState } from "react";
import { Banner } from "./components/Banner/Banner";
import { Loader } from "./components/loader/Loader";
import { PhotoPreloader } from "./components/loader/PhotoPreloader";
import {useSelector} from "react-redux";
import { State } from "./reducers/combinedReducer";
import { Section } from "./components/Section/Section";


function App() {
  const [isLoading,setLoading] = useState<boolean>(false);
  const [isPreloaded,setPreloaded] = useState<boolean>(false);
  const loaderState = useSelector((state:State)=>state.loader);
  
  useEffect(()=>{
    if(loaderState.loaded){
        setPreloaded(true);
        setTimeout(()=>{
          setLoading(true);
        },5100)
    }
  },[loaderState.loaded])
  
  return (
    <>{isLoading?
      <>
        <Banner/>
        <Section/>
      </>:
      isPreloaded?
        <Loader/>:
        <PhotoPreloader/>}
    </>
  )
}

export default App
