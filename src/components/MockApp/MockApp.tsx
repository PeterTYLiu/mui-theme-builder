import { AccountCircle, Add, Upgrade } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  type ChipProps,
} from "@mui/material";

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
  return (
    <Box
      sx={{
        boxShadow: 5,
        bgcolor: "background.default",
        borderRadius: 1.5,
        overflow: "hidden",
        width: "90%",
        maxHeight: "92dvh",
        overflowY: "scroll",
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Typography component="h1" variant="h6" sx={{ flexGrow: 1 }}>
            OrderTracker Pro
          </Typography>
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <Alert severity="warning" sx={{ mb: 2 }} onClose={() => {}}>
          System will be going offline at 8pm EST for maintenance
        </Alert>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography color="text.primary" variant="h6">
            Tuesday, October 18
          </Typography>
          <Stack direction="row" gap={1}>
            <Button variant="outlined" startIcon={<Upgrade />}>
              Export...
            </Button>
            <Button variant="contained" startIcon={<Add />}>
              New Order
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TableContainer component={Paper} sx={{ flex: "1 1 440px" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Driver</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_DATA.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <Link href="#">
                        <b>{data.id}</b>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" gap={1} alignItems="center">
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            border: 1,
                            borderColor: "grey.300",
                          }}
                          src={`https://picsum.photos/seed/${index * data.driverName.length}/64`}
                        />
                        <Typography sx={{ lineHeight: 1 }}>
                          {data.driverName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography>{data.customer}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          {data.orderer}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={STATUS_TO_COLOR_MAP[data.status]}
                        label={data.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper sx={{ p: 2, flexGrow: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
              mb={1.5}
            >
              <Typography fontWeight="bold">Analytics</Typography>
              <Select size="small" value={15}>
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={15}>This Week</MenuItem>
                <MenuItem value={20}>This Month</MenuItem>
                <MenuItem value={30}>This Quarter</MenuItem>
              </Select>
            </Stack>
            <Divider />
            <Box py={1.5}>
              <Typography variant="h4">
                $32,619
                <Typography variant="h6" component="span">
                  .37
                </Typography>
              </Typography>
              <Typography variant="caption">Net revenue</Typography>
            </Box>
            <Divider />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
