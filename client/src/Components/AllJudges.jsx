import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../Redux/store';
import { GetAllJudgesFromServer } from '../Redux/Judge/JudgeThunk';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ColorLensOutlined } from '@material-ui/icons';

export const AllJudges = () => {
    //משתנה עבור שינוי בסטור
    const myDispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //בעת טעינת הקומפוננטה- שליפת כל השופטים
    useEffect(async () => {
        try {
            let response = await GetAllJudgesFromServer(myDispatch);
            console.log(response);
           
            let res = createData(response)
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    //שליפת כל המדרגים מהסטור
    const AllJudgesFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Judges.Judges);
        return store.Judges.Judges;
    });

    const AllUserFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Users.Users);
        return store.Users.Users;
    });

    console.log(AllUserFromStore, "AllUserFromStore!!!!!!!!!!!!!!!!!");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'pic', label: "", minWidth: 0 },
        { id: 'name1', label: 'שם פרטי', align: 'left', minWidth: 190 },
        { id: 'name2', label: 'שם משפחה', align: 'left', minWidth: 190 },
        {
            id: 'population',
            label: 'סגנון',
            minWidth: 100,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'density',
            label: 'אימייל',
            minWidth: 100,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'density',
            label: 'עיר',
            minWidth: 100,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'size',
            label: 'רזומה',
            minWidth: 100,
            align: 'left',
           
        },



    ];

    const rows = [];
    function createData(Judge) {
        debugger
        Judge.map((item) => {
            rows.push(item)
        })
        return rows
    }
    console.log("rows", rows);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>

                <Table stickyHeader aria-label="sticky table">
                    <TableHead>

                        {columns.map((column) => (

                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableHead>

                    <TableBody>

                        {AllJudgesFromStore
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => {

                                return <>
                                    
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item.planName}>
                                        <TableCell>
                                            <td><img src={`https://localhost:44324/images/${item.judgePic}`} width="40%"></img></td>
                                        </TableCell>

                                        <TableCell>
                                            <td>{item.userFirstName}</td>
                                        </TableCell>

                                        <TableCell>
                                            <td>{item.userLastName}</td>
                                        </TableCell>

                                        <TableCell>
                                            <td>{item.judgeType}</td>
                                        </TableCell>

                                        {AllUserFromStore.filter(x => x.userId == item.userId).map((user) => {
                                            console.log(item, "itemmmmmmmmmmm");
                                            return <>
                                                <TableCell>
                                                    <td>{user.userEmail}</td>
                                                </TableCell>

                                                <TableCell>
                                                    <td>{user.userCity}</td>
                                                </TableCell>

                                            </>
                                        }
                                        )}


                                        <TableCell>
                                            <td>
                                                {/* <span class="material-symbols-outlined">
                                                    קובץ
                                                </span> */}
                                                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> */}
                                                {/* <iframe src={`https://localhost:44324/Resume/${item.judgeResume}`} width="40%"></iframe> */}
                                                <i  class="far lg fa-file-pdf fa-10x" ColorLensOutlined="red"></i><br></br>
                                                <a href={`https://localhost:44324/Resume/${item.judgeResume}`} download>פתיחה</a>
                                                {/* <a href={`https://localhost:44324/Resume/${item.judgeResume}`}>
                                                    <mat-icon color="accent">description</mat-icon>
                                                </a> */}
                                            </td>
                                            {/* <td>{item.judgeResume}</td> */}
                                        </TableCell>





                                    </TableRow>
                                </>;
                            })

                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={AllJudgesFromStore.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>



    </>

}

