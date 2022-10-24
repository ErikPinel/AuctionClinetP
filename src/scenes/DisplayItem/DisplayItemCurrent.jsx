import REact,{useState,useEffect} from 'react'
import axios from 'axios';
import  {ItemsCurrent} from '../../scenes/Items/ItemCurrent/ItemsCurrent';
import  PaginationPage from '../../components/PaginationComp/Pagination'


function DisplayItemCurrent()
{
  const[posts,setPosts]=useState([]);
  const[loading,setloading]=useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const[postPerPage,setPostPerPage]=useState(8);
  const[logId,setLogId]=useState();
  const[filter,setFilter]=useState();
    
  useEffect(()=>{
    const fetchPostsCurrent= async()=>{
        setloading(true);
        axios.post("http://localhost:5000/api-currentHistory/currentBid",{id:localStorage.getItem("logged")}).then((res) => {

        setPosts(res.data);
        setloading(false)
        localStorage.getItem("logged");
            
            })
    }


    fetchPostsCurrent();

  },[filter]);

  const paginate =pageNumber=> setCurrentPage(pageNumber)



  

  const indexOfLastPost=currentPage*postPerPage;
  const indexOfFirstPost=indexOfLastPost-postPerPage;
  const currentPost=posts.slice(indexOfFirstPost,indexOfLastPost)
return(

<div className='display-container-men'>

<ItemsCurrent posts={currentPost} loading={loading} setFilter={setFilter} filter={filter}></ItemsCurrent>
<PaginationPage paginate={paginate} postPerPage={postPerPage} totalPosts={posts.length} ></PaginationPage>


</div>

)

}

export default DisplayItemCurrent;