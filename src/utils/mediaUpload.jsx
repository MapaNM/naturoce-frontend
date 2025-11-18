const url = "https://dbfdvofexpeyeraqcspv.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiZmR2b2ZleHBleWVyYXFjc3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODE1NDYsImV4cCI6MjA3MzM1NzU0Nn0.PBuLBE40u0pnCzb5MJflI01e5jFweSRqNnq8WghZ1po"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(url,key);

export default function uploadFile(file){
    const promise = new Promise(
        (resolve, reject)=>{ 
            if(!file){
                reject(" Please Select a File to Upload");
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp + "-" + file.name;
            supabase.storage.from("images").upload(fileName, file,{
                cacheControl: '3600',
                upsert: false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl);
                }
            ).catch(
                ()=>{
                    
                    reject("Error uploading file");
                }
            )
        }
    )
    return promise;
} 