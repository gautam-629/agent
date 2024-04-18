import { Input,  Flex } from 'antd'
interface IGameFiltersProps {
    customer: string; // Assuming customer is of type string
    setCustomer: React.Dispatch<React.SetStateAction<string>>;
    children: React.ReactNode; // Children as a function
}

const GameFilters = ({children,customer,setCustomer}:IGameFiltersProps) => {
    return (
        <>
            <Flex wrap={'wrap'} align='center' style={{ width: '50%' }} gap={20}>
                <div
                        
                >
                    <Input value={customer} onChange={(e)=>setCustomer(e.target.value)} placeholder='ID or Account' />
                </div>
               {children}
            </Flex>
        </>
    )
}

export default GameFilters