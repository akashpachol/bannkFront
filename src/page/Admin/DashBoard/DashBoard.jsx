import Navbar from "../Layout/Navbar";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { toast } from "react-toastify";
import { getAllUser, getUserDetails, userDisabled } from "../../../Service/admin/apiMethod";
import Swal from "sweetalert2";
import ModalData from "./Modal";

const rowsPerPageOptions = [5, 10, 25];
const DashBoard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [filteredRows, setFilteredRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, setApi] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  const color = grey[200];

  useEffect(() => {
    getDetails();
  }, [api]);

  const getDetails = async () => {
    try {
      const response = await getAllUser();


      if (response && response.data) {
        setUserData(response.data)
          setFilteredRows(response.data);

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(userData.length>0){
        const filtered = userData.filter((transactionValue) =>
          Object.values(transactionValue).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setFilteredRows(filtered);
      }
   
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery,userData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure to disabled user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        userDisabled(id)
          .then((response) => {
            console.log(response);
            setApi(!api);
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }
    });
  };

  const handleView= async(id) => {

 
        try {
          const response = await getUserDetails(id);
    
    
          if (response && response.data) {
            setUserDetails(response.data)
            toggleModal()
    
          }
        } catch (error) {
          toast.error(error.message);
        }
 
  };

  return (
    <div>
      <Navbar />
      <div className="px-10 mt-5">
        <div className="text-center ">
          <h1 className="text-2xl font-bold">All Users</h1>

        </div>
        <div className="flex justify-between">
          <input
            placeholder="Search"
            className="border-2 my-6 p-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "50px",
                    fontWeight: "bold",
                    backgroundColor: color,
                    color: "black",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "150px",
                    fontWeight: "bold",
                    backgroundColor: color,
                    color: "black",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "150px",
                    fontWeight: "bold",
                    backgroundColor: color,
                    color: "black",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    maxWidth: "50px",
                    fontWeight: "bold",
                    backgroundColor: color,
                    color: "black",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredRows
              ).map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell align="center">
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                  {!row.disabled ? (
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
                      onClick={() => handleClick(row._id)}
                    >
                          disabled
                    </button>
                  ) : (
                    <button
                      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handleClick(row._id)}
                    >
              
                      enabled
                    </button>
                  )}
                         <button
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handleView(row._id)}
                    >
              
                      view
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="h6" color="textSecondary">
                      No Data
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredRows.length > 0 && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>

      {isModalOpen && (
        <ModalData
        userDetails={userDetails}
        
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default DashBoard;
