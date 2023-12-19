'use client'
// Example frontend code in Next.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addBlogApiData } from './redux/actions/action';
import { useAppDispatch } from './redux/hooks';
import Blogs from './blogs/page';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/todos");
        const data = response.data;
        setTodos(data);
        dispatch(addBlogApiData(data))
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='fluid-container' style={{backgroundColor:"white",minHeight:"100vh"}}>
      <div className='row'>
        <div className='col-12'>
            <h1 className='text-center mt-2' style={{fontFamily:"fantasy"}}>Blogs</h1>
            <Blogs todos={todos} />
        </div>
      </div>
     

      

      

      {/* <div>
        <label htmlFor="imageInput">Choose an image:</label>
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={handleImageChange}
        />

        {selectedImage && (
          <div>
            <p>Selected Image Preview:</p>
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Home;


 // const updatedData = await Promise.all(data.map(async (blogData) => {
        //   const imageBuffer = blogData.image_url.data;
        //   const base64Image = Buffer.from(imageBuffer).toString('base64');
        //   const imageUrl = `data:image/png;base64,${base64Image}`;
        //   blogData["image_url"] = imageUrl;
        //  console.log(imageUrl)
        //   return blogData;
        // }));