import { useEffect, useState } from "react"
import { CATEGORIES } from "../utils/references";
import Form from 'react-bootstrap/Form';
import React from "react";
import { ISearchBoxProps } from "../interfaces";
import user from "../utils/user.service";



export const Search: React.FC<ISearchBoxProps> = ({ onSearch }) => {

    const [query, setQuery] = useState('');
    const [categories,setCategories]=useState<Array<string>>([])
    const currentUser = user.getUserData();
    const [showCategories,setShowCategories]:any[] = useState([...CATEGORIES]);
    
   

    const handleCategories=(e:any)=>{
        let selected = e.target.value;
        if(categories.includes(selected)){
            setCategories(categories.filter(item=>item!==selected));            
        } else{
            setCategories([...categories,e.target.value]);
        }
      
    }
    useEffect(()=>{
       
        if(currentUser.role ==='admin'){
            setShowCategories([...CATEGORIES,'Bought']);
        }
    },[])
    return (
        <div className="search-box">
            <div className="input-group-append">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="address,city,zip..."
                        className='search-box'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="categories-search">
                        {showCategories.map((item:string, index:number) => {
                            return <Form.Check
                                type='checkbox'
                                label={item}
                                value={item}
                                onChange={handleCategories}
                                key={index}
                            ></Form.Check>
                        })}
                    </div>
                    <span onClick={() => onSearch({query:query,category:categories})} className="search-button"><i className='bi bi-search'></i></span>
                </div>
            </div>
        </div>
    )

}