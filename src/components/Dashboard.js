import React, { useState } from 'react';
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

const Dashboard = () => {
  // Consultation Submissions Data
  const consultations = [
    {
      name: 'John Doe',
      profession: 'Lawyer',
      contact: 'john@example.com',
      question: 'What are the legal implications of...',
      date: '2023-06-01',
      time: '10:00 AM'
    },
    {
      name: 'Jane Smith',
      profession: 'Accountant',
      contact: 'jane@example.com',
      question: 'How can I optimize my tax strategy?',
      date: '2023-06-02',
      time: '2:30 PM'
    }
  ];

  // Work with Us Data
  const workWithUs = [
    {
      position: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      salary: '$120,000 - $150,000',
      status: 'Open'
    },
    {
      position: 'Marketing Specialist',
      department: 'Marketing',
      location: 'San Francisco, CA',
      salary: '$85,000 - $110,000',
      status: 'Open'
    }
  ];

  // Contact Us Data
  const contactUs = [
    {
      name: 'Customer Support',
      email: 'support@company.com',
      phone: '+1 (800) 123-4567',
      hours: '9 AM - 5 PM EST',
      type: 'General Inquiries'
    },
    {
      name: 'Sales Department',
      email: 'sales@company.com',
      phone: '+1 (888) 987-6543',
      hours: '8 AM - 6 PM EST',
      type: 'Business Opportunities'
    }
  ];

  // State for filters and sorting
  const [filters, setFilters] = useState({
    consultation: { searchQuery: '', sortColumn: null, sortDirection: 'asc' },
    workWithUs: { searchQuery: '', sortColumn: null, sortDirection: 'asc' },
    contactUs: { searchQuery: '', sortColumn: null, sortDirection: 'asc' }
  });

  // Reusable Table Component
  const CustomTable = ({ title, columns, data, filterKey }) => {
    const { searchQuery, sortColumn, sortDirection } = filters[filterKey];
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleSearchChange = (e) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: { ...prevFilters[filterKey], searchQuery: e.target.value }
      }));
    };

    const handleSortChange = (column) => {
      setFilters((prevFilters) => {
        const { sortColumn: prevSortColumn, sortDirection: prevSortDirection } = prevFilters[filterKey];
        const newSortDirection = prevSortColumn === column && prevSortDirection === 'asc' ? 'desc' : 'asc';
        return {
          ...prevFilters,
          [filterKey]: { ...prevFilters[filterKey], sortColumn: column, sortDirection: newSortDirection }
        };
      });
    };

    const handleSelectAllRows = (event) => {
      setSelectedRows(event.target.checked ? data.map((_, index) => index) : []);
    };

    const handleSelectRow = (index) => {
      const selectedIndex = selectedRows.indexOf(index);
      let newSelectedRows = [];

      if (selectedIndex === -1) {
        newSelectedRows = newSelectedRows.concat(selectedRows, index);
      } else if (selectedIndex === 0) {
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedRows = newSelectedRows.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1)
        );
      }

      setSelectedRows(newSelectedRows);
    };

    const handleDeleteSelectedRows = () => {
      const newData = data.filter((_, index) => !selectedRows.includes(index));
      setSelectedRows([]);
      // Update the data in the parent component or perform any necessary actions
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

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 2, 
            fontWeight: 'bold', 
            color: 'primary.main' 
          }}
        >
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
          <FormControl variant="outlined" size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortColumn || ''}
              onChange={(e) => handleSortChange(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '16px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.contrastText',
                    borderTopLeftRadius: '16px'
                  }}
                >
                  <Checkbox
                    color="primary"
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAllRows}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.contrastText',
                    cursor: 'pointer'
                  }}
                >
                  S.No.
                </TableCell>
                {columns.map((column) => (
                  <TableCell 
                    key={column} 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'primary.contrastText',
                      borderTopRightRadius: column === columns[columns.length - 1] ? '16px' : 0,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSortChange(column)}
                  >
                    {column}
                    {sortColumn === column && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow 
                  key={index} 
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      backgroundColor: 'action.hover' 
                    },
                    '&:last-child td': {
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px'
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.indexOf(index + page * rowsPerPage) !== -1}
                      onChange={() => handleSelectRow(index + page * rowsPerPage)}
                    />
                  </TableCell>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell key={cellIndex}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="error"
            disabled={selectedRows.length === 0}
            onClick={handleDeleteSelectedRows}
          >
            Delete Selected
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(to bottom, #f0f4f8, #e0e7ef)', 
        minHeight: '100vh', 
        py: 6 
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          textAlign: 'center', 
          mb: 6, 
          fontWeight: 'bold', 
          color: 'primary.dark' 
        }}
      >
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
          title="Work With Us" 
          columns={['Position', 'Department', 'Location', 'Salary', 'Status']} 
          data={workWithUs}
          filterKey="workWithUs"
        />
        
        <CustomTable 
          title="Contact Us" 
          columns={['Name', 'Email', 'Phone', 'Hours', 'Type']} 
          data={contactUs}
          filterKey="contactUs"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;