/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';

import { Box, Card, Table, Stack, Button, Container, TableBody, Typography, TableContainer, TablePagination } from '@mui/material';

import { itemService } from 'src/services/item-service'

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import DynamicFormModal from 'src/components/modal/dynamic-form-modal';
import DeleteConfirmationModal from 'src/components/modal/delete-confirmatin-codal'

import TableNoData from '../table-no-data';
import ItemTableRow from '../item-table-row';
import ItemTableHead from '../item-table-head';
import TableEmptyRows from '../table-empty-rows';
import ItemTableToolbar from '../item-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------

export default function ItemPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [isDirty, setIsDirty] = useState(false); 
  const [editedRows, setEditedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [deletedItems, setDeletedItems] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  useEffect(() => {
    loadAllItems();
    itemService.getAllItemTypes().then(data => {
      setItemTypes(data);
    });
    
  }, [])

  const loadAllItems = () => {
    itemService.getAllItems().then(data => {
      setItems(data.filter(item => !item.deletedAt ));
    });
  };

  // Define the form fields for the new item
  const formFields = [
    { name: 'name', label: 'Item Name', select: false, required: true, },
    { name: 'price', label: 'Price', select: false, required: true, },
    {
      name: 'itemType',
      label: 'Item Type',
      select: true, // Add a type property to indicate it's a select field
      options: itemTypes,
      required: true,
    },
  ];

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    // Submit the form data to the backend
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      itemTypeId: formData.itemType,
    }
    // Create new Item and update the table.
    itemService.createItem(payload).then(() => loadAllItems());

    // Close the modal
    handleCloseModal();
  };
  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSaveChanges = (editedRow) => {
    // Check if the row is already edited
    const isRowEdited = editedRows.some((row) => row.id === editedRow.id);

    if (isRowEdited) {
      // Update the edited row
      setEditedRows((prevRows) =>
        prevRows.map((row) => (row.id === editedRow.id ? editedRow : row))
      );
    } else {
      // Add the new edited row
      setEditedRows((prevRows) => [...prevRows, editedRow]);
    }
  };

  const handleSaveAllChanges = () => {
    // Perform save operation for all edited rows
    
    editedRows.forEach((row) => {
      const {id, name, price, itemTypeId} = row;
      const payload = {
        name,
        price: parseFloat(price),
        itemTypeId
      };
      try {
        itemService.saveItem(id, payload).then(() => loadAllItems());
      } catch (error) {
        console.log(error)
      }
    });
    // After saving, clear the edited rows
    setEditedRows([]);
    setIsDirty(false);
  };

  const handleDeleteItems = () => {
    try {
      const deleted = [];
      selected.forEach((id) => {
        const item = items.find((item) => item.id === id);
        if (item) {
          deleted.push(item);
        }
      });
      setDeletedItems(deleted);
      setIsDeleteModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = () => {
    try {
      itemService.removeItems(selected).then(() => loadAllItems());
      setDeletedItems([]);
      setSelected([]);
    } catch (error) {
      console.log(error)
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: items,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h4">Items</Typography>
        <Stack direction="row" alignItems="center" justifyContent="end">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
            New Item
          </Button>
          <Box width={16} /> {/* Add space between buttons */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="eva:save-fill" />}
            disabled={!isDirty} // Disable save button when no changes
            onClick={handleSaveAllChanges}
          >
            Save
          </Button>
        </Stack>
      </Stack>
      <Card>
        <ItemTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleItemsDelete={handleDeleteItems}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ItemTableHead
                order={order}
                orderBy={orderBy}
                rowCount={items.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Item Name' },
                  { id: 'price', label: 'Price' },
                  { id: 'itemType', label: 'Item Type'},
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ItemTableRow
                      key={row.id}
                      row={row}
                      itemTypes={itemTypes}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      onSaveChanges={handleSaveChanges} // Pass the callback function
                      setDirty={() => setIsDirty(true)} // Set dirty state when changes made
                    />
                  ))}

                <TableEmptyRows
                  height={69}
                  emptyRows={emptyRows(page, rowsPerPage, items.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          id='itemPagination'
          name='itemPagination'
          count={items.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Modal for adding a new item */}
      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formFields={formFields}
        onSubmit={handleFormSubmit}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        deletedItems={deletedItems}
        onDelete={onDelete}
      />
    </Container>
  );
}
