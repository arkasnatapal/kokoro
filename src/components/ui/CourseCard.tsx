"use client"

import clsx from 'clsx'
import React from 'react'
import { Button } from './Button'
import { CalendarDays, CirclePlay } from "lucide-react";

type Course = {
    id: number,
    title: string,
    thumbnail: string,
    startDate: string,
    progress: number
}

export const CourseCard = ({ id, title, thumbnail, startDate, progress }: Course) => {
    return (
        <div className={clsx("bg-[var(--bgfill)] flex items-center justify-center rounded-lg p-4 w-80%", "hover: shadow-md hover:brightness-110")}>
            {/* thumbnail */}
            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className={clsx("flex flex-col justify-center items-center gap-1")}>
                <div className={clsx("flex justify-between items-center")}>
                    <div>
                        <h3>{title}</h3>
                        <div className="text-xs text-gray-400"><CalendarDays />{startDate}</div>
                    </div>
                    {/* Continue Learning */}
                    <div>
                        <Button disabled={progress === 100} >
                            <div className='flex items-center justify-center'>
                                <CirclePlay className="w-5 h-5" />
                                <span className="ml-2">Continue</span>
                            </div>
                        </Button>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full mt-2">
                    <div className="w-full h-2 bg-gray-300 rounded-full">
                        <div
                            className="h-2 bg-[var(--primary)] rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-xs text-right mt-1 text-[var(--primary)]">{progress}% completed</div>
                </div>

            </div>
        </div >
    )
}
