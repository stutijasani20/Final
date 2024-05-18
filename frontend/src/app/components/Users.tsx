// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const User = () => {
//   const [users, setUsers] = useState<any[]>([]); 
//   const [pageSize, setPageSize] = useState<number>(10); 
//   const [totalPages, setTotalPages] = useState<number>(0); 
//   const [page, setPage] = useState<number>(1); 

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/users/?page=${page}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
            
//         }); // Replace with your API endpoint
//         setUsers(response.data.results);
//         setTotalPages(Math.ceil(response.data.count / pageSize));

//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, [page, pageSize]);

//   const handlePageChange = (newPage: number) => { 
//     setPage(newPage);
// };

  

//   return (
//     <div className="p-4 ml-64">
//     <h2 className="text-2xl font-semibold mb-4 text-blue-700">Users</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               {/* Add more table headers as needed */}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user , index) => (
//               <tr key={user.id} className="hover:bg-gray-100">
//                 <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                
//                 <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {user.is_staff ? (
//                     <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded">Staff</span>
//                   ) : (
//                     <span className="inline-block bg-purple-200 text-purple-800 px-2 py-1 rounded">Customer</span>
//                   )}
//                 </td>
//                 {/* Add more table data fields as needed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`mx-1 px-3 py-1 rounded transition-colors duration-200 ${
//                 page === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-00'
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-4 ml-64">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded ${user.is_staff ? 'bg-green-200 text-green-800' : 'bg-purple-200 text-purple-800'}`}>
                      {user.is_staff ? 'Staff' : 'Customer'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded transition-colors duration-200 ${
                  page === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default User;
