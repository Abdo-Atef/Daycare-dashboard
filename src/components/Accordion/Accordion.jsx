import React, { useEffect, useRef, useState } from "react";

export default function Accordion({ content, heading }) {
  const [Collapsed, setCollapsed] = useState(false);
  const [ElementHeight, setElementHeight] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const Height = elementRef.current.clientHeight;
    setElementHeight(Height);
    setCollapsed(true)
  }, []);

  return (
    <div>
      <div
        className={`w-100 p-4 py-3 cursor-pointer d-flex justify-content-between align-content-center ${
          Collapsed ? "textGray" : "textGray"
        }`}
        style={{}}
        onClick={() => setCollapsed(!Collapsed)}
      >
        {heading}
        <span style={{
          rotate: Collapsed ? "0deg" : `90deg`,
          transition: ".2s",
        }}><i className="fa-solid fa-angle-right textNile"></i></span>
      </div>
      <div
        ref={elementRef}
        className={`overflow-hidden`}
        style={{
          height: Collapsed ? "0" : `${ElementHeight}px`,
          transition: ".4s Height",
        }}
      >
        {content}
      </div>
    </div>
  );
}
