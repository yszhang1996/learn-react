// src/global.tsx
import React, { useEffect } from 'react';
export default function Global({ children }) {
  console.log("global");

  useEffect(() => {
    console.log("global");
  })
  
  return (
    <>
      {/* <Header /> */}
      <div title='1111111111'>
      {children}
      </div>
      {/* <Footer /> */}
    </>
  );
}