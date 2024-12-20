import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box,
  TextField,
  Button,
  TablePagination,
  IconButton,
  Checkbox,
  Collapse,
  Fade
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { BACKEND_URL } from '../constants';

const Dashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    consultation: { searchQuery: '', sortColumn: null, sortDirection: 'asc' },
    messages: { searchQuery: '', sortColumn: null, sortDirection: 'asc' },
    applications: { searchQuery: '', sortColumn: null, sortDirection: 'asc' }
  });
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [consultRes, msgRes, appRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/consultation/consultations`),
          axios.get(`${BACKEND_URL}/api/contact/messages`),
          axios.get(`${BACKEND_URL}/api/workwithus/applications`)
        ]);
        
        setConsultations(consultRes.data);
        setMessages(msgRes.data);
        setApplications(appRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectRow = (row) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(row)) {
        return prevSelected.filter((r) => r !== row);
      } else {
        return [...prevSelected, row];
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/consultation/delete`, { data: { ids: selectedRows } });
      setConsultations((prev) => prev.filter((consultation) => !selectedRows.includes(consultation._id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting consultations:', error);
    }
  };

  const CustomTable = ({ title, columns, columnKeys, data, filterKey }) => {
    const { searchQuery, sortColumn, sortDirection } = filters[filterKey] || { searchQuery: '', sortColumn: null, sortDirection: 'asc' };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleSearchChange = (e) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: { ...prevFilters[filterKey], searchQuery: e.target.value }
      }));
    };

    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    const sortedData = sortColumn
      ? filteredData.sort((a, b) => {
          const valueA = a[sortColumn];
          const valueB = b[sortColumn];
          if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
          if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        })
      : filteredData;

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">
            {title}
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <TextField
              fullWidth
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon className="text-gray-400 mr-2" />,
                className: "bg-gray-50 rounded-lg"
              }}
            />
          </div>

          <TableContainer className="mb-6 rounded-xl overflow-hidden border border-gray-100">
            <Table>
              <TableHead className="bg-gradient-to-r from-amber-500 to-amber-600">
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.length === data.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(data.map(row => row._id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableCell>
                  {columns.map((column, index) => (
                    <TableCell key={index} className="text-white font-cormorant text-lg font-bold py-4">
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleSelectRow(row._id)}
                      />
                    </TableCell>
                    {columnKeys.map((key, idx) => (
                      <TableCell key={idx} className="text-[#4A4A4A] font-medium py-4">
                        {row[key] !== undefined ? row[key] : 'N/A'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={sortedData.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 mt-20"
        >
          <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-4">
            Admin Dashboard
          </h1>
          <p className="text-[#4A4A4A] text-xl">
            Manage your consultations, messages, and applications
          </p>
        </motion.div>

        <CustomTable 
          title="Consultation Requests" 
          columns={['Name', 'Profession', 'Contact', 'Date', 'Time']} 
          columnKeys={['name', 'profession', 'contact', 'date', 'time']}
          data={consultations}
          filterKey="consultation"
        />
        
        <CustomTable 
          title="Contact Messages"
          columns={['Name', 'Email', 'Phone', 'Subject']} 
          columnKeys={['name', 'email', 'phone', 'subject']}
          data={messages}
          filterKey="messages"
        />
        
        <CustomTable 
          title="Applications"
          columns={['First Name', 'Last Name', 'Email', 'Contact', 'Preferred Month', 'Internship Duration', 'Preferred Practice Area', 'Submission Date']} 
          columnKeys={['firstName', 'lastName', 'email', 'contact', 'preferredMonth', 'internshipDuration', 'preferredPracticeArea', 'submissionDate']}
          data={applications.map(app => ({
            ...app,
            submissionDate: new Date(app.createdAt).toLocaleDateString(),
            contact: app.contactNumber,
            preferredMonth: app.preferredMonth,
            internshipDuration: app.internshipDuration,
            preferredPracticeArea: app.preferredPracticeArea,
            firstName: app.firstName,
            lastName: app.lastName,
            email: app.email
          }))}
          filterKey="applications"
        />
      </div>
    </div>
  );
};

export default Dashboard;