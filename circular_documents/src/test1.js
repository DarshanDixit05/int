import { useState } from "react";
import {storage} from './firebase';


function Test1(){

  const [image, setImage] = useState('');
  const [Url,setUrl] = useState('');

  const upload=()=>{
    if(image==null)
    return;
    setUrl('getting url link..')

    storage.ref('/images/'+image.name).put(image)
    .on('state_changed', alert("success"),alert,()=>
    {
      storage.ref("image").child(image.name).getDownloadURL()
      .then((Url)=>{
     
         setUrl(Url);
      })
    });
  }

  return(
    <div className="App">
     
      <br>
        </br>
      <input type='file' onChange={(e)=>{setImage(e.target.files[0])
      }}></input>

      <button onClick={upload}>upload</button>
      <br/>
      <p><a href={Url}>{Url}</a></p>
    </div>
  );
}
export default Test1;