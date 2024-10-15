import { Autocomplete, Box, Button, FormGroup, TextField } from '@mui/material'
import { useRef } from 'react'

/**
 *TODO: 新增愛心偏好順序 useAutoCompelete auto-submit after 1s
 */
export default function Search() {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(
            academicRef.current.value,
            teacherRef.current.value,
            courseRef.current.value,
            courseCodeRef.current.value,
        )
    }

    const academicRef = useRef(document.createElement('input'))
    const teacherRef = useRef(document.createElement('input'))
    const courseRef = useRef(document.createElement('input'))
    const courseCodeRef = useRef(document.createElement('input'))

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <Box sx={{ margin: 3, width: 'max-content' }}>
                <FormGroup>
                    <Autocomplete
                        options={['通識', '體育', '科技', '資工', '1', '2', '3']}
                        sx={{ width: 250 }}
                        renderInput={(params) => (
                            <TextField {...params} label="開課系所" inputRef={academicRef} />
                        )}
                    />
                    <TextField
                        label="教師名稱"
                        sx={{ display: 'block', mt: 1 }}
                        inputRef={teacherRef}
                    />
                    <TextField
                        label="課程名稱"
                        sx={{ display: 'block', mt: 1 }}
                        inputRef={courseRef}
                    />
                    <TextField
                        label="開課序號"
                        sx={{ display: 'block', mt: 1 }}
                        inputRef={courseCodeRef}
                        type="number"
                    />
                    <Button variant="contained" type="submit" sx={{ mt: 1 }}>
                        查詢
                    </Button>
                </FormGroup>
            </Box>
        </form>
    )
}
