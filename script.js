let prompt=document.querySelector(".prompt")
let container=document.querySelector(".container")
let chatContainer=document.querySelector(".chat-container")
let btn=document.querySelector(".btn")
let userMessage=null
let Api_url='https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD5nWq3we-35dCxxJdXxTgonxUvxtUOYR4'

function createChatBox(html,className){
    let div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html
    return div
}

async function generateApiResponse(aiChatBox) {

  let textElement = aiChatBox.querySelector('.text')

  try{
      
      let response=await fetch(Api_url,{
          method:'POST',
          headers:{'Content-Type':  'application/json'},
          body:JSON.stringify({ 
            contents:[
                {'role':'user',
                'parts':[{text: userMessage}]
            }]
               
          })

      })

      let data=await response.json();
      let apiResponse=data?.candidates[0].content.parts[0].text
      textElement.innerText=apiResponse

  }

  catch(error){
      console.log(error)
  }

  finally{
      aiChatBox.querySelector('.loading').style.display='none'
  }

}

function showLoading(){
  let html=` 
          <div class="img">
              <img src="./ai.png" alt="" width="50">
          </div>
          <p class="text"></p>
          <img class="loading" src="loading.gif" alt="loading" height="50">`
          
  let aiChatBox= createChatBox(html,"ai-chat-box")
  chatContainer.appendChild(aiChatBox)
  generateApiResponse(aiChatBox)
}

btn.addEventListener("click",()=>{

    userMessage=prompt.value.trim();

      if (userMessage === "") {
        container.style.display = "flex";
        return;
      } 
      
      else{
        container.style.display="none"
      }

      if(!userMessage)return;

    let html=`
    <div id="img">
      <img src="user.png" alt="">
    </div>
    <div class="text">
    </div>`

    let userChatBox=createChatBox(html,"user-chat-box")
    userChatBox.querySelector(".text").innerText=userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)

})

prompt.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        userMessage = prompt.value.trim();

        if (userMessage === "") {
            container.style.display = "flex";
            return;
        } 
        
        else {
            container.style.display = "none";
        }

        let html = `
        <div id="img">
            <img src="user.png" alt="">
        </div>
        <div class="text">
        </div>`;

        let userChatBox = createChatBox(html, "user-chat-box");
        userChatBox.querySelector(".text").innerText = userMessage;
        chatContainer.appendChild(userChatBox);
        prompt.value = "";
        setTimeout(showLoading, 500);
    }
});

document.addEventListener('keydown', function(event) {
    // Disable F12
    if (event.key === 'F12') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I (Dev Tools)
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+C (Inspect)
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (event.ctrlKey && event.key === 'U') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+K (Console in Firefox)
    if (event.ctrlKey && event.shiftKey && event.key === 'K') {
        event.preventDefault();
        return false;
    }
  
    // Disable Ctrl+Shift+I (Dev Tools)
    if (event.ctrlKey && event.shiftKey && event.key === 'i') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (event.ctrlKey && event.shiftKey && event.key === 'j') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+C (Inspect)
    if (event.ctrlKey && event.shiftKey && event.key === 'c') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+K (Console in Firefox)
    if (event.ctrlKey && event.shiftKey && event.key === 'k') {
        event.preventDefault();
        return false;
    }
  
});

document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      return false;
});