import React from 'react'
import "./Leftsidebar.css"
import { AiFillPlaySquare, AiOutlineHome, AiFillLike } from 'react-icons/ai'
import { MdOutlineExplore, MdOutlineVideoLibrary, MdSubscriptions, MdOutlineWatchLater } from "react-icons/md"
import { FaHistory } from 'react-icons/fa'
import shorts from "./shorts.png"
import { NavLink } from 'react-router-dom'

const Drawersliderbar = ({ toggledraw, toggledrawersidebar }) => {
  return (
    <div className="container_DrawaerLeftSidebar" style={toggledrawersidebar}>
      <div className="container2_DrawaerLeftSidebar">
        <div className="Drawer_leftsidebar">
          <NavLink to={'/'} className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <AiOutlineHome size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Home</div>
            </div>
          </NavLink>

          <div className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <MdOutlineExplore size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Explore</div>
            </div>
          </div>

          <div className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <img src={shorts} width={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Shorts</div>
            </div>
          </div>

          <div className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <MdSubscriptions size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Subscriptions</div>
            </div>
          </div>
        </div>

        <div className="libraryBtn_Drawerleftsidebar">
          <NavLink to={'/Library'} className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <MdOutlineVideoLibrary size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Library</div>
            </div>
          </NavLink>

          <NavLink to={'/Watchhistory'} className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <FaHistory size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">History</div>
            </div>
          </NavLink>

          <NavLink to={'/Yourvideo'} className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <AiFillPlaySquare size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Your Videos</div>
            </div>
          </NavLink>

          <NavLink to={'/Watchlater'} className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <MdOutlineWatchLater size={22} className="icon_sidebar" style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Watch Later</div>
            </div>
          </NavLink>

          <NavLink to={'/Likedvideo'} className="icon_sidebar_div">
            <div className="icon_sidebar_inner">
              <AiFillLike size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Liked Videos</div>
            </div>
          </NavLink>
        </div>

        <div className="subScriptions_lsdbar">
          <h3>Your Subscription</h3>

          {/* List of channels */}
          {[1, 2, 3, 4].map((_, i) => (
            <div className="chanel_lsdbar" key={i}>
              <span className="initial">C</span>
              <div>Channel</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container3_DrawaerLeftSidebar" onClick={() => toggledraw()}></div>
    </div>
  )
}

export default Drawersliderbar
