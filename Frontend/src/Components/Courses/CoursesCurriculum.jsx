// import { formatTime } from '@/utils/formatDuration';
// import React from 'react'
// import { FaPlayCircle } from 'react-icons/fa';
// import { TiArrowSortedDown } from 'react-icons/ti';

// const CoursesCurriculum = ({sectionArr,}) => {
//   return (
//  <div className="space-y-5 py-6">
//             {section?.map((sec, i) => {
//               const key = `module${i + 1}`;
//               return (
//                 <div
//                   key={sec._id}
//                   className="border rounded-2xl bg-white shadow-sm overflow-hidden"
//                 >
//                   <button
//                     onClick={() => {
//                       toggleModule(key);
//                       setsectionId(sec._id);
//                     }}
//                     className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition"
//                   >
//                     <div>
//                       <p className="text-sm text-gray-400">
//                         Module {i + 1}
//                       </p>
//                       <h3 className="text-lg font-semibold font-heading text-dashboard">
//                         {sec.title}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         {lesson?.length || 0} Lessons •{" "}
//                         {formatTime(sec.duration)}
//                       </p>
//                     </div>
//                     <TiArrowSortedDown
//                       className={`
//                         text-xl transition
//                         ${syllabus[key] ? "rotate-180" : ""}
//                       `}
//                     />
//                   </button>
//                   {syllabus[key] && (
//                     <div className="border-t bg-slate-50">

//                       {lesson?.map((item) => (

//                         <div
//                           key={item._id}
//                           className="flex justify-between items-center px-5 py-3 border-b last:border-none"
//                         >

//                           <div className="flex items-center gap-3">

//                             <FaPlayCircle className="text-button" />

//                             <span>
//                               {item.lesson}
//                             </span>

//                             {item.isPreview && (

//                               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                                 Preview
//                               </span>

//                             )}

//                           </div>

//                           <span className="text-sm text-gray-500">
//                             {formatTime(item.duration)}
//                           </span>

//                         </div>

//                       ))}

//                     </div>

//                   )}

//                 </div>

//               );

//             })}

//           </div>  )
// }

// export default CoursesCurriculum