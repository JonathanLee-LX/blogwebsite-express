
var search = document.getElementById("search")
var submit = document.getElementById("submit-btn")
submit.addEventListener("click",function(e){
	e.preventDefault()//阻止onsubmit的默认事件
//	console.log("has run")
	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304){
				console.log("success:\n")
				document.title = xhr.responseText
			}else{
				console.log("failed:\n")
				console.log(xhr.status)
			}
		}
	}
	var value = search.value,name = "name",url = "http://jlx520.xyz:8000"
	var url = addURLParam(url,name,value)
	xhr.open("get",url,true)
	xhr.send(null)
})

function addURLParam(url,name,value){
	url += url.indexOf("?") === -1 ? "?" : "&"
	url += encodeURIComponent(name) +"="+ encodeURIComponent(value)
	return url
}