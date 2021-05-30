window.addEventListener('DOMContentLoaded',(event)=> {

  getVisitCount();
});
const functionAPI="https://function-counter.azurewebsites.net/api/counter?code=KkYPsV8sHLTaJ4YA8RzNTkSqsmxwnMluF99OBK4c9KCkz4eGNkmG5A==";
const functionLocal= "http://localhost:7071/api/counter";
const getVisitCount=() => {


  let count=30;
	fetch(functionAPI).then(response => {

		return response.json();
	}).then(response => {

         console.log("Website called");
	 count= response.visitors;
	 document.getElementById("counter").innerText = count;	
	}).catch(function(err)
		{

			console.log(err);
		});


};
