
// src/components/BunkMaster/WeeklyPlanner.tsx
import { motion } from 'framer-motion'
import { Check, X, Activity } from 'lucide-react'
import { DayData } from './types'

interface WeeklyPlannerProps {
    nextWeekDays: DayData[];
    projectedAttendance: number;
    onToggleDay: (dayId: number) => void;
}

export function WeeklyPlanner({
    nextWeekDays,
    projectedAttendance,
    onToggleDay
}: WeeklyPlannerProps) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
        >
            <h3 className="text-lg font-semibold mb-4 text-center">
                Next Week Planning 📅
            </h3>
            <div className="grid grid-cols-1 gap-3">
                {nextWeekDays.map((day) => (
                    <DayCard key={day.id} day={day} onToggle={() => onToggleDay(day.id)} />
                ))}
            </div>

            <ProjectedAttendanceDisplay attendance={projectedAttendance} />
        </motion.div>
    )
}