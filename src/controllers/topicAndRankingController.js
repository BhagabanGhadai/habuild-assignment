const client=require('../postgres')

const createTopic=async(req,res)=>{
    try {
        let data=req.body
        if(!data.name) return res.send('please provide the topic name')
        await client.query(
            `INSERT INTO "topics" ("name")  
             VALUES ($1)`, [data.name]); 
        res.send('data insert in to database')
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
}

const createRanking=async(req,res)=>{
    try {
        let data=req.body
        if(!data.rank) return res.send('please provide the rank')
        if(data.rank<=100&&data.rank>=1){
        await client.query(
            `INSERT INTO "ranking" (tid,rank)  
             VALUES ($1,$2)`, [data.tid,data.rank]); 
        res.send('data insert in to database')
        }else{
            return res.send('enter rank between 1 to 100')
        }
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
}

const getTopic=async(req,res)=>{
    try {
        let data=client.query("SELECT * FROM ranking LEFT JOIN topics ON 'topics.tid'='ranking.tid';")
        return res.status(200).send({data:data.rows})
    } catch (error) {
        console.error(error.stack);
        return false;
    } 
}
module.exports={createTopic,createRanking,getTopic}