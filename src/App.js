import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase"
import keys from "./config"
import Tabs from "./components/Tabs";import Tabs1 from "./components/Tabs1";
import Button from "@material-ui/core/Button"
import {Cloud,ThumbUpAltOutlined,Subject,Favorite,ShoppingCart,CallRounded,LocalOfferRounded,InfoOutlined,DescriptionOutlined,LanguageOutlined,WhatsApp,EmailOutlined,EmojiFlagsOutlined,CallOutlined, StorefrontOutlined,AccessTimeOutlined, ThreeDRotation ,RoomOutlined} from '@material-ui/icons';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Toast from 'react-bootstrap/Toast'
import ToastBody from 'react-bootstrap/ToastBody'
import Paper from '@material-ui/core/Paper';
import {Tabs as Ttabs , Tab } from '@material-ui/core';
import FlatList from 'flatlist-react';
import Moment from 'react-moment';
import { Slide } from 'react-slideshow-image';
import Carousel from "react-elastic-carousel";
import Item from "./Item";


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];


export default class App extends Component{
  
  constructor(props) {
    super(props);
  }
  

  state = {
    group:[],timing:[],liked:false,length_like:0,
    grouppost:[],
    groupid:[],    
    userdata: {},user:{},
    isLoading:true,business_uid:"",
    business:[],product_l:[],product_n:[],product_b:[],pv:0
  };


  // componentWillMount(){
  //   var b_uid = this.props.b_uid


  //   console.log("uid  : " , b_uid ) 

  
  //   firebase.firestore().collection('business_page').doc(b_uid).update({Page_Visit : firebase.firestore.FieldValue.increment(1) })

  // }


