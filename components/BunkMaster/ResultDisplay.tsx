

// src/components/BunkMaster/ResultDisplay.tsx
import { motion } from 'framer-motion'
import { ResultData } from './types'

interface ResultDisplayProps {
    result: ResultData;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-800 border-green-200'
            case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'danger': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    if (!result.message) return null;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-4 rounded-lg border-2 ${getStatusColor(result.status)}`}
        >
            <div className="text-4xl mb-2 text-center">{result.emoji}</div>
            <div className="text-center font-medium">{result.message}</div>
        </motion.div>
    )
}
