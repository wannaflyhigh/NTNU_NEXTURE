import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useRef, useState } from 'react'
import { AcademicAutoCompelete } from './AcademicAutoCompelete'

/**
 *TODO: auto-submit after 1s
 */
export default function Search() {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!teacherRef.current || !courseRef.current || !courseCodeRef.current) {
            throw new Error('Some ref missing')
        }
        console.log(
            academicState,
            teacherRef.current.value,
            courseRef.current.value,
            courseCodeRef.current.value,
        )
    }

    const [academicState, setAcademicState] = useState('')
    const teacherRef = useRef<HTMLInputElement>(null)
    const courseRef = useRef<HTMLInputElement>(null)
    const courseCodeRef = useRef<HTMLInputElement>(null)

    return (
        <Card>
            <CardHeader>
                <CardTitle>查詢課程</CardTitle>
                <CardDescription>輸入最少任一條件即可送出</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <Label htmlFor="academic">開課系所</Label>
                        <AcademicAutoCompelete
                            academicState={academicState}
                            setAcademicState={setAcademicState}
                        />
                    </div>

                    <Label htmlFor="teacher">教師名稱</Label>
                    <Input ref={teacherRef} id="teacher" />

                    <Label htmlFor="course">課程名稱</Label>
                    <Input ref={courseRef} id="course" />

                    <Label htmlFor="courseCode">開課序號</Label>
                    <Input ref={courseCodeRef} id="courseCode" />

                    <Button type="submit">搜尋</Button>
                </form>
            </CardContent>
        </Card>
    )
}
