'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Toggle from "./toggle";

export default function Home() {
  type Country = {
    name: string;
    region: string;
    capital: string;
    population: number;
    flags: {
      png: string;
    };
  };
  const [das, setDas] = useState<Country[]>([])
  const [filter, setFilter] = useState([])
  const [country, setCount] = useState('none')

  useEffect(()=>{
    let response = async () => {
      let data = await fetch('./api/country');
      let res = await data.json()
      setFilter(res)
      if(country === 'none'){
        setDas(res)
      }else{
        let filtered = res.filter((e: {region: string})=> e.region == country);
        setDas(filtered);
      }
    };
    response()
  }, [country])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value.toLowerCase();
    if(input){
        const search = filter.filter((e: {name: string})=> e.name.toLowerCase().includes(input))
        setDas(search)
      }else{
        setDas(filter)
      }
  }

  const handleTheme = () =>{}
  return (
    <div className="bg-gray-100 min-h-screen dark:bg-black text-gray-800 dark:text-white">
      <header className="bg-white dark:bg-gray-700 top-0 left-0 w-full flex justify-between px-[50px] sticky py-[25px] border-b-[3px] border-gray-300">
        <p className="font-bold dark:text-white">Where in the world?</p>
        <Toggle/>
      </header>
      <main className="bg-gray-100 dark:bg-gray-800">
        <div className="search items-center flex sticky bg-gray-100 gap-x-[50px] justify-between w-screen dark:bg-gray-800 px-[50px]  max-w-screen py-[25px] top-[75px]">
          <input type="search" placeholder="Search for a country..." id="" onChange={handleChange} className="dark:text-white dark:placeholder-white dark:bg-gray-700 h-9.5 text-sm outline-0 pl-7.5 max-w-lg max-md:min-w-[350px] max-sm:min-w-[200px] rounded leading-none shadow-[0_0_10px_rgba(0,0,0,0.4)] bg-white" />
          <img src='./icons8_search.svg' onClick={()=>handleChange} className="absolute w-[24px] rounded cursor-pointer left-13.5"/>
          <div>
            <select name="countries" id="" className="text-lg dark:bg-gray-800 max-md:text-md max-sm:text-sm">
              <option onClick={()=>setCount('none')}>Filter by Region</option>
              <option onClick={()=>setCount('Africa')} value="Africa">Africa</option>
              <option onClick={()=>setCount('America')} value="America">America</option>
              <option onClick={()=>setCount('Asia')} value="Asia">Asia</option>
              <option onClick={()=>setCount('Europe')} value="Europe">Europe</option>
              <option onClick={()=>setCount('Oceania')} value="Oceanic">Oceanic</option>
            </select>
          </div>
        </div>
        <div className="man pt-[25px] grid grid-cols-4 px-[50px] gap-x-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {
            das.map((e:{name: string, region: string, capital: string, population: number, flags: {
              png: string
            }})=>(
              <div key={e.name} className="max-w-[260px] max-sm:mx-auto max-sm:max-w-[300px] max-sm:w-full pb-12 rounded bg-white mb-12 dark:bg-gray-700">
                <Link href={`./countries/${e.name}`}>
                  <img src={e.flags.png} alt={`${e.name}'s flag`} className=" w-full h-[180px]"/>
                  <p className="p-5 font-bold text-xl">{e.name}</p>
                  <p className="pb-1 px-5"><span className="font-bold">Population: </span>{e.population.toLocaleString()}</p>
                  <p className="pb-1 px-5"><span className="font-bold">Region: </span>{e.region}</p>
                  <p className="px-5"><span className="font-bold">Capital: </span>{e.capital}</p>
                </Link>
              </div>
            ))

          }
        </div>
      </main>
    </div>
  );
}
