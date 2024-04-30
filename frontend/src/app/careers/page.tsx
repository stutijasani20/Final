"use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";
// export default function page() {
//   const [jobIdData,setJobIdData] = useState<any>([])
//   axios.get("http://127.0.0.1:8000/jobs/").then(function (response) {
//     // Extracting the IDs from the response data
//     const jobs = response.data;
//     const jobIds = jobs.map((job: { id: any }) => job.id);
//     // console.log(jobIds);
//     setJobIdData(jobIds)
//   });
//   return (
//     <>
//       <div className="flex max-w-[1500px] mx-auto px-6 pb-6 justify-center">
//         <div className="relative w-72 mx-6 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/crew.jpg"}
//             alt="crew"
//             height={900}
//             width={600}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">Cabin Crew</div>
//             <p className="mt-1 text-gray-200">Multiple Locations</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/pilot.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">Pilots</div>
//             <p className="mt-1 text-gray-200">Multiple Locations</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/cadet.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">
//               Cadet Pilot Programs
//             </div>
//             <p className="mt-1 text-gray-200">Multiple Locations</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/operations.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">
//               Flight Operations
//             </div>
//             <p className="mt-1 text-gray-200">
//               Cochin, Pune, Bangalore, Mumbai
//             </p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-[1500px] mx-auto px-6 pb-6 flex justify-center mt-5">
//         <div className="relative w-72 mx-6 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/engineer.jpg"}
//             alt="crew"
//             height={900}
//             width={600}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">Engineering</div>
//             <p className="mt-1 text-gray-200">Gurugram or Kochi</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/service.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">
//               Ground Services & Security
//             </div>
//             <p className="mt-1 text-gray-200">Multiple Locations</p>
//             <div className="mt-2">
//               <Link
//                 href={`/careers/${jobIdData[2]}`}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/marketing.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">
//               Sales & Marketing
//             </div>
//             <p className="mt-1 text-gray-200">Multiple Locations</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="box-border md:box-content text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative flex w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/tech.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">
//               Digital & Technology
//             </div>
//             <p className="mt-1 text-gray-200">Gurugram or Kochi</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-[1500px] mx-auto px-6 pb-6 flex justify-center mt-5">
//         <div className="relative w-72 mx-6 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/finance.jpg"}
//             alt="crew"
//             height={900}
//             width={600}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">Finance</div>
//             <p className="mt-1 text-gray-200">Gurugram or Kochi</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="relative w-72 mx-4 bg-white rounded-xl shadow-md overflow-hidden mt-5">
//           <Image
//             className="h-48 w-full object-cover"
//             src={"/other.jpg"}
//             alt="crew"
//             height={900}
//             width={500}
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
//             <div className="text-white font-semibold text-2xl">Others</div>
//             <p className="mt-1 text-gray-200">Multiple Locations</p>
//             <div className="mt-2">
//               <Link
//                 href={"/careers/cabin_crew"}
//                 className="text-indigo-100 hover:text-indigo-200"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const [jobIdData, setJobIdData] = useState<any>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/jobs/")
      .then(function (response) {
        const jobs = response.data;
        const jobIds = jobs.map((job: { id: any }) => job.id);
        setJobIdData(jobIds);
        console.log(jobIds);
      })
      .catch(function (error) {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="flex max-w-[1500px] mx-auto px-6 pb-6 justify-center">
      {jobIdData.map((id: string) => (
        <div
          key={id}
          className="relative w-72 mx-6 bg-white rounded-xl shadow-md overflow-hidden mt-5"
        >
          <Image
            className="h-48 w-full object-cover"
            src={`/job_images/${id}.jpg`} // Assuming image filenames are based on job IDs
            alt="crew"
            height={900}
            width={600}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
            <div className="text-white font-semibold text-2xl"></div>

            <div className="mt-2">
              <Link
                href={`/careers/${id}`}
                className="text-indigo-100 hover:text-indigo-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
