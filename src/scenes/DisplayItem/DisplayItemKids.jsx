import REact,{useState,useEffect} from 'react'
import axios from 'axios';
import { Items } from '../../components/PaginationComp/Items';
import  {PaginationPage} from '../../components/PaginationComp/Pagination'


function DisplayItemKids()
{
  const[posts,setPosts]=useState([]);
  const[loading,setloading]=useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const[postPerPage,setPostPerPage]=useState(8);
  const[logId,setLogId]=useState();
  const[filter,setFilter]=useState();
    
  useEffect(()=>{
    const fetchPosts= async()=>{
        setloading(true);
        axios.get("http://localhost:5000/api-itemKids/itemkids").then((res) => {

        setPosts(res.data);
        setloading(false)
        localStorage.getItem("logged");
            
            })
    }


    const fetchPostsLtoH= async()=>{
      setloading(true);
      console.log("adjsjkdjs")
      axios.post("http://localhost:5000/api-itemKids/itemkids/lowToHigh").then((res) => {

      setPosts(res.data);
      setloading(false)
      localStorage.getItem("logged");
          
          })
  }



  const fetchPostsHtoL= async()=>{
    setloading(true);
    axios.post("http://localhost:5000/api-itemKids/itemkids/highToLow").then((res) => {

    setPosts(res.data);
    setloading(false)
    localStorage.getItem("logged");
        
        })
}



const fetchPostsUpVote= async()=>{
  setloading(true);
  axios.post("http://localhost:5000/api-itemKids/itemkids/upVote").then((res) => {

  setPosts(res.data);
  setloading(false)
  localStorage.getItem("logged");
      
      })
}



const fetchPostsSearch= async()=>{
  setloading(true);
  axios.post("http://localhost:5000/api-itemKids/itemkids/search",{filter:filter}).then((res) => {

  setPosts(res.data);
  setloading(false)
  localStorage.getItem("logged");
      
      })
}






if(filter=="highToLow")
fetchPostsHtoL();
else if(filter=="lowToHigh")
fetchPostsLtoH();

else if(filter=="upVote")
fetchPostsUpVote();

else if(!filter)
 fetchPosts();


 else fetchPostsSearch();

  },[filter]);

  const paginate =pageNumber=> setCurrentPage(pageNumber)



  

  const indexOfLastPost=currentPage*postPerPage;
  const indexOfFirstPost=indexOfLastPost-postPerPage;
  const currentPost=posts.slice(indexOfFirstPost,indexOfLastPost)
return(

<div className='display-container-men'>

<Items posts={currentPost} loading={loading} setFilter={setFilter} filter={filter}></Items>
<PaginationPage paginate={paginate} postPerPage={postPerPage} totalPosts={posts.length} ></PaginationPage>


</div>

)

}

export default DisplayItemKids;