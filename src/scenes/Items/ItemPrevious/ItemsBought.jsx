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
export const ItemsBought = ({ posts, loading, setFilter,userID }) => {
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
              <div className={`${posts.offers[ posts.offers.length-1].bidderID==userID? "":"" }`} key={posts.id}> 
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






  <div className="">
                
                  <div>
                    <h4 className="currentBid">
                      current bid :
                      {posts.offers[posts.offers.length - 1].currentBid
                        ? posts.offers[posts.offers.length - 1].currentBid + "$"
                        : 5 + "$"}
                    </h4>
                   
                    
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
               
                color={"white"}
                className="thumbsUp"
                icon={faThumbsUp}
              />: <FontAwesomeIcon
            
              color={"black"}
              className="thumbsUp"
              icon={faThumbsUp}
            />
            )
          ) : (
            <FontAwesomeIcon
             
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

              <div className={`${posts.offers[ posts.offers.length-1].bidderID==userID? "item-container ":"item-container" }`} key={posts.id}> 

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
                    </div>
                   
                    
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
               
                color={"white"}
                className="thumbsUp"
                icon={faThumbsUp}
              />: <FontAwesomeIcon
             
              color={"black"}
              className="thumbsUp"
              icon={faThumbsUp}
            />
            )
          ) : (
            <FontAwesomeIcon
             
              color={`${color}`}
              className="thumbsUp"
              icon={faThumbsUp}
            />
          )}
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



  return (
    theme.palette.mode === "dark" ?    <div className="item-page-container">
    
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      items={items[indexItem]}
      post={posts[indexItem]}
    />

   
  <div className="list-items-container">
    
    <span style={{ fontSize: "2vw" }}>
  
     
      <Button  style={{"backgroundColor":`${colors.primary[400]}`}}
        onClick={() => {
          setFilter("itemBought");
        }}
        className="category-btn"
      >
      Previous purchases
      </Button>
      <Button  style={{"backgroundColor":`${colors.primary[400]}`}}
        onClick={() => {
          setFilter("Sales");
        }}
        className="category-btn"
      >
        Previous sales
      </Button>
      
    </span>
    <ul>
      <h3 className="men-sec"> Previous auctions</h3>
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
    
   
    <span style={{ fontSize: "2vw" }}>
  
     
      <Button  style={{"backgroundColor":`${colors.primary[100]}`}}
        onClick={() => {
          setFilter("itemBought");
        }}
        className="category-btn"
      >
       Previous purchases
      </Button>
      <Button  style={{"backgroundColor":`${colors.primary[100]}`}}
        onClick={() => {
          setFilter("Sales");
        }}
        className="category-btn"
      >
        Previous sales
      </Button>
      
    </span>
    <ul>
      <h3 className="men-sec">  Previous auctions</h3>
      {items}
      <hr />
    </ul>
    
  </div>

</div>


  );
}; 