  async componentDidMount () {

  var b_uid = this.props.b_uid


    console.log(" props on App.js  : " , b_uid ) 


        firebase.firestore().collection('business_page').where("subdomain","==",b_uid).onSnapshot(querySnapshot => {
          const groups = [];

          querySnapshot.forEach(documentSnapshot => {

            groups.push({
              ...documentSnapshot.data(),
              uid : documentSnapshot.id
            });

        
          });

          this.setState({ business: groups[0], timing:groups[0].timing, pv:groups[0].Page_Visit,length_like : groups[0].Page_Like.length ,    }); 


          console.log("business_uid data : " + groups[0].uid)
          b_uid = groups[0].uid


          firebase.firestore().collection("business_page").doc(b_uid).collection("products").onSnapshot(querySnapshot => {
            const groups_b = []; const groups_n = [];  const groups_l = []; 
    
            querySnapshot.forEach(documentSnapshot => {
    
              if(documentSnapshot.data().tag ){
                groups_l.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
              });
              } 
    
              
    
              if(documentSnapshot.data().tag==="New Arrival"){
                groups_n.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
              });
              } 
    
              if(documentSnapshot.data().tag==="Best Selling Product"){
                groups_b.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
              });
              } 
            
            
            
            });
  
            console.log("inside getting products")
  
    
    
            this.setState({ product_l:groups_l,product_n:groups_n,product_b:groups_b });
        })
          
        })

        
      
  
    }



    renderProducts_B = item => {

   
        return (                 
            <li>       
          <div class={"card"}  style={{borderRadius:8,borderColor:"#CD6155",padding:"5px"}} >

              <img alt="Responsive image" src={ item.image} style={{ display:"block", maxWidth: "100%",height:"auto",borderRadius:4}}  />
                  
                  
              <div class="row container " style={{marginBottom:"-15px",justifyContent:"space-between",}} >
                 
                 <p ellipsizeMode={"tail"} numberOfLines={1}  style={{fontFamily: 'sans-serif-medium',fontSize:16,width:"60%" }}>{item.name}</p>
                  
                 { item.price 
                    ?<div class="row" style={{width:"40%",justifyContent:"flex-end"}} >
                    
                        {
                          item.negotiation==="Fixed"
                          ? null
                          : item.negotiation == "Negotiable"
                          ?<p  style={{fontFamily: 'sans-serif-medium',fontSize:12,marginTop:3,color:"#2ECC71",justifyContent:"flex-end"}}>negotiable  ·  </p>
                          :null
                        }

                        {item.price.length > 4
                          ?<p ellipsizeMode={"tail"} numberOfLines={1} style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",justifyContent:"flex-end",marginLeft:"2px",}}>₹  {item.price}</p>
                          :<p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",justifyContent:"flex-end",marginLeft:"2px",}}>₹  {item.price}</p>
                        }



                    </div>

                    :<div class="row "  >
                    {
                      item.negotiation==="Fixed" 
                      ? null
                      :item.negotiation == "Negotiable" 
                      ?<p ellipsizeMode={"tail"} numberOfLines={1} style={{fontFamily: 'sans-serif-medium',fontSize:12,marginTop:3,color:"#2ECC71"}}>negotiable  ·  </p>
                      : null
                    }
                  <a class={"row "} href={`tel:${this.state.business.phone}` } target="_blank" >
                  <p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",marginLeft:"2px"}}>₹  </p>
                  <p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"red",marginLeft:"2px"}}>Call </p>
                  </a>
                  

        </div>
                 } 

                </div>

                <p  class="multiline" style={{fontFamily: 'sans-serif-light',fontSize:12,marginTop:3,color:"#C0C0C0",marginBottom:"0px" }}>{item.description}  </p>
         
      </div>
      <p></p>

 </li>
        );
    };

    renderProducts_N = item => {

   
      return (                 
          <li>       
        <div class={"card"}  style={{borderRadius:8,borderColor:"#CD6155",padding:"5px"}} >

            <img alt="Responsive image" src={ item.image} style={{display:"block", maxWidth: "100%",height:"auto",borderRadius:4}}  />
                
                
            <div class="row container " style={{marginBottom:"-15px",justifyContent:"space-between",}} >
                 
                 <p ellipsizeMode={"tail"} numberOfLines={1}  style={{fontFamily: 'sans-serif-medium',fontSize:16,width:"60%" }}>{item.name}</p>
                  
                 { item.price 
                    ?<div class="row" style={{width:"40%",justifyContent:"flex-end"}} >
                    
                        {
                          item.negotiation==="Fixed"
                          ? null
                          : item.negotiation == "Negotiable"
                          ?<p  style={{fontFamily: 'sans-serif-medium',fontSize:12,marginTop:3,color:"#2ECC71",justifyContent:"flex-end"}}>negotiable  ·  </p>
                          :null
                        }

                        {item.price.length > 4
                          ?<p ellipsizeMode={"tail"} numberOfLines={1} style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",justifyContent:"flex-end",marginLeft:"2px",}}>₹  {item.price}</p>
                          :<p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",justifyContent:"flex-end",marginLeft:"2px",}}>₹  {item.price}</p>
                        }



                    </div>

                    :<div class="row "  >
                    {
                      item.negotiation==="Fixed" 
                      ? null
                      :item.negotiation == "Negotiable" 
                      ?<p ellipsizeMode={"tail"} numberOfLines={1} style={{fontFamily: 'sans-serif-medium',fontSize:12,marginTop:3,color:"#2ECC71"}}>negotiable  ·  </p>
                      : null
                    }

<a class={"row "} href={`tel:${this.state.business.phone}` } target="_blank" >
                  <p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",marginLeft:"2px"}}>₹  </p>
                  <p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"red",marginLeft:"2px"}}>Call </p>
                  </a>
        </div>
                 } 

                </div>
  <p  class="multiline" style={{fontFamily: 'sans-serif-light',fontSize:12,marginTop:3,color:"#C0C0C0",marginBottom:"0px" }}>{item.description}  </p>

    </div>
    <p></p>

