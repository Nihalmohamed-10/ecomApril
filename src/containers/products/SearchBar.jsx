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
          "& .MuiInputBase-input": { padding: "12px" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <button className="border rounded bg-[#703BF7] text-white p-1"><SearchIcon /></button>
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

// const SearchBar = () => {
//   return (
//     <div className="pl-[20px] pr-[20px]">
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           size="small"
//           sx={{
//             width: "100%", 
//             "@media (min-width: 640px)": { 
//               width: "50%", 
//             },
//             "@media (min-width: 1024px)": { 
//               width: "30%", 
//             },
//             "& .MuiInputBase-input": {
//               padding: "12px", 
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
                // <button className="border rounded bg-[#703BF7] text-white p-1"><SearchIcon /></button>
//               </InputAdornment>
//             ),
//           }}
//         />
//     </div>
//   );
// };

// export default SearchBar;
