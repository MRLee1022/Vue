//通过身份证获取出生日期、性别
function getCardInfo(cardno){
	let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	let cardInfo = {
		gender:"",
		birthday:""
	}
	if(reg.test(cardno) === true){
		let birthday = "";
		let sexno;
        if(cardno.length == 15){  
        	sexno=cardno.substring(16,17);
            birthday = "19"+cardno.substr(6,6);  
        } else if(cardno.length == 18){  
        	sexno=cardno.substring(14,15);
            birthday = cardno.substr(6,8);  
        }  
        if(sexno%2==0){
        	cardInfo.gender = "男"
        }else{
        	cardInfo.gender = "女"
        }
        cardInfo.birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-"); 
	}
	return cardInfo;
}
//数组排序
function sortArry(arry,value){
    let newarry = Object.assign([],arry);
    for(var i=1; i<newarry.length;i++){
        if(newarry[i][value]<newarry[i-1][value]){
            //取出无序序列中需要插入的第i个元素
            let temp = newarry[i];
            //定义有序中的最后一个位置
            var j = i-1;
            newarry[i] = newarry[j];
            //比较大小，找到插入的位置
            while(j>=0&&temp[value]<newarry[j][value]){
                newarry[j+1] = newarry[j];
                j--;
            };
            newarry[j+1] = temp;
        }
    }
    return newarry;
}
export{
    sortArry,getCardInfo
}