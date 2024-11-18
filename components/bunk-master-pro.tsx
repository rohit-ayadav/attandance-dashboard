
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Card, CardContent } from "@/components/ui/card"
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FormData, ResultData, DayData, AbsentProjection, PresentProjection } from './BunkMaster/types';
import { AttendanceForm } from './BunkMaster/AttendanceForm';
import { ResultDisplay } from './BunkMaster/ResultDisplay';
import { AbsenteeismCalculator } from './BunkMaster/AbsenteeismCalculator'
import { WeeklyPlanner } from './BunkMaster/WeeklyPlanner'
import { HelpDialog } from './HelpDialoge'

const STORAGE_KEY = 'bunkMasterData'

export function BunkMasterProComponent() {

  const [formData, setFormData] = useState({
    name: '',
    totalLectures: '',
    presentLectures: ''
  })
  const [result, setResult] = useState({ message: '', status: '', emoji: '' })
  const [isCalculating, setIsCalculating] = useState(false)

  // Attendance projections
  const [nextWeekDays, setNextWeekDays] = useState<{ day: string; date: string; willAttend: boolean; id: number; lecturesAttended: number; }[]>([])
  const [projectedAttendance, setProjectedAttendance] = useState(0)
  const [showProjection, setShowProjection] = useState(false)

  // Absenteeism calculator
  const [absentDays, setAbsentDays] = useState('')
  const [absentProjection, setAbsentProjection] = useState<{
    newAttendance: number;
    dropInAttendance: number;
    daysAbsent: number;
    lecturesMissed: number;
  } | null>(null)
  const [presentProjection, setPresentProjection] = useState<{
    newAttendance: number;
    increaseInAttendance: number;
    daysPresent: number;
    lecturesAttended: number;
  } | null>(null)


  // Load data from localStorage on initial mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        toast.success('Welcome back! 👋')
      }
    } catch (error) {
      console.error('Error loading saved data:', error)
    }
  }, [])

  // Save data to localStorage whenever form data changes
  useEffect(() => {
    if (formData.name || formData.totalLectures || formData.presentLectures) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
      } catch (error) {
        console.error('Error saving data:', error)
      }
    }
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearStoredData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setFormData({
        name: '',
        totalLectures: '',
        presentLectures: ''
      })
      setResult({ message: '', status: '', emoji: '' })
      setShowProjection(false)
      setAbsentProjection(null)
      toast.success('Data cleared successfully! 🧹')
    } catch (error) {
      toast.error('Error clearing data')
    }
  }

  const calculateAttendance = async () => {
    setShowProjection(false);
    setAbsentProjection(null);
    setResult({ message: '', status: '', emoji: '' });
    const { name, totalLectures, presentLectures } = formData;

    if (!name || !totalLectures || !presentLectures) {
      toast.error('Please fill all the fields! 🤨');
      return;
    }

    const total = parseInt(totalLectures);
    const present = parseInt(presentLectures);

    if (total === 0) {
      toast.error('Total lectures cannot be 0! 🤨');
      return;
    }
    if (total < 0 || present < 0) {
      toast.error('Lectures cannot be negative! 🤨');
      return;
    }
    if (total < present) {
      toast.error('Present lectures cannot be more than total lectures! 🤨');
      return;
    }

    setIsCalculating(true);
    try {
      // Calculate current attendance percentage
      const attendancePercentage = (present / total) * 100;
      // Calculate required lectures for 75%
      const lecNeededFor75 = Math.ceil((3 * total - 4 * present));
      // Calculate lectures that can be bunked
      const lecturesThatCanBeBunked = Math.ceil(((present * 100 / 75) - total));

      // Generate next week's working days (excluding Sunday)
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      const nextWeek = [];
      let daysAdded = 0;
      let dayCounter = 1;

      // Add next 6 working days
      while (daysAdded < 6) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + dayCounter);

        // Skip Sunday (0 is Sunday in getDay())
        if (nextDay.getDay() !== 0) {
          nextWeek.push({
            day: nextDay.toLocaleDateString('en-US', { weekday: 'long' }),
            date: nextDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            willAttend: true,
            id: daysAdded,
            lecturesAttended: 0
          });
          daysAdded++;
        }
        dayCounter++;
      }

      setNextWeekDays(nextWeek);

      // Set result message based on attendance
      let message = '';
      let status = '';
      let emoji = '';

      if (attendancePercentage >= 75) {
        message = `Rock on ${name}! Your attendance is ${attendancePercentage.toFixed(2)}%.\nYou can bunk ${lecturesThatCanBeBunked} lectures and still maintain 75%!`;
        status = 'success';
        emoji = '🌟';
      } else if (attendancePercentage >= 65) {
        message = `Careful ${name}! Your attendance is ${attendancePercentage.toFixed(2)}%. You need ${lecNeededFor75} more lectures (estimated ${(lecNeededFor75 / 6).toFixed(2)} days) to reach 75%!`;
        status = 'warning';
        emoji = '⚠️';
      } else {
        message = `Alert ${name}! Your attendance is ${attendancePercentage.toFixed(2)}%. You need ${lecNeededFor75} more lectures (estimated ${(lecNeededFor75 / 6).toFixed(2)} days) to reach 75%!`;
        status = 'danger';
        emoji = '🚨';
      }

      setResult({ message, status, emoji });
      setShowProjection(true);
      calculateProjectedAttendance(nextWeek);
    } catch (error) {
      toast.error('Error calculating attendance');
    } finally {
      setIsCalculating(false);
    }
  };


  // set lectures attended for each day based on willAttend either 6 or 0 lectures

  const setLecturesAttended = (days = nextWeekDays) => {
    const newDays = days.map(day => ({
      ...day,
      lecturesAttended: day.willAttend ? 6 : 0
    }))
    setNextWeekDays(newDays)
  }

  const toggleDayAttendance = (dayId: number) => {
    setNextWeekDays(prevDays => {
      const newDays = prevDays.map(day =>
        day.id === dayId
          ? { ...day, willAttend: !day.willAttend }
          : day
      )
      setLecturesAttended(newDays)
      calculateProjectedAttendance(newDays)
      return newDays
    })
  }

  const calculateProjectedAttendance = (days = nextWeekDays) => {
    const { totalLectures, presentLectures } = formData
    if (!totalLectures || !presentLectures) return

    const total = parseInt(totalLectures)
    const present = parseInt(presentLectures)
    const attendingDays = days.filter(day => day.willAttend).length
    const newTotal = total + (6 * 6)
    const newPresent = present + (attendingDays * 6)
    const newAttendance = (newPresent / newTotal) * 100

    setLecturesAttended(days)
    setProjectedAttendance(newAttendance)
  }

  const calculateAbsentProjection = () => {
    // if no absent days or present days then 
    if (!absentDays || absentDays === 'NaN') {
      toast.error('Please enter number of days to be present or absent (positive or negative)')
      return
    }
    if (parseInt(absentDays) >= 0) {
      setPresentProjection(null)
      if (!absentDays) {
        toast.error('Please enter number of days to be absent')
        return
      }
      // if (parseInt(absentDays) < 0) {
      //   toast.error('Days cannot be negative')
      //   return
      // }

      const { totalLectures, presentLectures } = formData;
      if (!totalLectures || !presentLectures) {
        toast.error('Please calculate attendance first')
        return
      }

      const days = parseInt(absentDays)
      const total = parseInt(totalLectures)
      const present = parseInt(presentLectures)
      const lecturesPerDay = 6

      // Calculate new totals
      const additionalTotal = days * lecturesPerDay
      const newTotal = total + additionalTotal
      const newAttendance = (present / newTotal) * 100
      const currentAttendance = (present / total) * 100
      const dropInAttendance = currentAttendance - newAttendance

      setAbsentProjection({
        newAttendance,
        dropInAttendance,
        daysAbsent: days,
        lecturesMissed: additionalTotal
      })

      // Show warning if attendance drops below 75%
      if (newAttendance < 75 && currentAttendance >= 75) {
        toast.error('Warning: Attendance will drop below 75%! ⚠️')
      }
    }
    else {
      setAbsentProjection(null)
      // Calculate if that days person comes to college
      // set Absent day positive in terms of present day
      const toBePresent = Math.abs(parseInt(absentDays))
      const { totalLectures, presentLectures } = formData;
      if (!totalLectures || !presentLectures) {
        toast.error('Please calculate attendance first')
        return
      }

      const total = parseInt(totalLectures)
      const present = parseInt(presentLectures)
      const lecturesPerDay = 6

      // Calculate new totals
      const additionalTotal = toBePresent * lecturesPerDay
      const additionalPresent = toBePresent * lecturesPerDay
      const newTotal = total + additionalTotal
      const newPresent = present + additionalPresent
      let newAttendance = (newPresent / newTotal) * 100
      const currentAttendance = (present / total) * 100
      let increaseInAttendance = newAttendance - currentAttendance
      newAttendance = parseFloat(newAttendance.toFixed(2))
      increaseInAttendance = parseFloat(increaseInAttendance.toFixed(2))
      setPresentProjection({
        newAttendance,
        increaseInAttendance,
        daysPresent: toBePresent,
        lecturesAttended: additionalPresent
      })

      // Show warning if attendance drops below 75%
      if (newAttendance >= 75 && currentAttendance < 75) {
        toast.error('Congratulations: Attendance will increase above 75%! 🎉'
        )
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'danger': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex justify-center items-center p-4">
      <Toaster position="top-right" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-lg bg-white/90 shadow-xl">
          <CardContent className="p-6">
            <motion.h1
              className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              🎓 Bunk Master Pro
            </motion.h1>

            <AttendanceForm
              formData={formData}
              isCalculating={isCalculating}
              onInputChange={handleInputChange}
              onCalculate={calculateAttendance}
              onClear={clearStoredData}
            />

            <ResultDisplay result={result} />

            {result.message && (
              <AbsenteeismCalculator
                absentDays={absentDays}
                absentProjection={absentProjection}
                presentProjection={presentProjection}
                onAbsentDaysChange={(e) => setAbsentDays(e.target.value)}
                onCalculate={calculateAbsentProjection}
              />
            )}

            {showProjection && nextWeekDays.length > 0 && (
              <WeeklyPlanner
                nextWeekDays={nextWeekDays}
                projectedAttendance={projectedAttendance}
                onToggleDay={toggleDayAttendance}
              />
            )}
          </CardContent>

          {/* <footer className="bottom-2 text-center w-full text-gray-400 position-fixed">
            <p>Made with ❤️ by <a href="https://github.com/rohit-ayadav/attandance-dashboard" className="text-grey-500 hover:underline">Rohit Kumar Yadav</a></p>
          </footer> */}
        </Card>
      </motion.div>
      <HelpDialog />
    </div>
  )
}