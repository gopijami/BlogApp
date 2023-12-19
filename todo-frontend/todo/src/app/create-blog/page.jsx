"use client"
import {useState,useEffect,useRef} from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation"
// import '../../../public/css/common.css';
import './page.css'

const CreateBlog = ()=>{
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        user_name: '',
        email: '',
        created_at: '',
        likes:0,
        dislikes:0,
        image_url:""
      });
    
      const [errors, setErrors] = useState({
        title: '',
        body: '',
        user_name: '',
        email: '',
        created_at: '',
        image_url:""
      });

      const inputRef = useRef(null);

      const router = useRouter();

      useEffect(()=>{
        inputRef.current.focus();
      },[])
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    
        // Reset error message when user starts typing
        setErrors({
          ...errors,
          [name]: '',
        });
      };

      const updateData = async ()=>{
        try{
           const res = await axios.post("http://localhost:8080/todos",formData)
            console.log("data submited",res.data)
            router.push('/');
         }catch(err){
            console.log("Error Message:",err)
         }
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validation
        const newErrors = {};

        for (const key in formData) {
        const value = formData[key];

        // Check if the value is a string before calling trim
        if (typeof value === 'string' && value.trim() === '') {
            newErrors[key] = `${key} is required`;
        }
        }
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
    
        // Process the data (e.g., send it to the server)
        updateData()
        console.log('Form data submitted:', formData);
      };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        if (file) {
          // You can do something with the selected file, for example, display its name
          console.log('Selected Image:', file.name);
          
          // If you need to display the image preview, you can use FileReader
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedImage(e.target.result);
            setFormData({...formData,image_url:e.target.result})
            setErrors({
                ...errors,
                image_url: '',
              });
              console.log("this is console log base64",e.target.result)
          };
          reader.readAsDataURL(file);
        }
      };

    return(
           <div className='bg-container-data'>
                <div className='bg-container'>
                <form onSubmit={handleSubmit} className="form">
                <h1 className='create-blog-head'>Create Blog</h1>
                        <div className="formGroup">
                            <label htmlFor="title" className="label">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                ref={inputRef}
                                value={formData.title}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.title && <p className="error">{errors.title}</p>}
                        </div>

                        <div className="formGroup">
                        <label htmlFor="body" className="label">
                            Body:
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="textarea"
                        />
                        {errors.body && <p  className="error">{errors.body}</p>}
                        </div>

                        <div className="formGroup">
                        <label htmlFor="user_name" className="label">
                            Your Name:
                        </label>
                        <input
                            type="text"
                            id="user_name"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.user_name && <p  className="error">{errors.user_name}</p>}
                        </div>

                        <div className="formGroup">
                        <label htmlFor="email" className="label">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.email && <p  className="error">{errors.email}</p>}
                        </div>

                        <div className="formGroup">
                        <label htmlFor="created_at" className="label">
                            Created At:
                        </label>
                        <input
                            type="datetime-local"
                            id="created_at"
                            name="created_at"
                            value={formData.created_at}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.created_at && <p  className="error">{errors.created_at}</p>}
                        </div>

                        {/* <div className="formGroup">
                        <label htmlFor="likes" className="label">
                            Likes:
                        </label>
                        <input
                            type="number"
                            id="likes"
                            name="likes"
                            value={formData.likes}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.likes && <p  className="error">{errors.likes}</p>}
                        </div> */}

                        {/* <div className="formGroup">
                        <label htmlFor="dislikes" className="label">
                            Dislikes:
                        </label>
                        <input
                            type="number"
                            id="dislikes"
                            name="dislikes"
                            value={formData.dislikes}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.dislikes && <p  className="error">{errors.dislikes}</p>}
                        </div> */}

                        <div className="formGroup">
                        <label htmlFor="imageInput" className="label">Choose an image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageInput"
                        className="input"
                        onChange={handleImageChange}
                    />
                    {errors.image_url && <p  className="error">{errors.image_url}</p>}
                        </div>

                        <div className="formGroup">
                        <button type="submit" className="button">
                            Submit
                        </button>
                        </div>
                    </form></div>
           </div>
    )
}

export default CreateBlog