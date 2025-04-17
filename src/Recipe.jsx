import { hover } from "framer-motion";
import React from "react";

function Recipe(props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "16px",
        width: "270px",
        height: "150px",
        position: "relative",
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5))",
        cursor: "pointer",
        "&hover": {
          scale: 1.05,
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <img
        src={props.imageUrl}
        alt={props.title}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />
      <div
        
        style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"flex-end",
          // marginUp:"auto",
          height:"50%",
          margin: "0",
          color: "white",
          fontSize: "1rem",
          position: "absolute",
          bottom: "0",
          right: "0em",
          background:
            "linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.99))",
          width: "calc(100%)",
          // padding: "2em .5em .5em 0",
          borderRadius: "10px",
          // textAlign: "right",
        }}
        >
      <h2
      style={{
        marginTop:"auto",
        margin:"0 12px",
        textAlign:"right",
        fontWeight:"bold",
        fontSize:"1.5rem"
      }}>
        {props.title}
      </h2>
      <div
      style={{
        // paddingTop:"px",
        display:"flex",
        justifyContent:"space-between",
        // paddingRight:"10px",
        // paddingLeft:"10px",
        padding:"4px 12px 12px 21px",
        fontSize:"0.75rem",
        opacity:"0.8"
      }}>
        {props.num && <span> {props.num} 👪</span>}
        {props.time && <span> {props.time} ⏱</span>}
      </div>
      </div>
      
    </div>
  );
}

export default Recipe;
