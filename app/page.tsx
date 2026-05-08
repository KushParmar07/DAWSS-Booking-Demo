"use client";

import { Button } from "@/components/ui/button"
import { ArrowRight, UserCircle2, ShieldCheck } from 'lucide-react';
import { useSetAtom } from "jotai";
import { currentUserIdAtom, usersAtom } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

export default function Home() {
  const setCurrentUserId = useSetAtom(currentUserIdAtom);
  const users = useAtomValue(usersAtom);
  const router = useRouter();

  const handleLogin = (role: 'admin' | 'student') => {
    // Pick the first user of the given role
    const user = users.find(u => u.role === (role === 'admin'));
    if (user) {
      setCurrentUserId(user.id);
      router.push(role === 'admin' ? '/dashboard/admin' : '/dashboard');
    } else {
      console.error(`No ${role} user found in demo data.`);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 m-0 -z-10 bg-[url('/banner.jpg')] bg-cover bg-center" />

      <div className="h-full">
        <div className="flex flex-col gap-y-16 justify-center h-[85vh] items-center">
          <div className="text-center lg:text-left md:text-9xl tracking-tight flex flex-col w-[80%] max-w-[400px] md:max-w-[800px]">
            <h1 style={{ animationDelay: "0ms" }} className="animate-pop-in font-bold text-left text-2xl md:text-4xl w-full text-white">Wilson&apos;s {new Date().getFullYear()}</h1>
            <h1 style={{ animationDelay: "100ms" }} className="animate-pop-in font-black text-left w-full text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]">Grad</h1>
            <h1 style={{ animationDelay: "300ms" }} className="animate-pop-in font-black text-right sm:text-right w-full text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]">Social</h1>
          </div>
          <div style={{ animationDelay: "700ms" }} className="animate-pop-in flex flex-col md:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={() => handleLogin('student')}
              className="font-extrabold text-[#3f51b5] bg-white hover:bg-white/80 text-left text-xl transition hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/5 h-16 px-8"
            >
              <UserCircle2 className="mr-2" />
              Demo as Student <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              onClick={() => handleLogin('admin')}
              className="font-extrabold text-white bg-[#3f51b5] hover:bg-[#3f51b5]/80 text-left text-xl transition hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/5 h-16 px-8"
            >
              <ShieldCheck className="mr-2" />
              Demo as Admin <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-pop-in {
          transform-origin: center center;
          opacity: 0;
          transform: scale(0);
          animation: popIn 0.4s ease-out forwards;
        }`
      }</style>
    </>
  )
}