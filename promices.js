doWork = new Promise((resolve , reject)=>{
    setTimeout(() => {
        resolve([23,324,424,32,432]);
        //reject('rejects');
    },2000)
})

doWork.then((result)=> {
    
    console.log('promice resolvedddd',result);

}).catch((error)=>{

    console.log('error',error);
})