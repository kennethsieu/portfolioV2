import React, { useState, useEffect, ChangeEvent, } from "react";
import type { HeadFC, PageProps } from "gatsby"
import '../style.css'
import { Link } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX});
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  return (
    <main>
      <div className="tilt">
      The mouse is at position{' '}
      <b>
        ({mousePos.x})
      </b>
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Kenneth's Portfolio</title>
