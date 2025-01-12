import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

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

    const academicRef = useRef<HTMLInputElement>()
    const teacherRef = useRef<HTMLInputElement>()
    const courseRef = useRef<HTMLInputElement>()
    const courseCodeRef = useRef<HTMLInputElement>()
    /**TODO: */
    const form = useForm()

    return (
        <Form {...form}>
            <form onSubmit={(e) => {}} className="w-2/3">
                <FormField
                    name=""
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <FormItem>
                                <FormLabel>開課系所</FormLabel>
                                <FormControl>
                                    {/* TODO: auto compelete(combobox) */}
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel className="select-none">教師名稱</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel className="select-none">課程名稱</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            <FormItem>
                                <FormLabel className="select-none">開課序號</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </>
                    )}
                />
                <Button type="submit">搜尋</Button>
            </form>
        </Form>
    )
}
