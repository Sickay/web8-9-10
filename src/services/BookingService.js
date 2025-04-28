// src/services/BookingService.js

class BookingService {
    // Keys for localStorage
    static BOOKINGS_KEY = 'cinema_bookings';
  
    // Get all bookings
    static getAllBookings() {
      const bookingsJson = localStorage.getItem(this.BOOKINGS_KEY);
      return bookingsJson ? JSON.parse(bookingsJson) : [];
    }
  
    // Save bookings to localStorage
    static saveBookings(bookings) {
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
    }
  
    // Get bookings for a specific movie session
    static getBookingsBySession(movieId, sessionId) {
      const allBookings = this.getAllBookings();
      
      return allBookings.filter(booking => 
        booking.movieId === movieId && 
        booking.sessionId === sessionId
      );
    }
  
    // Create a new booking
    static createBooking(bookingData) {
      const { movieId, sessionId, seats, customerInfo } = bookingData;
      
      // Validate required fields
      if (!movieId || !sessionId || !seats || !seats.length) {
        throw new Error('Missing required booking information');
      }
      
      if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        throw new Error('Missing customer information');
      }
      
      // Check if any seats are already booked
      const sessionBookings = this.getBookingsBySession(movieId, sessionId);
      const bookedSeats = sessionBookings.flatMap(booking => booking.seats);
      
      const conflictingSeats = seats.filter(seat => bookedSeats.includes(seat));
      
      if (conflictingSeats.length > 0) {
        throw new Error(`Seats ${conflictingSeats.join(', ')} are already booked.`);
      }
      
      // Create new booking with timestamp
      const newBooking = {
        id: Date.now().toString(),
        movieId,
        sessionId,
        seats,
        customerInfo,
        createdAt: new Date().toISOString(),
      };
      
      // Add to existing bookings
      const allBookings = this.getAllBookings();
      allBookings.push(newBooking);
      
      // Save updated bookings
      this.saveBookings(allBookings);
      
      return newBooking;
    }
  }
  
  export default BookingService;