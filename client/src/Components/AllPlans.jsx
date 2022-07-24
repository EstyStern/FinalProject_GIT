import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export const AllPlans = (props) => {
    const myDispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let navigate = useNavigate()

    console.log(props);
    //בעת טעינת הקומפוננטה- שליפת כל התוכניות
    useEffect(async () => {
        debugger
        try {
            let response = await GetAllPlansFromServer(myDispatch);
            console.log("response", response);
            let res = createData(response)
            console.log("res", res);
            debugger
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    //שליפת כל התוכניות מהסטור
    const AllPlansFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.Plans);
        return store.Plans.Plans;
    });


    const AllStepInplanFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.StepInPlans.StepInPlans);

        return store.StepInPlans.StepInPlans;
    });


    // function funcAllStepInPlan(id) {
    //     props.history.push({ pathname: "/AllStepInPlans", props: { id } })
    // }


    const columns = [
        { id: 'pic', label: 'עריכה', minWidth: 0 },
        { id: 'pic', label: 'תמונה', minWidth: 0 },
        { id: 'name', label: 'שם תוכנית', align: 'left', minWidth: 100 },
        { id: 'code', label: 'קטגוריה', align: 'left', minWidth: 100 },
        {
            id: 'population',
            label: 'תאריך פתיחת תוכנית',
            minWidth: 180,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'size',
            label: 'תאריך סיום העלאת סרטון',
            minWidth: 180,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'density',
            label: 'תאריך סיום לדרוג',
            minWidth: 180,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'density',
            label: 'תאריך סיום לשפיטה',
            minWidth: 180,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
    ];




    const rows = [];
    function createData(Plans) {
        debugger
        Plans.map((item) => {
            rows.push(item)
        })
        return rows
    }
    console.log("rows", rows);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const funcNevigatToAddOrUpdate = (idPlan) => {
        debugger
        // navigate(`/Nav/StepersAddUpdatePlan/${idPlan}/`)
        navigate(`/Nav/StepersAddUpdatePlan/${idPlan}/AddOrUpdatePlan/${idPlan}`)

    }




    return <>
        <div >
            <AddCircleOutlineIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(1)}></AddCircleOutlineIcon>
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

                            {AllPlansFromStore
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => {
                                    // AllStepInplanFromStore.filter(x=>x.planId==item.planId).map((step) => {
                                    // console.log(step,"step");
                                    return <>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={item.planName}>
                                            <ModeEditIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(item.planId)}></ModeEditIcon>
                                            <TableCell>
                                                <td><img src={`https://localhost:44324/images/${item.pic}`} width="25%"></img></td>
                                            </TableCell>

                                            <TableCell>
                                                <td>{item.planName}</td>
                                            </TableCell>

                                            <TableCell>
                                                <td>{item.typePlanName}</td>
                                            </TableCell>

                                            <TableCell>
                                                <td>{item.planStartDate}</td>
                                            </TableCell>

                                            {AllStepInplanFromStore.filter(x => x.planId == item.planId).map((step) => {
                                                return <>
                                                    <TableCell>
                                                        <td>{step.stepInPlanEndDateToUploadSong}</td>
                                                    </TableCell>

                                                    <TableCell>
                                                        <td>{step.stepInPlanEndDateToRating}</td>
                                                    </TableCell>

                                                    <TableCell>
                                                        <td>{step.stepInPlanEndDateToJudg}</td>
                                                    </TableCell>
                                                </>
                                            }
                                            )}



                                        </TableRow>
                                    </>;
                                    // 
                                })

                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={AllPlansFromStore.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    </>

}
