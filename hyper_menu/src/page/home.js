import React from 'react'
import Header from './header'
import Footer from './footer'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

<Header/>
<div class="section-container">
    <div class="container">
            <div class="row">
                <div class="col-xs-12">


                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        
                        <div class="carousel-inner" role="listbox">
                            <div class="item active">
                                <img class="img-responsive" src="./assets/images/slider3.jpg" alt="First slide" />
                            </div>
                            <div class="item">
                                <img class="img-responsive" src="./assets/images/slider2.jpg" alt="Second slide" />
                            </div>
                            <div class="item">
                                <img class="img-responsive" src="./assets/images/slider1.jpg" alt="Third slide" />
                            </div>
                        </div>
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                    </div>


                </div>
            </div>
    </div>
</div>

<div class="section-container border-section-container">
    <div class="container">
            <div class="row">
                <div class="col-md-12 section-container-spacer">
                    <div class="text-center">
                        <h2>Why Touchless menus?</h2>
                        <p> Safer, cost-effective, and always up-to-date,<br/>
                             contactless menus are the right decision for your customers<br/>
                              and your budget to help you grow your business. </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="fa-container">
                        <i class="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                    </div>
                    <div class="text-center">
                        <h3>Safer for Everyone</h3>
                    </div>
                    <div>
                        <p class="text-center">Reduce the risk of virus transmission, keeping your customers and employees safe.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="fa-container">
                        <i class="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                    </div>
                    <div class="text-center">
                        <h3>Easier to Update</h3>
                    </div>
                    <div>
                        <p class="text-center">Update your prices and specials instantly, with the push of a button. No printing required.
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="fa-container">
                        <i class="fa fa-paint-brush fa-3x" aria-hidden="true"></i>
                    </div>
                    <div class="text-center">
                        <h3>A Better Experience</h3>
                    </div>
                    <div >
                        <p class="text-center">Designed with small screens in mind, your new menu will always be easily viewable.
                        </p>
                    </div>
                </div>

            </div>
    </div>
</div>

<div class="white-text-container background-image-container" style={{backgroundImage:`url("./assets/images/qrmenuwallpaper.jpg")`}} >
    <div class="opacity"></div>
    <div class="container">
        <div class="row">
           
            <div class="col-md-6">
                <h1>Create your first menu</h1>
                <p>Create your own menus quickly and easily by getting started with a stunning</p>
                 <Link class="btn btn-lg btn-primary"  to="/register">Register your entity</Link>
            </div>

        </div>
    </div>
</div>

<div class="section-container  white-text-container" style={{backgroundColor:'#ddd'}} >
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="text-center">
                    <h2>QR code digital menu</h2>
                    <p> A QR code menu is a digital menu that's accessible for diners and drinkers on their smartphones after scanning a QR code. All customers have to do is point their mobile device and scan the QR code (which virtually all mobile devices can do) and they're immediately taken to a touchless menu. </p>
                    <Link class="btn btn-lg btn-primary"  to="/login">Create menu</Link>
                </div>
            </div>
        </div>
     </div>
 </div>

 <div class="section-container">
    <div class="container">
        <div class="row">                   
            <div class="col-md-7">
                <img class="img-responsive" src="./assets/images/img-06.jpg" alt="" />
            </div>

            <div class="col-md-5">
                <ul class="features">
                    <li>
                        <h3>Register your entity</h3>
                        <p>Register your entity . create , update and display your menus
                        </p>
                    </li>
                    <li>
                        <h3>Create your menu</h3>
                        <p>Create your restaurant menu, and choose your favorite theme
                        </p>
                    </li>
                    <li>
                        <h3>Print your menu QR code</h3>
                        <p>Print your menu QR code. and give your client an easy, safe, and elegant representation of your dishes
                        </p>
                    </li>
                </ul>
            </div>
        

              
            {/* <div class="row">
                <div class="col-md-4">
                        <img class="img-responsive page-base-image" src="./assets/images/logo-01.png" alt="" />

                </div>
                <div class="col-md-4">
                        <img class="img-responsive page-base-image" src="./assets/images/logo-02.png" alt="" />
                </div>
                <div class="col-md-4">
                        <img class="img-responsive page-base-image" src="./assets/images/logo-03.png" alt="" />
                </div>
            </div> */}
            
        </div>
    </div>
</div>
<Footer/>
    </div>
  );
}

export default Home;
