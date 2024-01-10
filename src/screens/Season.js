import React from "react";
import spooky from "../assets/spooky.jpg";
import { useNavigate } from "react-router-dom";

const Season = () => {
  const navigate = useNavigate();
  return (
    <div className='season'>
      <div className='seasonContainer'>
        <img src={spooky} alt='' />
        <div className='seasonHeader'>
          <h1 className='seasonHeading'>Spooky season is coming soon...</h1>
          <p>
            Well, kind of. 'World Brands' monsters know how early we do Halloween
            round here, so this’ll come as no surprise to the OGs. Get your
            claws on Halloween bits at trick-or-treat prices before the big day
            creeps up on us. (Psst! More coming soon...)
          </p>
        </div>
      </div>
      <div className='shopBtn'>
        <button onClick={() => navigate("/new/arrived")}>EXPLORE</button>
      </div>
    </div>
  );
};

export default Season;
