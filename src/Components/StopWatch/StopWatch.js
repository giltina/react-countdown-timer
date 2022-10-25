import './StopWatch.css';
import { useState, useRef, useEffect } from 'react';

function StopWatch(){

    const [timer, setTimer] = useState(0)
    const [time, settime] = useState("")
    const [notification, setNotification] =  useState("")
    const increment = useRef(null)
    const [notificationColor, setnotificationColor] = useState("black");
    const [notificationClass, setnotificationClass] = useState("");
    
    
    
    

    const handleSubmit = (event) => {
        event.preventDefault();
        setTimer(time * 60)
        normalTime()
        
      }
  
    const normalTime = () => {
      
      clearInterval(increment.current)
        increment.current = setInterval(() => {
          setTimer((timer) => timer - 1)        
        }, 1000)
    }

    const mediumTime = () => {
      
      clearInterval(increment.current)
      increment.current = setInterval(() => {
        setTimer((timer) => timer - 1)
      }, 750)
  }

    const doubleTime = () => {
        clearInterval(increment.current)
        increment.current = setInterval(() => {
          setTimer((timer) => timer - 1)
        }, 500)
    }
  
    const handlePause = () => {
        clearInterval(increment.current)
    }
  
    const handleResume = () => {
        increment.current = setInterval(() => {
            setTimer((timer) => timer - 1)
          }, 1000)
    }
  

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
       
    
        return `${getMinutes} : ${getSeconds}`
      }

      useEffect(() => {

        const halfTime = (time * 60) / 2

        if(timer === halfTime & halfTime > 0) {
        setNotification("More than halfway there!")
        }

        else if (timer === 20){

            setnotificationColor('red')

        }

        else if (timer === 10){
          setnotificationClass("blink")
        }

        else if (timer === 1) {
          setNotification("Time’s up!")
          setnotificationClass("")
         }
    
        else if (timer === 0) {
        
        clearInterval(increment.current)
        setTimer(0)
        }
         

        
    }, [timer, time]);

      
  
    return (
      <div className="app">
        
        <div style={{marginTop: "30px"}}>

      <form onSubmit={handleSubmit}>
      <label style={{fontWeight: "bold"}}>Countdown:
        <input 
          type="text" 
          placeholder='(Min)'
          value={time}
          onChange={(e) => settime(e.target.value)}
        />
      </label>
      <input type="submit" value="Start" className='start'/>
      </form>
         <p style={{color: notificationColor, fontWeight: "bold", fontSize: "1.1em", margin: "30px"}} className={notificationClass}>{notification}</p>   
        <p className='time'>{formatTime()}</p>
          <div classtime='buttons'>
            
            <button onClick={handlePause} className='pause'>Pause</button>
            <button onClick={handleResume} className='resume'>Resume</button>
            <br/><br/>
            <button onClick={normalTime} className='speed'>1x</button>
            <button onClick={mediumTime} className='speed'>1.5x</button>
            <button onClick={doubleTime} className='speed'>2x</button>
          </div>
        </div>
      </div>
    );

}
export default StopWatch;