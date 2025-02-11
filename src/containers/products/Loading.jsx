import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
      <CircularProgress size={60} />
    </Box>
  );
};

export default LoadingSpinner;
