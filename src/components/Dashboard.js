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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Button,
  TablePagination
} from '@mui/material';

import { BACKEND_URL } from '../constants';

const Dashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filters, setFilters] = useState({
    consultation: { searchQuery: '', sortColumn: null, sortDirection: 'asc' },
    messages: { searchQuery: '', sortColumn: null, sortDirection: 'asc' }
  });
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/consultation/consultations`);
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/contact/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchConsultations();
    fetchMessages();
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

  const CustomTable = ({ title, columns, data, filterKey }) => {
    const { searchQuery, sortColumn, sortDirection } = filters[filterKey] || { searchQuery: '', sortColumn: null, sortDirection: 'asc' };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
        </Box>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '16px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>S.No.</TableCell>
                {columns.map((column) => (
                  <TableCell key={column} sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                    />
                  </TableCell>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.profession}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>
                    <Button onClick={() => setExpandedRow(expandedRow === row._id ? null : row._id)}>
                      {expandedRow === row._id ? 'Hide Question' : 'View Question'}
                    </Button>
                    {expandedRow === row._id && <Typography>{row.question}</Typography>}
                  </TableCell>
                  <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                  <TableCell>{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
          Delete Selected
        </Button>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #f0f4f8, #e0e7ef)', minHeight: '100vh', py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: 'primary.dark' }}>
        Admin Dashboard
      </Typography>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
        <CustomTable 
          title="Consultation Submissions" 
          columns={['Name', 'Profession', 'Contact', 'Question', 'Date', 'Time']} 
          data={consultations}
          filterKey="consultation"
        />
        <CustomTable 
          title="Contact Messages"
          columns={['Name', 'Email', 'Phone', 'Subject', 'Message']} 
          data={messages}
          filterKey="messages"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;