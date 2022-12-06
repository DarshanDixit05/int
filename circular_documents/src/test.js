import { useState,useEffect } from "react";
import {storage} from './firebase';
import {ref,uploadBytes,listAll,getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
function Test(){
    const imageListRef = ref(storage,'images/')
    const [imgUpload,setImgUpload]=useState(null);
    const [imgList,setImgList] = useState([]);
    const [url, setUrl] = useState('');
    const uploadImage = ()=>{
        if (imgUpload===null)return;

        const imageRef=ref(storage,`images/${imgUpload.name + v4()}`);
        uploadBytes(imageRef, imgUpload).then(()=>{
            alert("Image Uploaded")

        })
        

    };

    useEffect(()=>{
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImgList((prev)=>[...prev,url]);
                })
            })

        })

    },[]);

    return(
        <div>
            <input type='file' onChange={(event)=>{setImgUpload(event.target.files[0])}}/>
            <button onClick={uploadImage}>Upload</button>

            <p><a href={url}>{url}</a></p>
            {imgList.map((url)=>{
                return <div><a href={url}>Download</a><br/></div>

            })}
        </div>
    )
}

export default Test;
 