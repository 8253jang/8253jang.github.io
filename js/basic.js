  //랜더링이 될때 다시 실행되지 않아도 되기에 함수 밖에 선언한다.
  let mockData = [
    {id:0, isDone:false, content:"React study", date: new Date().getTime()},
    {id:1, isDone:true, content:"친구만나기", date: new Date().getTime()},
    {id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()},
    ];

    let day =["일","월","화","수","목","금","토"];
    onload = ()=>{
        initData(mockData);
        const today = new Date();
        document.querySelector(".Header > h1").innerHTML=
        `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일  ${day[today.getDay()]}요일`;

    }

    const initData = (printData)=>{
        let todosWrapper = document.querySelector(".todos_wrapper");
     
        let str="";
        printData.forEach((todo, index)=>{
         // console.log(todo.isDone)
        str+='<div class="TodoItem">';
        str+=`<input type="checkbox"  onChange="onUpdate(${todo.id})" ${todo.isDone ? "checked" :"" }/>`;
        str+='<div class="content">'+todo.content+'</div>';
        str+='<div class="date">'+new Date(todo.date).toLocaleString()+'</div>';
        str+=`<button name="${todo.id}" onclick="todoDel(this)">삭제</button>`;
        str+='</div>';
        })

        todosWrapper.innerHTML=str;
       
    }

    // 추가 클릭
    let idIndex= 3;
    document.querySelector(".Editor > button").onclick =() =>{
      event.preventDefault();
        let inputEle = document.querySelector("#input");
        let row =  {id:idIndex, isDone:false, content:inputEle.value , date: new Date().getTime()}
        mockData.push(row);
        idIndex++;
        document.querySelector("#input").value="";
        initData(mockData);

       // return false;
    }
    /////////////////////////////////////////
     //수정
     const onUpdate = (targetId)=>{ //TodoItem에서 호출할때 전달한 id
          //todos state의 값들중에 targetId와 일치하는 todoitem의 isDone 변경
          mockData  = mockData.map((todo)=>{
          if(todo.id===Number(targetId)){
              return {...todo , isDone : !todo.isDone}
          }else{
              return todo;
          }
        });
      // console.log(mockData)
        initData(mockData);

     }
   
   ////////////////////////////////////////////////////
    // 삭제
    const todoDel = (th)=>{
     // let divEle =  th.closest(".main-item");
        let targetId = Number(th.getAttribute("name"));
        console.log("targetId = " + typeof(targetId))
        mockData = mockData.filter((todo)=>{
          console.log("todo.id = " + typeof(todo.id))
         return todo.id!==targetId;
      });

        console.log(mockData);

        initData(mockData);
   }
   ////////////////////////////////////////////

   //검색
   document.querySelector("#keyword").onkeyup = (e)=>{
        console.log(e.target.value);

     let searchedTodos =   getFilterData(e.target.value);
     
     initData(searchedTodos);
    
  }

  const getFilterData = (search) =>{
      if(search===""){
       return  mockData;
    }

    const searchedTodos =  mockData.filter((todo)=>{
        return todo.content.toLowerCase().includes(search.toLowerCase());
    });

    return searchedTodos;
  }