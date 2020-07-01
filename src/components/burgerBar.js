import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

import { AiOutlineMenu } from "react-icons/ai";
import { BsX } from "react-icons/bs"
import "../styles/burgerBar.scss"
import "../styles/nav.scss"


function BurgerBar (props) {
    const [isToggle, setIsToggle] = useState(false)
    const [lists, setLists] = useState([
        {name: "抹の商城 / To Mall", url: "/mall"},
        {name: "抹の食品 / To Eat", url: "/mall/shop/cuisine?categoryId=3"},
        {name: "抹の衣著 / To Wear", url: "/mall/shop/clothes?categoryId=4"}, 
        {name: "抹の生活 / To Live", url: "/mall/shop/goods?categoryId=5"}
    ])
    const [active, setActive] = useState("mall");
    const [display, setDisplay] = useState(true);

    let locationPathname = props.location.pathname
    if (locationPathname.includes("/membercenter")) locationPathname = "/membercenter"


    return(
        <>
        {display ? (
        <div className="trans-5s" style={{position: "relative"}}>
          <div className={isToggle ? "burgerBar-show" : "burgerBar-hide"}>
              {locationPathname === "/membercenter" ? (
                <AiOutlineMenu onClick={()=> setIsToggle(!isToggle)} className={isToggle ? "burgerBar-show-btn cGreen hover-op" : "burgerBar-hide-btn cWhite hover-op"}/>
              ) : (
                <AiOutlineMenu onClick={()=> setIsToggle(!isToggle)} className={isToggle ? "burgerBar-show-btn cGreen hover-op" : "burgerBar-hide-btn cGreen hover-op"}/>
              )}
            
              <ul className={isToggle ? "d-flex burgerBar-lists" : "d-flex burgerBar-lists barLists-disNone"}>
                <li className={active === "mall" ? "burgerListTitle titleActive" : "burgerListTitle"} 
                    onClick={()=>{
                        setLists([
                            {name: "抹の商城 / To Mall", url: "/mall"},
                            {name: "抹の食品 / To Eat", url: "/mall/shop/cuisine?categoryId=3"},
                            {name: "抹の衣著 / To Wear", url: "/mall/shop/clothes?categoryId=4"}, 
                            {name: "抹の生活 / To Live", url: "/mall/shop/goods?categoryId=5"}
                        ])
                        setActive("mall")
                    }}>MALL</li>
                <li className={active === "life" ? "burgerListTitle titleActive" : "burgerListTitle"}
                    onClick={()=>{
                        setLists([
                            {name: "抹の社群 / To Life", url: "/life"},
                            {name: "抹の課程 / To Learn", url: "/life/course"},
                            {name: "抹の地圖 / To Go", url: "/life/map"}, 
                            {name: "抹の貼文 / To Share", url: "/life/story"}
                        ])
                        setActive("life")
                    }}>LIFE</li>
                <li className={active === "else" ? "burgerListTitle titleActive" : "burgerListTitle"}
                    onClick={()=>{
                        setLists([
                            {name: "關於我們 / About Us", url: "/mall/about"},
                            {name: "常見問題 / Faq", url: "/mall/faq"}
                        ])
                        setActive("else")
                    }}>ELSE</li>
              </ul>

              <ul className={isToggle ? "mt-5 burgerBar-lists" : "mt-5 burgerBar-lists barLists-disNone"}>
                {lists.map((list, index) => (
                    <li key={index} className="mt-2 burgerListSub">
                        <a href={list.url} onClick={(()=> {
                            localStorage.setItem("page", 1)
                            setDisplay(false)
                        })}>{list.name}</a>
                    </li>
                ))}
              </ul>
              </div> 
        </div>): (
            <>
            <div style={{position: "relative"}}>
              {locationPathname === "/membercenter" ? (
                <AiOutlineMenu style={{position: "absolute", top: "17px", left: "2vw"}} className="cWhite hover-op"/>
              ) : (
                <AiOutlineMenu style={{position: "absolute", top: "17px", left: "2vw"}} className="cGreen hover-op"/>
              )}
            </div>
            </>
        )}
        </>
    )
}

export default withRouter(BurgerBar)