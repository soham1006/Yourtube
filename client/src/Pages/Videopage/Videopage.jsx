import React, { useEffect } from 'react';
import "./Videopage.css";
import moment from 'moment';
import Likewatchlatersavebtns from './Likewatchlatersavebtns';
import { useParams, Link } from 'react-router-dom';
import Comment from '../../Component/Comment/Comment';
import ChatRoom from '../../Component/ChatRoom.jsx';
import { viewvideo } from '../../action/video';
import { addtohistory } from '../../action/history';
import { useSelector, useDispatch } from 'react-redux';

const Videopage = () => {
  const { vid } = useParams(); 
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoreducer);
  const vv = vids?.data.find((q) => q._id === vid);
  const currentuser = useSelector(state => state.currentuserreducer);

  useEffect(() => {
    dispatch(viewvideo({ id: vid }));

    if (currentuser) {
      dispatch(addtohistory({
        videoid: vid,
        viewer: currentuser?.result._id,
      }));
    }
  }, [dispatch, vid, currentuser]);

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <video
              src={`http://localhost:5000/${vv?.filepath}`}
              className="video_ShowVideo_videoPage"
              controls
            ></video>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.title}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdat).fromNow()}
                  </div>
                  <Likewatchlatersavebtns vv={vv} vid={vid} />
                </div>
              </div>
              <Link to={'/'} className='chanel_details_videoPage'>
                <b className="chanel_logo_videoPage">
                  <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.uploader}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comment videoid={vv?._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More videos</div>
        </div>
      </div>

      <ChatRoom roomId={vid} />
    </>
  );
};

export default Videopage;