</li>
      );
  };


  renderProducts_P = item => {

   
    return (                 
        <li>       
      <div class={"card"}  style={{borderRadius:8,borderColor:"#CD6155",padding:"5px"}} >

          <img alt="Responsive image" src={ item.image} style={{display:"block", maxWidth: "100%",height:"auto",borderRadius:4}}  />
              
              
          <div class="row container " style={{marginBottom:"-15px",justifyContent:"space-between",}} >
                 
                 <p ellipsizeMode={"tail"} numberOfLines={1}  style={{fontFamily: 'sans-serif-medium',fontSize:16,width:"60%" }}>{item.name}</p>
                  
                 { item.price 
                    ?<div class="row" style={{width:"40%",justifyContent:"flex-end"}} >
                    
                        {
                          item.negotiation==="Fixed"
                          ? null
                          : item.negotiation == "Negotiable"
                          ?<p  style={{fontFamily: 'sans-serif-medium',fontSize:12,marginTop:3,color:"#2ECC71",justifyContent:"flex-end"}}>negotiable  ·  </p>
                          :null
                        }

                        {item.price.length > 4
                          ?<p ellipsizeMode={"tail"} numberOfLines={1} style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",justifyContent:"flex-end",marginLeft:"2px",}}>₹  {item.price}</p>
                          :<p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",justifyContent:"flex-end",marginLeft:"2px",}}>₹  {item.price}</p>
                        }



                    </div>

                    :<div class="row "  >
                    {
                      item.negotiation==="Fixed" 
                      ? null
                      :item.negotiation == "Negotiable" 
                      ?<p  style={{fontFamily: 'sans-serif-medium',fontSize:12,marginTop:3,color:"#2ECC71"}}>negotiable  ·  </p>
                      : null
                    }

<a class={"row "} href={`tel:${this.state.business.phone}` } target="_blank" >
                  <p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"#000",marginLeft:"2px"}}>₹  </p>
                  <p style={{fontFamily: 'sans-serif-medium',fontSize:15,color:"red",marginLeft:"2px"}}>Call </p>
                  </a>
        </div>
                 } 

                </div>
 <p  class="multiline" style={{fontFamily: 'sans-serif-light',fontSize:12,marginTop:3,color:"#C0C0C0",marginBottom:"0px" }}>{item.description}  </p>

  </div>
  <p></p>

