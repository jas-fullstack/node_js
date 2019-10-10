const sum = (one , two ) => {

   return new Promise((resolve , reject)=>{
        setTimeout(()=> {
            resolve(one + two);
        },2000);
    
   }) 
   
};

const doWork = async () => {
    const total = await sum(10,40);
    const total2 = await sum(total, 50);
    return total2;
}

//console.log(doWork());
doWork().then((result) => {
    console.log('result',result)
}).catch((e) => {
    console.log('error',e);
});
//async function alwasy retun a promice. that means we can acces value with then and catch statement.