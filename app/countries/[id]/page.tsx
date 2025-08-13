'use client'
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Toggle from "@/app/toggle";


export default function Country(){
    type Country = {
        name: string;
        nativeName: string;
        population: number;
        subregion: string;
        capital: string;
        topLevelDomain: [string];
        currencies: [{name: string}];
        languages: [{name:string},{name:string},{name: string}];
        region: string;
        flags: {
            png: string;
            svg: string;
        }
    };

    const {id} = useParams();
    const [country, setCountry] = useState<Country []>([])
    const [lang, setLang] = useState(3)
    const router = useRouter();

    useEffect(()=>{
        const data = async ()=>{
            await fetch('../api/country', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
                .then(res => res.json())
                .then(data => {
                    setCountry([data]);
                    setLang(data.languages.length);
                    console.log(data)
                })
        }
        data()
    }, [id])

    return(
        <div className="bg-[hsl(0, 0%, 50%)] min-h-screen dark:bg-[hsl(207, 26%, 17%)] text-gray-950 dark:text-white">
            <header className="bg-[hsl(0, 0%, 99%)] dark:bg-[hsl(209, 23%, 22%)] top-0 left-0 w-full flex justify-between px-[50px] max-sm:px-[20px] sticky py-[25px] border-b-[3px] border-gray-300">
                <p className="font-bold">Where in the world?</p>
                <Toggle/>
            </header>
            <main className="px-12 max-sm:px-[20px] mt-[50px]">
                <button onClick={()=>router.back()} className="dark:bg-gray-600 px-[24px] cursor-pointer rounded shadow-[0_0_10px_rgba(0,0,0,0.4)] py-1.5 bg-[hsl(0, 0%, 99%)]">Back</button>
                <div className="flex justify-center">
                    {
                        country.map((e)=>(
                            <div key={e.capital} className="mx-[10px] my-[50px] max-[900px]:gap-x-[5rem] gap-x-24 flex max-w-[90%] justify-center max-[681px]:flex-col max-[681px]:align-middle max-[681px]:my-[20px] ">
                                <img src={e.flags.png} className="max-w-[340px] max-h-[250px] max-[681px]:w-[360px] max-[681px]:max-w-[360px]  max-[681px]:mx-auto"p max-[500px]:w-[80%] alt="" />
                                <div>
                                    <div className="flex gap-x-24 max-[900px]:gap-x-0 max-[900px]:flex-col">
                                        <div className="max-[900px]:mt-4">
                                            <p className="font-bold text-xl mb-[20px]">{e.name}</p>
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Native Name: </strong>{e.nativeName}</p>
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Population: </strong>{e.population.toLocaleString()}</p>
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Region: </strong>{e.region}</p>
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Sub Region: </strong>{e.subregion}</p>
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Capital: </strong>{e.capital}</p>
                                        </div>
                                        <div className="max-[900px]:mt-7">
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Top Level Domain: </strong>{e.topLevelDomain}</p>
                                            <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Currencies: </strong>{e.currencies[0].name}</p>
                                            {
                                                lang == 3 ? (
                                                    <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Languages: </strong>{`${e.languages[0].name}, ${e.languages[1].name}, ${e.languages[2].name}`}</p>
                                                ): lang == 2 ?(
                                                    <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Languages: </strong>{`${e.languages[0].name}, ${e.languages[1].name}`}</p>
                                                ): (
                                                    <p className="font-light text-[13px] mb-[10px]"><strong className="font-bold">Languages: </strong>{e.languages[0].name}</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    ) 
}
