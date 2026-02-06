import React, { useEffect, useState } from "react";

export default function ScrollTop(){
  const [show, setShow] = useState(false);
  useEffect(()=> {
    const onScroll = ()=> setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);
  if(!show) return null;
  return (
    <button onClick={()=> window.scrollTo({top:0, behavior:'smooth'})} className="fixed right-6 bottom-24 bg-gold text-black px-3 py-2 rounded shadow-lg z-50">
      ↑ Top
    </button>
  );
}
