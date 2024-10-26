'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Loader2, Calendar, Activity, Award, AlertTriangle, Check, X, TrendingUp } from 'lucide-react'

const STORAGE_KEY = 'bunkMasterData'

export function BunkMasterProComponent() {
  // Core states
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
    setShowProjection(false)
    setAbsentProjection(null)
    setResult({ message: '', status: '', emoji: '' })

    const { name, totalLectures, presentLectures } = formData

    if (!name || !totalLectures || !presentLectures) {
      toast.error('Please fill all the fields! 🤨')
      return
    }

    const total = parseInt(totalLectures)
    const present = parseInt(presentLectures)

    if (total === 0) {
      toast.error('Total lectures cannot be 0! 🤨')
      return
    }

    if (total < 0 || present < 0) {
      toast.error('Lectures cannot be negative! 🤨')
      return
    }
    if (total < present) {
      toast.error('Present lectures cannot be more than total lectures! 🤨')
      return
    }

    setIsCalculating(true)

    try {
      // Calculate current attendance percentage
      const attendancePercentage = (present / total) * 100

      // Calculate required lectures for 75%
      const lecNeededFor75 = Math.ceil((3 * total - 4 * present))

      // Calculate lectures that can be bunked
      const lecturesThatCanBeBunked = Math.floor(((present * 100 / 75) - total))

      // Generate next week's days
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const today = new Date()
      const nextWeek = days.map((day, index) => {
        const nextDay = new Date(today)
        nextDay.setDate(today.getDate() + index + 1)
        return {
          day,
          date: nextDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          willAttend: true,
          id: index,
          lecturesAttended: 0
        }
      })

      setNextWeekDays(nextWeek)

      // Set result message based on attendance
      let message = ''
      let status = ''
      let emoji = ''

      if (attendancePercentage >= 75) {
        message = `Rock on ${name}! Your attendance is ${attendancePercentage.toFixed(2)}%.\nYou can bunk ${lecturesThatCanBeBunked} lectures and still maintain 75%!`
        status = 'success'
        emoji = '🌟'
      } else if (attendancePercentage >= 65) {
        message = `Careful ${name}! Your attendance is ${attendancePercentage.toFixed(2)}%. You need ${lecNeededFor75} more lectures (estimated ${(lecNeededFor75 / 6).toFixed(2)} days) to reach 75%!`
        status = 'warning'
        emoji = '⚠️'
      } else {
        message = `Alert ${name}! Your attendance is ${attendancePercentage.toFixed(2)}%. You need ${lecNeededFor75} more lectures (estimated ${(lecNeededFor75 / 6).toFixed(2)} days) to reach 75%!`
        status = 'danger'
        emoji = '🚨'
      }

      setResult({ message, status, emoji })
      setShowProjection(true)
      calculateProjectedAttendance(nextWeek)
    } catch (error) {
      toast.error('Error calculating attendance')
    } finally {
      setIsCalculating(false)
    }
  }


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
    if (!absentDays) {
      toast.error('Please enter number of days to be absent')
      return
    }
    if (parseInt(absentDays) < 0) {
      toast.error('Days cannot be negative')
      return
    }

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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onClick={calculateAttendance}
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
                  onClick={clearStoredData}
                  variant="outline"
                  className="bg-white/50 hover:bg-white/80"
                >
                  🧹
                </Button>
              </div>
            </div>

            {result.message && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-4 rounded-lg border-2 ${getStatusColor(result.status)}`}
              >
                <div className="text-4xl mb-2 text-center">{result.emoji}</div>
                <div className="text-center font-medium">{result.message}</div>
              </motion.div>
            )}

            {/* Absenteeism Calculator */}
            {result.message && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 space-y-4"
              >
                <div className="relative">
                  <Input
                    type="number"
                    value={absentDays}
                    onChange={(e) => setAbsentDays(e.target.value)}
                    placeholder="Number of days to be absent"
                    className="pl-10"
                  />
                  <AlertTriangle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <Button
                  onClick={calculateAbsentProjection}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500"
                >
                  Calculate Absenteeism Impact 📉
                </Button>

                {absentProjection && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-lg bg-orange-100 border-2 border-orange-200"
                  >
                    <div className="space-y-2">
                      <div className="text-center text-orange-800">
                        <div className="text-sm font-medium">After {absentProjection.daysAbsent} days absent:</div>
                        <div className="text-2xl font-bold mt-1">
                          {absentProjection.newAttendance.toFixed(2)}%
                        </div>
                        <div className="text-sm text-orange-600 mt-1">
                          Attendance will drop by {absentProjection.dropInAttendance.toFixed(2)}%
                        </div>
                        <div className="text-xs text-orange-600 mt-1">
                          ({absentProjection.lecturesMissed} lectures will be missed)
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
            {showProjection && nextWeekDays.length > 0 && (
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
                    <motion.div
                      key={day.id}
                      className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${day.willAttend
                        ? 'bg-green-100 border-green-200 hover:bg-green-200'
                        : 'bg-red-100 border-red-200 hover:bg-red-200'
                        }`}
                      onClick={() => toggleDayAttendance(day.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-lg">{day.day}</span>
                            <span className="text-sm text-gray-600">{day.date}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {day.willAttend ? (
                                <Check className="h-5 w-5 text-green-600" />
                              ) : (
                                <X className="h-5 w-5 text-red-600" />
                              )}
                              <span className="text-sm">
                                {day.willAttend ? 'Attending' : 'Bunking'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">
                                {day.lecturesAttended}/{6} lectures
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-2">
                            {/* <TrendingUp className="h-4 w-4 text-blue-500" /> */}
                            {/* <span className="text-sm text-blue-600"> */}
                            {/* Projected Attendance: {projectedAttendance.toFixed(2)}% */}
                            {/* </span> */}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-blue-100 rounded-lg border-2 border-blue-200">
                  <div className="text-center">
                    <div className="text-sm text-blue-600 font-medium">Final Projected Attendance</div>
                    <div className="text-2xl font-bold text-blue-800 mt-1">
                      {projectedAttendance.toFixed(2)}%
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Based on your selected attendance days
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
          <footer className="bottom-2 text-center w-full text-gray-400 position-fixed">
            <p>Made with ❤️ by <a href="https://www.linkedin.com/in/rohitkumaryadav-rky/" className="text-grey-500 hover:underline">Rohit Kumar Yadav</a></p>
          </footer>
        </Card>

      </motion.div>

    </div>
  )
}