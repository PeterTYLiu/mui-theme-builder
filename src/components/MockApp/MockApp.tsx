import {
  AccountCircle,
  AcUnitSharp,
  Add,
  AttachMoney,
  CurrencyPound,
  GasMeterRounded,
  Notifications,
  Search,
  TrackChanges,
  Upgrade,
} from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  type ChipProps,
} from "@mui/material";
import { useState } from "react";
import { Sparkline } from "../Sparkline/Sparkline";
import { FAKE_DATA_1, FAKE_DATA_2, FAKE_DATA_3 } from "./mockData";

// Remove these styled components when MUI fixes table border colors
// https://github.com/mui/material-ui/issues/47749
// ^ Ticket is closed yet issue persists. Probably has something to do with nested themes?

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundImage: "var(--Paper-overlay)",
  borderColor: theme.palette.divider,
}));

const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.divider,
}));

interface Order {
  id: string;
  driverName: string;
  customer: string;
  orderer: string;
  status: "In transit" | "Delivered" | "Cancelled" | "Preparing";
}

const STATUS_TO_COLOR_MAP: Record<Order["status"], ChipProps["color"]> = {
  Cancelled: "error",
  Delivered: "success",
  "In transit": "info",
  Preparing: "warning",
};

const MOCK_DATA: Array<Order> = [
  {
    id: "d356fe",
    driverName: "rheinlein",
    customer: "Mars",
    status: "In transit",
    orderer: "John Cale",
  },
  {
    id: "f56e84q",
    driverName: "aclark",
    customer: "Ferrero",
    status: "Delivered",
    orderer: "Moe Tucker",
  },
  {
    id: "042857e",
    driverName: "jverne",
    customer: "Mondelez",
    status: "Cancelled",
    orderer: "Angus MacLise",
  },
  {
    id: "z0m1348",
    driverName: "fherbert",
    customer: "Hershey",
    status: "Preparing",
    orderer: "Willie Alexander",
  },
  {
    id: "xc2450w7",
    driverName: "kvonnegut",
    customer: "Haribo",
    status: "Delivered",
    orderer: "Walter Powers",
  },
  {
    id: "c019734",
    driverName: "iasimov",
    customer: "Lotte",
    status: "In transit",
    orderer: "Sterling Morrison",
  },
];

export const MockApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDollars, setIsDollars] = useState(true);
  return (
    <Box
      id="mock-app"
      sx={{
        overscrollBehavior: "none",
        boxShadow: 5,
        bgcolor: "background.default",
        borderRadius: 1.5,
        overflow: "hidden",
        width: "min(1120px, 100%)",
        maxHeight: "100%",
        overflowY: "scroll",
      }}
    >
      <AppBar position="sticky">
        <Toolbar sx={{ containerType: "inline-size" }}>
          <Typography component="h1" variant="h6" sx={{ flexGrow: 1 }}>
            OrderTrak Pro
          </Typography>
          <TextField
            sx={{
              color: "inherit",
              display: { "@1": "none", "@650": "block" },
            }}
            slotProps={{
              input: {
                startAdornment: <Search sx={{ marginInlineEnd: 0.5 }} />,
                sx: { color: "inherit" },
              },
            }}
            id="outlined-basic"
            size="small"
            placeholder="Search..."
            variant="outlined"
          />
          <Tooltip title="Search">
            <IconButton size="large" color="inherit" sx={{ display: { "@650": "none" } }}>
              <Search />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications (4)">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="My Account">
            <IconButton size="large" color="inherit" className="tooltip-override">
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, pt: 2 }}>
        <Alert severity="warning" sx={{ mb: 2 }} onClose={() => {}}>
          System will be going offline at 8pm EST for maintenance
        </Alert>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography sx={{ color: "text.primary" }} variant="h6">
            Tuesday, October 18
          </Typography>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button variant="outlined" startIcon={<Upgrade />} onClick={() => setIsDialogOpen(true)} className="dialog-override">
              Export...
            </Button>
            <Button variant="contained" startIcon={<Add />}>
              New Order
            </Button>
          </Stack>
        </Stack>

        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Export Order Reports</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">No reports currently available for export</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>OK</Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Paper sx={{ flex: "1 1 440px", minWidth: "200px", overflow: "hidden" }} className="table-override">
            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableHeaderCell sx={{ px: 0.5 }}>
                      <Checkbox />
                    </StyledTableHeaderCell>
                    <StyledTableHeaderCell>Order ID</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Driver</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Customer</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_DATA.map((data, index) => (
                    <TableRow key={data.id}>
                      <StyledTableBodyCell sx={{ px: 0.5 }}>
                        <Checkbox defaultChecked={Math.random() > 0.5} />
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        <Link href="#">
                          <b>{data.id}</b>
                        </Link>
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              border: 1,
                              borderColor: "grey.300",
                            }}
                            src={`https://picsum.photos/seed/${index * data.driverName.length}/64`}
                          />
                          <Typography sx={{ lineHeight: 1 }}>{data.driverName}</Typography>
                        </Stack>
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        <Box>
                          <Typography>{data.customer}</Typography>
                          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                            {data.orderer}
                          </Typography>
                        </Box>
                      </StyledTableBodyCell>
                      <StyledTableBodyCell>
                        <Chip color={STATUS_TO_COLOR_MAP[data.status]} label={data.status} />
                      </StyledTableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination component="div" count={6} page={0} onPageChange={() => {}} rowsPerPage={10} />
          </Paper>
          <Paper sx={{ p: 2, flex: "1 1 250px" }} className="paper-override">
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", gap: 2, mb: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>Analytics</Typography>
              <Select size="small" value={15} className="select-override">
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={15}>This Week</MenuItem>
                <MenuItem value={20}>This Month</MenuItem>
                <MenuItem value={30}>This Quarter</MenuItem>
              </Select>
            </Stack>
            <Divider />
            <Stack sx={{ py: 1.5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
              <Box>
                <Typography variant="subtitle2">Net revenue</Typography>
                <Typography variant="h4">
                  {isDollars ? "$32,619" : "£24,177"}
                  <Typography variant="h6" component="span">
                    {isDollars ? ".37" : ".81"}
                  </Typography>
                </Typography>
              </Box>
              <ToggleButtonGroup
                size="small"
                exclusive
                value={isDollars ? "dollar" : "pound"}
                onChange={(_, value) => setIsDollars(value === "dollar")}
              >
                <ToggleButton value="dollar">
                  <AttachMoney />
                </ToggleButton>
                <ToggleButton value="pound">
                  <CurrencyPound />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Divider />
            <Stack sx={{ pt: 1.5, gap: 2 }}>
              <Sparkline title="Tracking events" data={FAKE_DATA_1} icon={<TrackChanges fontSize="small" />} />
              <Sparkline title="Retention rate" data={FAKE_DATA_2} icon={<GasMeterRounded fontSize="small" />} />
              <Sparkline title="Customer TTRs" data={FAKE_DATA_3} icon={<AcUnitSharp fontSize="small" />} />
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
