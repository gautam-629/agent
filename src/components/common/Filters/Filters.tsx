import { Flex, Form, Input, Space } from 'antd'
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'antd';
import moment from 'moment';
import { FieldTimeOutlined } from '@ant-design/icons';
interface IFiltersProps {
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    customer: string; // Assuming customer is of type string
    setCustomer: React.Dispatch<React.SetStateAction<string>>;
    children: React.ReactNode; // Children as a function
}

const Filters = ({ 
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    customer,
    setCustomer,
    children

 }: IFiltersProps) => {
    
    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (endDate && date && date > endDate) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        if (startDate && date && date < startDate) {
            setStartDate(date);
        }
    };

    const handleToday = () => {
        const today = moment();
        setStartDate(today.startOf('day').toDate());
        setEndDate(today.endOf('day').toDate());
    };

    const handleYesterday = () => {
        const yesterday = moment().subtract(1, 'days');
        setStartDate(yesterday.startOf('day').toDate());
        setEndDate(yesterday.endOf('day').toDate());
    };

    const handleThisWeek = () => {
        const startOfWeek = moment().startOf('week');
        const endOfWeek = moment().endOf('week');
        setStartDate(startOfWeek.startOf('day').toDate());
        setEndDate(endOfWeek.endOf('day').toDate());
    };

    const handleLastWeek = () => {
        const startOfLastWeek = moment().subtract(1, 'week').startOf('week');
        const endOfLastWeek = moment().subtract(1, 'week').endOf('week');
        setStartDate(startOfLastWeek.startOf('day').toDate());
        setEndDate(endOfLastWeek.endOf('day').toDate());
    };

    return (
        <>
            <Space direction='vertical'>
                <Form.Item
                 style={{marginBottom:"0px", width:"50%"}}
                label="Customer:"
                >
                    <Input value={customer} onChange={(e)=>setCustomer(e.target.value)} placeholder='ID or Account' />
                </Form.Item>
                <Flex className='ml-4' wrap='wrap'  align='center' gap={10 }>
                    <Space direction='horizontal'>
                        <span className='ml-5'>Period:</span>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsStart
                            placeholderText="  Start Date"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            className='border border-gray-400 py-1 rounded-md'
                            icon={<FieldTimeOutlined />}
                        />
                        <span>to</span>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsEnd
                            placeholderText="  End Date"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            className='border border-gray-400 py-1 rounded-md '
                            icon={<FieldTimeOutlined />}
                        />
                    </Space>
                    {children}
                </Flex>

                <Flex wrap='wrap' gap={20} style={{ marginLeft: "90px"  }} >
                    <Button
                        onClick={handleToday}
                        type="primary"
                    >
                        Today
                    </Button>

                    <Button
                        onClick={handleYesterday}
                        type="primary"
                    >
                        Yesterday
                    </Button>
                    <Button
                        onClick={handleThisWeek}
                        type="primary"
                    >
                        This week
                    </Button>
                    <Button
                        onClick={handleLastWeek}
                        type="primary"
                    >
                        Last Week
                    </Button>
                </Flex>
            </Space>
        </>
    )
}

export default Filters

