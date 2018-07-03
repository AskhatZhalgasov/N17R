<div id="root"></div>
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
<script type="text/babel">
   const rootElement = document.getElementById("root")
    
   const colors = ['Chocolate', 'Aqua', 'DeepPink', 'Gold', 'Grey', 'Indigo', 'Lime', 'Maroon', 'Orange', 'Pink'];
   
   function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
   }
   
   class App extends React.Component {
     state = {
       it: 0,
       points: 0,
       hp: 3,
       color: "green",
       message: "green", 
       answer: 0
     };
  
     
     checkAnswer = (reply) => {
       console.log("reply: ", reply)
       if (reply == this.state.answer) {
         this.setState({
           points: this.state.points + 1
         })
       } else {
         this.setState({
           hp: this.state.hp - 1
         })
       }
       console.log(randomInteger(0, 9))
       this.setState({
         it: this.state.it + 1,
         color: colors[randomInteger(0, 9)],
         message: colors[randomInteger(0, 9)]
       })
     }
     
     getColor = () => {
       if (this.state.hp < 0) {
         alert("Game Over!!!")
       }
       if (this.state.it === 0) {
         this.setState({
           it: this.state.it + 1,
           color: colors[randomInteger(0, 9)],
           message: colors[randomInteger(0, 9)]
         })
       }
       return this.state.color
     }
     render() {
       return (
         <div>
           
           <p style = {{textAlign: "center", fontSize: "30px"}} >Super Game</p>
           <h1>Your points: {this.state.points}</h1>
           <p>Your hp: {this.state.hp}</p>
           <p>Round #: {this.state.it}</p>
           
           <button style = {{fontSize: "20px", backgroundColor: "green", color: "white", 
                             textAlign: "left", padding: "15px 32px"}} 
                             onClick={() => this.checkAnswer(1)}>True</button>
           <button style = {{fontSize: "20px", backgroundColor: "red", color: "white", 
                             textAlign: "right", padding: "15px 32px"}}
                             onClick={() => this.checkAnswer(0)}>False</button>
           
           <br/>
           
           <div style = {{width: "215px", height: "80px", textAlign: "center", 
                          backgroundColor: this.state.points < 10 ? this.getColor() : "white", 
                          margin: "10", padding: "50px", 
                          fontSize: "50px"}}> 
                          {this.state.points < 10 ? this.state.message : "Alert!!!"}
           </div>  
           
         </div>
       )
     }
   }
   ReactDOM.render(<App />, rootElement)
</script>