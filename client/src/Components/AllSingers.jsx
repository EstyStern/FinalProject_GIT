import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../Redux/store';
import { GetAllSingersFromServer, UpdateSingerInServer } from '../Redux/Singer/SingerThunk';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export const AllSingers = () => {
    //משתנה עבור שינוי בסטור
    const myDispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //בעת טעינת הקומפוננטה- שליפת כל הזמרים
    useEffect(async () => {
        try {
            let response = await GetAllSingersFromServer(myDispatch);
            console.log(response);
            let res = createData(response)
        } catch (error) {
            console.error(error.message);
        }
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //שליפת כל הזמרים מהסטור
    const AllSingersFromServer = useSelector((store) => {
        console.log("store", store);
        console.log(store.Singers.Singers);
        return store.Singers.Singers;
    });

    const ChangeStatus = async (item) => {
        debugger
        console.log(item);
        alert("are you sure to change status")
        let updateItem
        if (item.singerStatus == "לא פעיל") {
            updateItem = {
                "singerStatus": "פעיל",
                "singerImg": item.singerImg,
                "singerCancalingReason": item.singerCancalingReason,
                "singerResume": item.singerResume,
                "userGenre": item.userGenre,
                "userGender": item.userGender,
                "userBirthDate": item.userBirthDate,
                "userCity": item.userCity,
                "userEmail": item.userEmail,
                "userPass": item.userPass,
                "userLastName": item.userLastName,
                "userFirstName": item.userFirstName,
                "singerId": item.singerId,
                "userId": item.userId
            }
        }
        else {
            updateItem = {
                "singerStatus": "לא פעיל",
                "singerImg": item.singerImg,
                "singerCancalingReason": item.singerCancalingReason,
                "singerResume": item.singerResume,
                "userGenre": item.userGenre,
                "userGender": item.userGender,
                "userBirthDate": item.userBirthDate,
                "userCity": item.userCity,
                "userEmail": item.userEmail,
                "userPass": item.userPass,
                "userLastName": item.userLastName,
                "userFirstName": item.userFirstName,
                "singerId": item.singerId,
                "userId": item.userId
            }
        }
        console.log("after", updateItem);
        let s = await UpdateSingerInServer(myDispatch, "", updateItem);
        if (s != "")
            alert("שונה בהצלחה")
        else {
            alert("error")

        }

    }


    const columns = [
        { id: 'pic', label: '', minWidth: 0 },
        { id: 'name1', label: 'שם פרטי', align: 'left', minWidth: 190 },
        { id: 'name2', label: 'שם משפחה', align: 'left', minWidth: 190 },
        // {
        //     id: 'population',
        //     label: 'עיר',
        //     minWidth: 100,
        //     align: 'left',
        //     format: (value) => value.toLocaleString('en-US'),
        // },
        

        // {
        //     id: 'density',
        //     label: 'אימייל',
        //     minWidth: 100,
        //     align: 'left',
        //     format: (value) => value.toFixed(2),
        // },

        {
            id: 'size',
            label: 'רזומה',
            minWidth: 100,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        // {
        //     id: 'density',
        //     label: 'סטטוס',
        //     minWidth: 100,
        //     align: 'left',
        //     format: (value) => value.toFixed(2),
        // },

    ];

    const rows = [];
    function createData(Singers) {
        debugger
        Singers.map((item) => {
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

                        {AllSingersFromServer
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => {

                                return <>
                                    <TableRow hover role="checkbox" tabIndex={-1} key={item.planName}>
                                        <TableCell>
                                            <td><img src={`https://localhost:44324/images/${item.singerImg}`} width="40%"></img></td>
                                        </TableCell>

                                        <TableCell>
                                            <td>{item.userFirstName}</td>
                                        </TableCell>

                                        <TableCell>
                                            <td>{item.userLastName}</td>
                                        </TableCell>

                                        {/* <TableCell>
                                            <td>{item.UserCity}</td>
                                        </TableCell> */}

                                        <TableCell>
                                            <i class="far lg fa-file-pdf fa-10x" ColorLensOutlined="red"></i><br></br>
                                            <a href={`https://localhost:44324/Resume/${item.singerResume}`} download>פתיחה</a>
                                        </TableCell>

                                        {/* <TableCell>
                                            <td>{item.singerStatus}</td>
                                        </TableCell> */}



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
                count={AllSingersFromServer.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

        <div className='alert-danger'>ssssssssss</div>
        <table className="table" >
            <tr >
                <th>UserFirstName</th>
                <th>UserLastName</th>
                <th>UserEmail</th>
                <th>UserCity</th>
                <th>UserBirthDate</th>
                <th>UserGender</th>
                <th>UserGenre</th>
                <th>SingerResume</th>
                <th>SingerCancalingReason</th>
                <th>SingerImg</th>
                <th>SingerStatus</th>

            </tr>
            {/* מיפוי על כל המשתמשים מהסטור */}
            {
                AllSingersFromServer && AllSingersFromServer.map((item) => {
                    return <tr style={{ backgroundColor: item.singerStatus == "לא פעיל" ? "red" : "green" }}>
                        <td>{item.userFirstName}</td>
                        <td>{item.userLastName}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.userCity}</td>
                        <td>{item.userBirthDate}</td>
                        <td>{item.userGender}</td>
                        <td>{item.userGenre}</td>
                        <td>{item.singerResume}</td>
                        <td>{item.singerCancalingReason}</td>
                        <td>{item.singerImg}</td>
                        <td><input type="button" value={item.singerStatus} onClick={() => ChangeStatus(item)} /></td>
                    </tr>
                })
            }
        </table>
    </>

}