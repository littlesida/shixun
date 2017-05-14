var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse(__dirname+'/input.xlsx');
var excelObj=obj[0].data;
console.log(excelObj);

var data = [];
for(var i in excelObj){
    var arr=[];
    var value=excelObj[i];
    for(var j in value){
        arr.push(value[j]);
    }
    data.push(arr);
}
// 删除并添加
arr=[];
arr.push(234);
arr.push(234);
data.splice(2,3,arr); // 从第2个元素开始  删除3个元素 并插入arr

var buffer = xlsx.build([
    {
        name:'sheet1',
        data:data
    }        
]);

//将文件内容插入新的文件中
fs.writeFileSync('delete_add.xlsx',buffer,{'flag':'w'});

// 删除 117
var id = 117;

 var newData = data.filter(function(item) {
return item[0] != id;
});

data = newData;

// 添加

buffer = xlsx.build([
    {
        name:'sheet1',
        data:data
    }        
]);

//将文件内容插入新的文件中
fs.writeFileSync('delete.xlsx',buffer,{'flag':'w'});