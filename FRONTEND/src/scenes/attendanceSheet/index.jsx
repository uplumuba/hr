import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../utilis/ApiRequest";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AttendanceSheet = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => months[new Date().getMonth()]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/attendance/${selectedMonth}`, { signal });
        setFilteredData(data);
      } catch (err) {
        if (!signal.aborted) {
          setError("Failed to load attendance data");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAttendanceData();
    return () => controller.abort();
  }, [selectedMonth]);

  const handleEditCellChange = async (id, dayIndex, value) => {
    console.log(id,dayIndex,value)
    try {
      setFilteredData(prev => prev.map(employee => {
        if (employee.id === id) {
          const updatedDays = [...employee.days];
          updatedDays[dayIndex].status = value;
          return { ...employee, days: updatedDays };
        }
        return employee;
      }));
      console.log(filteredData.find(emp => emp.id === id).days)

      await axiosInstance.post(`/attendance/${selectedMonth}/${id}`, {
        days: filteredData.find(emp => emp.id === id).days
      });
    } catch (err) {
      setError("Failed to save attendance changes");
      console.log(err);
    }
  };

  return (
    <div style={{
     
    }} className="p-5 w-full ">
      <h2 className="text-2xl font-bold">Attendance Sheet</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-4">
        <label className="block mb-2 font-semibold">Select Month:</label>
        <select
          className="border p-2 rounded"
          value={selectedMonth}
          style={{
            padding: 10,
            backgroundColor: "white",
            border: "0px solid #ccc",
            marginInline: 10,
          }}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div style={{
        width: "80%",
        overflowX: "auto",
      }} className="mt-4 overflow-x-auto">
        <table style={
          {
            backgroundColor: "white", 
            width: "100%",
            overflowX: "auto",
            borderCollapse: "collapse",
            border: "1px solid #ccc",
            borderRadius: 5,   
            padding: 10,
            marginBottom: 20,
            marginTop: 20,   
          
          }
        } className="w-full  border-collapse border border-gray-300">
          <thead>
            <tr style={
              {
                width: 400,
             backgroundColor: "#f8f8f8",
           
              }
            } className="bg-gray-200">
              <th style={{
                padding: 10,
              }} className="border p-[10]">Employee Name</th>
              {filteredData[0]?.days?.map((_, index) => (
                <th key={index}  style={
                 { width: 300,}
                } className="border p-2">{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody >
            {filteredData.map(employee => (
              <tr key={employee.id} className="text-center">
                <td style={{
                  width: 400,
                  whiteSpace: "nowrap",
                  paddingInlineStart: 10,
                padding: 10,
                }} className=" p-2">{employee.employee_name}</td>
                {employee.days.map((day, index) => (
                  <td key={index} className="">
                    <select
                 
                      value={day.status}
                      style={{ width: 80,
                        padding: 10,
                        backgroundColor:"white",
                borderLeft: "0.1px solid #ccc",
                       }}
                      onChange={(e) => handleEditCellChange(employee.id, index, e.target.value)}
                    >
                      <option value="Present">✅</option>
                      <option value="Absent">❌</option>
                      <option value="Leave">⭐</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
