import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function RollingText({ options }: { options: string[] }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const handleCount = () => {
            if (count === options.length - 1) setCount(0)
            else setCount(count + 1)
        }

        const timer = setTimeout(() => handleCount(), 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [count, options.length])

    return <>{options[count]}</>
}
