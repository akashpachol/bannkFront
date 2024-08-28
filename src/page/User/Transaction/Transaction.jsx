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
import { getTransaction } from "../../../Service/user/apiMethod";
import Navbar from "../Layout/Navbar";
import ModalData from "../../../component/Modal";

const rowsPerPageOptions = [5, 10, 25];

const Transaction = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValue, setIsValue] = useState("");
  const [api, setApi] = useState(false);

  const toggleApi = () => setApi(!api);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const color = grey[200];

  useEffect(() => {
    getDetails();
  }, [api]);

  const getDetails = async () => {
    try {
      const response = await getTransaction();

      if (response && response.data) {
        if (Array.isArray(response.data.transactions)) {
          setFilteredRows(response.data.transactions);
        } else {
          toast.error("Unexpected response format");
        }
        setWalletData(response.data);
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
      const filtered = walletData?.transactions.filter((transactionValue) =>
        Object.values(transactionValue).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, walletData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="mt-5 flex justify-end w-full gap-6 pe-10">
        <button
          className="action_button"
          onClick={() => {
            setIsValue("Withdraw");
            openModal();
          }}
        >
          Withdraw
        </button>

        <button
          className="action_button"
          onClick={() => {
            setIsValue("Deposit");
            openModal();
          }}
        >
          Deposit
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid gap-6 items-start px-4 py-6 bg-white w-full mx-20">
          <div className="grid gap-4">
            <div className="bg-muted rounded-lg p-6 flex items-center justify-between">
              <div className="text-center mx-auto">
                <div className="text-sm text-muted-foreground">
                  Current Balance
                </div>
                <div className="text-4xl font-bold">
                  ₹{walletData?.accountBalance ?? 0}
                </div>
              </div>
            </div>
            <div>
              <div className="text-center">
                <h1>Transaction History</h1>
                <p>View your recent transactions and account activity.</p>
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
                        Amount
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
                        Type
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
                        Date
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
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">
                          {new Date(row.date).toLocaleDateString()}
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
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalData
          isValue={isValue}
          closeModal={closeModal}
          toggleApi={toggleApi}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Transaction;
