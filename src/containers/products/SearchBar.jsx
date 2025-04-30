import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="pl-[20px] pr-[20px]">
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "100%",
          "@media (min-width: 640px)": { width: "50%" },
          "@media (min-width: 1024px)": { width: "30%" },
          "& .MuiInputBase-root": {
            borderRadius: "25px",
            backgroundColor: "#F7F7F7", // Light background color
            transition: "all 0.3s ease",
          },
          "& .MuiInputBase-input": {
            padding: "12px 16px",
            fontSize: "16px",
            color: "#333", // Dark text color for contrast
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D1D5DB", // Light border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#703BF7", // Border color on hover
          },
          "&:focus .MuiOutlinedInput-notchedOutline": {
            borderColor: "#703BF7", // Border color when focused
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <button
                className="bg-[#703BF7] p-2 rounded-full hover:bg-[#5a2ed3] transition-all duration-300 flex justify-center items-center"
                style={{
                  borderRadius: "50%",
                  padding: "8px",
                }}
              >
                <SearchIcon style={{ color: "white" }} />
              </button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;

// import { TextField, InputAdornment } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//   return (
//     <div className="pl-[20px] pr-[20px]">
//       <TextField
//         variant="outlined"
//         placeholder="Search..."
//         size="small"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{
//           width: "100%",
//           "@media (min-width: 640px)": { width: "50%" },
//           "@media (min-width: 1024px)": { width: "30%" },
//           "& .MuiInputBase-input": { padding: "12px" },
//         }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <button className="border rounded bg-[#703BF7] text-white p-1">
//                 <SearchIcon />
//               </button>
//             </InputAdornment>
//           ),
//         }}
//       />
//     </div>
//   );
// };

// export default SearchBar;

