


import { table, getMinifiedRecords,findRecordByFilter } from "../../Lib/airtable"



const createCoffeeStore = async (req, res) => {
    
  
    if (req.method === "POST") {
      //find a record

      const {id, name ,address ,cross_street,Voting,imgUrl }=req.body;

  
      try {

        if (id) {
        
          const records = await findRecordByFilter(id);
        
  
        if (records.length !== 0) {
          
          
          res.json(records);
        } else {
          //create a record
          
  
          if (name ){

            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  cross_street,
                  Voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
  
            
          }
          else {
            res.status(400);
            res.json({ message: "Id or name is missing" });
          }
        }
        

          }


          else {
            res.status(400);
            res.json({ message: "Id is missing" });
          }


         
      } catch (err) {
        console.error("Error finding store", err);
        res.status(500);
        res.json({ message: "Error finding store", err });
      }
    }
  };
  

  
  export default createCoffeeStore;