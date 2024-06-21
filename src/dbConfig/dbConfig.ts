import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI+"");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            
        })
        

        connection.on('error', (err: string) => {
            
            process.exit();
        })

        

    } catch (error) {
        
        
        
    }


}