</li>
    );
};
  

    render() {

      var ad;

      if(this.state.business.address)
      {
        ad = this.state.business.address.split("#")
      }

  
      return (
        
        <div style={{width:"100%",}}>


         <Tabs1 >
    
       
          <div  label="About"    >

            {
              this.state.business.h_type ?
              <div class="container" style={{marginTop:"18px",marginBottom:"25px"}} >
                
                
              <div class="card" style={{padding:"10px",borderColor: "#CD6155",borderWidth:"0.4px",borderRadius:8,}}>
              
              <div  style={{borderColor: "#C0C0C0",borderRadius:-8 ,paddingHorizontal:"20px",backgroundColor: "#CD6155"}}>
              
              
              
              { this.state.business.h_type === "new" 
                  ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                  <ShoppingCart  style={{ fontSize: 20,color:"white" }} />
                    <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  New Arrival   </p>  
                  </div>
                  : this.state.business.h_type === "offer"
                    ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                          <LocalOfferRounded  style={{ fontSize: 20,color:"white" }} />
                          <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  Offer   </p>  
                      </div>
                    : this.state.business.h_type === "update"
                      ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                            <Subject  style={{ fontSize: 20,color:"white" }} />
                            <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  New Update   </p>  
                        </div>
                      :this.state.business.h_type === "product"
                      ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                            <ShoppingCart  style={{ fontSize: 20,color:"white" }} />
                            <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  {this.state.business.h_name}   </p>  
                        </div>
                      :<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                            <LocalOfferRounded  style={{ fontSize: 20,color:"white" }} />
                            <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  No New Update   </p>  
                        </div>
                                                    
              }
              
              
              <div style={{ height: 0.5,backgroundColor: "#eeeeee",marginLeft:"10px",marginRight:"10px"}} /> 
              
              
              { this.state.business.h_image ?
              <div  style={{   flexdirection: "row", alignContent:"center", alignItems: "center",paddingLeft: "10px",paddingRight: "10px",paddingTop: "10px"}}>
              {
                this.state.business.h_image1
                  ?this.state.business.h_image2 
                    ?<Carousel breakPoints={breakPoints}  showArrows={false} enableAutoPlay autoPlaySpeed={5000}  >
                  
                          <Item><img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"300px",borderRadius:4 }}  src={ this.state.business.h_image }   /></Item>
                          <Item><img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"300px",borderRadius:4 }}  src={ this.state.business.h_image1 }   /></Item>
                          <Item><img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"300px",borderRadius:4 }}  src={ this.state.business.h_image2 }   /></Item>
                        </Carousel>
                    :<Carousel breakPoints={breakPoints}  showArrows={false} enableAutoPlay autoPlaySpeed={5000}  >
                  
                        <Item><img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"300px",borderRadius:4 }}  src={ this.state.business.h_image }   /></Item>
                        <Item><img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"300px",borderRadius:4 }}  src={ this.state.business.h_image1 }   /></Item>
                      </Carousel>
                  :<img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"auto",borderRadius:4 }}  src={ this.state.business.h_image }   />
              }
              
              
                  
              
                {this.state.business.h_about
                    ?<p  style={{fontSize:14,color:"#fff",fontFamily:"sans-serif-thin",marginTop:"10px"}} >{this.state.business.h_about} </p>
                    :<p  style={{fontSize:14 ,color:"#fff",fontFamily:"sans-serif-thin",marginLeft:"10px",marginRight:"10px"}} >Whenever our business will have a new offer or a new arrivals, We will highlight about the new update in this section. Thanks for visiting our Business Website. </p>
                  }
                  
                          
              </div>
              
              :  <div style={{   flexdirection: "row", alignContent:"center", alignItems: "center",paddingTop: "10px" }}>
              
              
              
              {this.state.business.h_about
                ?<p  style={{fontSize:14 ,maxWidth: "100%",fontFamily:"sans-serif-thin",color:"#fff",}} >{this.state.business.h_about} </p>
                :<p  style={{fontSize:14 ,fontFamily:"sans-serif-thin",color:"#fff",marginLeft:"10px",marginRight:"10px"}} >Whenever our business will have a new offer or a new arrivals, We will highlight about the new update in this section. Thanks for visiting our Business Website. </p>
              }
              
                      
              </div>
              
              }
              
              <div style={{ height: 0.5,backgroundColor: "#eeeeee",marginLeft:"10px",marginRight:"10px"}} />
              
              
              
              {     this.state.business.h_type === "offer" ?
              <div class={"row"} style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px" }}>   
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin",}}>Begins : {this.state.business.h_date1} </p>
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Ends : {this.state.business.h_date2} </p>  
              </div> 
              : this.state.business.h_type === "new" || this.state.business.h_type === "product" 
              ? <div class={"row"} style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px"  }}>   
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Price : ₹ {this.state.business.h_price} </p>
            <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Launched : {<Moment fromNow>{this.state.business.highlight_created_on}</Moment>} </p>  
              </div>
              :this.state.business.h_type === "update"
              ? <div style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px"  }}>   
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Posted : {(this.state.business.highlight_created_on)} </p>
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>  </p>  
              </div>
              :  <div style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px"  }}>   
                <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Business Page Launched : {<Moment fromNow>{this.state.business.created_on}</Moment>} </p>
                <p style={{fontSize:13,color:"#fff",fontWeight:"500",fontFamily:"sans-serif-thin"}}>  </p>  
                </div>
              }          
              
              </div>   
              
              
              
              
              
              </div> 
              
              
              </div>
              :null
            }

           
              <div >

              <img alt="Responsive image" src={ this.state.business.image} style={{display:"block", maxWidth: "100%",maxHeight:"500px",margin:"auto"}} />
              <h1 style={{fontSize:28,fontWeight:"bolder",paddingTop:"10px",width:"96%",marginRight:"10px",marginLeft:"10px"}}>{this.state.business.name}     </h1>
  
              <p  style={{fontFamily: 'sans-serif-thin',fontSize:12,fontWeight:"300", color:"#000",width:"96%",marginRight:"10px",marginLeft:"10px"}}> {this.state.business.category}  ·  {this.state.business.type} </p>
              </div>

              {
              !this.state.business.h_type ?
              <div class="container" style={{marginBottom:"25px"}} >
                
                
              <div class="card" style={{padding:"10px",borderColor: "#CD6155",borderWidth:"0.4px",borderRadius:8,}}>
              
              <div  style={{borderColor: "#C0C0C0",borderRadius:-8 ,paddingHorizontal:"20px",backgroundColor: "#CD6155"}}>
              
              
              
              { this.state.business.h_type === "new" 
                  ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                  <ShoppingCart  style={{ fontSize: 20,color:"white" }} />
                    <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  New Arrival   </p>  
                  </div>
                  : this.state.business.h_type === "offer"
                    ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                          <LocalOfferRounded  style={{ fontSize: 20,color:"white" }} />
                          <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  Offer   </p>  
                      </div>
                    : this.state.business.h_type === "update"
                      ?<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                            <Subject  style={{ fontSize: 20,color:"white" }} />
                            <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  New Update   </p>  
                        </div>
                      :<div class={"row"} style={{  flexDirection:"row", alignContent:"center", alignItems: "center",paddingVertical:"10px",justifyContent:"center"  }}>
                            <LocalOfferRounded  style={{ fontSize: 20,color:"white" }} />
                            <p style={{fontFamily: 'sans-serif-medium',pAlign:"center",marginLeft:"5px",fontSize:20,color:"#fff",marginBottom:"2px",fontWeight:"700"}}>  No New Update   </p>  
                        </div>
                                                    
              }
              
              
              <div style={{ height: 0.5,backgroundColor: "#eeeeee",marginLeft:"10px",marginRight:"10px"}} /> 
              
              
              { this.state.business.h_image ?
              <div  style={{   flexdirection: "row", alignContent:"center", alignItems: "center",paddingLeft: "10px",paddingRight: "10px",paddingTop: "10px"}}>
              
              
                  <img alt="Responsive image" style={{borderColor:"gray",borderWidth:"0.5px",display:"block", maxWidth: "100%",height:"auto",borderRadius:4 }}  src={ this.state.business.h_image }   />
              
                  
              
                {this.state.business.h_about
                    ?<p  style={{fontSize:14,color:"#fff",fontFamily:"sans-serif-thin",}} >{this.state.business.h_about} </p>
                    :<p  style={{fontSize:14 ,color:"#fff",fontFamily:"sans-serif-thin",marginLeft:"10px",marginRight:"10px"}} >Whenever our business will have a new offer or a new arrivals, We will highlight about the new update in this section. Thanks for visiting our Business Website. </p>
                  }
                  
                          
              </div>
              
              :  <div style={{   flexdirection: "row", alignContent:"center", alignItems: "center",paddingTop: "10px" }}>
              
              
              
              {this.state.business.h_about
                ?<p  style={{fontSize:14 ,maxWidth: "100%",fontFamily:"sans-serif-thin",color:"#fff",}} >{this.state.business.h_about} </p>
                :<p  style={{fontSize:14 ,fontFamily:"sans-serif-thin",color:"#fff",marginLeft:"10px",marginRight:"10px"}} >Whenever our business will have a new offer or a new arrivals, We will highlight about the new update in this section. Thanks for visiting our Business Website. </p>
              }
              
                      
              </div>
              
              }
              
              <div style={{ height: 0.5,backgroundColor: "#eeeeee",marginLeft:"10px",marginRight:"10px"}} />
              
              
              
              {     this.state.business.h_type === "offer" ?
              <div class={"row"} style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px" }}>   
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin",}}>Begins : {this.state.business.h_date1} </p>
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Ends : {this.state.business.h_date2} </p>  
              </div> 
              : this.state.business.h_type === "new"
              ? <div class={"row"} style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px"  }}>   
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Price : ₹ {this.state.business.h_price} </p>
            <p style={{fontSize:13,color:"#fff",fontWeight:"500",fontFamily:"sans-serif-thin"}}>Launched : {<Moment fromNow>{this.state.business.highlight_created_on}</Moment>} </p>  
              </div>
              :this.state.business.h_type === "update"
              ? <div style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px"  }}>   
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Posted : {(this.state.business.highlight_created_on)} </p>
              <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>  </p>  
              </div>
              :  <div style={{   flexdirection: "row",justifyContent:"space-between", alignContent:"center", alignItems: "center",marginLeft:"10px",marginRight:"10px"  }}>   
                <p style={{fontSize:13,color:"#fff",fontFamily:"sans-serif-thin"}}>Business Page Launched : {<Moment fromNow>{this.state.business.created_on}</Moment>} </p>
                <p style={{fontSize:13,color:"#fff",fontWeight:"500",fontFamily:"sans-serif-thin"}}>  </p>  
                </div>
              }          
              
              </div>   
              
              
              
              
              
              </div> 
              
              
              </div>
              :null
            }
              



           
           
            <div style={{paddingBottom:"60px",paddingLeft:"7px",paddingRight:"7px"}}>


              <div class={"card " } style={{borderWidth:"1px",borderColor:"#CD6155",borderRadius:5,width:"100%",paddingLeft:"5px"}}>

                <p></p>

                <a class={"row "} href={`https://www.google.com/maps/dir/?api=1&destination=${ad}&dir_action=navigate` } target="_blank"  style={{paddingBottom:"6px"}}>
                <RoomOutlined  style={{ fontSize: 22,opacity:0.7,width:"10%",marginTop:"2px",color:"black",paddingLeft:"2px" }} />
            
                <p  style={{fontSize:12,fontWeight:"400",color:"#007aff",width:"85%" }}>{this.state.business.address} </p>
                </a>

              

                <div class={"row "} style={{paddingBottom:"6px",paddingLeft:"2px"}}>
                <AccessTimeOutlined  style={{ fontSize: 18,width:"10%"}} />

                <div class={"row "} style={{width:"90%",paddingLeft:"13px" }} >
                <p style={{fontSize:12,fontWeight:"700",flexdirection:"row",fontFamily: 'sans-serif-light',}}>{this.state.timing[0]}  -  {this.state.timing[1]}   </p> 
                
                <p style={{fontSize:12,fontWeight:"600",fontFamily: 'sans-serif-light',color:"red",marginTop:"0px",paddingLeft:"13px" }}>Closed on : {this.state.business.closed}    </p>
                </div> 
                </div>

                

                <div class={"row "} style={{paddingBottom:"6px",paddingLeft:"2px"}}>
                
                <StorefrontOutlined  style={{ fontSize: 18,width:"10%"}} />

                <div>

                {
                  this.state.business.branches
                  ?
                      this.state.business.branches == "0"
                          ?<p style={{fontSize:12,fontWeight:"700",fontFamily:"sans-serif-light"}}>Branches : we have no branches    </p>

                          :<p style={{fontSize:12,fontWeight:"700",fontFamily:"sans-serif-light"}}>Branches : {this.state.business.branches}    </p>
                          
                  :<p style={{fontSize:12,fontWeight:"700",fontFamily:"sans-serif-light"}}>Branches :     </p>
                }

                </div> 
                </div>

            </div>

            <p></p>

            <div class={"card " } style={{borderWidth:"1px",borderColor:"#CD6155",borderRadius:5,width:"100%",paddingLeft:"5px"}}>

            <p></p>           
                      
                      <div class={"row "} style={{paddingBottom:"6px",paddingLeft:"2px"}}>
                          <EmojiFlagsOutlined  style={{ fontSize: 22,width:"10%"}} />

                          <div class={"row "} style={{width:"90%",paddingLeft:"13px" }} >
                          <p style={{fontSize:12,fontWeight:"700",marginBottom:0}}>     USP (Unique Selling Point)  :  </p>
                          
                          </div> 
                          </div>


                      <p style={{fontSize:12,fontWeight:"600",paddingLeft:"40px",width:"99%",fontFamily:"sans-serif-light"}}>{this.state.business.best} </p>

                      <div class={"row "} style={{paddingBottom:"6px",paddingLeft:"2px"}}>
                          <InfoOutlined  style={{ fontSize: 19,width:"10%"}} />

                          <div class={"row "} style={{width:"90%",paddingLeft:"13px" }} >
                          <p style={{fontSize:12,fontWeight:"700",marginBottom:0}}>     Company Description  :  </p>
                          
                          </div> 
                          </div>


                      <p style={{fontSize:12,fontWeight:"600",paddingLeft:"40px",width:"99%",fontFamily:"sans-serif-light"}}>{this.state.business.description} </p>

                                  

                                    <div class={"row "} style={{paddingBottom:"6px",paddingLeft:"4px"}}>
                                        <DescriptionOutlined  style={{ fontSize: 19,width:"10%"}} />

                                        <div class={"row "} style={{width:"90%",paddingLeft:"14.5px",width:"90%" }} >
                                        <p style={{fontSize:12,fontWeight:"700",marginBottom:0}}>     Founded  :  </p>
                                        <p style={{fontSize:12,fontWeight:"600",paddingLeft:"7px",fontFamily:"sans-serif-light"}}>{this.state.business.year} </p>

                                        </div> 

                                        </div>
                  
              </div>

              <p></p>
              <div class={"card " } style={{borderWidth:"1px",borderColor:"#CD6155",borderRadius:5,width:"100%",paddingLeft:"5px"}}>
            <p></p>

              <a class={"row "} href={`tel:${this.state.business.phone}` } target="_blank"  style={{paddingBottom:"6px",paddingLeft:"4px"}}>
                <CallOutlined  style={{ fontSize: 18,width:"10%",marginTop:"4px",color:"black" }} />
                <p  style={{fontSize:15,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.phone} </p>
                </a>

                
                {this.state.business.whatsapp 
                  ?<a class={"row"} href={`whatsapp://send?text=Hello, ${'\n'}Just visited your business website, wanted to know more.&phone=91${this.state.business.whatsapp}`} target="_blank" style={{paddingBottom:"6px",paddingLeft:"4px"}}>
                  <WhatsApp  style={{ fontSize: 18,width:"10%",marginTop:"4px",color:"black" }} />
              
                  <p  style={{fontSize:15,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.whatsapp} </p>
                  </a>
                    :<a class={"row"} style={{paddingBottom:"15px",paddingLeft:"4px"}}>
                    <WhatsApp  style={{ fontSize: 18,width:"10%",marginTop:"4px",color:"black" }} />

                    <p  style={{fontSize:15,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.whatsapp} </p>
                    </a>

                }


            {this.state.business.email 
                  ? 

                <a class={"row "} href={`mailto:${this.state.business.email}`} target="_blank"   style={{paddingBottom:"6px",paddingLeft:"4px"}}>
                <EmailOutlined  style={{ fontSize: 18,width:"10%",marginTop:"2px",color:"black" }} />
            
                <p   style={{fontSize:13,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.email} </p>
                </a>

                :<a class={"row "}   style={{paddingBottom:"15px",paddingLeft:"4px"}}>
                <EmailOutlined  style={{ fontSize: 18,width:"10%",marginTop:"2px",color:"black" }} />
            
                <p   style={{fontSize:13,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.email} </p>
                </a>

            }

            {this.state.business.website 
                  ?

                <a class={"row "} href={  `//${this.state.business.website}`} target="_blank" style={{paddingBottom:"6px",paddingLeft:"4px"}}>
                <LanguageOutlined  style={{ fontSize: 18,width:"10%",marginTop:"2px",color:"black" }} />
            
                <p    style={{fontSize:13,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.website} </p>
                </a>
                :
                
                <a class={"row "}  style={{paddingBottom:"15px",paddingLeft:"4px"}}>
                <LanguageOutlined  style={{ fontSize: 18,width:"10%",marginTop:"2px",color:"black" }} />
            
                <p    style={{fontSize:13,fontWeight:"400",color:"#007aff",width:"90%" }}>{this.state.business.website} </p>
                </a>
                }

                      

              </div>

              
                <a style={{justifyContent:"center",marginTop:"15px",paddingTop:"10px",flexDirection:"row"}} class="row" href={  `https://play.google.com/store/apps/details?id=com.office.b2cloud&hl=en_IN`} target="_blank">

                <p style={{color:"#000"}}>website made with   </p>
                                    <Cloud style={{ fontSize: 18,marginTop:"4px",width:"5%",color:"#CD6155" }}  />
                                    <p style={{color:"#000"}}>   B2CLOUD  </p>

                </a>
         


           


            </div>  

           
                          

                  </div>
         
          <div  label="Products" >
          <p>      </p>

          <Tabs >

              <div label="Best Selling" >
                <p></p>
              <ul style={{listStyle:"none",marginLeft:"-20px",marginRight:"20px"}}>
          { this.state.product_b.length===0
                      
                      ? <p style={{textAlign:"center",alignItems:"center",alignContent:"center",paddingTop:150,fontFamily: 'sans-serif-medium',fontWeight:"900",fontSize:20,color:"#000"}}> No Data Available </p>
                      :<FlatList
                                list={this.state.product_b}
                                
                                renderItem={ this.renderProducts_B}
                              
                            ></FlatList>}
                            <p style={{marginTop:"80px"}}></p>

          </ul>


              </div>
              
              <div label="New Arrivals">
              <p></p>
              <ul style={{listStyle:"none",marginLeft:"-20px",marginRight:"20px"}}>
          { this.state.product_n.length===0
                      
                      ? <p style={{textAlign:"center",alignItems:"center",alignContent:"center",paddingTop:150,fontFamily: 'sans-serif-medium',fontWeight:"900",fontSize:20,color:"#000"}}> No Data Available </p>
                      :<FlatList
                                list={this.state.product_n}
                                
                                renderItem={ this.renderProducts_N}
                              
                            ></FlatList>}
                            <p style={{marginTop:"80px"}}></p>

          </ul>


              </div>
              
              <div label="Product Line">
              <p></p>
              <ul style={{listStyle:"none",marginLeft:"-20px",marginRight:"20px"}}>
          { this.state.product_l.length===0
                      
                      ? <p style={{textAlign:"center",alignItems:"center",alignContent:"center",paddingTop:150,fontFamily: 'sans-serif-medium',fontWeight:"900",fontSize:20,color:"#000"}}> No Data Available </p>
                      :<FlatList
                                list={this.state.product_l}
                                
                                renderItem={ this.renderProducts_P}
                              
                            ></FlatList>}
                            <p style={{marginTop:"80px"}}></p>

          </ul>


              </div>


          </Tabs>
        
          </div>
          
      
        </Tabs1>
        
      
          <footer class={"card row"} style={{ position:"fixed",bottom: "0px",justifyContent:"space-between",paddingTop:"3%",paddingLeft:"13%",paddingBottom:'28px',height:75, width: "105%",backgroundColor:"#FFF",borderColor: "#C0C0C0",borderWidth:"0.4px"}} >
                  

                <a class={"row"}  href={`tel:${this.state.business.phone}` } target="_blank" style={{paddingTop:"5px",justifyContent:"center",borderRadius:4,height:35,width:"40%",backgroundColor:"#CD6155"} }>
                  <CallRounded  style={{ fontSize: 22,marginTop:"2px",color:"white" }} />
                  <p  style={{fontSize:16,fontWeight:500, color:"white",justifyContent:"center",marginLeft:"5px"}}>   Call Now  </p>
                </a>
                  <p></p> 
                
                  { this.state.business.whatsapp 
                          ?<a href={`whatsapp://send?text=Hello, ${'\n\n'}Just visited your business website, wanted to know more.&phone=91${this.state.business.whatsapp}`} target="_blank" style={{ justifyContent:"center",backgroundColor:"#eee",borderRadius:6,height:35,width:"12%"}} >
                          <WhatsApp  style={{ fontSize: 28.5,color:"green",marginLeft:"9.75px" ,marginTop:"1px"}} />
                        </a>
                          :null
                    }

                { this.state.business.email 
                  ? <a  href={`mailto:${this.state.business.email}`} target="_blank"  style={{flexDirection:"row", alignItems:"center",backgroundColor:"#eee",borderRadius:6,height:35,width:"12%"}} >
                  
                <EmailOutlined  style={{ fontSize: 31,color:"#007aff",marginLeft:"8.5px" ,marginTop:"1px"}} />
                </a>
                  :null}
                    
                { this.state.business.website 
                  ?<a href={  `//${this.state.business.website}` }  target="_blank" style={{backgroundColor:"#eee",borderRadius:6,height:35,width:"12%"}} >
                  
                          <LanguageOutlined  style={{ fontSize: 27.5,color:"gray",marginLeft:"10px" ,marginTop:"2.25px"}} />
                      </a>
                  :null

                }    

                <a href={`https://www.google.com/maps/dir/?api=1&destination=${ad}&dir_action=navigate` } target="_blank" style={{backgroundColor:"#eee",borderRadius:6,height:35,width:"12%"}} >
                          <RoomOutlined  style={{ fontSize: 27.5,color:"#000",marginLeft:"10px" ,marginTop:"2.25px"}} />
                      </a>    

                </footer>
              
          </div>
  
        
      );
    }
  }



              
