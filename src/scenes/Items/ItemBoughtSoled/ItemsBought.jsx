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
      size="xl"
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
      size="xl"
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
export const ItemsBought = ({ posts, loading, setFilter }) => {
  const [bid, setBid] = useState();
  const [UserID, setUserID] = useState();
  const [logged, setLogged] = useState(false);
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
    if (!logged) {
      setUserID(
        localStorage.getItem("logged") ? localStorage.getItem("logged") : null
      );
      axios.post(`http://localhost:5000/api-users/users/logged`, { user: UserID }).then((res) => {
        if (res.data.status == "logged") setLogged(true);
      });
    }
    
    setItems(
      posts.map((posts, index) => (
        <>
    
          <hr />
          {
            (_ITEM = (
              <div className="item-container" key={posts.id}>
                <div
                  onClick={() => {
                    setIndexItem(index);
                    setModalShow(true);
                  }}
                  className= 'sub-container'
                >



                  <img
                    className="item-img"
                    src={posts.image}
                    
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
              </div>
            ))



            
          }
          {posts.upVotes ? (
            posts.upVotes.some((e) => e == localStorage.getItem("logged")) ? (
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
          
        </>
      ))
    );

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
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search item"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    
      <Button variant="dark"
       onClick={() => setFilter(search)}>Search</Button>
    </Form>
   
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
      <h3 className="men-sec"> Men Section</h3>
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
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search item"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    
      <Button variant="dark"
       onClick={() => setFilter(search)}>Search</Button>
    </Form>
   
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
      <h3 className="men-sec"> Men Section</h3>
      {items}
      <hr />
    </ul>
    
  </div>

</div>


  );
}; 
