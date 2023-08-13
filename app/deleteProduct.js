"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteProduct(props){
    const deleteRecord = async() =>{
        let response = await fetch("http://localhost:3000/api/products/"+props.id, {
          method:"delete"
        });
        response = await response.json();
        if(response.success){
          alert("Product deleted");
        }
      }

    return(
        <button onClick={deleteRecord}>
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    )
}
