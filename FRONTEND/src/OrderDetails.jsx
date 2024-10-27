import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "./axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as jose from 'jose'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Data = (fullname, productname, quantity, sumamount) => {
    return {fullname, productname, quantity, sumamount}
}

export default function OrderDetails  () {
    const navigate = useNavigate();
    const [ResponseOrderItem,setResponseOrderItem] = useState();
    useEffect( () =>{
       async function fetchData() {
        const token = document.cookie;
        const claims = jose.decodeJwt(token);
        const CustomerID = claims.CustomerID;

        const response = await axios.get('/GetOrderdetails/' + CustomerID);
        setResponseOrderItem(response);
       }
        fetchData();
    },[])

    if(ResponseOrderItem === undefined) return 'Lodding...';
    else{
        console.log('data',ResponseOrderItem.data)
        const Details = ResponseOrderItem.data.result[0];
        console.log('Details',Details)
        Details.map((curElem) => {
            const { fullname, productname, quantity, sumamount } = curElem;
            Data(fullname, productname, quantity, sumamount)
        });
        return(
            <>
            <TableContainer component={Paper}>
                <Table sx ={{minWidth:700}} aria-label='customized table'>
                  < TableHead>
                    <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align='right'>Product</StyledTableCell>
                  <StyledTableCell align='right'>Quantity</StyledTableCell>
                  <StyledTableCell  align='right'>SubTotal</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {Details.map(() => (curElem) => {
                            const { fullname, productname, quantity, sumamount } = curElem;
                        return(
                            <>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>{fullname}</StyledTableCell>
                                <StyledTableCell align='right'>{productname}</StyledTableCell>
                                <StyledTableCell align='right'>{quantity}</StyledTableCell>
                                <StyledTableCell align='right'><FaIndianRupeeSign />{sumamount}</StyledTableCell>
                            </StyledTableRow>
                            </>
                        )
                    })}
                  </TableBody>
                </Table>
            </TableContainer>
            <button className='buttone' onClick={() => (navigate(-1))}> Go to Back</button>
            </>
        )
    }
}
