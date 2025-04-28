// src/components/BookingForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingService from '../services/BookingService';
import '../styles/BookingForm.css';

const BookingForm = ({ 
  movieId, 
  sessionId, 
  selectedSeats, 
  onGoBack,
  movieTitle,
  sessionTime
}) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-() ]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create booking
      await BookingService.createBooking({
        movieId,
        sessionId,
        seats: selectedSeats,
        customerInfo: formData
      });
      
      toast.success('Booking successful!', {
        position: "bottom-right",
        autoClose: 5000
      });
      
      // Redirect to home page after short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      toast.error(`Booking failed: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="booking-form-container">
      <h2>Complete Your Booking</h2>
      
      <div className="booking-summary">
        <h3>Booking Summary</h3>
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Session:</strong> {sessionTime}</p>
        <p><strong>Seats:</strong> {selectedSeats.sort().join(', ')}</p>
        <p><strong>Total Seats:</strong> {selectedSeats.length}</p>
      </div>
      
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="back-button"
            onClick={onGoBack}
          >
            Back to Seat Selection
          </button>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;