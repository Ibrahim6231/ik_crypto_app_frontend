import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaUserEdit } from 'react-icons/fa';
import { iMuiTableAdditionalStyle } from '../../interfaces/muiInterface';
import "./MuiTable.scss";
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: theme.palette.common.white,
    fontSize: "1.1rem"  //custom
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem"  //custom
  },
}));

//@ts-ignore
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



interface iMuiCustomizedTables {
  rows: any[];
  columns: { [key: string]: string };
  additionalStyle?: iMuiTableAdditionalStyle;
  handleClickAction?: (param1: any, param2: string) => void;
}

const MuiCustomizedTables: React.FC<iMuiCustomizedTables> = ({ rows, columns, additionalStyle, handleClickAction }) => {

  const columnsTitle: string[] = Object.values(columns);
  const columnsTitleKey: string[] = Object.keys(columns);

  return (
    <TableContainer component={Paper} id="mui-table-custom">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align={"left"}>Sl. No.</StyledTableCell>
            {columnsTitle.map((ele: any, i: number) => <StyledTableCell key={i} align={additionalStyle?.align?.[i] || "center"}> {ele} </StyledTableCell>)}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell key={idx} align={"left"}>{idx + 1}</StyledTableCell>
              {columnsTitleKey.map((ele, i: number) => {
                return <StyledTableCell key={i} align={additionalStyle?.align?.[i] || "center"}>
                  <>
                    {(ele === "name" && row.image) ? <div className="image-name-cell">
                      <img src={row.image} />
                      {row[ele]}
                    </div>
                      : row[ele]
                    }
                    {ele === "buttonBuy" && handleClickAction && <Button onClick={() => handleClickAction(row, "buy")}>
                      Buy
                    </Button>
                    }
                    {ele === "buttonSell" && handleClickAction && <Button onClick={() => handleClickAction(row, "sell")}>
                      Sell
                    </Button>
                    }
                  </>
                </StyledTableCell>
              }
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table >
    </TableContainer>
  );
}

export default MuiCustomizedTables;