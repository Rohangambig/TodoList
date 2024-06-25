  import { useEffect, useState } from "react";
  // import Gif from './Image/Gif.gif'
  function App() {

    const [title,settitle] = useState("");
    const [task,settask] = useState("");
    // const [isTrue,setisTrue] = useState(false);

    const [Data,setData] = useState([]);
    
    const HandleInput = (e) =>{

        e.preventDefault();

        if(!title || !task)
        {
          alert("You have to fill both the input tag")
          return;
        }

        const newData = {'key':Date.now(),'Title':title,'Task':task,'Date':Date.now()};
        const newArray = [...Data,newData];

        setData(newArray)
        localStorage.setItem('TodoData',JSON.stringify(newArray));
        settitle("");
        settask("");
    }

    const HandleDelete = (itemId) => {
      const filteredData = Data.filter((item) => item.key !== itemId);
    
      setData(filteredData);

      localStorage.setItem('TodoData', JSON.stringify(filteredData));
    };
    
    useEffect(()=>{

      const newArray = localStorage.getItem('TodoData');

      if(newArray)
      {
        try{
          setData(JSON.parse(newArray));
        }
        catch(err)
        {
          console.log("Error in fetching the data");
        }
      } 

      // setTimeout(()=>{
      //   setisTrue(true);
      // },4000)

    },[]);

    
    

    return (
      <div className="Container">
      <h1 style={{'textAlign':'center'}}>TodoList </h1>  
      <div className="App">
        <div className="InputContainer">
          <input type="text" placeholder="Enter Title of your Task" value={title} onChange={(e)=>{settitle(e.target.value)}}></input>
          <input type="text" placeholder="About Task" value={task} onChange={(e)=>{settask(e.target.value)}}></input>
          <button className="AddBtn" onClick={HandleInput}>Add</button>
        </div>

      </div>
      <div className="AllTodo">
          {Data.length === 0 && (
            <div style={{'margin':'10px'}}>
              <h2>Sorry No Todo Are Left</h2>
            </div>
          )}  
          {Data.length !== 0 && (
            <div style={{'margin':'10px'}}>
              <h2>All Your Todo</h2>
            </div>
          )}
          {Data.length !== 0 && Data.map((item)=>(
            <div className="EachTodo">

              <div className="HeadingDate">
                <div className="HeadingTask"><h2 key={item.key}>{item.Title} </h2></div>
                <p>{new Date(item.Date).toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric'})}</p>
              </div>
              
              <div className="TaskContent">
                <p style={{'width':'100%'}}>{item.Task}</p>
              </div>
              <button onClick={()=>HandleDelete(item.key)}>Delete</button>
            </div>
          ))}
        </div>
        
        
         
        </div>
    );
  }

  export default App;
