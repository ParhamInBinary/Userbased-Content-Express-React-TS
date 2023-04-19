import mongoose from 'mongoose';
import { app } from './app';


// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WallOfPosts');
    console.log('Connected to Database');
    
    app.listen(3000, () => {
        console.log('Server is running: http://localhost:3000');
      });
}

main().catch(console.error);