"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import React, { useState } from "react";

export function SignUpForm() {
  const [formData, setFormData] =useState({
    name:"",
    email:"",
    password:"",
    password_confirmation:"",
  });
  const [loading, setLoading]= useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://simaru.amisbudi.cloud/api/auth/register",{
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        console.log("Error:", result.message || result.errors || "Register failed");
        return;
      }
      console.log("Success:", result);
      if (result.accessToken) {
        localStorage.setItem("token", result.accessToken);
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ShowcaseSection title="Sign Up Form" className="!p-6.5">
      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Name"
          type="text"
          name="name"
          placeholder="Enter full name"
          className="mb-4.5"
          value={formData.name}
          handleChange={handleChange}
        />

        <InputGroup
          label="Email"
          type="email"
          name="email"
          placeholder="Enter email address"
          className="mb-4.5"
          value={formData.email}
          handleChange={handleChange}
        />

        <InputGroup
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          className="mb-4.5"
          value={formData.password}
          handleChange={handleChange}
        />

        <InputGroup
          label="Re-type Password"
          type="password"
          name="password_confirmation"
          placeholder="Re-type password"
          className="mb-5.5"
          value={formData.password_confirmation}
          handleChange={handleChange}
        />

        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </ShowcaseSection>
  );
}
