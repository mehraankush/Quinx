"use client"

import { useStore } from '@/store'

const Labs = () => {
    const TimeStamp = useStore((state) => state.TimeStamp);

    return (
        <ul>
            {
                TimeStamp.map((ti, index: number) => (
                    <div className='flex gap-5' key={index + 1}>
                        <li key={index}>{ti.count}</li>
                        <li key={index}>{ti.stamp}</li>
                        <li key={index}>{ti.time}</li>
                    </div>
                ))
            }
        </ul>
    )
}

export default Labs