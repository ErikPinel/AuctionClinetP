import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./item.css";
import emailjs from "@emailjs/browser";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faThumbsUp } from "@fortawesome/fontawesome-free-solid";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../../theme";



let _ITEM = [];
let modalPost = null;
let itemsBought=[];
let itemsSoled=[];



function MyVerticallyCenteredModal(state, props) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);




  return (
    theme.palette.mode === "dark" ?
    <Modal
      {...state}
      size="l"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      style={{"color":"white"}}
    >
      <Modal.Header closeButton style={{"backgroundColor":`${colors.primary[400]}`}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{"color":"white"}}>
          {props.title} 
        </Modal.Title>
      </Modal.Header >
      <Modal.Body style={{"backgroundColor":`${colors.primary[500]}`}}>
        {state.items}  

        <div>
          {state.post
            ? state.post.offers.map((e, index) => (
                <div className="modal-item-container">
                  {index == 0 ? (
                    <span className="span-modal">Starting price</span>
                  ) : index == state.post.offers.length - 1 ? (
                    <span className="span-modal">
                      {"bid number : " + index + " - current bid"}
                    </span>
                  ) : (
                    <span className="span-modal">
                      {"bid number : " + index}
                    </span>
                  )}
                  <div className="modal-bid" key={index}>
                    {e.currentBid + "$"}{" "}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </Modal.Body>
      <Modal.Footer style={{"backgroundColor":`${colors.primary[500]}`}}>
        <Button  onClick={state.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    
    :
      <Modal
      {...state}
      size="l"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {state.items}  

        <div>
          {state.post
            ? state.post.offers.map((e, index) => (
                <div className="modal-item-container">
                  {index == 0 ? (
                    <span className="span-modal">Starting price</span>
                  ) : index == state.post.offers.length - 1 ? (
                    <span className="span-modal">
                      {"bid number : " + index + " - current bid"}
                    </span>
                  ) : (
                    <span className="span-modal">
                      {"bid number : " + index}
                    </span>
                  )}
                  <div className="modal-bid" key={index}>
                    {e.currentBid + "$"}{" "}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </Modal.Body>
      <Modal.Footer >
        <Button onClick={state.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

let BuyerDataToEmail = null;
let SellerDataToEmail = null;
export const ItemsCurrent = ({ posts, loading, setFilter,userID}) => {
  const [bid, setBid] = useState();

 
  const [effectIterval, setEffectIterval] = useState(0);
  const [items, setItems] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("black");
  const [search, setSearch] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [indexItem, setIndexItem] = useState(0);




  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);




  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  useEffect(() => {


  
   window.outerWidth<=600?
    setItems(
      posts.map((posts, index) => (
        <>
   
          <hr />
          {
            (_ITEM = (
              <div className={`${posts.offers[ posts.offers.length-1].bidderID==userID? "green":"" }`} key={posts.id}> 
                <div
                 
                  className= ' '
                >

<h3 className="">{posts.description}</h3>


                  <img
                    className=""
                    src={posts.image}
                    
                 
                    style={{"width":"200px"}}
                  

                    onClick={() => {
                      
                      setIndexItem(index);
                      setModalShow(true);
                    }}



                  />



<div className=""    style={{"marginTop":"30px"}}>
                  <h4 className="">
                    <div>
                      <span>The auction will end in </span>
                    </div>
                    {handleTime(
                      posts,
                      posts.dueDate,
                      (new Date(posts.dueDate).getTime() -
                        new Date().getTime()) /
                        1000 /
                        60 /
                        60,
                      index
                    )}
                  </h4>
                </div>


  <div className="">
                
                  <div>
                    <h4 className="currentBid">
                      current bid :
                      {posts.offers[posts.offers.length - 1].currentBid
                        ? posts.offers[posts.offers.length - 1].currentBid + "$"
                        : 5 + "$"}
                    </h4>
                    <span className="bid-input-container">
                      <input
                        onChange={(e) => setBid(e.target.value)}
                        type={"number"}
                        placeholder={`min bid is: ${
                          posts.offers[posts.offers.length - 1].currentBid
                            ? Number(
                                posts.offers[posts.offers.length - 1].currentBid
                              ) +
                              6 +
                              "$"
                            : 5
                        }
                } $`}
                      />
                    </span>
                    <div>
                      {" "}
                      {userID ? (
                     theme.palette.mode === "dark" ?     <Button
                     style={{"backgroundColor":`${colors.primary[400]}`}}
                          className="bid-button"
                          onClick={() => {
                            heandleBid(posts);
                            setEffectIterval(effectIterval + 1)
                            window.location.reload(false)
                          }}
                        >
                        {" "}
                          submit bid
                        </Button>
                   : <Button
                   style={{"backgroundColor":`${colors.primary[100]}`}}
                     className="bid-button"
                     onClick={() => {
                      window.location.reload(false)
                       heandleBid(posts);
                       setEffectIterval(effectIterval + 1)
                     }}
                   >
                     {" "}
                     submit bid
                   </Button>  ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
               

               
              
                
                </div>


                <div className="votesContainerMobile">
          {posts.upVotes ? (
            posts.upVotes.some((e) => e == userID) ? (
              <FontAwesomeIcon
                style={{ color: "blue" }}
                className="thumbsUp"
                icon={faThumbsUp}
              />
            ) : (
              theme.palette.mode === "dark" ? 
              <FontAwesomeIcon
                onClick={() => handleUpVote(posts)}
                color={"white"}
                className="thumbsUp"
                icon={faThumbsUp}
              />: <FontAwesomeIcon
              onClick={() => handleUpVote(posts)}
              color={"black"}
              className="thumbsUp"
              icon={faThumbsUp}
            />
            )
          ) : (
            <FontAwesomeIcon
              onClick={() => handleUpVote(posts)}
              color={`${color}`}
              className="thumbsUp"
              icon={faThumbsUp}
            />
          )}{" "}
          <span className="show-votes">
            {posts.upVotes ? posts.upVotes.length + " - up votes" : ""}
          </span>
        </div>



              </div>
            ))



            
          }
        
           
    
          
        </>
      ))
    )
    ////
    :
    ////
   
    setItems(
      posts.map((posts, index) => (
        <>
    
          <hr />
          {
            (_ITEM = (

              <div className={`${posts.offers[ posts.offers.length-1].bidderID==userID? "item-container green":"item-container" }`} key={posts.id}> 

                <div
                 
                  className= 'sub-container'

                >
                  <img
                    className="item-img"
                    src={posts.image}
                   
                    height={window.outerWidth/7}

                    onClick={() => {
                      setIndexItem(index);
                      setModalShow(true);
    
                    }}
                  />{" "}

  <div className="left-contant">
                  <h3 className="item-description">{posts.description}</h3>

                  <div>
                    <h4 className="currentBid">
                      current bid :
                      {posts.offers[posts.offers.length - 1].currentBid
                        ? posts.offers[posts.offers.length - 1].currentBid + "$"
                        : 5 + "$"}
                    </h4>
                    <span className="bid-input-container">
                      <input
                        onChange={(e) => setBid(e.target.value)}
                        type={"number"}
                        placeholder={`min bid is: ${
                          posts.offers[posts.offers.length - 1].currentBid
                            ? Number(
                                posts.offers[posts.offers.length - 1].currentBid
                              ) +
                              6 +
                              "$"
                            : 5
                        }
                } $`}
                      />
                    </span>
                    <div>
                      {" "}
                      {userID ? (
                     theme.palette.mode === "dark" ?     <Button
                     style={{"backgroundColor":`${colors.primary[400]}`}}
                          className="bid-button"
                          onClick={() => {
                            heandleBid(posts);
                            setEffectIterval(effectIterval + 1)
                          }}
                        >
                          {" "}
                          submit bid
                        </Button>
                   : <Button
                   style={{"backgroundColor":`${colors.primary[100]}`}}
                     className="bid-button"
                     onClick={() => {
                       heandleBid(posts);
                       setEffectIterval(effectIterval + 1)
                     }}
                   >
                     {" "}
                     submit bid
                   </Button>  ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
               

               
              
                <div className="time-container">
                  <h4 className="item-time">
                    <div>
                      <span>The auction will end in  </span>
                    </div>
                    {handleTime(
                      posts,
                      posts.dueDate,
                      (new Date(posts.dueDate).getTime() -
                        new Date().getTime()) /
                        1000 /
                        60 /
                        60,
                      index
                    )}
                  </h4>
                </div>
                </div>

                <div className="votesContainer">
          {posts.upVotes ? (
            posts.upVotes.some((e) => e == userID) ? (
              <FontAwesomeIcon
                style={{ color: "blue" }}
                className="thumbsUp"
                icon={faThumbsUp}
              />
            ) : (
              theme.palette.mode === "dark" ? 
              <FontAwesomeIcon
                onClick={() => handleUpVote(posts)}
                color={"white"}
                className="thumbsUp"
                icon={faThumbsUp}
              />: <FontAwesomeIcon
              onClick={() => handleUpVote(posts)}
              color={"black"}
              className="thumbsUp"
              icon={faThumbsUp}
            />
            )
          ) : (
            <FontAwesomeIcon
              onClick={() => handleUpVote(posts)}
              color={`${color}`}
              className="thumbsUp"
              icon={faThumbsUp}
            />
          )}{" "}
          <span className="show-votes">
            {posts.upVotes ? posts.upVotes.length + " - up votes" : ""}
          </span>
        </div>


              </div>
            ))
            
          }
           
          
        </>
      ))
    )



    setTimeout(function () {
      setEffectIterval(effectIterval + 1);
    }, 1000);
  }, [effectIterval]);

  if (loading) {
    return <h2>loading...</h2>;
  }

  function handleUpVote(post) {
    let votes = post.upVotes;
    if (!votes)
     votes = [];
    votes.push(userID);
    if (post.section == "Men-section") {
      axios
      .patch(`https://violet-kangaroo-suit.cyclic.app/api-itemMen/itemmen/${post._id}`, { upVotes: votes })
    }
      else if (post.section == "Women-section") {
        axios
        .patch(`https://violet-kangaroo-suit.cyclic.app/api-itemWomen/itemwomen/${post._id}`, { upVotes: votes })
      }
      else if (post.section == "Kids-section") {

        axios
        .patch(`https://violet-kangaroo-suit.cyclic.app/api-itemKids/itemkids/${post._id}`, { upVotes: votes })
      }
   
  }

  function findUser(buyerId, sellerID) {

    axios.get(`https://violet-kangaroo-suit.cyclic.app/api-users/users/${buyerId}`).then((res) => {
      let obj = {
        name: res.data[0].fullName,
        email: res.data[0].email,
        phone: res.data[0].phone,
      };
      BuyerDataToEmail = obj;
    });

    axios.get(`https://violet-kangaroo-suit.cyclic.app/api-users/users/${sellerID}`).then((res) => {
      let obj = {
        name: res.data[0].fullName,
        email: res.data[0].email,
        phone: res.data[0].phone,
      };
      SellerDataToEmail = obj;
    });
  }

  function heandleBid(posts) {
    let updatedOffers = posts.offers;
    let currentBid = Number(bid);
    const bidderID = userID;
    const obj = { currentBid, bidderID };
    updatedOffers.push(obj);
    if (posts.sellerID == bidderID) alert("you can not bid on your own item");
    else {
      if (
        Number(currentBid) >=
          Number(posts.offers[posts.offers.length - 2].currentBid) + 5 ||
        !posts.offers[posts.offers.length - 2]
      ) {
        if (posts.section == "Men-section") {
          axios
            .patch(`https://violet-kangaroo-suit.cyclic.app/api-itemMen/itemmen/${posts._id}`, {
              offers: updatedOffers,
            })
        } else if (posts.section == "Women-section") {
          axios
            .patch(`https://violet-kangaroo-suit.cyclic.app/api-itemWomen/itemwomen/${posts._id}`, {
              offers: updatedOffers,
            })
        } else if (posts.section == "Kids-section") {
          axios
            .patch(`https://violet-kangaroo-suit.cyclic.app/api-itemKids/itemkids/${posts._id}`, {
              offers: updatedOffers,
            })
        }
      } else alert("invalid bid");




    }
  }

 async function del(i,post) {

    if (post.section == "Men-section")  {await axios.delete(`https://violet-kangaroo-suit.cyclic.app/api-itemMen/itemmen/${posts[i]._id}`).then(setFilter("")) }
      else if (post.section == "Women-section") {await axios.delete(`https://violet-kangaroo-suit.cyclic.app/api-itemWomen/itemwomen/${posts[i]._id}`).then(posts.splice(i,1),setFilter(""))}
       else if (post.section == "Kids-section") {await axios.delete(`https://violet-kangaroo-suit.cyclic.app/api-itemKids/itemkids/${posts[i]._id}`).then(posts.splice(i,1),setFilter(""))}
    
  }

  function handleTime(posts, dueDate1, hours, index) {
    let hours1;
    let countDownDate = new Date(dueDate1).getTime();
    let now = new Date().getTime();
    let timeleft = countDownDate - now;

    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      const  a= async () =>{
      await del(index,posts)
      sendEmail(posts,index)
      addBoughtSoled(posts,index)
   
      
    }
      a()
     
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
     
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10)minutes= "0" + minutes;
   
    return hours1 + " hr : " + minutes + " min : " + seconds + " sec";
  }

  async function sendEmail(post ,index) {
    posts.splice(index,1)
    findUser(post.offers[post.offers.length - 1].bidderID, post.SellerID);
    setTimeout(() => {
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
          },
          function (error) {
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
          },
          function (error) {
          }
        )
    }, 1000);
  }

  async function addBoughtSoled(post, index)
{
 

 await axios
  .post(`https://violet-kangaroo-suit.cyclic.app/api-users/users/logged/`, {user:userID })
  .then((data) => {itemsBought=data.data.user.itemsBought})

 await axios
  .post(`https://violet-kangaroo-suit.cyclic.app/api-users/users/logged/`, {user:post.SellerID })
  .then((data) => {itemsSoled=data.data.user.itemsSoled} );
  
  itemsBought.push(post)
  itemsSoled.push(post)

 await axios .patch(`https://violet-kangaroo-suit.cyclic.app/api-users/users/addBought/${userID}`, { itemsBought: itemsBought})
  .then((data) => {})

   await axios .patch(`https://violet-kangaroo-suit.cyclic.app/api-users/users/addSold/${post.SellerID}`, { itemsSoled: itemsSoled})
  .then((data) => {});
 
}


  function handleInput(e) {
  }

  return (
    theme.palette.mode === "dark" ?    <div className="item-page-container"    styles={{"border":"none"}}>
    
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          items={items[indexItem]}
          post={posts[indexItem]}
        />

       
      <div className="list-items-container"
      styles={{"border":"none"}}
      >
        
        <ul>
          <h3 className="men-sec"> Current Bid </h3>
          {items}
          <hr />
        </ul>
        
      </div>
    
    </div>
:
  
<div className="item-page-container">
    
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      items={items[indexItem]}
      post={posts[indexItem]}
    />

   
  <div className="list-items-container">
   
    <ul>
      <h3 className="men-sec"> Current Bid</h3>
      {items}
      <hr />
    </ul>
    
  </div>

</div>


  );
}; 
