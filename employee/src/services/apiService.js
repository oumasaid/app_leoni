// apiService.js
// export const getMachineNames = async () => {
//   try {
//     console.log("Fetching machine names...");
//     const response = await fetch("/api/machines");
//     const data = await response.json();
//     const machineNames = data.map((machine) => machine.machine_name);
//     return machineNames;
//   } catch (error) {
//     console.error("Error fetching machine names:", error);
//     throw error;
//   }
// };

// import axios from "axios";

// export const getMachineNames = async () => {
//   try {
//     console.log("Fetching machine names...");
//     const response = await axios.get("/api/machines");
//     const machineNames = response.data.map((machine) => machine.machine_name);
//     return machineNames;
//   } catch (error) {
//     console.error("Error fetching machine names:", error);
//     throw error;
//   }
// };
// export const getMachineNames = async (req,res) => {
//   try {
//     const response = await Machines.find({})
//     machineNames=response.machine_name
//     if (response){
//       return res.status(200).json({
//         machineNames
//       })
//     }
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching machine names:", error);
//     throw error;
//   }
// };

