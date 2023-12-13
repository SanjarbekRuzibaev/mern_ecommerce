import React from "react";
import "./notFound.css";
const NotFound = () => {
  return (
    <section className='page_404'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 '>
            <div className='col-sm-10 col-sm-offset-1  text-center'>
              <div className='four_zero_four_bg'></div>

              <div className='contant_box_404'>
                <p>The product you are looking for not available!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
