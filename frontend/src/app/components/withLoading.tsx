/* eslint-disable react/display-name */
"use client";
import React, { useState } from "react";
import LoadingPage from "./Loading";

export function withLoadingPage(WrappedComponent: React.ComponentType<any>) {
  return () => {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading completion after some time (Replace this with your actual loading logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return <>{isLoading ? <LoadingPage /> : <WrappedComponent />}</>;
  };
}
