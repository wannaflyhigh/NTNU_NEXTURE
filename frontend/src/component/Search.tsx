import { Autocomplete, Box, Button, FormGroup, Input, InputLabel, TextField } from '@mui/material'

/**
 *TODO: 新增愛心偏好順序 useAutoCompelete auto-submit after 1s
 */
export default function Search() {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        alert('hi')
    }
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <Box sx={{ margin: 3, width: 'max-content' }}>
                <FormGroup>
                    <Autocomplete
                        options={['通識', '體育', '科技', '資工', '1', '2', '3']}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="開課系所" />}
                    />
                    <TextField label="教師名稱" sx={{ display: 'block', mt: 1 }} />
                    <TextField label="課程名稱" sx={{ display: 'block', mt: 1 }} />
                    <TextField label="開課序號" sx={{ display: 'block', mt: 1 }} />
                    <Button variant="contained" type="submit" sx={{ mt: 1 }}>
                        查詢
                    </Button>
                </FormGroup>
            </Box>
        </form>
    )
}
