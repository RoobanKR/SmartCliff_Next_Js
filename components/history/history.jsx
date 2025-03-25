'use client'
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllYearlyServices } from '@/redux/slices/history/hsitory';

const serviceColors = {
  'B2B': '#1976d2', // Blue
  'B2I': '#ed6c02', // Orange
  'CSR': '#d32f2f', // Red
  'B2C': '#2e7d32', // Green - Added for B2C
};

const History = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.yearlyService);
  
  useEffect(() => {
    dispatch(getAllYearlyServices());
  }, [dispatch]);

  // Process and organize the data with proper immutability
  const processTimelineData = () => {
    if (!services || services.length === 0) {
      return [];
    }
    
    const processedData = [];
    const yearMap = {};
    
    // First pass: collect all unique years and their services
    services.forEach(item => {
      if (!yearMap[item.year]) {
        // Create a new object for this year
        yearMap[item.year] = { 
          year: item.year, 
          services: item.services.map(service => ({
            businessService: service.businessService,
            service: [...service.service],
            _id: service._id
          }))
        };
      } else {
        // For each service in the duplicate year entry
        item.services.forEach(service => {
          const existingServiceIndex = yearMap[item.year].services.findIndex(
            s => s.businessService === service.businessService
          );
          
          if (existingServiceIndex >= 0) {
            // Create a new service object with merged services array
            const existingService = yearMap[item.year].services[existingServiceIndex];
            const uniqueServices = [...new Set([...existingService.service, ...service.service])];
            
            // Replace the old service object with a new one
            yearMap[item.year].services[existingServiceIndex] = {
              ...existingService,
              service: uniqueServices
            };
          } else {
            // Add new business service (create a new object)
            yearMap[item.year].services.push({
              businessService: service.businessService,
              service: [...service.service],
              _id: service._id
            });
          }
        });
      }
    });
    
    // Convert to array and sort by year
    Object.values(yearMap).forEach(item => {
      processedData.push({...item});
    });
    
    return processedData.sort((a, b) => {
      // Extract the first year from the range (e.g., "2021" from "2021-22")
      const yearA = parseInt(a.year.split('-')[0]);
      const yearB = parseInt(b.year.split('-')[0]);
      return yearA - yearB;
    });
  };

  const timelineData = processTimelineData();

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading timeline data...</div>;
  
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error loading timeline: {error}</div>;

  if (!timelineData || timelineData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>No timeline data available.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Services Evolution Timeline</h2>
      
      {/* Center line */}
      <div style={{ position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          left: '50%',
          marginLeft: '-2px', 
          top: 0, 
          bottom: 0, 
          width: '4px', 
          background: '#e0e0e0' 
        }} />
        
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: isEven ? 'flex-end' : 'flex-start',
                marginBottom: '40px',
                position: 'relative',
                paddingLeft: isEven ? '0' : '50%',
                paddingRight: isEven ? '50%' : '0',
              }}
            >
              {/* Circle Indicator */}
              <motion.div 
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: 'calc(50% - 10px)',
                  zIndex: 2
                }}
                animate={{ scale: [0.8, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              {/* Timeline Content */}
              <div style={{ 
                width: '100%',
                padding: '15px', 
                background: '#fff', 
                borderRadius: '10px', 
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                {/* Year with direction-specific styling */}
                <h3 style={{ 
                  borderBottom: '2px solid #1976d2', 
                  paddingBottom: '5px', 
                  marginBottom: '10px',
                  textAlign: isEven ? 'left' : 'right'
                }}>{item.year}</h3>
                
                {item.services.map((service, idx) => (
                  service.service && service.service.length > 0 ? (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.05 }}
                      style={{ 
                        marginBottom: '10px', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        backgroundColor: serviceColors[service.businessService] || '#0288d1', 
                        color: 'white' 
                      }}
                    >
                      <strong>{service.businessService}</strong>
                      <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {service.service.map((s, i) => (
                          <span 
                            key={i} 
                            style={{ 
                              padding: '5px 10px', 
                              background: 'rgba(255,255,255,0.2)', 
                              borderRadius: '5px', 
                              fontSize: '14px' 
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : null
                ))}
                
                {/* Triangle pointer */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  [isEven ? 'right' : 'left']: '-10px',
                  width: '0',
                  height: '0',
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  [isEven ? 'borderRight' : 'borderLeft']: '10px solid white',
                }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default History;