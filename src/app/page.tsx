import React from "react";
import { redirect } from 'next/navigation';
export default async function Home({}) {
  redirect('/dfuns/marketplace');
}

