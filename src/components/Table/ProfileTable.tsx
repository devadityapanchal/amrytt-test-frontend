import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProfiles } from "../../services/Profile";

interface Column {
  id:
    | "firstName"
    | "lastName"
    | "age"
    | "gender"
    | "country"
    | "state"
    | "city"
    | "view"; // Add "view" to the id types
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  // {
  //   id: "age",
  //   label: "Age",
  //   minWidth: 170,
  // },
  // {
  //   id: "gender",
  //   label: "Gender",
  //   minWidth: 170,
  // },
  {
    id: "country",
    label: "Country",
    minWidth: 170,
  },
  {
    id: "state",
    label: "State",
    minWidth: 170,
  },
  {
    id: "city",
    label: "City",
    minWidth: 170,
  },
  {
    id: "view",
    label: "View",
    minWidth: 100,
  },
];

export default function ProfileTable({ refreshData }: { refreshData: Date }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<
    {
      _id: string;
      firstName: string;
      lastName: string;
      age: string;
      gender: string;
      country: string;
      state: string;
      city: string;
    }[]
  >([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    (async () => {
      const query = {};
      try {
        const result = await getProfiles(query);
        setRows(result?.data?.data);
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, [refreshData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      if (column.id === "view") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Link to={`/dashboard/profile/${row._id}`}>
                              <IconButton>
                                <VisibilityIcon />
                              </IconButton>
                            </Link>
                          </TableCell>
                        );
                      } else {
                        // Render other columns normally
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
