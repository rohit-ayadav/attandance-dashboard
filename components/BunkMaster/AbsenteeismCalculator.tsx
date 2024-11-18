
// // src/components/BunkMaster/AbsenteeismCalculator.tsx
// import { motion } from 'framer-motion'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { AlertTriangle } from 'lucide-react'
// import { AbsentProjection, PresentProjection } from './types'

// interface AbsenteeismCalculatorProps {
//     absentDays: string;
//     absentProjection: AbsentProjection | null;
//     presentProjection: PresentProjection | null;
//     onAbsentDaysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onCalculate: () => void;
// }

// export function AbsenteeismCalculator({
//     absentDays,
//     absentProjection,
//     presentProjection,
//     onAbsentDaysChange,
//     onCalculate
// }: AbsenteeismCalculatorProps) {
//     return (
//         <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="mt-6 space-y-4"
//         >
//             <div className="relative">
//                 <Input
//                     type="number"
//                     value={absentDays}
//                     onChange={onAbsentDaysChange}
//                     placeholder="Number of days to be absent"
//                     className="pl-10"
//                 />
//                 <AlertTriangle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>

//             <Button
//                 onClick={onCalculate}
//                 className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500"
//             >
//                 Calculate Absenteeism Impact 📉
//             </Button>

//             {absentProjection && (
//                 <AbsentProjectionDisplay projection={absentProjection} />
//             )}
//             {presentProjection && (
//                 <PresentProjectionDisplay projection={presentProjection} />
//             )}
//         </motion.div>
//     )
// }
