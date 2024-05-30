// "use client";
// import React from 'react';
// import withLoading from '../components/withLoading';
// import { useRouter} from 'next/navigation';

// export default function User() {
//   const router = useRouter();
//   const user = localStorage.getItem( "userRole");
//   if (!user) {
//     router.push('/auth/login');
//   }
//   if (user === "airport_staff") {
//     router.push('/user/airport_staff');
//   } else if (user === "customer"){
//     router.push('/user/customer');
//   }
//   else if (user === "application_user"){
//     router.push('/user/application_user');
//   }

// }
