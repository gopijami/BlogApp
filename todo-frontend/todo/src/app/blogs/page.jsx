"use client"
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faThumbsUp, faThumbsDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import { addBlogId } from "../redux/actions/action";
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";
import './page.css'

const colors = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#666666',
    '#FF6666',
    '#FF9999',
    '#6699FF',
    '#E666B3',
    '#FF33FF',
    '#FFD700',
    '#FF6347',
    '#C71585',
    '#008080',
    '#4B0082',
  ];

const Blogs = ({todos})=>{
    const dispatch = useDispatch()
    const [todoData,setTodoData] = useState([...todos])
    const [isUpdateBlogActive,setIsUpdateBlogActive] = useState(false)
    const [likes,setLikes] = useState('')
    const [dislikes,setDislikes] = useState("")
    const router = useRouter();
   
    useEffect(()=>{
        setTodoData([...todos])
    },[todos])

    const onAddId= (id)=>{
        dispatch(addBlogId(id))
        setIsUpdateBlogActive(true)

    }

    const addlikeFunc = async(id,likes,dislikes)=>{
        try{
            const like = parseInt(likes)+1
            setLikes(like)
            const formData = {likes:like,dislikes:dislikes}
            await axios.put("http://localhost:8080/todos-likes/"+id,formData)
            const newTodo = todoData.map(tod=>{
                if(tod.id === id){
                    tod.likes = like
                    return tod
                }
              return tod
            })
             console.log("newData",newTodo)
           setTodoData([...newTodo])
            // router.push("/")
        }catch(err){
            console.log(err)
        }
    }

    const onAddLike = (id,likes,dislikes)=>{

        addlikeFunc(id,likes,dislikes)
    }




    const adddislikeFunc = async(id,likes,dislikes)=>{
        try{
            const dislike = parseInt(dislikes)+1
            setLikes(dislike)
            const formData = {likes:likes,dislikes:dislike}
            await axios.put("http://localhost:8080/todos-likes/"+id,formData)
            const newTodo = todoData.map(tod=>{
                if(tod.id === id){
                    tod.dislikes = dislike
                    return tod
                }
              return tod
            })
             console.log("newData",newTodo)
           setTodoData([...newTodo])
            // router.push("/")
        }catch(err){
            console.log(err)
        }
    }

    const onAdddisLike = (id,likes,dislikes)=>{

        adddislikeFunc(id,likes,dislikes)
    }

    const loadTodos = (todo)=>{
        const randomIndex = Math.floor(Math.random() * colors.length);
        const colorT = colors[randomIndex];
        return(
                    <div key={todo.id} className="col-12 col-md-6 col-lg-6 col-xl-4">
                        <div className="m-4 bg-light blog-data-container">
                        <div className='img-container'>
                            <img src={todo.image_url} alt="Todo Image" className='imgs img-fluid' style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                         <div className='dsc'>
                                <h3 className="text-center txtcer">{todo.title}</h3>
                                <div className="description">
                                    <p>{todo.body}</p>
                                </div>
                                <div className="d-flex flex-row justify-content-start align-items-center mbm">
                                    <div className="text-letter" style={{borderColor:`${colorT}`}}>
                                        <h1 className="text" style={{color:`${colorT}`}}>{todo.user_name[0].toUpperCase()}</h1>
                                    </div>
                                    <div className="text-contain">
                                        <h5>{todo.user_name[0].toUpperCase()+todo.user_name.slice(1,todo.user_name.length)}</h5>
                                        <a href={`mailto:${todo.email}`}>{todo.email}</a>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <div className="d-flex flex-row justify-content-start align-items-center">
                                        <button className="btn btn-success marg" onClick={()=>onAddLike(todo.id,todo.likes,todo.dislikes)} >< FontAwesomeIcon icon={faThumbsUp} /><span>{todo.likes}</span></button> 
                                        <button className="btn btn-danger ml-2" onClick={()=>onAdddisLike(todo.id,todo.likes,todo.dislikes)} >< FontAwesomeIcon icon={faThumbsDown} /><span>{todo.dislikes}</span></button>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end align-items-center">
                                    <Link href="/update-blog"> <button className="btn btn-primary marg" onClick={()=>onAddId(todo.id)} ><abbr title="click here to edit blog">< FontAwesomeIcon icon={faEdit} /></abbr></button></Link>
                                    <button className="btn btn-danger ml-2" >< FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </div>
                         </div>
                         
                         </div>
                    </div>
        )
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12 blog-design-container">
                    {todoData.length !== 0 && todoData.map((todo) => (
                        loadTodos(todo)
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blogs