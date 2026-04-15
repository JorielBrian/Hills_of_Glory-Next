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
        <div className='bg-white rounded-lg shadow-lg border border-[#b8bd9e]/20 p-6'>
            <h2 className="text-2xl font-semibold mb-4 text-black">Add Member</h2>
            <form action="" className="flex flex-col gap-4 p-4">
                <InputGroup className="gap-2 p-5 border border-[#b8bd9e]/30 rounded-lg">
                    <InputGroupInput placeholder="First Name" className="border-[#b8bd9e]/50 focus:border-[#b8bd9e]" />
                    <InputGroupInput placeholder="Middle Name" className="border-[#b8bd9e]/50 focus:border-[#b8bd9e]" />
                    <InputGroupInput placeholder="Last Name" className="border-[#b8bd9e]/50 focus:border-[#b8bd9e]" />
                </InputGroup>
                <InputGroup className="gap-2 p-5 border border-[#b8bd9e]/30 rounded-lg">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton
                                variant="ghost"
                                className="border-[#b8bd9e]/50 hover:bg-[#b8bd9e]/10"
                            >
                                Gender
                            </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border-[#b8bd9e] w-fit">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="hover:bg-[#b8bd9e]/10">
                                    <InputGroupText>Male</InputGroupText>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-[#b8bd9e]/10">
                                    <InputGroupText>Female</InputGroupText>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <InputGroupInput placeholder="Birth Date" className="border-[#b8bd9e]/50 focus:border-[#b8bd9e]" />
                    <InputGroupInput placeholder="Address" className="border-[#b8bd9e]/50 focus:border-[#b8bd9e]" />
                </InputGroup>
            </form>
        </div>
    </main>
  )
}

export default Create