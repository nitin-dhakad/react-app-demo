import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip, Select, MenuItem, Snackbar } from "@mui/material";
import "./index.css";

const rows = [
  {
    id: 1,
    parents: "Kyle Musk",
    gender: "M",
    birth: "21 Aug 2000",
    birthLocation: "Sao Tome and Principe",
    death: "23 February 1998",
    deathLocation: "Salt Lake City, Salt Lake Country",
  },
  {
    id: 2,
    parents: "Kyle Musk",
    gender: "M",
    birth: "21 Aug 2000",
    birthLocation: "Sao Tome and Principe",
    death: "23 February 1998",
    deathLocation: "Salt Lake City, Salt Lake Country",
  },
];
export default function Landing() {
  const [data, setData] = React.useState(rows);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const updateGender = (id, gender) => {
    const copyData = [...data];
    const found = copyData.find((rec) => rec.id === id);
    if (found) {
      found.gender = gender;
    }
    setData(copyData);
  };

  const updateData = (fieldData) => {
    const copyData = [...data];
    const found = copyData.find((rec) => rec.id === fieldData.id);
    if (found) {
      found[fieldData.field] = fieldData.value;
    }
    setData(copyData);
    setOpen(true);
  };
  React.useEffect(() => {}, []);
  const columns = [
    {
      field: "parents",
      headerName: "Parents and Siblings",
      width: 250,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Select
          onChange={(event) => updateGender(params.id, event.target.value)}
          label="Gender"
          value={params.value}
          renderValue={() => <span>{params.value}</span>}
        >
          <MenuItem value={"M"}>Male</MenuItem>
          <MenuItem value={"F"}>Female</MenuItem>
          <MenuItem value={"O"}>Other</MenuItem>
        </Select>
      ),
    },
    {
      field: "birth",
      headerName: "Birth",
      width: 110,
      editable: true,
    },
    {
      field: "birthLocation",
      headerName: "Birth Location",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      editable: true,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "death",
      headerName: "Death",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "deathLocation",
      headerName: "Death Location",
      sortable: false,
      width: 160,
      editable: true,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span className="table-cell-trucate">{params.value}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onCellEditCommit={updateData}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Success"
      />
    </Box>
  );
}
