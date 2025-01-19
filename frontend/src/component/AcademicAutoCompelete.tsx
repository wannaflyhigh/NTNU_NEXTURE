import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const frameworks = [
    {
        value: 'HU71',
        label: 'HU71 科技系',
    },
    {
        value: 'SU71',
        label: 'SU71 資工系',
    },
]

interface AcademicAutoCompleteProps {
    academicState: string
    setAcademicState: (value: string) => void
}

/**TODO: 科系加星號 */
export function AcademicAutoCompelete({
    academicState,
    setAcademicState,
}: AcademicAutoCompleteProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    id="academic"
                >
                    {academicState
                        ? frameworks.find((framework) => framework.value === academicState)?.label
                        : '選擇'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setAcademicState(
                                            currentValue === academicState ? '' : currentValue,
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            academicState === framework.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
