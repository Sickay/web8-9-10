// src/components/CinemaHall.jsx
import { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';
import '../styles/CinemaHall.css';

const CinemaHall = ({ movieId, sessionId, onSelectSeats }) => {
  // Define the cinema layout: rows (A-J) and columns (1-10)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  
  // Load booked seats when component mounts
  useEffect(() => {
    const fetchBookedSeats = async () => {
      const bookings = await BookingService.getBookingsBySession(movieId, sessionId);
      
      // Flatten all booked seats from all bookings
      const booked = bookings.flatMap(booking => booking.seats || []);
      setBookedSeats(booked);
    };
    
    fetchBookedSeats();
  }, [movieId, sessionId]);
  
  const handleSeatClick = (seatId) => {
    // Check if seat is already booked
    if (bookedSeats.includes(seatId)) {
      return; // Do nothing if seat is already booked
    }
    
    // Toggle seat selection
    setSelectedSeats(prevSelected => {
      const isSelected = prevSelected.includes(seatId);
      
      // If seat is already selected, remove it from selection
      if (isSelected) {
        const newSelected = prevSelected.filter(seat => seat !== seatId);
        onSelectSeats(newSelected); // Notify parent component
        return newSelected;
      } 
      // If seat is not selected, add it to selection
      else {
        const newSelected = [...prevSelected, seatId];
        onSelectSeats(newSelected); // Notify parent component
        return newSelected;
      }
    });
  };
  
  const getSeatStatus = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };
  
  return (
    <div className="cinema-hall">
      <div className="screen">Screen</div>
      
      <div className="seating-layout">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <div className="row-label">{row}</div>
            {columns.map(col => {
              const seatId = `${row}${col}`;
              const status = getSeatStatus(seatId);
              
              return (
                <div 
                  key={seatId}
                  className={`seat ${status}`}
                  onClick={() => handleSeatClick(seatId)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box booked"></div>
          <span>Booked</span>
        </div>
      </div>
      
      {selectedSeats.length > 0 && (
        <div className="selected-seats-info">
          <h4>Selected Seats:</h4>
          <p>{selectedSeats.sort().join(', ')}</p>
          <p>Total: {selectedSeats.length} seat(s)</p>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;