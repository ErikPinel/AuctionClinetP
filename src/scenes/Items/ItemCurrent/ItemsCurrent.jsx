import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./item.css";
import emailjs from "@emailjs/browser";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faThumbsUp } from '@fortawesome/fontawesome-free-solid'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Divider } from "@mui/material";

let _ITEM=[];
let modalPost=null;

function MyVerticallyCenteredModal(state,props) {
  return (
    <Modal
      {...state}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header  closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {state.items} 
     
      
      <div>
          { state.post?  state.post.offers.map((e,index)=>(
            <div className="modal-item-container">
            {index==0 ?
            <span className="span-modal">Starting price</span>: index==state.post.offers.length-1? <span className="span-modal">{"bid number : "+index+" - current bid"}</span> :<span className="span-modal">{"bid number : "+index}</span>}
            <div className="modal-bid" key={index}>{e.currentBid+"$"} </div>
            </div>
          )):""}
          
        </div>
             
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={state.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}





let BuyerDataToEmail = null;
let SellerDataToEmail = null;
export const ItemsCurrent = ({ posts, loading ,setFilter}) => {
  const [bid, setBid] = useState();
  const [UserID,setUserID]=useState();
  const [logged,setLogged]=useState(false);
  const [time,setTime]=useState();
  const [effectIterval,setEffectIterval]=useState(0);
  const [items,setItems]=useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("black");
  const [search, setSearch] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [indexItem, setIndexItem] = useState(0);
  




  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }




  

  useEffect(()=>{
if(!logged)
{ setUserID(localStorage.getItem("logged")?localStorage.getItem("logged"):null);
axios.post(`http://localhost:5000/api-users/users/logged`,{"user":UserID}).then((res) => {
if(res.data.status=="logged")
setLogged(true) })
}
console.log(effectIterval)
    setItems(posts.map((posts, index) => (
      <>

      <hr />
      {_ITEM=
      <div className="item-container"  key={posts.id} >
        
        <div  onClick={() => {setIndexItem(index); setModalShow(true)}}><img className="item-img" src={posts.image} width={window.screen.height*0.3}
        height={window.screen.height*0.35}  />  </div>
        <div className="left-contant">
       
        <h3 className='item-description'>{posts.description}</h3>
       
     
          <div>
                 
            <h4 className="currentBid">
              current bid :
              {posts.offers[posts.offers.length - 1].currentBid
                ? posts.offers[posts.offers.length - 1].currentBid+"$"
                : 5+"$"}
            </h4>
            <span className="bid-input-container">
              <input
                onChange={(e) => setBid(e.target.value)}
                type={"number"}
                placeholder={`min bid is: ${
                  posts.offers[posts.offers.length - 1].currentBid
                  ? Number(posts.offers[posts.offers.length - 1].currentBid)+6+"$"
                  : 5}
                } $`}
              />
           
            </span>
           <div> { logged?<Button className="bid-button" onClick={() => {heandleBid(posts);window.location.reload(false)}}> submit bid</Button>:""}</div>
            
            
          </div>
        
        </div>
        <div className="time-container">
            <h4 className="item-time">
              <div><span >The auction will end in : </span></div>
              {handleTime(
                posts,
                posts.dueDate,
                (new Date(posts.dueDate).getTime() - new Date().getTime()) /
                  1000 /
                  60 /
                  60,
                index
              )}
            </h4>
            </div>
      </div>}

    
     {(posts.upVotes? posts.upVotes.some(e=>e==localStorage.getItem("logged")) ?  <FontAwesomeIcon style={{color: "blue"}}  className="thumbsUp" icon={faThumbsUp} />: <FontAwesomeIcon onClick={()=>handleUpVote(posts)} color={`${color}`} className="thumbsUp" icon={faThumbsUp} />:<FontAwesomeIcon onClick={()=>handleUpVote(posts)} color={`${color}`} className="thumbsUp" icon={faThumbsUp} />)} <span className="show-votes">{posts.upVotes?posts.upVotes.length+ " - up votes":""}</span>
              
      </>
    )))
  
  setTimeout(function (){  setEffectIterval(effectIterval+1)}, 1000);
  
  },[effectIterval])

  if (loading) {
    return <h2>loading...</h2>;
  }


  function handleUpVote(post) {
    let votes = post.upVotes;
    if (!votes)
     votes = [];
    votes.push(localStorage.getItem("logged"));
    if (post.section == "Men-section") {
      axios
      .patch(`http://localhost:5000/api-itemMen/itemmen/${post._id}`, { upVotes: votes })
      .then((data) => console.log(data));
    }
      else if (post.section == "Women-section") {
        axios
        .patch(`http://localhost:5000/api-itemWomen/itemwomen/${post._id}`, { upVotes: votes })
        .then((data) => console.log(data));
      }
      else if (post.section == "Kids-section") {

        axios
        .patch(`http://localhost:5000/api-itemKids/itemkids/${post._id}`, { upVotes: votes })
        .then((data) => console.log(data));
      }
   
  }

  function findUser(buyerId, sellerID) {
    console.log(buyerId);

    axios.get(`http://localhost:5000/api-users/users/${buyerId}`).then((res) => {
      let obj = {
        name: res.data[0].fullName,
        email: res.data[0].email,
        phone: res.data[0].phone,
      };
      BuyerDataToEmail = obj;
      console.log(BuyerDataToEmail);
    });

    axios.get(`http://localhost:5000/api-users/users/${sellerID}`).then((res) => {
      let obj = {
        name: res.data[0].fullName,
        email: res.data[0].email,
        phone: res.data[0].phone,
      };
      SellerDataToEmail = obj;
      console.log(SellerDataToEmail.name);
    });
  }

  function heandleBid(posts) {
    let updatedOffers = posts.offers;
    console.log(posts.offers);
    let currentBid = Number(bid);
    const bidderID = localStorage.getItem("logged");
    const obj = { currentBid, bidderID };
    updatedOffers.push(obj);
    console.log(posts.offers[posts.offers.length - 1] + 5);
    if(posts.sellerID==bidderID)
    alert("you can not bid on your own item")
    else
    {
    if (
      Number(currentBid) >=Number( posts.offers[posts.offers.length - 2].currentBid)+5||
      !posts.offers[posts.offers.length - 2]
    ) {
      if(posts.section=="Men-section")
      {
      axios
        .patch(`http://localhost:5000/api-itemMen/itemmen/${posts._id}`, { offers: updatedOffers })
        .then((data) => console.log(data));
      }
      else if(posts.section=="Women-section")
            {
              axios
        .patch(`http://localhost:5000/api-itemWomen/itemwomen/${posts._id}`, { offers: updatedOffers })
        .then((data) => console.log(data));
            }
            else if(posts.section=="Kids-section")
            {
              axios
              .patch(`http://localhost:5000/api-itemKids/itemkids/${posts._id}`, { offers: updatedOffers })
              .then((data) => console.log(data));
            }

    } else alert("invalid bid");
  }
  }

  function del(i) {
    axios.delete(`http://localhost:5000/api-itemMen/itemmen/${posts[i]._id}`);
  }

  function handleTime(posts, dueDate1, hours, index) {
    let hours1;
    let countDownDate = new Date(dueDate1).getTime();
    let now = new Date().getTime();
    let timeleft = countDownDate - now;


    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    if (hours <= 0 && minutes <= 0 && seconds<=0) {
      del(index);
      sendEmail(posts);
    }
    if (
      Math.floor(
        (new Date(dueDate1).getTime() - new Date().getTime()) / 1000 / 60 / 60
      ) < 10
    )
      hours1 =
        "0" +
        Math.floor(
          (new Date(dueDate1).getTime() - new Date().getTime()) / 1000 / 60 / 60
        );
    else
      hours1 = Math.floor(
        (new Date(dueDate1).getTime() - new Date().getTime()) / 1000 / 60 / 60
      );
      if(seconds<10)
      seconds="0"+seconds;
    if (minutes < 10) return hours1 + ":" + 0 + "" + minutes;
    return hours1 + " hr : " + minutes+" min : "+seconds+" sec";
  }

  async function sendEmail(post) {
    findUser(post.offers[post.offers.length - 1].bidderID, post.SellerID);
    setTimeout(() => {
      console.log(BuyerDataToEmail);
      console.log(BuyerDataToEmail.name);
      let template = {
        Buyername: BuyerDataToEmail.name,
        buyerEmail: BuyerDataToEmail.email,
        buyerPhone: BuyerDataToEmail.phone,
        price: post.offers[post.offers.length - 1].currentBid,
        sellerName: SellerDataToEmail.name,
        sellerEmail: SellerDataToEmail.email,
        sellerPhone: SellerDataToEmail.phone,
        itemTitle: post.title,
      };

      emailjs
        .send(
          "service_2q5qis6",
          "template_pp6hcbr",
          template,
          "Mj_J6Pat93b04PIIj"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );

      emailjs
        .send(
          "service_2q5qis6",
          "template_2hbm3tu",
          template,
          "Mj_J6Pat93b04PIIj"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    }, 1000);
  }
  
function handleInput(e)
{
  console.log(e.target.value)
}


 
  return (
    <div className="item-page-container">
   
    <div className="side-section-container">
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        items={items[indexItem]}
        post={posts[indexItem]}
      />
   
      <h3> select section</h3>
      <hr />
    
                 <NavLink className="nav-btn" to="/displayMen"><strong>Mens Section</strong></NavLink>
                 <NavLink className="nav-btn" to="/displayWomen"><strong>Women Section</strong></NavLink>
                 <NavLink className="nav-btn" to="/displayKids"><strong>Kids Section</strong></NavLink>

                 <hr />
                 <h4>My current auctions </h4>
                 <NavLink className="nav-btn" to="/displayCurrent"><strong>currently bidding</strong></NavLink>
                 <NavLink className="nav-btn" to="/displayKids"><strong>currently selling</strong></NavLink>
                 <hr />



                 <h4>previus auctions</h4>
                 <NavLink className="nav-btn" to="/displayKids"><strong>bidding history</strong></NavLink>
                 <NavLink className="nav-btn" to="/displayKids"><strong>solled items</strong></NavLink>
                 
                 
    </div>
   
    <div className="list-items-container">
   
     <ul>
     <h3 className="men-sec"> Current biddings </h3>
      {items}
      <hr />
      </ul>
     
      
    </div>
    
    </div>
  );
};
