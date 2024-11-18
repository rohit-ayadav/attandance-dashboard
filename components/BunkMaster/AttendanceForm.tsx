
// src/components/BunkMaster/AttendanceForm.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Award, Calendar, Activity, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { FormData } from './types'

interface AttendanceFormProps {
    formData: FormData;
    isCalculating: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculate: () => void;
    onClear: () => void;
}

export function AttendanceForm({
    formData,
    isCalculating,
    onInputChange,
    onCalculate,
    onClear
}: AttendanceFormProps) {
    return (
        <div className="space-y-6">
            <motion.div
                className="space-y-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="relative">
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={onInputChange}
                        placeholder="Your Name"
                        className="pl-10"
                    />
                    <Award className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                    <Input
                        name="totalLectures"
                        type="number"
                        value={formData.totalLectures}
                        onChange={onInputChange}
                        placeholder="Total Lectures"
                        className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                    <Input
                        name="presentLectures"
                        type="number"
                        value={formData.presentLectures}
                        onChange={onInputChange}
                        placeholder="Lectures Attended"
                        className="pl-10"
                    />
                    <Activity className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </motion.div>

            <div className="flex gap-2">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1"
                >
                    <Button
                        onClick={onCalculate}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        disabled={isCalculating}
                    >
                        {isCalculating ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...</>
                        ) : (
                            'Calculate My Destiny! 🎲'
                        )}
                    </Button>
                </motion.div>
                <Button
                    onClick={onClear}
                    variant="outline"
                    className="bg-white/50 hover:bg-white/80"
                >
                    🧹
                </Button>
            </div>
        </div>
    )
}