import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ICourse } from '../context/coursesContext'
import { Button } from '@/components/ui/button'

/**TODO:
 * 自適應
 *
 * 英語授課
 * 學分數
 *
 * 科目代碼
 */
export default function Course({ data }: { data: ICourse }) {
    return (
        <Card id={`${data.id}`}>
            <CardHeader>
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>
                    {data.id} {data.org}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{data.timePlace}</p>
            </CardContent>
            <CardContent>
                <p>{data.teacher}</p>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        alert('Working...')
                    }}
                >
                    課程大綱
                </Button>
            </CardFooter>
        </Card>
    )
}
