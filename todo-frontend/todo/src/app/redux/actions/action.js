export const addBlogApiData = (todos)=>(
    {
        type: 'ADD_BLOG_API_DATA',
        todos:todos
    }
)

export const addBlogId = (id)=>(
    {
        type:'ADD_BLOG_ID',
        id:id
    }
)