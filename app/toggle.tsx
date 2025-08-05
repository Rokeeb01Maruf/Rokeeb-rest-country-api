'use client'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react" 

export default function Toggle(){
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    useEffect(()=>setMounted(true),[])

    if (!mounted) return null
    
    return(
        <button type="button" onClick={()=>{setTheme(theme === 'dark' ? 'light' : 'dark')}} className="text-sm cursor-pointer text-gray-950 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">{theme === 'dark' ? 'Light Mode' : 'Dark Mode' }</button>
    )
}