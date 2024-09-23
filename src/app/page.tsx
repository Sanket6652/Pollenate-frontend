import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div className=" items-center justify-center font-mono lg:flex">
        <a
          className="text-[20px] bg-[#272525] text-white  border-2 rounded-xl p-2"
          href="/forms/create"
        >
          Create Forms for Free
        </a>
      </div>
    </main>
  );
}
