import React from 'react'
import Header from './header'
import Footer from './footer'

 function About() {
  return (
    <div>
<Header/>
<div class="white-text-container background-image-container" style={{backgroundImage:`url("./assets/images/img-home.jpg")`}} >
  <div class="opacity"></div>
  <div class="container">
      <div class="row">
         <center>
        <h1>About US </h1>
      </center>

      </div>
  </div>
</div>

<div class="section-container">
    <div class="container">
            <div class="row">
                <div class="col-xs-12">
                  <div class="section-container  white-text-container" >
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="text-center">
                                    <h2>Who we are ?</h2>
                                    <p> Safer, cost-effective, and always up-to-date,
                                      contactless menus are the right decision for your customers
                                      and your budget to help you grow your business. </p>
                                </div>
                            </div>

                            <div class="col-xs-12">
                              <div class="text-center">
                                  <h2>Our Goal</h2>
                                  <p> Safer, cost-effective, and always up-to-date,
                                    contactless menus are the right decision for your customers
                                    and your budget to help you grow your business.  </p>
                              </div>
                          </div>
                        </div>
                     </div>
                 </div>

                </div>
            </div>
    </div>
</div>
<Footer/>
    </div>
  );
}

export default About;
