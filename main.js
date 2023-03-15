var form=document.getElementById('my-form');

form.addEventListener('submit',SaveToCrudCrud);

function SaveToCrudCrud(event){
    event.preventDefault();

    const sellprice=event.target.sellingprice.value;
    const name=event.target.productname.value;
    const category=event.target.category.value;
    

    const obj= { 
        sellprice,
        name,
        category,
    }
    
    axios.post("https://crudcrud.com/api/f0a8c56b0e054673aa3eb931b5224bb0/Products",obj)
    .then((response)=>{
        showUserOnScreen(response.data)
        
    })
    .catch((err)=>{
        document.body.innerHTML+="<h2>Something went Wrong</h2>";
        console.log(err);
    })

}

window.addEventListener("DOMContentLoaded",(obj)=>{
    axios.get("https://crudcrud.com/api/f0a8c56b0e054673aa3eb931b5224bb0/Products")
    .then((response)=>{
        // console.log(response.data)
        for (var i=0;i<response.data.length;i++){
             //console.log(response.data[i])
            showUserOnScreen(response.data[i])
           
        }
       
    })
    .catch((err)=>{
        console.log(err);
    })
})

function showUserOnScreen(obj){
    if (obj.category=="Electronics")
    {
        var parentElem=document.getElementById('eleclist');
    }
    else if(obj.category=="Food")
    {
        var parentElem=document.getElementById('foodlist');
    }
    else{
        var parentElem=document.getElementById('carelist');
    }
    
    const childElem=document.createElement('li');

    childElem.textContent=obj.sellprice +" - "+ obj.name+" - "+obj.category+" - ";

    const DelButton=document.createElement('input');
    DelButton.type='button';
    DelButton.value='Delete Item';
    DelButton.onclick=()=>{
        
        axios.delete(`https://crudcrud.com/api/f0a8c56b0e054673aa3eb931b5224bb0/Products/${obj._id}`)
        .then((response)=>{
            parentElem.removeChild(childElem);
        })
        .catch((err)=>{
            document.body.innerHTML+="<h2>Something went Wrong</h2>";
            console.log(err);
        })
        
    }
    
    childElem.appendChild(DelButton);
    parentElem.appendChild(childElem);

}