import "./Header.css"
import Image from "next/image";
import Navigation from "../Nav/Navigation";

export default function Header() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="header-title">Truck Driver English</h1>
            <div className="header-bottom">
              <div className="user">
                <div className="user-pic">
                  <div className="pic-wrap">
                    <Image  
                      src={'/Yarik.png'} 
                      layout="responsive"
                      width={4}
                      height={4}
                      alt="Yarik picture"/>
                    </div>
                  </div>
                <div className="user-name"> Yarik Tupkalo</div>
              </div>
              <Navigation />
            </div>
        </div>
      </header>
    );
  }