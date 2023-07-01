import { table, findRecordByFilter ,getMinifiedRecords } from "../../Lib/airtable"
const favouriteCoffeeStoreById = async (req, res) => {
    if (req.method === "PUT") {
      try {
        const { id } = req.body;
  
        if (id) {
          const records = await findRecordByFilter(id);
  
          if (records.length !== 0) {
            res.json(records);
            const record = records[0];
            const calculateVoting = parseInt(record.Voting) + 1;
    
            

            const updateRecord = await table.update([
                {
                  id: record.id,
                  id: record.recordId,
                  fields: {
                    Voting: calculateVoting,
                  },
                },
              ]);
    
              if (updateRecord) {
                const minifiedRecords = getMinifiedRecords(updateRecord);
               
                res.json(updateRecord);
                res.json(minifiedRecords);
              }



          } else {
            res.json({ message: "Coffee store id doesn't exist", id });
          }
        } else {
          res.status(400);
          res.json({ message: "Id is missing" });
        }
      } catch (error) {
        res.status(500);
        res.json({ message: "Error upvoting coffee store", error });
      }
    }
  };
  
  export default favouriteCoffeeStoreById;
