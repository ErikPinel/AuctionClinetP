import REact,{useState,useEffect} from 'react'
import axios from 'axios';
import { ItemsBought } from '../Items/ItemBoughtSoled/ItemsBought'
import  PaginationPage from '../../components/PaginationComp/Pagination'


function DisplayItemBought()
{
  const[posts,setPosts]=useState([]);
  const[loading,setloading]=useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const[postPerPage,setPostPerPage]=useState(8);
  const[logId,setLogId]=useState();
  const[filter,setFilter]=useState();
    
  useEffect(()=>{
    const fetchPostsCurrentBought= async()=>{
        setloading(true);
        axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/getBought",{id:localStorage.getItem("logged")}).then((res) => {
          if(res.data.status=="sucsses")
          {
            setPosts(res.data.items.reverse());
        setloading(false)
      }
      else alert("items not found")
            
            })
    }
   



    const fetchPostsCurrentSoled= async()=>{
      setloading(true);
      axios.post("https://violet-kangaroo-suit.cyclic.app/api-users/users/getSoled",{id:localStorage.getItem("logged")}).then((res) => {
        if(res.data.status=="sucsses")
        {
      setPosts(res.data.items.reverse());
      setloading(false)
    }
    else alert("items not found")
          
          })
  }


  
  
if(filter=="itemBought")
fetchPostsCurrentBought();

else fetchPostsCurrentSoled();


  },[filter]);

  const paginate =pageNumber=> setCurrentPage(pageNumber)



  

  const indexOfLastPost=currentPage*postPerPage;
  const indexOfFirstPost=indexOfLastPost-postPerPage;
  const currentPost=posts.slice(indexOfFirstPost,indexOfLastPost)
return(

<div className='display-container-men'>

<ItemsBought posts={currentPost} loading={loading} setFilter={setFilter} filter={filter}></ItemsBought>
<PaginationPage paginate={paginate} postPerPage={postPerPage} totalPosts={posts.length} ></PaginationPage>


</div>

)

}

export default DisplayItemBought;