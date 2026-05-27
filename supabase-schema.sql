-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for Buses
CREATE TABLE buses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_number TEXT NOT NULL,
  operator TEXT NOT NULL,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  bus_type TEXT NOT NULL, -- Luxury, Semi-Luxury, etc.
  price DECIMAL(10, 2) NOT NULL,
  departure_time TEXT NOT NULL,
  arrival_time TEXT NOT NULL,
  duration TEXT NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 4.5,
  total_seats INTEGER DEFAULT 40,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bus_id UUID REFERENCES buses(id),
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  seat_numbers TEXT[] NOT NULL, -- Array of selected seats
  total_price DECIMAL(10, 2) NOT NULL,
  booking_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Initial Mock Data (Sri Lanka Routes)
INSERT INTO buses (route_number, operator, from_city, to_city, bus_type, price, departure_time, arrival_time, duration, rating)
VALUES 
('EX-001', 'SLTB Luxury', 'Colombo', 'Kandy', 'Luxury', 1500.00, '08:00 AM', '11:00 AM', '3h 00m', 4.8),
('EX-002', 'NTC Private', 'Colombo', 'Galle', 'Super Luxury', 1200.00, '09:30 AM', '11:00 AM', '1h 30m', 4.5),
('15', 'Jayanthi Travels', 'Colombo', 'Jaffna', 'Super Luxury (Night)', 2500.00, '08:00 PM', '05:00 AM', '9h 00m', 4.9);
