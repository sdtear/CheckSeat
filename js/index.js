//5万，会出现性能问题及已售显示的延迟性，可将dom存储在数组中，将该数组append到对应父节点，可滚动机制对滚动过元素的进行复用，不需再多次创建
//可将png图片换为svg，svg是xml格式，浏览器可以直接识别
window.onload = function(){
	CreateSeat(30,30);
	document.getElementsByTagName('li')[20].style.marginTop = '40px';
	var ArrImg = document.getElementsByTagName('div')[1].getElementsByTagName('img');
	var Ofooter = document.getElementById('footer');
	var Opay = document.getElementById('pay');
	var Num = 0;
	for(let i=0;i<ArrImg.length;i++){
		ArrImg[i].onclick = function(){
			if(this.src.split('img/')[1]!='payseat.png'){
				Ofooter.style.display = 'block';
			}
			if(this.src.split('img/')[1]=='seat.png'){
				if(Num<4){
					this.src = 'img/checkseat.png';
					var Ospan = document.createElement('span');
					Ospan.style.marginRight = '10px';
					Ofooter.insertBefore(Ospan,Opay);
					var a = i%30;
					var b = parseInt(i/30)+1;
					Ospan.innerHTML = b+'排'+a+'列';
					Ospan.setAttribute('flag',i);
					Num++;
				}else{
					alert('最多选择4个')
				}
			}else if(this.src.split('img/')[1]=='checkseat.png'){
				var arrSpan = Ofooter.getElementsByTagName('span');
				for(let j=0;j<arrSpan.length;j++){
					if(arrSpan[j].getAttribute('flag') == i){
						Ofooter.removeChild(arrSpan[j]);
						Num--;
					}
				}
				this.src = 'img/seat.png';
			}
		}
	}
	document.getElementById('pay').onclick = function(){
		var arrSpan = Ofooter.getElementsByTagName('span');
	    for(let i=0;i<arrSpan.length;i++){
	    	var a = arrSpan[i].getAttribute('flag');
	    	ArrImg[a].src = 'img/payseat.png';
	    }
	    Num = 0;
	    for(var i=arrSpan.length-1;i>=0;i--){
	    	Ofooter.removeChild(arrSpan[i]);
	    }
	    Ofooter.style.display = 'none';
	}
}
function CreateSeat(rowNum,cellNum){
	var OUl = document.getElementsByTagName('ul')[1];
	for(let i=0;i<rowNum;i++){
		var OLi = document.createElement('li');
		OUl.appendChild(OLi);
		for(let j=0;j<cellNum;j++){
			var OImg = document.createElement('img');
			OImg.src = 'img/seat.png';
			OLi.appendChild(OImg);
		}
	}	
}
