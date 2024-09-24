import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

type ICourse = {
    name: string
    id: number
    teacher: string
    timePlace: string
    org: string
}

const sampleData: ICourse = {
    name: '資訊安全架構',
    id: 2943,
    teacher: '陳俊祥',
    timePlace: '五 7-9 公館 S204',
    org: '資工系（學） 大碩',
}

/**TODO: 
 * 自適應
 * 
 * 英語授課
 * 學分數
 * 
 * 科目代碼
*/
export default function Course({ data }: { data: ICourse }) {
    if (!data) {
        data = sampleData
    }
    return (
        <Box sx={{ minWidth: 275, width: 0 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {data.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {data.teacher}
                    </Typography>
                    <Typography variant="body2">{data.timePlace}</Typography>
                    <Typography variant="body2">{data.org}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => alert('Working...')}>
                        課程大綱
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}
