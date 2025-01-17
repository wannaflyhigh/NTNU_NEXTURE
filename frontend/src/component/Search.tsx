import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useRef } from 'react'

/**
 *TODO: 新增愛心偏好順序 useAutoCompelete auto-submit after 1s
 */
export default function Search() {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (
            !academicRef.current ||
            !teacherRef.current ||
            !courseRef.current ||
            !courseCodeRef.current
        ) {
            throw new Error('Some ref missing')
        }
        console.log(
            academicRef.current.value,
            teacherRef.current.value,
            courseRef.current.value,
            courseCodeRef.current.value,
        )
    }

    const academicRef = useRef<HTMLInputElement>(null)
    const teacherRef = useRef<HTMLInputElement>(null)
    const courseRef = useRef<HTMLInputElement>(null)
    const courseCodeRef = useRef<HTMLInputElement>(null)

    return (
        <form onSubmit={onSubmit} className="w-2/3 ">
            <Label htmlFor="academic">開課系所</Label>
            {/* TODO: auto compelete(combobox) */}
            <Input ref={academicRef} id="academic" />

            <Label htmlFor="teacher">教師名稱</Label>
            <Input ref={teacherRef} id="teacher" />

            <Label htmlFor="course">課程名稱</Label>
            <Input ref={courseRef} id="course" />

            <Label htmlFor="courseCode">開課序號</Label>
            <Input ref={courseCodeRef} id="courseCode" />

            <Button type="submit">搜尋</Button>
        </form>
    )
}
