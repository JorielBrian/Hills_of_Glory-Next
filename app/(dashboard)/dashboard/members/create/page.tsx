import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const Create = () => {
  return (
    <main className='dashboard_main'>
        <div className='bg-white rounded-lg shadow-sm p-6'>
            <h2 className="text-2xl font-semibold mb-4">Add Member</h2>
            <form action="" className="flex flex-col gap-4 p-4">
                <InputGroup className="gap-2 p-5">
                    <InputGroupInput placeholder="First Name" />
                    <InputGroupInput placeholder="Middle Name" />
                    <InputGroupInput placeholder="Last Name" />
                </InputGroup>
                <InputGroup className="gap-2 p-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton
                                variant="ghost"
                            >
                                Gender
                            </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black/20 w-fit">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <InputGroupText>Male</InputGroupText>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <InputGroupText>Female</InputGroupText>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <InputGroupInput placeholder="Birth Date" />
                    <InputGroupInput placeholder="Address" />
                </InputGroup>
            </form>
        </div>
    </main>
  )
}

export default Create