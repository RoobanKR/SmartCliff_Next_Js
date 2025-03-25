// import React, { useEffect, useRef } from "react";
// import { FaTimes, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
 
// const ToastComponent = ({ title, message, show, onClose, type = "success" }) => {
//     const toastRef = useRef(null);
//     const toastInstance = useRef(null);
 
//     useEffect(() => {
//         if (window.bootstrap && toastRef.current) {
//             toastInstance.current = new window.bootstrap.Toast(toastRef.current, {
//                 autohide: true,
//                 delay: 5000
//             });
//         }
 
//         if (!document.getElementById("bootstrap-js")) {
//             const script = document.createElement("script");
//             script.id = "bootstrap-js";
//             script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
//             script.async = true;
//             document.body.appendChild(script);
 
//             script.onload = () => {
//                 if (toastRef.current) {
//                     toastInstance.current = new window.bootstrap.Toast(toastRef.current, {
//                         autohide: true,
//                         delay: 5000
//                     });
//                     if (show) toastInstance.current.show();
//                 }
//             };
//         }
//     }, []);
 
//     useEffect(() => {
//         if (show && toastInstance.current) {
//             toastInstance.current.show();
//         } else if (!show && toastInstance.current) {
//             toastInstance.current.hide();
//         }
//     }, [show]);
 
//     // Define colors and icons based on type
//     const bgColor = type === "success" ? "#d4edda" : "#f8d7da"; // Green for success, Red for error
//     const borderColor = type === "success" ? "#c3e6cb" : "#f5c6cb"; // Border color
//     const textColor = type === "success" ? "#155724" : "#721c24"; // Text color
//     const icon = type === "success" ? <FaCheckCircle color="#28a745" size={20} /> : <FaExclamationTriangle color="#dc3545" size={20} />;
 
//     return (
//         <div
//             style={{
//                 position: "fixed",
//                 top: "20px",
//                 right: "20px",
//                 zIndex: 1050,
//                 display: show ? "block" : "none"
//             }}
//         >
//             <div
//                 ref={toastRef}
//                 role="alert"
//                 aria-live="assertive"
//                 aria-atomic="true"
//                 style={{
//                     minWidth: "320px",
//                     maxWidth: "380px",
//                     backgroundColor: "#fff",
//                     borderRadius: "10px",
//                     boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                     border: `1px solid ${borderColor}`,
//                     overflow: "hidden"
//                 }}
//             >
//                 {/* Toast Header */}
//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         padding: "12px",
//                         backgroundColor: bgColor,
//                         borderBottom: `1px solid ${borderColor}`
//                     }}
//                 >
//                     {/* Icon */}
//                     <div
//                         style={{
//                             width: "30px",
//                             height: "30px",
//                             backgroundColor: bgColor,
//                             borderRadius: "6px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             marginRight: "10px"
//                         }}
//                     >
//                         {icon}
//                     </div>
 
//                     {/* Title */}
//                     <span style={{ fontWeight: "bold", fontSize: "14px", color: textColor }}>
//                         {title || (type === "success" ? "Success" : "Error")}
//                     </span>
 
//                     {/* Time & Close Button */}
//                     <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
//                         <span style={{ fontSize: "12px", color: "#888", marginRight: "12px" }}>11 mins ago</span>
//                         <button
//                             onClick={onClose}
//                             style={{
//                                 background: "transparent",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 color: "#888",
//                                 fontSize: "16px"
//                             }}
//                         >
//                             <FaTimes />
//                         </button>
//                     </div>
//                 </div>
 
//                 {/* Toast Body */}
//                 <div
//                     style={{
//                         padding: "12px",
//                         fontSize: "14px",
//                         color: "#555",
//                         lineHeight: "1.4"
//                     }}
//                 >
//                     {message || (type === "success" ? "Operation completed successfully!" : "Something went wrong. Please try again.")}
//                 </div>
//             </div>
//         </div>
//     );
// };
 
// export default ToastComponent;
 
 
 
 
import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
 
const ToastComponent = ({ title, message, show, onClose, type = "success" }) => {
    const toastRef = useRef(null);
    const toastInstance = useRef(null);
    const [timeElapsed, setTimeElapsed] = useState("Just now");
 
    useEffect(() => {
        if (show) {
            setTimeElapsed("Just now");
            const interval = setInterval(() => {
                updateElapsedTime();
            }, 60000); // Update every minute
            return () => clearInterval(interval);
        }
    }, [show]);
 
    const updateElapsedTime = () => {
        const now = new Date();
        setTimeElapsed("Just now");
    };
 
    useEffect(() => {
        if (window.bootstrap && toastRef.current) {
            toastInstance.current = new window.bootstrap.Toast(toastRef.current, {
                autohide: true,
                delay: 5000
            });
        }
 
        if (!document.getElementById("bootstrap-js")) {
            const script = document.createElement("script");
            script.id = "bootstrap-js";
            script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
            script.async = true;
            document.body.appendChild(script);
 
            script.onload = () => {
                if (toastRef.current) {
                    toastInstance.current = new window.bootstrap.Toast(toastRef.current, {
                        autohide: true,
                        delay: 5000
                    });
                    if (show) toastInstance.current.show();
                }
            };
        }
    }, []);
 
    useEffect(() => {
        if (show && toastInstance.current) {
            toastInstance.current.show();
        } else if (!show && toastInstance.current) {
            toastInstance.current.hide();
        }
    }, [show]);
 
    const bgColor = type === "success" ? "#d4edda" : "#f8d7da";
    const borderColor = type === "success" ? "#c3e6cb" : "#f5c6cb";
    const textColor = type === "success" ? "#155724" : "#721c24";
    const icon = type === "success" ? <FaCheckCircle color="#28a745" size={20} /> : <FaExclamationTriangle color="#dc3545" size={20} />;
 
    return (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1050, display: show ? "block" : "none" }}>
            <div
                ref={toastRef}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    minWidth: "295px",
                    maxWidth: "380px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    border: `1px solid ${borderColor}`,
                    overflow: "hidden"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", padding: "12px", backgroundColor: bgColor, borderBottom: `1px solid ${borderColor}` }}>
                    <div style={{ width: "30px", height: "30px", backgroundColor: bgColor, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px" }}>
                        {icon}
                    </div>
                    <span style={{ fontWeight: "bold", fontSize: "14px", color: textColor }}>{title || (type === "success" ? "Success" : "Error")}</span>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "#888", marginRight: "12px" }}>{timeElapsed}</span>
                        <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#888", fontSize: "16px" }}>
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <div style={{ padding: "12px", fontSize: "14px", color: "#555", lineHeight: "1.4" }}>
                    {message || (type === "success" ? "Operation completed successfully!" : "Something went wrong. Please try again.")}
                </div>
            </div>
        </div>
    );
};
 
export default ToastComponent;
 
 