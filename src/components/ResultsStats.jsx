import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from '../components/CountUp'

const stats = [
    { id: 1, name: 'Total Picks Made', value: 1359 },
    { id: 2, name: 'Correct Picks', value: 855 },
    { id: 3, name: 'Times the Super Bowl Teams Were Picked', value: 124 },
    { id: 4, name: 'Average Correct Pick %', value: .63, isPercentage: true },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.4,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
}

export default function ResultsStats() {
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: '-100px', amount: 0.5 }) // triggers when 50% visible

    const [shouldAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
        setShouldAnimate(isInView)
    }, [isInView])

    return (
        <div ref={ref} className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.dl
                    className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={shouldAnimate ? 'visible' : 'hidden'}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            className="mx-auto flex max-w-xs flex-col gap-y-4"
                            variants={itemVariants}
                        >
                            <dt className="text-xl text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                <CountUp
                                    target={stat.value}
                                    isPercentage={stat.isPercentage}
                                    shouldStart={shouldAnimate}
                                    delay={index * 400} // 0ms, 400ms, 800ms, etc.
                                />
                            </dd>
                        </motion.div>
                    ))}
                </motion.dl>
            </div>
        </div>
    )
}
