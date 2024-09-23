"use client";
import FormBuilder from "@/component/forms/formBuilder";
export default function Home() {
  return (
    <main className="min-h-screen flex  justify-center bg-gray-100">
      <div className="w-full max-w-3xl px-4 py-8">
        <FormBuilder />
      </div>
    </main>
  );
}
