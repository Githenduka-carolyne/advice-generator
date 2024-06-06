import { useState,useEffect} from 'react'
import React from 'react';
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
import "./global.css";


function App() { 
  const[advice ,setadvice] = useState(" ");
  const[load ,setload] = useState("false"); 


    const searchadvise = async (e) => {
    e.preventDefault();
    
    try{
      setload(true)
      const response = await fetch(
        	"https://api.adviceslip.com/advice"
      )
      if( response.ok == true){
        const data = await response.json();
        setadvice(data.slip.advice);
        setload(false)
      }
      else{
        alert("There was an error")
        setload(false);
      }
    } 
    catch(error){
      console.log("error found")
      console.log(error)
      setload(false)
    }
    
  };
  useEffect(() =>{
    searchadvise();
    
  },[]);

  return (
    <div className="herosection">
      <div className="textbox">
        <h2 className="herosection-maintitle">
          Advice <span>Generator</span>
        </h2>
      </div>
      <section className="output-section">
        <div className="container">
          
            <div className="advice">
              {load ? (
                <ClipLoader />
              ) : (
                <>
                  {advice && (
                    <h2>
                      <i>
                        <FaQuoteLeft />
                        {advice}
                        <FaQuoteRight />
                      </i>
                    </h2>
                  )}
                </>
              )}
            
          </div>
          <div className="button">
            <button onClick={searchadvise} className="btn">
              Get advice
            </button>
          </div>
        </div>
      </section>
      {console.log(advice)}
    </div>
  );

};

export default App;
