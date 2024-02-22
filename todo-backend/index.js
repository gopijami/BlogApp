const express = require('express')
const mySql = require('mysql')
const multer = require('multer');
const cors = require('cors');
const app = express()
app.use(cors());


// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const db = mySql.createPool({
    host: "localhost",
    user: "root",
    password: "8790518724@Gopijami",
    port: 3306,
    database: "todo-data",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timeout: 60000, // 60 seconds (adjust as needed)
})



// REST.prototype.connectMysql = function() {
//     var self = this;
//     var db      =    mySql.createPool({
//         connectionLimit : 100,
//         waitForConnections : true,N
//         queueLimit :0,
//         host: "localhost",
//         user: "root",
//         password: "8790518724@Gopijami",
//         port:8080,
//         database: "todo-data",
//         debug    :  true,
//         wait_timeout : 28800,
//         connect_timeout :10
//     });
//     self.configureExpress(pool);
// }

app.use(express.json({ limit: '50mb' }));



app.get("/todos", (req, res) => {
    const q = "SELECT * FROM todos";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.post("/todos", (req, res) => {
    const q = "INSERT INTO todos(`title`,`body`,`user_name`,`email`,`created_at`,`likes`,`dislikes`,`image_url`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.body,
        req.body.user_name,
        req.body.email,
        req.body.created_at,
        req.body.likes,
        req.body.dislikes,
        req.body.image_url
    ]
    db.query(q, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json("todo created successfully");
    });
});

app.put('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const q = "UPDATE todos SET `title`=?, `body`=?, `user_name`=?, `email`=?, `created_at`=?, `likes`=?, `dislikes`=?, `image_url`=? WHERE id=?";
    const values = [
        req.body.title,
        req.body.body,
        req.body.user_name,
        req.body.email,
        req.body.created_at,
        req.body.likes,
        req.body.dislikes,
        req.body.image_url,
        todoId
    ]
    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json("Todo updated successfully");
    });
});

// // if there is authentication problem use this command
// // ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '8790518724@Gopijami';


// app.get('/',(req, res)=>{
//   res.json("hello this is backend")
// })

// app.get("/todos",(req,res)=>{
//     const q = "SELECT * FROM todos"
//     db.query(q,(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })



// // app.post('/todos', upload.single('image_url'), (req, res) => {
// //     try {
// //       // Extract form data
// //       const formData = req.body;
  
// //       // Check if req.file is defined
// //       if (!req.file) {
// //         return res.status(400).json({ error: 'No file uploaded.' });
// //       }
  
// //       // Process the file
// //       const imageBuffer = req.file.buffer.toString('base64');
// //       const imageUrl = `data:image/jpeg;base64,${imageBuffer}`;
  
// //       // Combine form data with image URL
// //       const todoData = {
// //         title: formData.title,
// //         body: formData.body,
// //         user_name: formData.user_name,
// //         email: formData.email,
// //         created_at: formData.created_at,
// //         likes: formData.likes,
// //         dislikes: formData.dislikes,
// //         image_url: imageUrl,
// //       };
  
// //       // Insert into the database
// //       const q = 'INSERT INTO todos(`title`, `body`, `user_name`, `email`, `created_at`, `likes`, `dislikes`, `image_url`) VALUES (?)';
// //       const values = [
// //         todoData.title,
// //         todoData.body,
// //         todoData.user_name,
// //         todoData.email,
// //         todoData.created_at,
// //         todoData.likes,
// //         todoData.dislikes,
// //         todoData.image_url,
// //       ];
  
// //       db.query(q, [values], (err, data) => {
// //         if (err) {
// //           console.error(err);
// //           return res.status(500).json({ error: 'Error inserting data into the database.' });
// //         }
  
// //         // Respond with success
// //         return res.json({ success: true, todoData });
// //       });
// //     } catch (error) {
// //       console.error(error);
// //       return res.status(500).json({ error: 'Internal Server Error' });
// //     }
// //   });


// app.post("/todos", (req, res)=>{
//     const q = "INSERT INTO todos(`title`,`body`,`user_name`,`email`,`created_at`,`likes`,`dislikes`,`image_url`) VALUES (?)"
//     const values = [
//         req.body.title,
//         req.body.body,
//         req.body.user_name,
//         req.body.email,
//         req.body.created_at,
//         req.body.likes,
//         req.body.dislikes,
//         req.body.image_url]
//     db.query(q,[values],(err,data)=>{
//         if(err) return res.json(err);
//         return res.json("todo created successfully");
//     });
// })

// app.put('/todos/:id',(req,res)=>{
    
//     const todoId = req.params.id;
//     const q = "UPDATE todos SET `title`=?, `body`=?, `user_name`=?, `email`=?, `created_at`=?, `likes`=?, `dislikes`=?, `image_url`=? WHERE id=?";

//     const values = [
//         req.body.title,
//         req.body.body,
//         req.body.user_name,
//         req.body.email,
//         req.body.created_at,
//         req.body.likes,
//         req.body.dislikes,
//         req.body.image_url
//     ]
//     db.query(q,[...values,todoId],(err, data)=>{
//         if(err)  return res.json(err);
//         return res.json("Todo id updated sucessfully")
//     });
// })


// app.put('/todos/:id',(req,res)=>{
    
//     const todoId = req.params.id;
//     const q = "UPDATE todos SET `title`=?, `body`=?, `user_name`=?, `email`=?, `created_at`=?, `likes`=?, `dislikes`=?, `image_url`=? WHERE id=?";

//     const values = [
//         req.body.title,
//         req.body.body,
//         req.body.user_name,
//         req.body.email,
//         req.body.created_at,
//         req.body.likes,
//         req.body.dislikes,
//         req.body.image_url
//     ]
//     db.query(q,[...values,todoId],(err, data)=>{
//         if(err)  return res.json(err);
//         return res.json("Todo id updated sucessfully")
//     });
// })


// app.put('/todos-likes/:id',(req,res)=>{
    
//     const todoId = req.params.id;
//     const q = "UPDATE todos SET `likes`=?,`dislikes`=? WHERE id=?";

//     const values = [
//         req.body.likes,
//         req.body.dislikes,
//     ]
//     db.query(q,[...values,todoId],(err, data)=>{
//         if(err)  return res.json(err);
//         return res.json("Todo id updated sucessfully")
//     });
// })


// app.delete("/todos/:id", (req,res)=>{
//     const todoId = req.params.id;
//     const q= "DELETE FROM todos WHERE id = ?";

//     db.query(q, [todoId], (err,res)=>{
//             if (err) return res.json(err);
//             return res.json(`todo has been deleted successfully at id ${todoId}`)
//     })
// })


// // app.post("/books/", async (request, response) => {
// //     const bookDetails = request.body;
// //     const {
// //       title,
// //       authorId,
// //       rating,
// //       ratingCount,
// //       reviewCount,
// //       description,
// //       pages,
// //       dateOfPublication,
// //       editionLanguage,
// //       price,
// //       onlineStores,
// //     } = bookDetails;
// //     const addBookQuery = `
// //       INSERT INTO
// //         book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
// //       VALUES
// //         (
// //           '${title}',
// //            ${authorId},
// //            ${rating},
// //            ${ratingCount},
// //            ${reviewCount},
// //           '${description}',
// //            ${pages},
// //           '${dateOfPublication}',
// //           '${editionLanguage}',
// //            ${price},
// //           '${onlineStores}'
// //         );`;
  
// //     const dbResponse = await db.run(addBookQuery);
// //     const bookId = dbResponse.lastID;
// //     response.send({ bookId: bookId });
// //   });


app.listen(8080,()=>{console.log('Server running on port 8080')})