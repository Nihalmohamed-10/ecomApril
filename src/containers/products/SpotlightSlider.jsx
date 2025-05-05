import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

function SpotlightSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5006/api/products/");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching spotlight products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: "#f8fafc" }}>
      <Carousel
        autoPlay={true}
        animation="slide"
        duration={500}
        interval={1200}
        indicators={true}
        navButtonsAlwaysVisible={true}
        swipe={true}
        cycleNavigation={true}
        fullHeightHover={false}
        height="500px"
      >
        {products.slice(0, 10).map((product) => (
          <Box
            key={product._id}
            sx={{
              width: "100%",
              height: "500px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              px: 2,
            }}
          >
            <motion.img
              src={product.images && product.images[0]} 
              alt={product.name}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}    
              transition={{ duration: 0.8 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "0",
                cursor: "pointer",
                filter: "brightness(1)", 
              }}
              whileHover={{ scale: 1.03 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                position: "absolute",
                bottom: 30,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "8px",
                backdropFilter: "blur(8px)",
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
              }}
            >
              <Typography variant="h5">{product.name}</Typography>
            </motion.div>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default SpotlightSlider;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Carousel from "react-material-ui-carousel";
// import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";  // Import framer-motion for animation

// function SpotlightSlider() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5006/api/products/");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Error fetching spotlight products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

// console.log(products);

//   return (
//     <Box sx={{ width: "100%", overflow: "hidden", bgcolor: "#f8fafc" }}>
//       <Carousel
//         autoPlay={true}
//         animation="slide"
//         duration={1000}  
//         interval={2500} 
//         indicators={true}
//         navButtonsAlwaysVisible={true}
//         swipe={true}
//         cycleNavigation={true}
//         fullHeightHover={false}
//         height="500px"
//       >
//         {products.slice(0, 10).map((product) => (
//           <Box
//             key={product._id}
//             sx={{
//               width: "100%",
//               height: "500px",
//               position: "relative",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexDirection: "column",
//               px: 2,
//             }}
//           >
//             {/* Animated Image with Hover Effect */}
//             <motion.Box
//               component="img"
//               src={product.images[0]}
//               alt={product.name}
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain", // Ensure full image view
//                 borderRadius: 0,
//                 cursor: "pointer",
//                 filter: "brightness(1.2)", // Makes the image brighter for visibility
//               }}
//               whileHover={{ scale: 1.05 }}  // Zoom effect on hover
//               transition={{ duration: 0.3 }}
//             />
            
//             {/* Product Name with Animation */}
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//               style={{
//                 position: "absolute",
//                 bottom: 30,
//                 bgcolor: "rgba(0, 0, 0, 0.3)", // Lighter background for better visibility
//                 color: "#fff",
//                 padding: "8px 16px",
//                 borderRadius: "8px",
//                 backdropFilter: "blur(8px)", // Adds blur effect behind the text for better contrast
//                 textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Add a subtle shadow to text for better contrast
//               }}
//             >
//               <Typography variant="h5">{product.name}</Typography>
//             </motion.div>
//           </Box>
//         ))}
//       </Carousel>
//     </Box>
//   );
// }

// export default SpotlightSlider;


