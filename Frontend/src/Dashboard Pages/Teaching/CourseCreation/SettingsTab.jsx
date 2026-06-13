import api from "@/utils/axios";
import React, { useState } from "react";
const SettingsTab = ({lessonId}) => {
const [isPreview,setIsPreview] = useState(false)
console.log(isPreview)
const handleChecked = async()=>{
  try{

const res = await api.put(`/auth/course/lesson/${lessonId}/setting`,{isPreview})


  }catch(err){
    console.log(err)
  }
}
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Lesson Settings
      </h2>

      <div className="space-y-6">

        <div className="flex items-center justify-between border rounded-lg p-4">

          <div>
            <h3 className="font-medium">
              Free Preview
            </h3>

            <p className="text-sm text-neutral-500">
              Allow students to watch before purchase
            </p>
          </div>

          <input
            type="checkbox"
            
            onChange={(e) =>{
              setIsPreview(e.target.checked),handleChecked()}
            }
          />

        </div>

        <div>



        </div>

      </div>
    </div>
  );
};

export default SettingsTab;