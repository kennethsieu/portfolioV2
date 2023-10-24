import React, { useState, useEffect, ChangeEvent, } from "react";
import type { HeadFC, PageProps } from "gatsby"
import '../style.css'
import { Link } from "gatsby"
import { rootCertificates } from "tls";
import selfie from "../images/selfie.jpg"
import tmgif from "../images/tmgif.gif"
import spyfx from "../images/spyfx.gif"
import group from "../images/group.jpg"
import glade from "../images/glade.gif"

const IndexPage: React.FC<PageProps> = () => {
  const [mousePos, setMousePos] = useState({});
  const [bodyFlow, setBodyFlow] = useState<boolean>(true);
  const [art, setArt] = useState<boolean>(false);


  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);


  function angle() {
      var dx = mousePos.x - 960;
      const max_ang = 360
      const max_x = 100
      const max_y = 100
      const max_c = 1.0
      const base_color = '#d3d3d3'
      const tech_color = '#8da99b'
      const art_color = '#fab3ad'

      var color = base_color;

      if(dx > max_ang) {
        dx = max_ang;
      }
      if(dx < -1 * max_ang) {
        dx = -1 * max_ang
      }

      var x = max_x / max_ang * dx
      var y = Math.abs(max_y / max_ang * dx)

      var p = max_c / max_ang * dx

      if(p > 0) {
        color = interpolate(base_color, tech_color, p)
      } else {
        color = interpolate(base_color, tech_color, p * -1)
      }

      const dy = 960
      const rad = Math.atan2(dx, dy);
      const deg = rad * 180 / Math.PI;

      return 'translateX(' + x +  'px)' + 'translateY(' + y +  'px)' + 'rotate(' + deg + 'deg' + ')'
  }

  function drop() {
    var dx = mousePos.x - 960;
    const max_ang = 360
    const max_h = 20;
    if(dx > max_ang) {
      dx = max_ang;
    }
    if(dx < -1 * max_ang) {
      dx = -1 * max_ang
    }

    var y = Math.abs(max_h / max_ang * dx) + 5

    return y + 'vw'
  }

  function drop_opacity() {
    var dx = mousePos.x - 960;
    const max_ang = 360
    const max_h = 30;
    if(dx > max_ang) {
      dx = max_ang;
    }
    if(dx < -1 * max_ang) {
      dx = -1 * max_ang
    }

    var y = Math.abs(max_h / max_ang * dx)

    return y + '%'
  }

  function interpolate(color1, color2, percent) {
    // Convert the hex colors to RGB values
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
  
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
  
    // Interpolate the RGB values
    const r = Math.round(r1 + (r2 - r1) * percent);
    const g = Math.round(g1 + (g2 - g1) * percent);
    const b = Math.round(b1 + (b2 - b1) * percent);
  
    // Convert the interpolated RGB values back to a hex color
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }


  function toArt() {
    setBodyFlow(false)
    setArt(true)
  }

  function toCS() {
    setBodyFlow(false)
    setArt(false)
  }

  function changeMode() {
    window.scrollTo(0, 0)
    setArt(!art)
  }

  function color() {
    var dx = mousePos.x - 960;
    const max_ang = 360
    const max_c = 1.0
    const base_color = '#d3d3d3'
    const tech_color = '#8da99b'
    const art_color = '#fab3ad'

    var color = base_color;

    if(dx > max_ang) {
      dx = max_ang;
    }
    if(dx < -1 * max_ang) {
      dx = -1 * max_ang
    }


    var p = max_c / max_ang * dx

    if(p > 0) {
      color = interpolate(base_color, tech_color, p)
    } else {
      color = interpolate(base_color, art_color, p * -1)
    }

    return color
  }

  function choice() {
    var dx = mousePos.x - 960;
    if(dx > 0) {
      return "CS"
    } else {
      return "ART"
    }
  }


  return (
    <React.Fragment>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@600&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;600&display=swap" rel="stylesheet"></link>
    </head>
    <body>
      {bodyFlow && (
            <div className="opener">
              <div className="clickdiv">
                <div className="invisdiv" style={{cursor: 'pointer'}} onClick = {toArt} ></div>
                <div className="invisdiv" style= {{cursor: 'pointer'}} onClick = {toCS}></div>
              </div>
              <div className="dropdown" style = {{height: drop(), opacity: drop_opacity()}}>
                <div className="dropdown_text"> {choice()} </div>
              </div>
              <div className="box">
                <div className= "header"> Kenneth's Portfolio </div>
                <div className="tilt" style = {{transform: angle(), background: color() }} >
                  <div className="pink"> Art </div>
                  <div className="green"> CS</div>
                </div>
              </div>
            </div>
      )}
      {!bodyFlow && art && (
          <React.Fragment>
            <div className="fadein">
            <div className= "header"> Kenneth's Art Projects </div>
            <div className="container">
              <div className="text-info">
                <div className="block-title"> Ink </div>
                <div className="info"> 'Ink' is an animation created using <b>Maya</b> for UCBugg, a student-run 3D animation class at UC Berkeley. 
              I took charge of <b>modeling, rigging, skinning, and animating the monster</b>. Additionally, I handled both the <b>camera control</b> and <b>post-production editing</b>.
              <br></br>
              <br></br>
              My partner, Cynthia Xiong, pitched the concept and took responsibility for modeling and skinning all other assets. Additionally, she handled the coloring, shading, and lighting of every asset.</div>
              </div>
              <div className="media">
              <iframe src="https://www.youtube.com/embed/BCw64MGOHVg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              
            </div>
            <div className="container">
              <div className="media">
              <iframe src="https://www.youtube.com/embed/G0UUda9crfc?si=KuxfYSFHw2C73P3O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <div className="text-info">
                <div className="block-title"> Live2D Model </div>
                <div className="info"> Originally, I only learned <b>Live2D</b> to make animations in Unity faster. However, I had a little too much fun and ended up experimenting with the software.
              <br></br>
              <br></br>
              The model shown is my 4th model. It took me about 25 hours to make. I drew the model in <b>Clip Studio</b> and rigged it fairly quickly. It is a significant improvement from my first model. </div>
              </div>
            </div>
            <div className="container">
              <div className="text-info">
                  <div className="block-title"> About </div>
                  <div className="info"> I am a Computer Science Major who graduated from UC Berkeley in May of 2023. 
                <br></br>
                <br></br>
                I am best at full-stack and game development. I taught and led a student-run Video Game Development and Design course at the University for about two years. However, I am always open to learn new software, regardless of how disconnected it is from my original major.
                <br></br>
                <br></br>
                Outside of academics, I really enjoy dancing. I even had the opportunity to direct my own dance team.
                </div>
                </div>
                <div className="media">
              <img className = "selfie" src={selfie}/>
              </div>
              </div>
              <div className="container"><button onClick={changeMode}>CS Projects</button></div>
              </div>
          </React.Fragment>
      )}
      {!bodyFlow && !art && (
          <React.Fragment>
            <div className="fadein">
            <div className= "header"> Kenneth's CS Projects </div>
            <div className="container">
              <div className="text-info">
                <div className="block-title">The Twilight Market</div>
                <div className="info">
                  The Twilight Market is a project started in 2021. Originally, it was a dark fantasy visual novel made in <b>Godot</b>. However, our team decided to expand the scope and turn it into a card game, transferring it to the Unity Engine. 
                  <br></br>
                  <br></br>
                  Currently, I've done a little of everything aside from 2D Art. Some contributions include: Coding, Designing Game Systems, Dialogue, Animation, Rigging and Creating 3D assets. 
                  <br></br>
                  <br></br>
                  The art was made by my friend Calvin! Check him out @calvin_beeman_weber on instagram
                  <br></br>
                  <br></br>
                  We are aiming to release by Fall 2024
                </div>
              </div>
              <div className="media">
                <img className = "mediaimg" src={tmgif}/>
                <div className="iframeholder">
                <iframe 
                src="https://www.youtube.com/embed/SYO-4HqnuiA"
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                picture-in-picture; web-share" allowfullscreen></iframe>
                </div>

              </div>
            </div>
            <div className="container">
              <div className="media">
                <img className = "mediaimg" src={spyfx}/>
                <img className = "mediaimg" src={group}/>
              </div>
              <div className="text-info">
                <div className="block-title">OPERATION: SPYFX</div>
                <div className="info">
                  OPERATION: SPYFX was a dance team I directed in Spring 2023. To introduce and gather attention for our team’s concept, I created an interactive website (This was very sucessful).
                  <br></br>
                  <br></br>
                  The site is password protected, includes glitchy visual elements, and is accessible on mobile and PC. Everything was created using a combination of <b>React.js, Typescript, and CSS </b> without any additional plugins.
                  <br></br>
                  <br></br>
                  You can view the site <a href="https://tinyurl.com/operationspyfx" target="_blank">here</a>, the password is PEANUTS
                </div>
              </div>
            </div>
            <div className="container">
              <div className="text-info">
                <div className="block-title">Glade of the Gray</div>
                <div className="info"> This is a game I pitched and developed over a period of six weeks with three other people. 
                <br></br>
                <br></br>
                I created the overall concept and programmed the card-based fighting system. Although it is a rough draft, it is a precursor to what I'm currently working on.
                <br></br>
                <br></br>
                You can play the game on browser at 
                <br></br>
                <br></br>
                <a href="https://fire2ken.itch.io/glade-of-the-gray" target="_blank">https://fire2ken.itch.io/glade-of-the-gray</a>.
                </div>
              </div>
              <div className="media">
                <img className = "mediaimg" src={glade}/>
              </div>
            </div>
            <div className="container">
              <div className="media">
              <img className = "selfie" src={selfie}/>
              </div>
              <div className="text-info">
                  <div className="block-title"> About </div>
                  <div className="info"> I am a Computer Science Major who graduated from UC Berkeley in May of 2023. 
                <br></br>
                <br></br>
                I am best at full-stack and game development. I taught and led a student-run Video Game Development and Design course at the University for about two years. However, I am always open to learn new software, regardless of how disconnected it is from my original major.
                <br></br>
                <br></br>
                Outside of academics, I enjoy dancing. I even had the opportunity to direct my own dance team.
                </div>
                </div>
                
              </div>
              <div className="container"><button onClick={changeMode}>Art Projects</button></div>
              </div>
          </React.Fragment>
      )}
    </body>
    </React.Fragment>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Kenneth's Portfolio</title>
