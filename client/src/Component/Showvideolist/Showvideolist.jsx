import React from 'react';
import Showvideo from "../Showvideo/Showvideo";
import { useSelector } from 'react-redux';

const Showvideolist = ({ videoid }) => {
  const vids = useSelector(state => state.videoreducer);
  
   console.log("Vids:", vids?.data);
   
  return (
    <div className="Container_ShowVideoGrid">
      {
        vids?.data?.length > 0 ? (
          vids.data
            .filter(q => q._id === videoid) 
            .map(vi => (
              <div className="video_box_app" key={vi._id}>
                <Showvideo vid={vi} />
              </div>
            ))
        ) : (
          <p>No video data found.</p>
        )
      }
    </div>
  );
};

export default Showvideolist;
