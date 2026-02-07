import MapComponent from "@/components/Mapp";
import AnimalProfile from "@/components/petprofilee/AnimalProfile";
import Image from "next/image";  
import PersonProfile from "./main/PersonProfile/page";
import HomePage from "./main/Home/page";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';   


export default function Home() {
  return (
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
 {/* <AnimalProfile /> */}
 {/* <MapComponent /> */}
 {/* <PersonProfile />  */}
 <HomePage />
      </main>
  );
}
