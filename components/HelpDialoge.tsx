import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle, BookOpen, Info, FileText, MessageCircle, X } from 'lucide-react'



export const HelpDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="fixed bottom-16 right-4 h-10 w-10 rounded-full bg-white/90 shadow-lg hover:bg-white/70 text-purple-600"
                >
                    <HelpCircle className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Help Center
                    </DialogTitle>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogHeader>

                <Tabs defaultValue="howTo" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="howTo" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            How to Use
                        </TabsTrigger>
                        <TabsTrigger value="faq" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            FAQ
                        </TabsTrigger>
                        <TabsTrigger value="terms" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Terms
                        </TabsTrigger>
                        <TabsTrigger value="about" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            About
                        </TabsTrigger>
                    </TabsList>

                    <ScrollArea className="h-[60vh] mt-4 rounded-md border p-4">
                        <TabsContent value="howTo">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Getting Started with Bunk Master Pro</h3>

                                <div className="space-y-2">
                                    <h4 className="font-medium">1. Enter Your Details</h4>
                                    <p className="text-sm text-gray-600">
                                        • Enter your name<br />
                                        • Input total number of lectures conducted<br />
                                        • Input number of lectures you've attended
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">2. Calculate Attendance</h4>
                                    <p className="text-sm text-gray-600">
                                        • Click "Calculate My Destiny!" button<br />
                                        • View your current attendance percentage<br />
                                        • See how many lectures you can miss or need to attend
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">3. Plan Your Week</h4>
                                    <p className="text-sm text-gray-600">
                                        • Use the weekly planner to mark days you'll attend<br />
                                        • Toggle attendance for each day<br />
                                        • See projected attendance based on your plan
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">4. Calculate Impact</h4>
                                    <p className="text-sm text-gray-600">
                                        • Use the absenteeism calculator<br />
                                        • Enter number of days (negative for present days)<br />
                                        • See how it affects your attendance percentage
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="faq">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium">How is the attendance percentage calculated?</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Attendance percentage is calculated as (Lectures Attended / Total Lectures) x 100
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">What does the weekly planner show?</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            It shows your next 6 working days and lets you plan which days you'll attend, calculating the projected impact on your attendance.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">How do I use the absenteeism calculator?</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Enter a positive number to see the impact of missing those days, or a negative number to see the impact of attending those days.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">Is my data saved?</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Yes, your data is saved locally on your device. You can clear it anytime using the clear button.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="terms">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Terms of Service</h3>

                                <div className="space-y-4 text-sm text-gray-600">
                                    <p>
                                        1. <span className="font-medium">Acceptance of Terms</span><br />
                                        By accessing and using Bunk Master Pro, you accept and agree to be bound by the terms and provision of this agreement.
                                    </p>

                                    <p>
                                        2. <span className="font-medium">Use License</span><br />
                                        This is a free tool provided for educational purposes. You may use it for personal, non-commercial use.
                                    </p>

                                    <p>
                                        3. <span className="font-medium">Disclaimer</span><br />
                                        The calculations and projections provided are estimates based on the data you provide. The actual attendance may vary based on your institution's policies.
                                    </p>

                                    <p>
                                        4. <span className="font-medium">Data Privacy</span><br />
                                        All your data is stored locally on your device. We don't collect or store any personal information on our servers.
                                    </p>

                                    <p>
                                        5. <span className="font-medium">Modifications</span><br />
                                        We reserve the right to modify these terms at any time. Continued use of the application constitutes acceptance of modified terms.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="about">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">About Bunk Master Pro</h3>

                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        Bunk Master Pro is a progressive web application designed to help students manage and track their attendance effectively. It provides tools for attendance calculation, projection, and planning.
                                    </p>

                                    <div>
                                        <h4 className="font-medium">Features</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                                            <li>Real-time attendance calculation</li>
                                            <li>Weekly attendance planner</li>
                                            <li>Absenteeism impact calculator</li>
                                            <li>Attendance projections</li>
                                            <li>Local data storage</li>
                                            <li>PWA support for offline use</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">Developer</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Created by Rohit Kumar Yadav<br />
                                            <a
                                                href="https://github.com/rohit-ayadav/attandance-dashboard"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-600 hover:underline"
                                            >
                                                View on GitHub
                                            </a>
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">Version</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            1.0.0
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};